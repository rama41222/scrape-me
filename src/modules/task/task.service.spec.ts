import { FetchService } from '../fetch/fetch.service';
import Logger from '../logger/logger.service';
import { ScraperService } from '../scraper/scraper.service';
import { TaskService } from './task.service';

describe('Task Service', () => {
  let fetchService: FetchService;
  let scraperService: ScraperService;
  let taskService: TaskService;
  let loggerService: Logger;
  let url: string;
  beforeEach(() => {
    loggerService = new Logger();
    fetchService = new FetchService(loggerService);
    scraperService = new ScraperService(fetchService, loggerService);
    taskService = new TaskService(loggerService, scraperService);
    url = 'https://crawler-test.com/';
  });

  it('Task to be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('Task should have a crawl method', () => {
    expect(taskService.crawl).toBeDefined();
  });

  it('Task should have a fetchMetaData method', () => {
    expect(taskService.fetchMetaData).toBeDefined();
  });

  it('Task should have a printHelp method', () => {
    expect(taskService.printHelp).toBeDefined();
  });

  it('Task should have a printHelp should return string', () => {
    console.log = jest.fn();
    console.log(taskService.printHelp);
    expect(console.log).toHaveBeenCalledWith(taskService.printHelp);
  });

  it('Task should have a process method', () => {
    expect(taskService.process).toBeDefined();
  });
});
