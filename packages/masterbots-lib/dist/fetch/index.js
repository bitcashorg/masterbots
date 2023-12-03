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

// src/fetch/index.ts
var fetch_exports = {};
__export(fetch_exports, {
  FetchError: () => FetchError,
  fetchJson: () => fetchJson
});
module.exports = __toCommonJS(fetch_exports);

// src/fetch/fetch.lib.ts
async function fetchJson(input, init) {
  const response = await fetch(input, init);
  const data = await response.json();
  if (response.ok)
    return data;
  throw new FetchError({
    message: response.statusText,
    response,
    data
  });
}
var FetchError = class extends Error {
  constructor({
    message,
    response,
    data
  }) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
    this.name = "FetchError";
    this.response = response;
    this.data = data != null ? data : { message };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchError,
  fetchJson
});
