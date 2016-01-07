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
  },
  'stats': function() {
    return [
      {
        panelClass: "panel-primary",
        iconClass: "fa-twitter",
        value: Tweets.find({}).count(),
        description: "Total Tweets"
      },
      {
        panelClass: "panel-green",
        iconClass: "fa-user",
        value: Tweeters.find({}).count(),
        description: "Users Engaged"
      },
      {
        panelClass: "panel-yellow",
        iconClass: "fa-tachometer",
        value: (Tweets.find({}).count() / Tweeters.find({}).count()).toFixed(2),
        description: "Avg. Tweets per Person"
      }
    ]
  }
});
