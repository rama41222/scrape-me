import fse from 'fs-extra';
import { MetaDataInput, MetaData } from './scraper.types';

export function hasExtension(link: string): boolean {
  const linkExt = link.split('.');
  const linkWithoutParams = linkExt[linkExt.length - 1].split('?')[0];
  if (!linkWithoutParams.match(/\W/)) {
    return true;
  }
  return false;
}

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
): Promise<boolean> {
  fse.outputFileSync(location, file);
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
  const metaData = {
    num_links: links + anchors,
    last_fetch,
    site,
    images,
  };
  // Write metadata to disk
  writeToDisk(
    Buffer.from(JSON.stringify(metaData)),
    `downloads/${site}/.metadata`,
  );

  return metaData;
}
