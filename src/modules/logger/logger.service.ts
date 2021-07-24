export default class Logger {
  info(message: string, data: any) {
    console.info(`INFO::: ${message} \n ${data} \n`);
  }

  log(message: string, data: any) {
    console.log(`LOG::: ${message} \n ${data} \n`);
  }

  error(message: string, data: any) {
    console.error(`ERROR::: ${message} \n ${data} \n`);
  }
}
