const axios = require('axios');
const { Router } = require('express');
const { urlCollection } = require('../');

const mapToken = process.env.MAPBOX_API_TOKEN;
const router = Router();

router.get('/:shortUrl*', async (req, res, next) => {
  const shortenedUrl = await urlCollection.findOne({
    shortUrl: req.params.shortUrl,
  });

  if (!shortenedUrl) {
    return res.redirect('/404');
  }

  req.shortenedUrl = shortenedUrl;
  next();
});

router.get('/:shortUrl', async (req, res, next) => {
  res.redirect(req.shortenedUrl.destination);

  const update = { $inc: { redirects: 1 } };

  // IP address logging
  if (req.shortenedUrl.logIps) {
    let ipAddress = req.header('x-forwarded-for');

    let location, coordinates, response;

    try {
      response = await axios.get(`https://ipapi.co/${ipAddress}/json`);
      location = `${response.data.city}, ${response.data.region}, ${response.data.country_name}`;
      coordinates = [response.data.longitude, response.data.latitude];
      ipAddress = response.data.ip;
    } catch(error) {
      return next(error);
    }

    update['$push'] = {
      visitors: {
        ipAddress,
        location,
        coordinates,
        time: Date.now(),
      },
    };
  }

  urlCollection.updateOne({ shortUrl: req.shortenedUrl.shortUrl }, update);
});

router.get('/:shortUrl/info', async (req, res) => {
  res.render('info', { ...req.shortenedUrl, mapToken });
});

module.exports = router;
