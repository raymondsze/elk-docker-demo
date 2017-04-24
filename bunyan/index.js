const express = require('express');
const loggerMiddleware = require('express-bunyan-logger');
const bunyan = require('bunyan');
// const bunyan = require('bunyan');
const info = require('./package.json');

// create the bunyan logger which log message as json format
const logger = bunyan.createLogger({
  name: `${info.name}@${info.version}`,
  serializers: bunyan.stdSerializers,
});

// setup the bunyan level
logger.level(process.env.LOG_LEVEL || bunyan.INFO);

const server = express();
server.use(loggerMiddleware({
  name: `${info.name}@${info.version}`,
  serializers: bunyan.stdSerializers,
}));
server.use(loggerMiddleware.errorLogger());

server.get('/', (req, res) => {
  res.status(200).send('OK');
});

server.listen(3000, (error) => {
  // do not use console.log or console.error, but use the bunyan logger
  if (error) logger.error(`Web Server is failed to start at http://localhost:3000.`, error);
  else logger.info(`Web Server is started at http://localhost:3000.`);
});