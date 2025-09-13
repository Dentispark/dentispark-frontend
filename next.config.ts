import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "http://158.220.83.23:1000",
        permanent: false,
      },
    ];
  },

  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
};

export default nextConfig;
