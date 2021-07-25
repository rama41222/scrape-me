import fse from 'fs-extra';
import { MetaDataInput, MetaData } from './scraper.types';

/**
 * Checks if the url has an extension
 * @param link  url
 * @returns boolean
 */
export function hasExtension(link: string): boolean {
  /** split by dot */
  const linkExt = link.split('.');

  /** Remove url params */
  const linkWithoutParams = linkExt[linkExt.length - 1].split('?')[0];

  /** Check if it has a valid file name */
  if (!linkWithoutParams.match(/\W/)) {
    return true;
  }
  return false;
}

/**
 * Processes URLS and generate the missing paths if necessary
 * @param  {string} link
 * @param  {string} host
 * @param  {string} protocol
 * @returns string
 */
export function getUrl(link: string, host: string, protocol: string): string {
  if (link.includes('http')) {
    return link;
  } else if (link.startsWith('/')) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
}

/**
 * Saves anything to disk
 * @param  {puppeteer.Page} page: takes a file
 * @returns Promise<boolean>
 */
export async function writeToDisk(
  file: Buffer,
  location: string,
  options = {},
): Promise<boolean> {
  fse.outputFileSync(location, file, options);
  return true;
}

/**
 * Generates a metadata file
 * @param  {} {links
 * @param  {} anchors
 * @param  {} images
 * @param  {} last_fetch
 * @param  {} site
 * @param  {MetaDataInput} }
 * @returns MetaData
 */
export function parseMetadata({
  links,
  anchors,
  images,
  last_fetch,
  site,
}: MetaDataInput): MetaData {
  /** Metada object */
  const metaData = {
    num_links: links + anchors,
    last_fetch,
    site,
    images,
  };
  // Write metadata to disk
  writeToDisk(
    Buffer.from(JSON.stringify(metaData) + '\n'),
    `downloads/${site}/.metadata`,
    { flag: 'a' },
  );

  return metaData;
}
