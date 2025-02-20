import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json'); // ✅ Загружаем package.json

const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
const devDependencies = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

// ❌ Исключаем ненужные пакеты
const excludedPackages = ['xlsx', 'exceljs'];

// 🔹 Ограничение количества сканируемых пакетов
const LIMIT_ROWS = null;

// ✅ Загружаем package-lock.json (если есть)
const packageLockPath = path.resolve('../package-lock.json');
const packageLock = fs.existsSync(packageLockPath)
  ? JSON.parse(fs.readFileSync(packageLockPath, 'utf8'))
  : { dependencies: {} };

// ✅ Функция форматирования даты в ДД.ММ.ГГГГ
const formatDate = (dateString) => {
  if (!dateString || dateString === 'Неизвестно') return 'Неизвестно';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0].split('-').reverse().join('.'); // Преобразуем YYYY-MM-DD в DD.MM.YYYY
};

// ✅ Проверяем установленную версию вручную в `node_modules`
const getVersionFromNodeModules = (packageName) => {
  try {
    const packagePath = require.resolve(`${packageName}/package.json`, { paths: [process.cwd()] });
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return packageData.version;
  } catch {
    return null;
  }
};

// ✅ Получаем установленную версию через `npm list`
const getInstalledVersion = async (packageName) => {
  return new Promise((resolve) => {
    execFile(
      'npm',
      ['list', packageName, '--json', '--depth=0', '--all'],
      { maxBuffer: 1024 * 500 },
      (error, stdout) => {
        if (error)
          return resolve(
            getVersionFromNodeModules(packageName) ||
              packageLock.dependencies?.[packageName]?.version ||
              null,
          );
        try {
          const listInfo = JSON.parse(stdout);
          resolve(
            listInfo.dependencies?.[packageName]?.version ||
              getVersionFromNodeModules(packageName) ||
              packageLock.dependencies?.[packageName]?.version ||
              null,
          );
        } catch {
          resolve(
            getVersionFromNodeModules(packageName) ||
              packageLock.dependencies?.[packageName]?.version ||
              null,
          );
        }
      },
    );
  });
};

// ✅ Получаем информацию о пакете через `npm view`
const fetchPackageInfo = async (packageName, isDependency = false, isDev = false) => {
  if (excludedPackages.includes(packageName)) return null;

  console.log(
    isDependency
      ? `   ➜ Зависимость [${packageName}]`
      : isDev
        ? `🔹 DevDependency [${packageName}]`
        : `🔍 Сбор информации: пакет [${packageName}]`,
  );

  const installedVersion = await getInstalledVersion(packageName);

  return new Promise((resolve) => {
    execFile('npm', ['view', packageName, '--json'], { maxBuffer: 1024 * 500 }, (error, stdout) => {
      if (error) {
        console.error(`❌ Ошибка при получении данных о пакете ${packageName}:`, error.message);
        return resolve({
          name: packageName,
          installedVersion: installedVersion || 'Не установлено',
          installedVersionDate: 'Неизвестно',
          latestVersion: 'Неизвестно',
          latestVersionDate: 'Неизвестно',
          description: 'Нет данных',
          license: 'Неизвестно',
          dependencies: [],
          isDev,
        });
      }
      try {
        const packageInfo = JSON.parse(stdout.trim());

        const installedVersionDate =
          installedVersion && packageInfo.time?.[installedVersion]
            ? formatDate(packageInfo.time[installedVersion])
            : 'Неизвестно';

        const latestVersion = packageInfo['dist-tags']?.latest || packageInfo.version;
        const latestVersionDate = packageInfo.time?.[latestVersion]
          ? formatDate(packageInfo.time[latestVersion])
          : 'Неизвестно';

        resolve({
          name: packageInfo.name,
          installedVersion: installedVersion || 'Не установлено',
          installedVersionDate,
          latestVersion,
          latestVersionDate,
          description: packageInfo.description?.replace(/(\r\n|\n|\r)/gm, ' ') || 'Нет описания',
          license: packageInfo.license || 'Не указано',
          dependencies: packageInfo.dependencies
            ? Object.keys(packageInfo.dependencies).filter((dep) => !excludedPackages.includes(dep))
            : [],
          isDev,
        });
      } catch (parseError) {
        console.error(`❌ Ошибка парсинга данных о пакете ${packageName}:`, parseError.message);
        resolve({
          name: packageName,
          installedVersion: installedVersion || 'Не установлено',
          installedVersionDate: 'Неизвестно',
          latestVersion: 'Неизвестно',
          latestVersionDate: 'Неизвестно',
          description: 'Ошибка парсинга',
          license: 'Неизвестно',
          dependencies: [],
          isDev,
        });
      }
    });
  });
};

// ✅ Основная функция
const main = async () => {
  console.log(`🚀 Запуск сбора информации о первых ${LIMIT_ROWS || 'всех'} пакетах...`);

  const selectedDependencies = LIMIT_ROWS ? dependencies.slice(0, LIMIT_ROWS) : dependencies;
  const selectedDevDependencies = LIMIT_ROWS
    ? devDependencies.slice(0, Math.max(0, LIMIT_ROWS - selectedDependencies.length))
    : devDependencies;

  const allDependencies = new Set();
  const dependencyTree = new Set();
  const devDependencyTree = new Set();

  const results = (
    await Promise.all([
      ...selectedDependencies.map((dep) => fetchPackageInfo(dep, false, false)),
      ...selectedDevDependencies.map((dep) => fetchPackageInfo(dep, false, true)),
    ])
  ).flat();

  results.forEach(({ name, isDev }) => {
    allDependencies.add(name);
    if (isDev) devDependencyTree.add(name);
    else dependencyTree.add(name);
  });

  const csvData = [
    'Level,Type,Package,Installed Version,Installed Version Date,Latest Version,Latest Version Date,Description,License',
  ];

  results.forEach(({ isDev, name, installedVersion, installedVersionDate, latestVersion, latestVersionDate, description, license }) => {
    const type = isDev ? 'DevDependency' : 'Dependency';
    csvData.push(
      `0,${type},${name},${installedVersion},${installedVersionDate},${latestVersion},${latestVersionDate},"${description}",${license}`,
    );
  });

  // 📊 Добавляем статистику в конец CSV
  csvData.push('');
  csvData.push('📊 Статистика:');
  csvData.push(`Всего уникальных пакетов,${allDependencies.size}`);
  csvData.push(`Количество пакетов в dependencies,${dependencies.length}`);
  csvData.push(`Количество пакетов в devDependencies,${devDependencies.length}`);
  csvData.push(`Уникальных зависимостей для dependencies,${dependencyTree.size}`);
  csvData.push(`Уникальных зависимостей для devDependencies,${devDependencyTree.size}`);

  fs.writeFileSync('dependencies-info.csv', csvData.join('\n'));
  console.log(`✅ Информация сохранена в dependencies-info.csv (${results.length} строк)`);

  console.log(`📊 Статистика:`);
  console.log(`  🔹 Всего уникальных пакетов: ${allDependencies.size}`);
  console.log(`  🔹 Количество пакетов в dependencies: ${dependencies.length}`);
  console.log(`  🔹 Количество пакетов в devDependencies: ${devDependencies.length}`);
  console.log(`  🔹 Уникальных зависимостей для dependencies: ${dependencyTree.size}`);
  console.log(`  🔹 Уникальных зависимостей для devDependencies: ${devDependencyTree.size}`);
};

main();
