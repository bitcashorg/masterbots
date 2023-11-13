var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/logger/index.ts
__export(exports, {
  logger: () => logger
});

// src/logger/logger.lib.ts
var debug = true;
var logger = {
  log: (message, ...optionalParams) => debug && console.log(message, ...optionalParams),
  info: (message, ...optionalParams) => debug && console.info(message, ...optionalParams),
  error: (message, ...optionalParams) => debug && console.log(message, ...optionalParams)
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  logger
});
