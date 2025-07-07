const cloudinaryOptions = {
  folder: "spotify_clone/images",
  allowed_formats: ["jpg", "png", "webp", "jpeg"],
  resource_type: "image",
  transformation: [
    { quality: "auto:best" },
    { fetch_format: "auto" },
    { format: "webp" },
    {
      width: 1400,
      height: 720,
      crop: "fill",
      gravity: "auto",
    },
  ],
};

export default cloudinaryOptions;
