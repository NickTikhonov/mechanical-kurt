function incrementUserScore(tweet) {
  if (!Tweeters.findOne({id: tweet.user.id})) {
    tweet.user.score = 1;
    Tweeters.insert(tweet.user);
  } else {
    Tweeters.update({id: tweet.user.id}, {$inc: {score: 1}});
  }
}

function validTweet(tweet) {
  return !isFromBlacklistedUser(tweet) &&
      !isRetweet(tweet);
}

function isFromBlacklistedUser(tweet) {
  return Meteor.settings.public.twitter.leaderboard_blacklist
    .indexOf(tweet.user.screen_name) !== -1;
}

function isRetweet(tweet) {
  return tweet.retweeted_status !== undefined;
}

Meteor.startup(function() {
  Tweets.remove({});
  Tweeters.remove({});

  Twit = new TwitMaker(Meteor.settings.private.twitter_auth);

  var stream = Twit.stream("statuses/filter", {
    track: Meteor.settings.public.twitter.hashtag
  }).on("tweet", Meteor.bindEnvironment(function(tweet) {
    if (validTweet(tweet)) {
      Tweets.insert(tweet);
      incrementUserScore(tweet);
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

Meteor.publish("leaderboard", function() {
  return Tweeters.find({}, {
    sort: {
      score: -1
    },
    limit: Meteor.settings.public.twitter.num_users
  });
});
