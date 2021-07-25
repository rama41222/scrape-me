import Logger from '../logger/logger.service';
import { FetchService } from './fetch.service';

describe('Fetch Service', () => {
  let fetchService: FetchService;
  let url: string;
  beforeEach(() => {
    fetchService = new FetchService(new Logger());
    url = 'https://crawler-test.com/';
  });

  it('Fetch to be defined', () => {
    expect(fetchService).toBeDefined();
  });

  it('Fetch should have a fetchPagesFromWeb method', () => {
    expect(fetchService.fetchPagesFromWeb).toBeDefined();
  });

  it('Fetch should return a buffer object', async () => {
    const response = await fetchService.fetchPagesFromWeb(url);
    expect(response).toBeDefined();
    expect(typeof response).toBe('object');
  });
});
