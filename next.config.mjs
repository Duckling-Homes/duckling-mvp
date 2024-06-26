/** @type {import('next').NextConfig} */

import million from 'million/compiler'

// NOTE: We are using a fork of next-pwa because it is no longer maintained
// and has support issues with Next13, which seemingly are resolved by this fork
// per discussion https://github.com/shadowwalker/next-pwa/issues/424
import * as withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit.default({
  dest: 'public',
  fallbacks: {
    document: '/~offline',
  },
  cacheOnFrontEndNav: false,
  reloadOnOnline: false,
})

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }] // required to make Konva & react-konva work
    return config
  },
}

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
}

const pwaConfig = withPWA(nextConfig)

export default million.next(pwaConfig, millionConfig)
