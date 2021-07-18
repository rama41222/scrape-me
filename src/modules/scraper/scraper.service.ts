import path from 'path';
import { URL } from 'url';
import fse from 'fs-extra';
import * as fetch from 'node-fetch';
export class ScraperService {
  /**
   * This function will scrape a web page
   * @param  {string} url : Website url
   * @returns Promise<string>
   */
  async scrape(url: string): Promise<string> {
    return '';
  }

  /**
   * Saves anything to disk
   * @param  {puppeteer.Page} page: takes a file
   * @returns Promise<boolean>
   */
  async writeToDisk(file: string): Promise<boolean> {
    return true;
  }
}
