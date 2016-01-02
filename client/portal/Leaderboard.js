Template.Leaderboard.onCreated(function() {
  this.subscribe("leaderboard");
});

Template.Leaderboard.helpers({
  'users': function() {
    return Tweeters.find({}, {
      sort: {
        score: -1
      }
    });
  }
});