const fs = require('fs');
const { exec, execSync } = require('child_process');
const Quipudocs = require('../dist');

describe('Distribution', () => {
  const loadFile = file =>
    (fs.existsSync(file) && fs.readFileSync(file, { encoding: 'utf-8' })) || '';
  const outputDir = 'dist';

  it('should have specific defined properties for JS consumption', () => {
    expect(Object.keys(Quipudocs)).toMatchSnapshot('exported output');
  });

  it('should match a specific file output', () => {
    const output = execSync(`find ./${outputDir} -type f -print0 | xargs -0`);

    const replacedGeneratedFilesMinsHash = output
      .toString()
      .replace(/\s+|\n+|\r+/g, '')
      .replace(new RegExp(`./${outputDir}`, 'gi'), `~./${outputDir}`)
      .replace(new RegExp(`~./${outputDir}/.DS_Store`, 'gi'), '')
      .replace(/\.([a-z0-9]+)\./gi, '*')
      .split('~')
      .sort();

    expect(replacedGeneratedFilesMinsHash).toMatchSnapshot();
  });

  it('should not contain references to discovery attribute parameters', done => {
    const attributes = loadFile('./src/community/attributes/attributes-discovery.adoc');

    const patterns = attributes
      .match(/:.*:/g)
      .map(value => value.replace(/:/g, ''))
      .join('\\|');

    exec(
      `grep -roni "${patterns}" --include=index-brand.html ./${outputDir}`,
      (error, stdout = '') => {
        const output = stdout
          .toString()
          .replace(/\n/g, ' ')
          .split(/\.\//);

        expect(output).toMatchSnapshot('Discovery attributes');
        done();
      }
    );
  });

  it('should not contain references to qpc attribute parameters', done => {
    const attributes = loadFile('./src/community/attributes/attributes-qpc.adoc');

    const patterns = attributes
      .match(/:.*:/g)
      .map(value => value.replace(/:/g, ''))
      .join('\\|');

    exec(`grep -roni "${patterns}" --include=index.html ./${outputDir}`, (error, stdout = '') => {
      const output = stdout
        .toString()
        .replace(/\n/g, ' ')
        .split(/\.\//);

      expect(output).toMatchSnapshot('QPC attributes');
      done();
    });
  });
});
