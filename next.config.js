/** @type {import('next').NextConfig} */

// NOTE: We are using a fork of next-pwa because it is no longer maintained
// and has support issues with Next13, which seemingly are resolved by this fork
// per discussion https://github.com/shadowwalker/next-pwa/issues/424
const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
})

const nextConfig = {};

module.exports = withPWA(nextConfig);
