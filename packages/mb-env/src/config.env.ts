
// ? General configuration for the apps
export const appConfig = {
  devMode: process.env.NEXT_PUBLIC_DEV_MODE === 'true',
  enableAuth: {
    google: process.env.NEXT_PUBLIC_GOOGLE_AUTH === 'true',
  },
  cloudinary: {
    url: `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PERESET || ''
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
}
