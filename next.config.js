/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/login", destination: "/signup", permanent: false },
    ];
  }
};

module.exports = nextConfig;