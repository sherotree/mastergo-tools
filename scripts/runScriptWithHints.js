import chalk from 'chalk';

function runScriptWithHints(fn, startHint) {
  console.log(chalk.yellow(`🏃 START: ${startHint}`));
  const start = new Date().getTime();
  fn();

  const end = new Date().getTime();
  const diff = end - start;
  console.log(chalk.green(`🎯 已完成, 耗时:${diff}ms`));
}

module.exports = runScriptWithHints;
