import { ScraperService } from './modules/scraper/scraper.service';
import { FetchService } from './modules/fetch/fetch.service';
import Logger from './modules/logger/logger.service';
import { CliService } from './modules/cli/cli.service';
import { TaskService } from './modules/task/task.service';

/**
 * Takes in the user args and process them
 * @param  {any} args User provicded arguments
 */
export function cli(args: any) {
  /** Logger instance */
  const logger = new Logger();

  /** Fetch Service and injects a  loggger instance */
  const fetchService = new FetchService(logger);

  /** Cli Service and injects a  loggger instance */
  const cliService = new CliService(logger);

  /** Scraper Service and injects a  loggger and fetchService instances */
  const scraperService = new ScraperService(fetchService, logger);

  /** Task Service and injects a  scraper and a logger instance */
  const taskService = new TaskService(logger, scraperService);

  /**  User args */
  const userArgs = {
    args: args.slice(2),
    location: process.cwd(),
  };

  /** Pasrse all user args */
  const commands = cliService.parseArgs(userArgs);

  /** Send parsed args for processing */
  taskService.process(commands);
}

/** Uncomment below line for dev */
// cli(process.argv);
