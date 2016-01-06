## MechanicalKurt
A simple, real-time event information portal written using the Meteor framework. Perfect for student hackathons and similar events. Current features include:

* Real-time twitter wall displaying tweets with the event hashtag
* Twitter leaderboard - list of users who are tweeting the most about the event. Great for twitter competitions and encouraging social media participation
* Sidebar which can be configured to display links to Facebook, Twitter, Github and DevPost

![Screenshot](/Screenshot.png "Screenshot")
![Screenshot](/AdminScreenshot.png "Admin Panel")

## Configuration
A settings file is needed before the portal can be successfully deployed. All required settings can be included in **settings.json**, and saved to the repository root. Refer to the following example:

```
{
  "public": {
    "event": {
      "name": "YourEventName",
      "logo_path": "logo.png",
      "description": "YourEventDescription"
    },
    "links": {
      "github": "github.com",
      "facebook": "facebook.com",
      "twitter": "twitter.com",
      "devpost": "devpost.com"
    },
    "twitter": {
      "hashtag": "#YourEventTag",
      "num_tweets": 20,
      "num_users": 5,
      "leaderboard_blacklist": [
        "user1", "user2"
      ]
    }
  },
  "private": {
    "twitter_auth": {
      "consumer_key": "KEY_GOES_HERE",
      "consumer_secret": "SECRET_GOES_HERE",
      "access_token":	"TOKEN_GOES_HERE",
      "access_token_secret": "TOKEN_SECRET_GOES_HERE"
    },
    "access": {
      "admins": ["nt34@st-andrews.ac.uk"]
    }
  }
}
```

The **logo_path** parameter should be the path relative to the public folder. Twitter API keys are required to use the
twitter streaming service. **leaderboard_blacklist** should contain twitter usernames excluded from the leaderboard.
To launch the portal locally, run the following in the project root:

```
meteor --settings settings.json
```
