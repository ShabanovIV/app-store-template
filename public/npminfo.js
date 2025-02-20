import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json"); // ✅ Загружаем package.json

const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
const devDependencies = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

// ❌ Исключаем ненужные пакеты
const excludedPackages = ["xlsx", "exceljs"];

// 🔹 Ограничение количества сканируемых пакетов
const LIMIT_ROWS = 1;

// ✅ Загружаем package-lock.json (если есть)
const packageLockPath = path.resolve("../package-lock.json");
const packageLock = fs.existsSync(packageLockPath)
  ? JSON.parse(fs.readFileSync(packageLockPath, "utf8"))
  : { dependencies: {} };

// ✅ Функция форматирования даты в ДД.ММ.ГГГГ
const formatDate = (dateString) => {
  if (!dateString || dateString === "Неизвестно") return "Неизвестно";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].split("-").reverse().join("."); // Преобразуем YYYY-MM-DD в DD.MM.YYYY
};

// ✅ Получаем информацию о пакете через `npm view`
const fetchPackageInfo = async (packageName, isDependency = false, isDev = false) => {
  if (excludedPackages.includes(packageName)) return null;

  console.log(
    isDependency
      ? `   ➜ Зависимость [${packageName}]`
      : isDev
      ? `🔹 DevDependency [${packageName}]`
      : `🔍 Сбор информации: пакет [${packageName}]`
  );

  return new Promise((resolve) => {
    execFile("npm", ["view", packageName, "--json"], { maxBuffer: 1024 * 500 }, (error, stdout) => {
      if (error) {
        console.error(`❌ Ошибка при получении данных о пакете ${packageName}:`, error.message);
        return resolve({
          name: packageName,
          latestVersion: "Неизвестно",
          latestVersionDate: "Неизвестно",
          description: "Нет данных",
          license: "Неизвестно",
          dependencies: [],
          isDev,
        });
      }
      try {
        const packageInfo = JSON.parse(stdout.trim());
        const latestVersion = packageInfo["dist-tags"]?.latest || packageInfo.version;
        const latestVersionDate = packageInfo.time?.[latestVersion]
          ? formatDate(packageInfo.time[latestVersion])
          : "Неизвестно";

        resolve({
          name: packageInfo.name,
          latestVersion,
          latestVersionDate,
          description: packageInfo.description?.replace(/(\r\n|\n|\r)/gm, " ") || "Нет описания",
          license: packageInfo.license || "Не указано",
          dependencies: packageInfo.dependencies
            ? Object.keys(packageInfo.dependencies).filter((dep) => !excludedPackages.includes(dep))
            : [],
          isDev,
        });
      } catch (parseError) {
        console.error(`❌ Ошибка парсинга данных о пакете ${packageName}:`, parseError.message);
        resolve({
          name: packageName,
          latestVersion: "Неизвестно",
          latestVersionDate: "Неизвестно",
          description: "Ошибка парсинга",
          license: "Неизвестно",
          dependencies: [],
          isDev,
        });
      }
    });
  });
};

// ✅ Рекурсивно строим дерево зависимостей
const buildDependencyTree = async (packageName, level = 0, isDev = false, visited = new Set()) => {
  if (visited.has(packageName)) return [];
  visited.add(packageName);

  const packageInfo = await fetchPackageInfo(packageName, level > 0, isDev);
  if (!packageInfo) return [];

  const children = await Promise.all(
    packageInfo.dependencies.map((dep) => buildDependencyTree(dep, level + 1, isDev, visited))
  );

  return [{ level, ...packageInfo }, ...children.flat()];
};

// ✅ Основная функция
const main = async () => {
  console.log(`🚀 Запуск сбора информации о первых ${LIMIT_ROWS || "всех"} пакетах...`);

  const selectedDependencies = LIMIT_ROWS ? dependencies.slice(0, LIMIT_ROWS) : dependencies;
  const selectedDevDependencies = LIMIT_ROWS
    ? devDependencies.slice(0, Math.max(0, LIMIT_ROWS - selectedDependencies.length))
    : devDependencies;

  const results = (
    await Promise.all([
      ...selectedDependencies.map((dep) => buildDependencyTree(dep, 0, false)),
      ...selectedDevDependencies.map((dep) => buildDependencyTree(dep, 0, true)),
    ])
  ).flat();

  const allPackages = new Set(results.map((pkg) => pkg.name));
  const uniqueDependencies = new Set(selectedDependencies);
  const uniqueDevDependencies = new Set(selectedDevDependencies);

  const csvData = [
    "Level,Type,Package,Latest Version,Latest Version Date,Description,License",
  ];

  results.forEach(({ level, isDev, name, latestVersion, latestVersionDate, description, license }) => {
    const type = isDev ? "DevDependency" : "Dependency";
    csvData.push(`${level},${type},${name},${latestVersion},${latestVersionDate},"${description}",${license}`);
  });

  // 📊 Добавляем статистику в CSV и лог
  const stats = [
    "",
    "📊 Статистика:",
    `Всего уникальных пакетов,${allPackages.size}`,
    `Количество пакетов в dependencies,${dependencies.length}`,
    `Количество пакетов в devDependencies,${devDependencies.length}`,
    `Уникальных зависимостей для dependencies,${uniqueDependencies.size}`,
    `Уникальных зависимостей для devDependencies,${uniqueDevDependencies.size}`,
  ];
  csvData.push(...stats);

  fs.writeFileSync("dependencies-info.csv", csvData.join("\n"));
  console.log(`✅ Информация сохранена в dependencies-info.csv (${results.length} строк)`);

  // 📊 Вывод статистики в лог
  console.log("📊 Статистика:");
  console.log(`  🔹 Всего уникальных пакетов: ${allPackages.size}`);
  console.log(`  🔹 Количество пакетов в dependencies: ${dependencies.length}`);
  console.log(`  🔹 Количество пакетов в devDependencies: ${devDependencies.length}`);
  console.log(`  🔹 Уникальных зависимостей для dependencies: ${uniqueDependencies.size}`);
  console.log(`  🔹 Уникальных зависимостей для devDependencies: ${uniqueDevDependencies.size}`);
};

main();
