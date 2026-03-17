import type { NextConfig } from "next";



const nextConfig: NextConfig = {

  turbopack: {},
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            ref: true, //enable forwardRef in client components
            svgo: true,
            titleProp: true,
          },
        }],
    });
    return config;
  }
};

export default nextConfig;
