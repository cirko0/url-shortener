import express from "express";
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index");
});

export default app;
