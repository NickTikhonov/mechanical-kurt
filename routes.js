FlowRouter.route('/', {
  name: 'map',
  action: function() {
    BlazeLayout.render('Portal');
  }
});

FlowRouter.route('/admin', {
  name: 'map',
  action: function() {
    BlazeLayout.render('Dashboard');
  }
});
