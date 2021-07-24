import { ScraperService } from './modules/scraper/scraper.service';
import { FetchService } from './modules/fetch/fetch.service';
import Logger from './modules/logger/logger.service';
import { CliService } from './modules/cli/cli.service';

export function cli(args: any) {
  const logger = new Logger();
  const cliService = new CliService(logger);
  const cmds = {
    args: args.slice(2),
    location: process.cwd(),
  };
  const commands = cliService.parseArgs(cmds);
  logger.info('commandCollection', commands);

  // const f = new FetchService(logger);
  // const a = new ScraperService(f, logger);
  // const res = await a.scrape({
  //   url: 'https://www.google.com',
  // });
  // console.log('Result:', res);
}
// cli(process.argv);
