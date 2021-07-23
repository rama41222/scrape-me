import fetch from 'node-fetch';

export class FetchService {
  async fetchPagesFromWeb(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);
      return response.buffer();
    } catch (e) {
      return Buffer.from('');
    }
  }
}
