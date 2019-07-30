const { execSync } = require('child_process');
const Quipudocs = require('../dist');

describe('Distribution', () => {
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
});
