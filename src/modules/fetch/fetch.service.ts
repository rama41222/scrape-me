import fetch from 'node-fetch';
import Logger from '../logger/logger.service';
import CONSTANTS from './../../constants';
export class FetchService {
  constructor(private logger: Logger) {}

  /**
   * Fetches a webpage using a get request
   * @param  {string} url
   * @returns Promise
   */
  async fetchPagesFromWeb(url: string): Promise<Buffer> {
    try {
      const response = await fetch(url);
      /** returns a readable buffer */
      return response.buffer();
    } catch (e) {
      this.logger.error(CONSTANTS.ERROR.FETCHING_ERROR, e?.message ?? e);
      return Buffer.from('');
    }
  }
}
