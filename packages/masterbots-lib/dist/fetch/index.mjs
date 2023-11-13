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
export {
  FetchError,
  fetchJson
};
