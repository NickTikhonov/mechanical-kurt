Tweets = new Mongo.Collection("tweets");
TweetStats = new Mongo.Collection("tweetstats");

Tweets.before.insert(function(userId, doc) {
  doc.created_at = new Date();
});

Tweeters = new Mongo.Collection("tweeters");
