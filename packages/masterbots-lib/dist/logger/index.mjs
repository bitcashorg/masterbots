// src/logger/logger.lib.ts
var debug = true;
var logger = {
  log: (message, ...optionalParams) => debug && console.log(message, ...optionalParams),
  info: (message, ...optionalParams) => debug && console.info(message, ...optionalParams),
  error: (message, ...optionalParams) => debug && console.log(message, ...optionalParams)
};
export {
  logger
};
