const { Router } = require('express');
const { urlCollection } = require('../');
const { isValidHttpUrl, generateShortUrl } = require('../utils');

const router = Router();

router.post('/', async (req, res, next) => {
  if (!req.body.url) {
    return res.status(400).json({
      errors: ["Missing 'url' field in JSON body."],
    });
  }

  if (typeof req.body.logIps !== 'boolean') {
    return res.status(400).json({
      errors: ['You must choose whether to log IP addresses or not.'],
    });
  }

  const customURL = req.body.customURL;

  if (customURL.length > 0) {
    if (customURL.length >= 10) {
      return res.status(400).json({
        errors: ['Your custom short URL must be between 1-10 characters long.'],
      });
    }
    
    if (await urlCollection.findOne({ shortUrl: customURL })) {
     return res.status(400).json({
        errors: ['This custom short URL already exists.'],
      });
    }
  }

  if (!isValidHttpUrl(req.body.url)) {
    return res.status(400).json({
      errors: ['Invalid URL.'],
    });
  }
  
  if (req.body.url.startsWith("https://qurl.gq") || req.body.url.startsWith("http://qurl.gq")) {
    return res.status(400).json({
      errors: ['You cannot create a short URL that redirects to Qurl.gq.'],
    });
  }

  next();
});

router.post('/', async (req, res) => {
  let shortUrl;

  const customURL = req.body.customURL;

  if (customURL.length > 0) {
    shortUrl = customURL;
  } else {
    shortUrl = await generateShortUrl();
  }

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
