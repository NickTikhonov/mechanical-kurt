/**
 * Increments the 'score' parameter for the author of the tweet.
 * If author does not exist in the database, a new entry is added
 * with score of 1
 *
 * @param tweet object from the streaming api
 */
function incrementUserScore(tweet) {
  if (!Tweeters.findOne({id: tweet.user.id})) {
    tweet.user.score = 1;
    Tweeters.insert(tweet.user);
  } else {
    Tweeters.update({id: tweet.user.id}, {$inc: {score: 1}});
  }
}

function userIsAdmin() {
  if (!this.userId) return false;

  var adminEmails = Meteor.settings.private.access.admins;
  var user = Meteor.users.findOne(this.userId);
  var userEmail = user.emails[0].address;

  return adminEmails.indexOf(userEmail) !== -1;
}

/**
 * Top-level logic for determining whether a tweet
 * should be displayed to connected clients.
 *
 * @param tweet object from the streaming api
 * @returns whether the tweet should be displayed to connected clients
 */
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

/**
 * Stream of the latest tweets, limited by the "num_tweets" parameter.
 */
Meteor.publish("tweets", function() {
  return Tweets.find({}, {
    sort: {
      created_at: -1
    },
    limit: Meteor.settings.public.twitter.num_tweets
  });
});

/**
 * Stream of users who have tweeted the most with the hashtag.
 */
Meteor.publish("leaderboard", function() {
  return Tweeters.find({}, {
    sort: {
      score: -1
    },
    limit: Meteor.settings.public.twitter.num_users
  });
});

Meteor.publish("all-tweets", function() {
  return Tweets.find({});
});

Meteor.publish("all-tweeters", function() {
  return Tweeters.find({});
});

Meteor.publish("tweetStats", function() {
  var sub = this;
  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

  var pipeline = [
    {
      "$group":{
        "_id": {
          "year": {"$year": "$created_at"},
          "month":{"$month": "$created_at"},
          "day":{"$dayOfMonth": "$created_at"},
          "hour":{"$hour": "$created_at"},
          "minute": {"$minute": "$created_at"}
        },
        "count":{ "$sum": 1}
      }
    }
  ];

  db.collection("tweets").aggregate(
    pipeline,
    // Need to wrap the callback so it gets called in a Fiber.
    Meteor.bindEnvironment(
      function(err, result) {
        // Add each of the results to the subscription.
        _.each(result, function(e) {
          // Generate a random disposable id for aggregated documents
          console.log(e);
          sub.added("tweetstats", Random.id(), {
            "date": e._id,
            "count": e.count,
          });
        });
        sub.ready();
      },
      function(error) {
        Meteor._debug( "Error doing aggregation: " + error);
      }
    )
  );
});
