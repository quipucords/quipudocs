#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const asciidoctor = require('asciidoctor')();

/**
 * Set display colors
 *
 * @param {string} str
 * @param {string} color
 * @returns {string}
 */
const setColor = (str, color = '') => {
  const colors = {
    blue: '\x1b[34m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    reset: '\x1b[0m',
    yellow: '\x1b[33m'
  };

  return `${colors[color.toLowerCase()] || colors.reset}${str}${colors.reset}`;
};

/**
 * Update asciidoctor logger message format with color
 */
const asciidoctorLogger = () => {
  const jsonFormatter = asciidoctor.LoggerManager.newFormatter('JsonFormatter', {
    call: (severity, time, programName, message) => {
      const text = message['text'];
      const sourceLocation = message['source_location'];
      const line = sourceLocation.getLineNumber();
      const path = `${sourceLocation.getPath()}`;

      let color;

      switch ((severity || '').toLowerCase()) {
        case 'warn':
          color = 'yellow';
          break;
        case 'error':
          color = 'red';
          break;
        default:
          color = '';
          break;
      }

      return setColor(`\n${severity} ${programName}: line ${line} ${path}\n ${text}\n`, color);
    }
  });

  asciidoctor.LoggerManager.getLogger().setFormatter(jsonFormatter);
};

/**
 * Compile adocs with asciidoctor
 *
 * @param {string} masterFilePath
 * @param {string} doctype
 * @param {string} safe
 * @param {object} options
 */
const buildDoc = ({ masterFilePath = null, doctype = 'book', safe = 'safe', ...options }) => {
  const displayPath = `src${masterFilePath.split('/src')[1]}`;

  try {
    const masterFile = fs.readFileSync(masterFilePath);

    asciidoctor.convert(masterFile.toString(), {
      doctype,
      safe,
      ...options
    });

    console.info(setColor(`\nCOMPILED asciidoctor: processed ${displayPath}`, 'blue'));
  } catch (e) {
    console.error(setColor(`\nERROR asciidoctor: failed ${displayPath}: ${e.message}`, 'red'));
  }
};

/**
 * First, setup new logger format
 */
asciidoctorLogger();

/**
 * Second, build brand specific GUI doc
 */
buildDoc({
  masterFilePath: path.join(__dirname, '../src/docs_gui/discovery/master.adoc'),
  base_dir: path.join(__dirname, '../src/docs_gui/discovery'),
  to_file: path.join(__dirname, '../src/docs_gui/discovery/dist/index-brand.html')
});

/**
 * Third, build general GUI doc
 */
buildDoc({
  masterFilePath: path.join(__dirname, '../src/docs_gui/qpc/master.adoc'),
  base_dir: path.join(__dirname, '../src/docs_gui/qpc'),
  to_file: path.join(__dirname, '../src/docs_gui/qpc/dist/index.html')
});

/**
 * Fourth, build brand specific CLI doc
 */
buildDoc({
  masterFilePath: path.join(__dirname, '../src/docs_cli/discovery/master.adoc'),
  base_dir: path.join(__dirname, '../src/docs_cli/discovery'),
  to_file: path.join(__dirname, '../src/docs_cli/discovery/dist/index-brand.html')
});

/**
 * Fifth, build general CLI doc
 */
buildDoc({
  masterFilePath: path.join(__dirname, '../src/docs_cli/qpc/master.adoc'),
  base_dir: path.join(__dirname, '../src/docs_cli/qpc'),
  to_file: path.join(__dirname, '../src/docs_cli/qpc/dist/index.html')
});
