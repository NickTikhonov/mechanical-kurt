## Configuration
The app can be configured via a settings file, which should have a structure similar to the following example:

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
      "num_users": 5
    }
  },
  "private": {
    "twitter_auth": {
      "consumer_key": "KEY_GOES_HERE",
      "consumer_secret": "SECRET_GOES_HERE",
      "access_token":	"TOKEN_GOES_HERE",
      "access_token_secret": "TOKEN_SECRET_GOES_HERE"
    }
  }
}
```

The **logo_path** parameter should be the path relative to the public folder. Twitter API keys are required to use the
twitter streaming service.
