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
export {
  openAiConfig,
  serverEnv
};
