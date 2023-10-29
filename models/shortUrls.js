import mongoose from "mongoose";
import { generate } from "shortid";

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

shortUrlSchema.pre(/^find/, function (next) {
  this.find({ expiresAt: { $gt: Date.now() } });
  next();
});

export default mongoose.model("ShortUrl", shortUrlSchema);
