const { Router } = require("express");
const router = Router();

router.use("/404", require("./404"));
router.use(require("./shortUrl"));
router.use("/createUrl", require("./createUrl"));

router.get("/", (req, res) => {
  res.render("index");
});

router.use((req, res) => {
  res.redirect("/404");
});

module.exports = router;
