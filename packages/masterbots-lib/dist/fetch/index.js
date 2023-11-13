var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/fetch/index.ts
__export(exports, {
  FetchError: () => FetchError,
  fetchJson: () => fetchJson
});

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
