import express from "express";
const app = express();
import ShortUrl from "./models/shortUrls.js";

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls });
  } catch (err) {
    console.log(err);
  }
});

app.post("/shortUrls", async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (!shortUrl) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

export default app;
