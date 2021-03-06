Template.HistoryCharts.onCreated(function() {
  Meteor.autorun(function() {
    Meteor.subscribe("hourStats");
    Meteor.subscribe("minuteStats");
  });
});

Template.HistoryCharts.helpers({
  'minuteData': function() {
    var allData = MinuteStats.find({}, {sort: {
      "date.year": -1,
      "date.month": -1,
      "date.day": -1,
      "date.hour": -1,
      "date.minute": -1
    }, limit: 60}).fetch().reverse();
    var labels = allData.map(function (hour) {
      return hour.date.hour + ":" + hour.date.minute
    });
    var series = allData.map(function (hour) {
      return hour.count
    });

    return {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Tweets by Minute'
      },
      xAxis: {
        categories: labels
      },
      yAxis: {
        title: {
          text: 'Number of Tweets'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Tweet Count',
        marker: {
          symbol: 'square'
        },
        data: series

      }]
    }
  },
  'hourData': function() {
    var allData = HourStats.find({}, {sort: {
      "date.year": -1,
      "date.month": -1,
      "date.day": -1,
      "date.hour": -1
    }, limit: 24}).fetch().reverse();

    var labels = allData.map(function (hour) {
      return hour.date.hour
    });
    var series = allData.map(function (hour) {
      return hour.count
    });

    return {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Tweets by Hour'
      },
      xAxis: {
        categories: labels
      },
      yAxis: {
        title: {
          text: 'Number of Tweets'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Tweet Count',
        marker: {
          symbol: 'square'
        },
        data: series

      }]
    }
  }
});

Template.HistoryCharts.events({
});
