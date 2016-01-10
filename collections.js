Tweets = new Mongo.Collection("tweets");
HourStats = new Mongo.Collection("hourstats");
MinuteStats = new Mongo.Collection("minutestats");

Tweets.before.insert(function(userId, doc) {
  doc.created_at = new Date();
});

Tweeters = new Mongo.Collection("tweeters");
