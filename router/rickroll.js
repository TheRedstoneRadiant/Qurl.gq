const { Router } = require('express');
const router = Router();

router.get('/rickroll', (req, res) => {
  res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

module.exports = router;
