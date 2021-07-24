import { ScraperService } from './modules/scraper/scraper.service';
import { FetchService } from './modules/fetch/fetch.service';
import Logger from './modules/logger/logger.service';

async function test() {
  const logger = new Logger();
  const f = new FetchService(logger);
  const a = new ScraperService(f, logger);
  const res = await a.scrape({
    url: 'https://www.google.com',
  });
  console.log('Result:', res);
}

(async () => await test())();
