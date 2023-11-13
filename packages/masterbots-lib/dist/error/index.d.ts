type ErrorWithMessage = {
    message: string;
};
declare function isErrorWithMessage(error: unknown): error is ErrorWithMessage;
declare function toErrorWithMessage(maybeError: unknown): ErrorWithMessage;
declare function getErrorMessage(error: unknown): string;

export { ErrorWithMessage, getErrorMessage, isErrorWithMessage, toErrorWithMessage };
