const { Router } = require("express");
const { urlCollection } = require("../");
const { isValidHttpUrl, generateShortUrl } = require("../utils");

const router = Router();

router.post("/", (req, res, next) => {
  if (!req.body.url) {
    return res.status(400).json({
      errors: ["Missing 'url' field in JSON body."],
    });
  } else if (typeof req.body.logIps !== "boolean") {
    return res.status(400).json({
      errors: ["You must choose whether to log IP addresses or not."],
    });
  } else if (!isValidHttpUrl(req.body.url)) {
    return res.status(400).json({
      errors: ["Invalid URL."],
    });
  }

  next();
});

router.post("/", async (req, res) => {
  const shortUrl = await generateShortUrl();

  await urlCollection.insertOne({
    shortUrl,
    destination: req.body.url,
    redirects: 0,
    logIps: req.body.logIps,
    visitors: [],
  });

  res.json({ shortUrl });
});

module.exports = router;
