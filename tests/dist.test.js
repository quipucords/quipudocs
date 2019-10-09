const { execSync } = require('child_process');
const Quipudocs = require('../dist');

describe('Distribution', () => {
  const outputDistDir = 'dist';
  const outputDocsDir = 'docs';

  it('should have specific defined properties for JS consumption', () => {
    expect(Object.keys(Quipudocs)).toMatchSnapshot('exported output');
  });

  it('should match a specific dist file output', () => {
    const output = execSync(`find ./${outputDistDir} -type f -print0 | xargs -0`);

    const replacedGeneratedFilesMinsHash = output
      .toString()
      .replace(/\s+|\n+|\r+/g, '')
      .replace(new RegExp(`./${outputDistDir}`, 'gi'), `~./${outputDistDir}`)
      .replace(new RegExp(`~./${outputDistDir}/.DS_Store`, 'gi'), '')
      .replace(/\.([a-z0-9]+)\./gi, '*')
      .split('~')
      .sort();

    expect(replacedGeneratedFilesMinsHash).toMatchSnapshot();
  });

  it('should match a specific docs file output', () => {
    const output = execSync(`find ./${outputDocsDir} -type f -print0 | xargs -0`);

    const replacedGeneratedFilesMinsHash = output
      .toString()
      .replace(/\s+|\n+|\r+/g, '')
      .replace(new RegExp(`./${outputDocsDir}`, 'gi'), `~./${outputDocsDir}`)
      .replace(new RegExp(`~./${outputDocsDir}/.DS_Store`, 'gi'), '')
      .replace(/\.([a-z0-9]+)\./gi, '*')
      .split('~')
      .sort();

    expect(replacedGeneratedFilesMinsHash).toMatchSnapshot();
  });
});
