/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false, // Disable Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental:{
    serverActions:{
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
