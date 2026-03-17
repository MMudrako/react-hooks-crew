import type { NextConfig } from "next";


/* config options here */
const nextConfig: NextConfig = {

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  /*old config for next15*/
  /* webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            ref: true, //enable forwardRef in client components
            //svgo: true,
            //titleProp: true,
          },
        }],
    }); 
    return config;
  }*/
};

export default nextConfig;
