/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Allow importing SVGs as React components
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
