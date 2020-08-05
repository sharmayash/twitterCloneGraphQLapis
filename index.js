const cors = require("cors")
const express = require("express")
const cloudinary = require("cloudinary").v2

const schema = require("./graphql/index")
const rootResolver = require("./graphql/resolvers")

const { graphqlHTTP } = require("express-graphql")
const { graphqlUploadExpress } = require("graphql-upload")
const { API_KEY, CLOUD_NAME, API_SECRET } = require("./config/keys")

const app = express()
const port = process.env.PORT || 4000

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

// --------- Middlewares -----------

// 1 Allow request for client from different port and url

app.use(cors())

// 2. db config

require("./dbConfig/")

// 3. Graphql

app.use(
  "/gql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: rootResolver,
  })
)

// -------- Middlewares end ---------

// listening to server

app.listen(port, () => console.log(`server started on ${port}`))
