import { createLogger, transports, format } from 'winston';
const { colorize, combine, timestamp } = format;

const myConsoleFormat = format.printf(info => {
  return `\nlabel: ${info.label}\n ${info.timestamp} \n ${
    info.level
  }:\n${JSON.stringify(info.message, null, 1)}\n`;
});

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), myConsoleFormat),
  transports: [new transports.Console()]
});

export { logger };

logger.log({
  level: 'info',
  label: 'initialization',
  message: 'Logger initialization'
});
