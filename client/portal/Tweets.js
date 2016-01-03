Template.Tweets.onCreated(function() {
  this.subscribe("tweets");
});

Template.Tweets.rendered = function() {
  this.find('.animated')._uihooks = {
    insertElement: function(node, next) {
      $(node).addClass('off').insertBefore(next);
      Tracker.afterFlush(function() {
        $(node).removeClass('off');
      });
    }
  }
}

Template.Tweets.helpers({
  'tweets': function() {
    return Tweets.find({}, {
      sort: {
        created_at: -1
      }
    });
  }
});