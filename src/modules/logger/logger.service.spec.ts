import Logger from './logger.service';

describe('Logger Service', () => {
  let loggerService: Logger;
  beforeEach(() => {
    loggerService = new Logger();
  });

  it('Logger to be defined', () => {
    expect(loggerService).toBeDefined();
  });
});
