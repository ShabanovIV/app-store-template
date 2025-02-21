import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("../package.json");

const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
const devDependencies = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

const excludedPackages = [];
const LIMIT_ROWS = null;

const packageLockPath = path.resolve("../package-lock.json");
const packageLock = fs.existsSync(packageLockPath)
  ? JSON.parse(fs.readFileSync(packageLockPath, "utf8")).dependencies || {}
  : {};

const formatDate = (dateString) => {
  if (!dateString || dateString === "Неизвестно") return "Неизвестно";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0].split("-").reverse().join(".");
};

const getVersionFromNodeModules = (packageName) => {
  try {
    const packagePath = require.resolve(`${packageName}/package.json`, { paths: [process.cwd()] });
    const packageData = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return packageData.version || "Неизвестно";
  } catch {
    return "Не установлено";
  }
};

const getInstalledVersion = async (packageName) => {
  return new Promise((resolve) => {
    if (packageLock[packageName]?.version) {
      return resolve(packageLock[packageName].version);
    }

    execFile(
      "npm",
      ["list", packageName, "--json", "--depth=0", "--all"],
      { maxBuffer: 1024 * 500 },
      (error, stdout) => {
        if (error) {
          return resolve(getVersionFromNodeModules(packageName));
        }
        try {
          const listInfo = JSON.parse(stdout);
          resolve(
            listInfo.dependencies?.[packageName]?.version || getVersionFromNodeModules(packageName)
          );
        } catch {
          resolve(getVersionFromNodeModules(packageName));
        }
      }
    );
  });
};

const fetchPackageInfo = async (packageName, level = 0, isDependency = false, isDev = false) => {
  if (excludedPackages.includes(packageName)) return null;

  console.log(
    isDependency
      ? `   ➜ Зависимость [${packageName}]`
      : isDev
      ? `🔹 DevDependency [${packageName}]`
      : `🔍 Сбор информации: пакет [${packageName}]`
  );

  const installedVersion = await getInstalledVersion(packageName);

  return new Promise((resolve) => {
    execFile("npm", ["view", packageName, "--json"], { maxBuffer: 1024 * 500 }, (error, stdout) => {
      if (error) {
        console.error(`❌ Ошибка при получении данных о пакете ${packageName}:`, error.message);
        return resolve({
          level,
          name: packageName,
          installedVersion,
          installedVersionDate: "Неизвестно",
          latestVersion: "Неизвестно",
          latestVersionDate: "Неизвестно",
          homePage: "Нет данных",
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
          level,
          name: packageInfo.name,
          installedVersion,
          installedVersionDate: packageInfo.time?.[installedVersion]
            ? formatDate(packageInfo.time[installedVersion])
            : "Неизвестно",
          latestVersion,
          latestVersionDate,
          homePage: packageInfo.homepage || "Не указано",
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
          level,
          name: packageName,
          installedVersion,
          installedVersionDate: "Неизвестно",
          latestVersion: "Неизвестно",
          latestVersionDate: "Неизвестно",
          homePage: "Нет данных",
          description: "Ошибка парсинга",
          license: "Неизвестно",
          dependencies: [],
          isDev,
        });
      }
    });
  });
};

const buildDependencyTree = async (packageName, level = 0, isDev = false, visited = new Set()) => {
  if (visited.has(packageName)) return [];
  visited.add(packageName);

  const packageInfo = await fetchPackageInfo(packageName, level, level > 0, isDev);
  if (!packageInfo) return [];

  const children = await Promise.all(
    packageInfo.dependencies.map((dep) => buildDependencyTree(dep, level + 1, isDev, visited))
  );

  return [{ ...packageInfo }, ...children.flat()];
};

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

  const csvData = [
    "Level,Type,Package,Latest Version,Latest Version Date,Installed Version,Installed Version Date,Home Page,Description,License",
  ];

  results.forEach(({ level, isDev, name, latestVersion, latestVersionDate, installedVersion, installedVersionDate, homePage, description, license }) => {
    const type = isDev ? "DevDependency" : "Dependency";
    csvData.push(`${level},"${type}","${name}","${latestVersion}",${latestVersionDate},"${installedVersion}",${installedVersionDate},"${homePage}","${description}","${license}"`);
  });

  csvData.push("");
  csvData.push("📊 Статистика:");
  csvData.push(`Всего уникальных пакетов,${allPackages.size}`);
  csvData.push(`Количество пакетов в dependencies,${dependencies.length}`);
  csvData.push(`Количество пакетов в devDependencies,${devDependencies.length}`);

  fs.writeFileSync("dependencies-info.csv", csvData.join("\n"));
  console.log(`✅ Информация сохранена в dependencies-info.csv (${results.length} строк)`);

  console.log("\n📊 Статистика:");
  csvData.slice(-3).forEach((line) => console.log(`  🔹 ${line.replace(",", ": ")}`));
};

main();
