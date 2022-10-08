const { urlCollection } = require("../");

const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const generateShortUrl = async () => {
  const shortUrl = Math.random().toString(36).substring(2, 7);

  // prevent duplicates
  if (await urlCollection.findOne({ shortUrl })) {
    return await generateShortUrl();
  }

  return shortUrl;
};

module.exports = { isValidHttpUrl, generateShortUrl };
