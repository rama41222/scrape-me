import CONSTANTS from '../../constants/index';
import { CommandCollection } from '../cli/cli.types';
import Logger from '../logger/logger.service';
import path from 'path';
import fs from 'fs';
import { once } from 'events';
import readline from 'readline';
import { ScraperService } from '../scraper/scraper.service';
import cliProgress from 'cli-progress';
export class TaskService {
  private loaderCrawl = new cliProgress.SingleBar({}, cliProgress.Presets.rect);

  constructor(private logger: Logger, private scraperService: ScraperService) {}

  public async process(commands: CommandCollection) {
    /** Process Metadata */
    const metaData = commands['--metadata'];
    await this.fetchMetaData(metaData);
    /** Process Help */
    const helpNeeded = commands['--help'];
    if (helpNeeded) {
      this.printHelp();
    }
    /** Process Crawling */
    const crawlJobs = commands['--crawl'];
    await this.crawl(crawlJobs);
  }

  /**
   * Prints the metadata to the console
   * @param  {string[]} metadata
   * @returns Promise
   */
  async fetchMetaData(metadata: string[]): Promise<void> {
    /** Iterate through metadata */
    for (const request of metadata) {
      try {
        /** Initialize last record */
        let lastRecord = '';
        /** Initialize the destination location */
        const destination = `downloads/${path.basename(request)}/.metadata`;

        /** Create a file stream */
        const fileStream = fs.createReadStream(destination);

        /** Read the file lineby line */
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });

        /** Assign the current line to last line */
        rl.on('line', (line) => {
          lastRecord = line;
        });

        /** Await till the stream closes */
        await once(rl, 'close');

        /** Print the record to console */
        if (lastRecord) {
          this.logger.info(
            `${CONSTANTS.LOG.METADATA} for ${request}`,
            JSON.parse(lastRecord),
          );
        } else {
          this.logger.error(
            `${CONSTANTS.LOG.METADATA_NOTFOUND} for ${request}`,
            JSON.parse(lastRecord),
          );
        }
      } catch (e) {
        /** Incase if metadata doesn't exist */
        this.logger.error(`${CONSTANTS.LOG.METADATA_NOTFOUND} for ${request}`);
      }
    }
  }

  printHelp(): void {
    this.logger.info(`
    AVAILABLE COMMANDS
    ------------------

    '--metadata': Array<string>;
    '--help': boolean;
    '--crawl': Array<string>;

    EXAMPLES
    --------

    # To crawl a web
      fetch https://www.google.com https://www.autify.com
    
    # To print metadata
      fetch --metadata https://www.google.com https://www.autify.com https://www.yahoo.com
    
    # To print help
      fetch --help
    
    # To to all at once
      fetch https://www.google.com https://www.autify.com --metadata https://www.google.com https://www.autify.com https://www.yahoo.com --help
    `);
  }

  async crawl(websites: string[]): Promise<boolean> {
    this.loaderCrawl.start(websites.length * 100, 0);
    for await (const website of websites) {
      this.logger.info(CONSTANTS.MESSAGE.START, website);
      const res = await this.scraperService.scrape({
        url: website,
      });
      this.logger.info(CONSTANTS.MESSAGE.STATUS, res);
      this.loaderCrawl.increment(100);
      this.loaderCrawl.updateETA();
    }

    this.loaderCrawl.increment(100);
    this.loaderCrawl.stop();
    return true;
  }
}
