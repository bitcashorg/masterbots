/** @type {import('next').NextConfig} */

const path = require('node:path')

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/dicebear', // Adjust the source path based on your API route
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml'
          }
        ]
      }
    ]
  },
  experimental: {
    ...(process.env.NODE_ENV === 'development'
      ? { outputFileTracingRoot: path.join(__dirname, '../../') }
      : null)
  }
}
