const app = require("./app.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port: " + process.env.PORT || 3000);
    });
  });
