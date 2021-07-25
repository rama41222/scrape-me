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
import Logger from '../logger/logger.service';
import CONSTANTS from '../../constants';

export class ScraperService {
  private seenUrls: any = {};

  constructor(private fetchService: FetchService, private logger: Logger) {}

  /**
   * Fetches all the anchor tag urls
   * @param  {Cheerio<Element>} anchors
   * @returns string
   */
  private fetchAnchors(anchors: Cheerio<Element>): string[] {
    return anchors
      .map((i, link) =>
        link.attribs.href ? link.attribs.href : link.attribs['data-href'],
      )
      .get();
  }

  /**
   * Fetches all link tag urls
   * @param  {Cheerio<Element>} links
   * @returns string
   */
  private fetchLinks(links: Cheerio<Element>): string[] {
    return links
      .map((i, link) =>
        link.attribs.href ? link.attribs.href : link.attribs['data-href'],
      )
      .get();
  }

  /**
   * Fetches all image urls
   * @param  {Cheerio<Element>} images
   * @returns string
   */
  private fetchImages(images: Cheerio<Element>): string[] {
    return images
      .map((i, img) => {
        return img.attribs.src ? img.attribs.src : img.attribs.srcset;
      })
      .get();
  }

  /**
   * Saves links and anchors to disk
   * @param  {string[]} links
   * @param  {string} host
   * @param  {string} protocol
   * @param  {string} url
   * @returns Promise<boolean>
   */
  async saveNumLinksToDisk(
    links: string[],
    host: string,
    protocol: string,
    url: string,
  ): Promise<boolean> {
    for (const link of links) {
      /** Get the base url */
      const filename = path.basename(link);
      try {
        /** Get web response */
        const response = await fetch(
          getUrl(link, host as string, protocol as string),
        );

        /** Check if body is present */
        if (response?.body) {
          /** Get the buffer */
          const responseText = await response.buffer();
          /**
           * Generate the save path
           * Remove unwanted protocol params
           *
           */
          let savePath = `downloads/${path.basename(url)}/${path.dirname(
            link,
          )}/${filename}`
            .replaceAll(/https:\/\/+/gi, '/')
            .replaceAll(/http:\/\/+/gi, '/');

          /** Check if the file as an extension */
          if (!hasExtension(savePath)) {
            /** No extension, just add .html */
            savePath = `${savePath.split('?')[0]}.html`;
          }

          /** Logs into console about files */
          //this.logger.info(CONSTANTS.MESSAGE.SUCCESS, filename);

          /** Write to disk */
          fse.outputFileSync(savePath, responseText);
        }
      } catch (e) {
        this.logger.error(CONSTANTS.ERROR.PARSING_ERROR, e?.message ?? e);
      }
    }
    return true;
  }

  /**
   * Saves images in the website to the disk
   * @param  {string[]} images
   * @param  {string} host
   * @param  {string} protocol
   * @param  {string} url
   * @returns Promise
   */
  async saveImagesToDisk(
    images: string[],
    host: string,
    protocol: string,
    url: string,
  ): Promise<boolean> {
    for (const image of images) {
      /** Get the base url */
      const filename = path.basename(image);
      try {
        /** Get image response via a get request */
        const response = await fetch(
          getUrl(image, host as string, protocol as string),
        );

        /** Check if body is present */
        if (response?.body) {
          /** Get image as a buffer */
          const data = await response.buffer();
          /**
           * Skip all base64 encoded images
           * Todo: Implement a method to save all base64 encoded images
           * */
          if (!image.startsWith('data')) {
            /** Save path generation */
            const savePath = `downloads/${path.basename(url)}/${path.dirname(
              image,
            )}/${filename}`
              .replaceAll(/https:\/\/+/gi, '/')
              .replaceAll(/http:\/\/+/gi, '/');
            /** Write to disk */
            fse.outputFileSync(savePath, data);
          }
        }
      } catch (e) {
        this.logger.error(CONSTANTS.ERROR.IMAGE_PARSING_ERROR, e?.message ?? e);
      }
    }
    return true;
  }

  /**
   * Cheerio
   * This function will scrape a web page
   * @param  {string} url : Website url
   * @returns Promise<string>
   */
  public async scrape({ url }: { url: string }): Promise<boolean> {
    /** Scrape time */
    const scrapeStart: string = new Date().toUTCString();

    /** If already crawled, return null stirng; */
    if (this.seenUrls[url]) return false;

    /** Fetch Page Buffer */
    const pageBuffer = await this.fetchService.fetchPagesFromWeb(url);

    /** Mark the url */
    this.seenUrls[url] = true;

    /** Extract the host and protocol from url */
    const { host, protocol } = urlParser.parse(url);

    /** Use Cheerio to parse the page bugger */
    const $ = cheerio.load(pageBuffer);

    /** Get the index location */
    const indexLocation = `downloads/${path.basename(url)}`;

    /** Save the index page */
    writeToDisk(pageBuffer, `${indexLocation}/index.html`);

    /** Fetch all anchors */
    const anchors = this.fetchAnchors($('a'));

    /** Fetch all Link tags */
    const links = this.fetchLinks($('link'));

    /** Fetch all images */
    const images = this.fetchImages($('img'));

    /** Create the metada files for crawling */
    parseMetadata({
      links: links.length,
      anchors: anchors.length,
      images: images.length,
      last_fetch: scrapeStart,
      site: path.basename(url),
    });

    /** Save links to disk */
    await this.saveNumLinksToDisk(
      links,
      host as string,
      protocol as string,
      url,
    );

    /** Save anchors to disk */
    await this.saveNumLinksToDisk(
      anchors,
      host as string,
      protocol as string,
      url,
    );

    /** Save Images to disk */
    await this.saveImagesToDisk(
      images,
      host as string,
      protocol as string,
      url,
    );

    return true;
  }
}
