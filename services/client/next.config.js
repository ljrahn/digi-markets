module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "gateway.moralisipfs.com"],
  },

  async headers() {
    return [
      {
        source: "/_next/static",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
    ];
  },
};
