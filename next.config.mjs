/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "window-management=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
