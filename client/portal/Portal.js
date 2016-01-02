Template.Portal.helpers({
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
