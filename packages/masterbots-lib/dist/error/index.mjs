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
export {
  getErrorMessage,
  isErrorWithMessage,
  toErrorWithMessage
};
