import chalk from 'chalk';
export default class Logger {
  private err = chalk.bold.red;
  private warn = chalk.keyword('orange');
  private green = chalk.bold.green;
  private blue = chalk.bold.blueBright;
  private red = chalk.bold.redBright;
  private gray = chalk.bold.gray;
  private white = chalk.bold.white;

  info(message: string, data: any = {}) {
    console.info(
      `${this.green('INFO:::')} ${this.blue(message)} \n ${this.warn(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }

  log(message: string, data: any = {}) {
    console.log(
      `${this.gray('LOG::: ')} ${this.white(message)} \n ${this.white(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }

  error(message: string, data: any = {}) {
    console.error(
      `${this.err('ERROR::: ')} ${this.red(message)} \n ${this.warn(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }
}
