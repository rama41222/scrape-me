import { ScraperService } from './modules/scraper/scraper.service';
import { FetchService } from './modules/fetch/fetch.service';

async function test() {
  const a = new ScraperService(new FetchService());
  const res = await a.scrape({
    url: 'https://www.autify.com',
  });
  console.log('Result:', res);
}

(async () => await test())();
