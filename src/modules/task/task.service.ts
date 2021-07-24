import CONSTANTS from '../../constants/index';
import { CommandCollection } from '../cli/cli.types';
import Logger from '../logger/logger.service';
import path from 'path';
import fs from 'fs';
import { once } from 'events';
import readline from 'readline';

export class TaskService {
  constructor(private logger: Logger) {}

  public async process(commands: CommandCollection) {
    /** Process Metadata */
    const metaData = commands['--metadata'];
    await this.fetchMetaData(metaData);

    /** Process Help */
    const helpNeeded = commands['--help'];
    /** Process Crawling */
    const crawlJobs = commands['--crawl'];
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
}
