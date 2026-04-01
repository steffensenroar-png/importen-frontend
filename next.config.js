/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.blocket.se' },
      { protocol: 'https', hostname: 'images.finncdn.no' },
      { protocol: 'https', hostname: '**.finn.no' },
      { protocol: 'https', hostname: '**.mobile.de' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
    ],
  },
}

module.exports = nextConfig
