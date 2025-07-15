const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Increase to 10MB or whatever you need
    },
  },
  // For API routes specifically
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;
