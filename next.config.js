/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};
const runtimeCaching = require('next-pwa/cache') 
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  mode: "production",
  disable: false,
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/],
});

module.exports = withPWA(nextConfig);
