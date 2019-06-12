#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const languageCodes = require('iso-639-1');
const inputDir = path.join(__dirname, '../src/modules_ea');
const outputDir = path.join(__dirname, '../dist/locales');

const moduleLocales = {};
const locales = [];

/**
 * Clean up dist
 */
execSync(`rm -rf ${outputDir}/*`);

/**
 * Lazy grab available locales. Concat JSON for output
 */
fs.readdirSync(inputDir).forEach(file => {
  const locale = file.split('.')[0].split('-')[0];

  moduleLocales[locale] = Object.assign(
    moduleLocales[locale] || {},
    require(path.join(inputDir, file))
  );
});

/**
 * Cycle available locales, output to JSON
 */
Object.keys(moduleLocales).forEach(locale => {
  locales.push({
    key: languageCodes.getName(locale),
    value: locale
  });

  fs.writeFileSync(
    path.join(outputDir, `${locale}.json`),
    `${JSON.stringify(moduleLocales[locale], null, 2)}\n`
  );
});

/**
 * From available locales/language codes, output to JSON
 */
fs.writeFileSync(path.join(outputDir, `locales.json`), `${JSON.stringify(locales, null, 2)}\n`);
