import path from 'path';
import { FetchService } from './../fetch/fetch.service';
import cheerio, { Cheerio, Element } from 'cheerio';
import urlParser from 'url';
import fse from 'fs-extra';
import fetch from 'node-fetch';
import {
  getUrl,
  hasExtension,
  parseMetadata,
  writeToDisk,
} from './scraper.utils';
export class ScraperService {
  private seenUrls: any = {};

  constructor(private fetchService: FetchService) {}

  private fetchAnchors(anchors: Cheerio<Element>): string[] {
    return anchors
      .map((i, link) =>
        link.attribs.href ? link.attribs.href : link.attribs['data-href'],
      )
      .get();
  }

  private fetchLinks(links: Cheerio<Element>): string[] {
    return links
      .map((i, link) =>
        link.attribs.href ? link.attribs.href : link.attribs['data-href'],
      )
      .get();
  }

  private fetchImages(images: Cheerio<Element>): string[] {
    return images
      .map((i, img) => {
        return img.attribs.src ? img.attribs.src : img.attribs.srcset;
      })
      .get();
  }

  private saveNumLinksToDisk(
    links: string[],
    host: string,
    protocol: string,
    url: string,
  ) {
    links.forEach(async (link) => {
      await fetch(getUrl(link, host as string, protocol as string))
        .then(async (response) => {
          const filename = path.basename(link);
          if (response?.body) {
            const responseText = await response.buffer();
            let savePath = `downloads/${path.basename(url)}/${path.dirname(
              link,
            )}/${filename}`;
            if (!hasExtension(filename)) {
              savePath = `${savePath.split('?')[0]}.html`;
            }
            fse.outputFileSync(savePath, responseText);
          }
        })
        .catch((e) => e);
    });
  }

  private saveImagesToDisk(
    images: string[],
    host: string,
    protocol: string,
    url: string,
  ) {
    images.forEach(async (link) => {
      await fetch(getUrl(link, host as string, protocol as string))
        .then(async (response) => {
          const filename = path.basename(link);
          if (response?.body) {
            const data = await response.buffer();
            if (!link.startsWith('data')) {
              fse.outputFileSync(
                `downloads/${path.basename(url)}/${path.dirname(
                  link,
                )}/${filename}`,
                data,
              );
            }
          }
        })
        .catch((e) => e);
    });
  }

  /**
   * Cheerio
   * This function will scrape a web page
   * @param  {string} url : Website url
   * @returns Promise<string>
   */
  public async scrape({ url }: { url: string }): Promise<boolean> {
    // Scrape time
    const scrapeStart: string = new Date().toUTCString();

    // If already crawled, return null stirng;
    if (this.seenUrls[url]) return false;

    // Fetch Page Buffer
    const pageBuffer = await this.fetchService.fetchPagesFromWeb(url);

    // Mark the url
    this.seenUrls[url] = true;

    // Extract the host and protocol from url
    const { host, protocol } = urlParser.parse(url);

    // Use Cheerio to parse the page bugger
    const $ = cheerio.load(pageBuffer);

    // Get the index location
    const indexLocation = `downloads/${path.basename(url)}`;

    // Save the index page
    writeToDisk(pageBuffer, `${indexLocation}/index.html`);

    // Fetch all anchors
    const anchors = this.fetchAnchors($('a'));

    // Fetch all Link tags
    const links = this.fetchLinks($('link'));

    // Fetch all images
    const images = this.fetchImages($('img'));

    // Create the metada files for crawling
    parseMetadata({
      links: links.length,
      anchors: anchors.length,
      images: images.length,
      last_fetch: scrapeStart,
      site: path.basename(url),
    });

    // Save links to disk
    this.saveNumLinksToDisk(links, host as string, protocol as string, url);

    // Save anchors to disk
    this.saveNumLinksToDisk(anchors, host as string, protocol as string, url);

    // Save Images to disk
    this.saveImagesToDisk(images, host as string, protocol as string, url);

    return true;
  }
}
