/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  images: {
    // ? Allowing SVGs to be used as images from trusted sources
    dangerouslyAllowSVG: true,
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
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/api/dicebear", // Adjust the source path based on your API route
        headers: [
          {
            key: "Content-Type",
            value: "image/svg+xml",
          },
        ],
      },
    ];
  },
  experimental: {
    ...(process.env.NODE_ENV === 'development'
      ? { outputFileTracingRoot: path.join(__dirname, '../../') }
      : null)
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // config.resolve.fallback.fs = false
      /**
       * ? This is to prevent the error that occurs when using the child process module in the client side
       * ? This is a patch of the error happening at the ai module. This "ai" module is doing server calls in the client side which might lead into issues.
       * ? This is a temporary fix until the module is fixed, since this pop up after cleaning up the bun.lockb file while updating the dependencies to the latest stable version.
       * ! We might remove this once we upgrade to Nextjs 15 and React 19
       */
      config.externals.push({
        'child_process': 'child_process',
      })
    }
    return config
  }
}
