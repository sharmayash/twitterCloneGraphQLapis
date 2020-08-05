const mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema(
  {
    username: String,
    imageUrl: String,
    captionText: String,
    captionTags: [String],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Tweet", TweetSchema)
