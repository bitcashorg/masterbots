"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
  openAiConfig: () => openAiConfig,
  serverEnv: () => serverEnv
});
module.exports = __toCommonJS(constants_exports);

// src/constants/openai.constants.ts
var openAiConfig = {};

// src/constants/server.constants.ts
var serverEnv = {
  cloudinary: {
    secret: process.env.CLOUDINARY_API_SECRET || ""
  },
  openai: {
    secret: process.env.OPENAI_API_SECRET || ""
  },
  sentry: {
    secret: ""
  },
  api: {
    baseUrl: process.env.URL || "http://localhost:3000"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  openAiConfig,
  serverEnv
});
