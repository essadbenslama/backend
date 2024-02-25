const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieTitle: { type: String, required: true },
  descreption: { type: String, required: true },
  posterUrl: { type: String },
  trailler: { type: String, required: true },
  category: { type: String, required: true },
  rate: { type: Number, required: true, default: 0 },
  postedBy: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("Movie", movieSchema);
