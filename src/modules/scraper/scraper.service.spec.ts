import { FetchService } from '../fetch/fetch.service';
import Logger from '../logger/logger.service';
import { ScraperService } from './scraper.service';

describe('Scraper Service', () => {
  let scraperService: ScraperService;
  let url: string;
  beforeEach(() => {
    scraperService = new ScraperService(
      new FetchService(new Logger()),
      new Logger(),
    );
    url = 'https://crawler-test.com/';
  });

  it('Scraper to be defined', () => {
    expect(scraperService).toBeDefined();
  });

  it('Scraper should have a scrape method', () => {
    expect(scraperService.scrape).toBeDefined();
  });

  it('Scraper should have a saveNumLinksToDisk method', () => {
    expect(scraperService.saveNumLinksToDisk).toBeDefined();
  });

  it('Scraper should have a saveNumLinksToDisk method', () => {
    expect(scraperService.saveNumLinksToDisk).toBeDefined();
  });

  it('Scraper should have a saveImagesToDisk method', () => {
    expect(scraperService.saveNumLinksToDisk).toBeDefined();
  });
});
