import { ScraperService } from './modules/scraper/scraper.service';
import { FetchService } from './modules/fetch/fetch.service';
import Logger from './modules/logger/logger.service';
import { CliService } from './modules/cli/cli.service';
import { TaskService } from './modules/task/task.service';

export function cli(args: any) {
  const logger = new Logger();
  const fetchService = new FetchService(logger);
  const cliService = new CliService(logger);
  const scraperService = new ScraperService(fetchService, logger);
  const taskService = new TaskService(logger, scraperService);
  const cmds = {
    args: args.slice(2),
    location: process.cwd(),
  };
  const commands = cliService.parseArgs(cmds);
  taskService.process(commands);
}
// cli(process.argv);
