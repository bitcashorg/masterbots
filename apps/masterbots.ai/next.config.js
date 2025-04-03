/** @type {import('next').NextConfig} */

const path = require('node:path')

module.exports = {
	images: {
		// ? Allowing SVGs to be used as images from trusted sources
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'robohash.org',
				port: '',
				pathname: '**',
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
			},
		],
	},
	async headers() {
		return [
			{
				source: '/api/dicebear', // Adjust the source path based on your API route
				headers: [
					{
						key: 'Content-Type',
						value: 'image/svg+xml',
					},
				],
			},
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
			{
				source: '/sw.js',
				headers: [
					{
						key: 'Content-Type',
						value: 'application/javascript; charset=utf-8',
					},
					{
						key: 'Cache-Control',
						value: 'no-cache, no-store, must-revalidate',
					},
					{
						key: 'Content-Security-Policy',
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		]
	},
	// ...(process.env.NODE_ENV === 'development'
	//   ? { outputFileTracingRoot: path.join(__dirname, '../../') }
	//   : null),
}
