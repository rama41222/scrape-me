import { FetchService } from './fetch.service';

describe('Fetch Service', () => {
  let fetchService: FetchService;
  let url: string;
  beforeEach(() => {
    fetchService = new FetchService();
    url = 'https://crawler-test.com/';
  });

  it('Fetch to be defined', () => {
    expect(fetchService).toBeDefined();
  });

  it('Fetch should have a fetchPagesFromWeb method', () => {
    expect(fetchService.fetchPagesFromWeb).toBeDefined();
  });

  it('Fetch should return text', async () => {
    const response = await fetchService.fetchPagesFromWeb(url);
    expect(response).toBeDefined();
    expect(typeof response).toBe('buffer');
  });
});
