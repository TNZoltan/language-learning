/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss";`,
  }
}

module.exports = nextConfig
