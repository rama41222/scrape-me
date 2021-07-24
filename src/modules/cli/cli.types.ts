export enum Args {
  METADATA = '--metadata',
  HELP = '--help',
  CRAWL = '--crawl',
}

export interface CommandCollection {
  '--metadata': Array<string>;
  '--help': boolean;
  '--crawl': Array<string>;
}

export interface ParseArgs {
  args: Array<string>;
  location: string;
}
