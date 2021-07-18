import { ScraperService } from './scraper.service';

describe('Scraper Service', () => {
  let scraperService: ScraperService;
  let url: string;
  beforeEach(() => {
    scraperService = new ScraperService();
    url = 'https://crawler-test.com/';
  });

  it('Scraper to be defined', () => {
    expect(scraperService).toBeDefined();
  });

  it('Scraper should have a scrape method', () => {
    expect(scraperService.scrape).toBeDefined();
  });
});
