Meteor.startup(function() {
  Tweets.remove({});

  Twit = new TwitMaker(Meteor.settings.private.twitter_auth);

  var stream = Twit.stream("statuses/filter", {
    track: Meteor.settings.public.twitter.hashtag
  }).on("tweet", Meteor.bindEnvironment(function(tweet) {
    if (!tweet.retweeted_status) {
      tweet.created_at = new Date().getTime();
      console.log(JSON.stringify(tweet));
      Tweets.insert(tweet);

      if (!Tweeters.findOne({id: tweet.user.id})) {
        tweet.user.score = 1;
        Tweeters.insert(tweet.user);
      } else {
        Tweeters.update({id: tweet.user.id}, {$inc: {score: 1}});
      }
    }
  }));
});

Meteor.publish("tweets", function() {
  return Tweets.find({

  }, {
    sort: {
      created_at: -1
    },
    limit: Meteor.settings.public.twitter.num_tweets
  });
});

Meteor.publish("tweeters", function() {
  return Tweeters.find({}, {
    sort: {
      score: -1
    },
    limit: Meteor.settings.public.twitter.num_users
  });
});
