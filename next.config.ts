import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Next 16 defaults images.qualities to [75] and silently coerces any
    // other quality prop to the nearest allowed value. We use 78/82/85 across
    // the site (gallery / about / hero), so they must be declared or the
    // high-quality shots get downscaled to 75. 75 kept for any default usage.
    qualities: [75, 78, 82, 85],
  },
};

export default nextConfig;
