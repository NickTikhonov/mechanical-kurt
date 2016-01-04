Template.Leaderboard.onCreated(function() {
  this.subscribe("leaderboard");
});

Template.Leaderboard.helpers({
  'top': function() {
    return Tweeters.find({}, {
      sort: {
        score: -1
      },
      limit: 3
    });
  },
  'others': function() {
    return Tweeters.find({}, {
      sort: {
        score: -1
      },
      skip: 3
    });
  },
  'increment': function(num) {
    return num + 1;
  }
});