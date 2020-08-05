const path = require("path")
const { createWriteStream } = require("fs")

const Tweet = require("../models/Tweet")
const cloudinary = require("cloudinary").v2
const { GraphQLUpload } = require("graphql-upload")

const validateTweetTxt = require("../validation/tweetValidation")

var rootResolver = {
  Upload: GraphQLUpload,

  getTweets: async () => {
    const tweets = await Tweet.find({})

    return tweets
  },

  newTweet: async ({ username, image, caption }) => {
    try {
      const { errors, isValid } = validateTweetTxt(caption)

      if (!isValid) {
        return Error(JSON.stringify(errors))
      }

      let cldImgUrl

      const { filename, createReadStream } = await image.file
      const filePath = path.join(__dirname, "../images", filename)

      // upload image and get cloundinary url

      await new Promise((res) =>
        createReadStream().pipe(createWriteStream(filePath)).on("close", res)
      )

      await cloudinary.uploader.upload(filePath, (err, result) => {
        if (err) {
          return Error(JSON.stringify(err))
        }
        cldImgUrl = result.url
      })

      // copying tags from caption and store them into captionTags.

      let captionTags = caption.split(" ").filter((w) => w.startsWith("#"))

      let newTweet = await new Tweet({
        username,
        imageUrl: cldImgUrl,
        captionText: caption,
        captionTags,
      })

      // save user in db
      await newTweet.save()

      return newTweet
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}

module.exports = rootResolver
