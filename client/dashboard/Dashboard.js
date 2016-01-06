Template.Dashboard.onCreated(function() {
  this.subscribe("all-tweets");
  this.subscribe("all-tweeters");
});

Template.Dashboard.helpers({
  'tweetCount': function() {
    return Tweets.find({}).count();
  },
  'tweeterCount': function() {
    return Tweeters.find({}).count();
  },
  'averageTweets': function() {
    return (Tweets.find({}).count() / Tweeters.find({}).count()).toFixed(2);
  }
});
