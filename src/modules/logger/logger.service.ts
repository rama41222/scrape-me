import chalk from 'chalk';
export default class Logger {
  /** Color params init */
  private err = chalk.bold.red;
  private warn = chalk.keyword('orange');
  private green = chalk.bold.green;
  private blue = chalk.bold.blueBright;
  private red = chalk.bold.redBright;
  private gray = chalk.bold.gray;
  private white = chalk.bold.white;

  /**
   * Info logger
   * @param  {string} message
   * @param  {any={}} data
   */
  info(message: string, data: any = {}) {
    console.info(
      `\n${this.green('INFO:::')} ${this.blue(message)} \n ${this.warn(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }

  /**
   * General logs
   * @param  {string} message
   * @param  {any={}} data
   */
  log(message: string, data: any = {}) {
    console.log(
      `\n${this.gray('LOG::: ')} ${this.white(message)} \n ${this.white(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }

  /**
   * Error logs
   * @param  {string} message
   * @param  {any={}} data
   */
  error(message: string, data: any = {}) {
    console.error(
      `\n${this.err('ERROR::: ')} ${this.red(message)} \n ${this.warn(
        JSON.stringify(data, null, 2),
      )} \n`,
    );
  }
}
