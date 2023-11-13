declare function fetchJson<JSON = {}>(input: RequestInfo, init?: RequestInit): Promise<JSON>;
declare class FetchError extends Error {
    response: Response;
    data: {
        message: string;
    };
    constructor({ message, response, data, }: {
        message: string;
        response: Response;
        data: {
            message: string;
        };
    });
}

export { FetchError, fetchJson };
