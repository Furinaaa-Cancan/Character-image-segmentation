import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Character-image-segmentation",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
