const validator = require("validator")
const isEmpty = require("./IsEmpty")

module.exports = validateTweetTxt = (captionText) => {
  let errors = {}

  captionText = !isEmpty(captionText) ? captionText : ""

  if (validator.isEmpty(captionText)) {
    errors.captionText = "Your tweet can't be empty."
  }

  if (!validator.isLength(captionText, { min: 1, max: 150 })) {
    errors.captionText =
      "Your tweet text must be min. 1 character and max. 150 characters long."
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
