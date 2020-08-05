# Twitter Graphql Api

### For running on local machine :-

```
1. npm install
```
```
2. npm start
```

### Examples

Query Example

```
{
  getTweets{
    username
    imageUrl
    captionText
    captionTags
  }
}
```

Mutaion Example

```
mutation($image: Upload!) {
  newTweet(username: "john", image: $image, caption: "Hey #johnhere #all #ipl") {
    username
    imageUrl
    captionText
    captionTags
  }
}
```
