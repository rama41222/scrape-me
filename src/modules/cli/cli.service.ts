import CONSTANTS from './../../constants/index';
import Logger from '../logger/logger.service';
import { URL } from 'url';
import { Args, CommandCollection, ParseArgs } from './cli.types';
export class CliService {
  /** Valid cli args */
  private validArgs = ['--metadata', '--help', '--crawl'];

  /** User commands collector */
  private commandCollection: CommandCollection = {
    '--metadata': [],
    '--help': false,
    '--crawl': [],
  };

  constructor(private logger: Logger) {}

  /**
   * This function parses all arguments
   * @param  {Partial<ParseArgs>} {args=[]}
   * @returns CommandCollection
   */
  parseArgs({ args = [] }: Partial<ParseArgs>): CommandCollection {
    /** Check if it's under metadata flag */
    let isMetadata = false;

    /** Iterate via all flags */
    for (const arg of args) {
      /** Check if there are invalid arguments */
      if (arg?.startsWith('--') && !this.validArgs.includes(arg)) {
        this.logger.error(CONSTANTS.ERROR.INVALID_ARGUMENT, arg);
        return this.commandCollection;
      }

      /**
       * This switch will push different commands into the commandCollection
       */
      switch (arg) {
        case Args.METADATA:
          isMetadata = true;
          break;
        case Args.HELP:
          isMetadata = false;
          this.commandCollection[Args.HELP] = true;
          break;
        default:
          /** Metadata requests */
          if (
            !arg?.startsWith('--') &&
            isMetadata &&
            this.checkIfValidURL(arg)
          ) {
            this.commandCollection[Args.METADATA].push(arg as never);
          }

          /** Crawl requests */
          if (
            !arg?.startsWith('--') &&
            !isMetadata &&
            this.checkIfValidURL(arg)
          ) {
            this.commandCollection[Args.CRAWL].push(arg as never);
          }
      }
    }
    return this.commandCollection;
  }
  /**
   * This function checks the validity of a url and the protocol
   * @param  {string} link
   * @param  {Array<string>=['https'} protocols
   * @param  {} 'http']
   * @returns boolean
   */
  checkIfValidURL(
    link: string,
    protocols: Array<string> = ['https', 'http'],
  ): boolean {
    try {
      /** Url Validity */
      const url = new URL(link);

      /** URL has to contain the protocol for fetching */
      const hasProtocol = protocols.find(
        (p) => `${p.toLowerCase()}:` == url.protocol,
      );
      if (url && hasProtocol) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
