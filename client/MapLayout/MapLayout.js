Template.MapLayout.helpers({
  'hashtag': function() {
    return Meteor.settings.public.twitter.hashtag;
  },
  'event': function() {
    return Meteor.settings.public.event;
  },
  'links': function() {
    return Meteor.settings.public.links;
  }
});

Template.tweets.onCreated(function() {
  this.subscribe("tweets");
});

Template.tweets.helpers({
  'tweets': function() {
    return Tweets.find({}, {
      sort: {
        created_at: -1
      }
    });
  }
});

Template.scoreboard.onCreated(function() {
  this.subscribe("tweeters");
});

Template.scoreboard.helpers({
  'users': function() {
    return Tweeters.find({}, {
      sort: {
        score: -1
      }
    });
  }
});
