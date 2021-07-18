import fetch from 'node-fetch';

export class FetchService {
  async fetchPagesFromWeb(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
  }
}
