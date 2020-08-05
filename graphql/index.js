const graphql = require("graphql")
const { buildSchema } = graphql

module.exports = buildSchema(`
  scalar Upload

  type TweetType {
    id: ID!
    username: String!
    imageUrl: String!
    captionText: String!
    captionTags: [String!]!
  }

  type Query {
    getTweets: [TweetType!]!
  }

  type Mutation {
    newTweet(username: String!, image: Upload!, caption: String!): TweetType
  }
`)
