var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/error/index.ts
__export(exports, {
  getErrorMessage: () => getErrorMessage,
  isErrorWithMessage: () => isErrorWithMessage,
  toErrorWithMessage: () => toErrorWithMessage
});

// src/error/error.lib.ts
function isErrorWithMessage(error) {
  return typeof error === "object" && error !== null && "message" in error && typeof error.message === "string";
}
function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError))
    return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}
function getErrorMessage(error) {
  return toErrorWithMessage(error).message;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getErrorMessage,
  isErrorWithMessage,
  toErrorWithMessage
});
