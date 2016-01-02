Template.Tweets.onCreated(function() {
  this.subscribe("tweets");
});

Template.Tweets.helpers({
  'tweets': function() {
    return Tweets.find({}, {
      sort: {
        created_at: -1
      }
    });
  }
});