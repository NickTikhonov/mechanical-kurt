FlowRouter.route('/', {
  name: 'map',
  action: function() {
    BlazeLayout.render('MapLayout');
  }
});