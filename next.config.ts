import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // images: {
  //   loader: "cloudinary",
  //   // path: "https://res.cloudinary.com/<your-cloud-name>/image/upload/",
  //   // You can still whitelist external domains if needed
  // },
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
};

export default nextConfig;
