declare const openAiConfig: {};

declare const serverEnv: {
    cloudinary: {
        secret: string;
    };
    openai: {
        secret: string;
    };
    sentry: {
        secret: string;
    };
    api: {
        baseUrl: string;
    };
};

export { openAiConfig, serverEnv };
