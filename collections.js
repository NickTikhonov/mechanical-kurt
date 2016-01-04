Tweets = new Mongo.Collection("tweets");

Tweets.before.insert(function(userId, doc) {
  doc.created_at = new Date().getTime();
});

Tweeters = new Mongo.Collection("tweeters");
