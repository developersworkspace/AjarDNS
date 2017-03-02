// Imports
import * as winston from 'winston';


var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug' }),
      new (winston.transports.File)({
        filename: 'ajar_server.log',
        level: 'debug'
      })
    ]
  });

// Exports
export { logger };