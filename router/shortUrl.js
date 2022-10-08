const axios = require("axios");
const { Router } = require("express");
const { urlCollection } = require("../");

const router = Router();

router.get("/:shortUrl*", async (req, res, next) => {
  const shortenedUrl = await urlCollection.findOne({
    shortUrl: req.params.shortUrl,
  });

  if (!shortenedUrl) {
    return res.redirect("/404");
  }

  req.shortenedUrl = shortenedUrl;

  next();
});

router.get("/:shortUrl", async (req, res, next) => {
  res.redirect(req.shortenedUrl.destination);

  const update = { $inc: { redirects: 1 } };

  // IP address logging
  if (req.shortenedUrl.logIps) {
    const ipAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    let location;

    try {
      const response = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
      location = `${response.data.city}, ${response.data.region}, ${response.data.country_name}`;
    } catch {
      location = "";
    }

    update["$push"] = { visitors: { ipAddress, location, time: Date.now() } };
  }

  urlCollection.updateOne({ shortUrl: req.shortenedUrl.shortUrl }, update);
});

router.get("/:shortUrl/info", async (req, res, next) => {
  res.render("info", { ...req.shortenedUrl });
});

module.exports = router;
