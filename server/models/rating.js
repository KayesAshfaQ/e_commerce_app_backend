const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    required: true,
    type: Number,
  },
});

module.exports = ratingSchema;
