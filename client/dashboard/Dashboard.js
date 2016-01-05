Template.Dashboard.onCreated(function() {
  this.subscribe("all-tweets");
  this.subscribe("all-tweeters");

  Meteor.defer(function() {
    new Chartist.Line('.ct-chart', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
      ]
    }, {
      fullWidth: true,
      height: 500,
      chartPadding: {
        right: 40
      }
    });
  });
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
