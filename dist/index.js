const fs = require('fs');
const path = require('path');
const install = path.join(__dirname, 'install');
const user = path.join(__dirname, 'user');
const ea = path.join(__dirname, 'locales');

const exportInstallHtml = {};

const setupInstall = () =>
  fs.readdirSync(install).forEach(file => {
    if (/\.html$/i.test(file)) {
      exportInstallHtml[file.replace('.html', '')] = {
        file: path.join(install, file),
        name: file,
        content: fs.readFileSync(path.join(install, file), 'utf8')
      };
    }
  });

const exportUserHtml = {};

const setupUser = () =>
  fs.readdirSync(user).forEach(file => {
    if (/\.html$/i.test(file)) {
      exportUserHtml[file.replace('.html', '')] = {
        file: path.join(user, file),
        name: file,
        content: fs.readFileSync(path.join(user, file), 'utf8')
      };
    }
  });

let exportLocales = {};
const exportLocaleStrings = {};

const setupEa = () =>
  fs.readdirSync(ea).forEach(file => {
    if (/locales.json/i.test(file)) {
      exportLocales = {
        ...require(path.join(ea, file))
      };
    } else {
      const locale = file.split('.')[0].split('-')[0];

      exportLocaleStrings[locale] = {
        ...(exportLocaleStrings[locale] || {}),
        ...require(path.join(ea, file))
      };
    }
  });

setupInstall();
setupUser();
setupEa();

module.exports = {
  ea: exportLocaleStrings,
  install: exportInstallHtml,
  locales: exportLocales,
  user: exportUserHtml
};
