const mongoose = require("mongoose")
const { MONGO_URI } = require("../config/keys")

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err.message + "\n" + err.reason))
