import CONSTANTS from './../../constants/index';
import Logger from '../logger/logger.service';
import { URL } from 'url';
import { Args, CommandCollection, ParseArgs } from './cli.types';
export class CliService {
  private validArgs = ['--metadata', '--help', '--crawl'];
  private commandCollection: CommandCollection = {
    '--metadata': [],
    '--help': false,
    '--crawl': [],
  };
  constructor(private logger: Logger) {}

  parseArgs({ args = [] }: Partial<ParseArgs>): CommandCollection {
    let isMetadata = false;
    for (const arg of args) {
      if (arg?.startsWith('--') && !this.validArgs.includes(arg)) {
        this.logger.error(CONSTANTS.ERROR.INVALID_ARGUMENT, arg);
        return this.commandCollection;
      }
      switch (arg) {
        case Args.METADATA:
          isMetadata = true;
          break;
        case Args.HELP:
          isMetadata = false;
          this.commandCollection[Args.HELP] = true;
          break;
        default:
          if (
            !arg?.startsWith('--') &&
            isMetadata &&
            this.checkIfValidURL(arg)
          ) {
            this.commandCollection[Args.METADATA].push(arg as never);
          }

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

  checkIfValidURL(
    link: string,
    protocols: Array<string> = ['https', 'http'],
  ): boolean {
    try {
      const url = new URL(link);
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
