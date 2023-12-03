export const serverEnv = {
  cloudinary: {
    secret: process.env.CLOUDINARY_API_SECRET || ''
  },
  openai: {
    secret: process.env.OPENAI_API_SECRET || ''
  },
  sentry: {
    // ! TBD
    secret: ''
  },
  api: {
    baseUrl: process.env.URL || 'http://localhost:3000'
  },
};
