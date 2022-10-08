const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.status(404);

  if (req.accepts("html")) return res.render("404");

  if (req.accepts("json")) return res.json({ error: "Not found" });

  return res.type("txt").send("Not found");
});

module.exports = router;
