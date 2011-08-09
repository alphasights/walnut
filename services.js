Service({
  name: 'Heroku App operations',
  url: 'http://status.heroku.com/',
  status: function(response) {
    return $(response).find('.status .app').hasClass('green')
  }
})

Service({
  name: 'Heroku Tools',
  url: 'http://status.heroku.com/',
  status: function(response) {
    return $(response).find('.status .tools').hasClass('green')
  }
})

Service({
  name: 'EC2 N.Virginia',
  url: 'http://status.aws.amazon.com/',
  status: function(response) {
    td = $(response).find('.yui-content table tr:nth(5) td:nth(2)');
    var text = td.text();
    return (text == "Service is operating normally." || text.match(/(RESOLVED)/).length > 0);
  }
})

Service({
  name: 'MongoHQ Rose',
  url: 'http://status.mongohq.com/api/v1/services/rose/events',
  status: function(response) {
    return JSON.parse(response)["events"].length == 0
  }
})

Service({
  name: 'Pusher',
  url: 'http://status.pusherapp.com/',
  status: function(response) {
    return $(response).find('#answer').hasClass('up')
  }
})

Service({
  name: 'Rackspace Email',
  url: 'http://status.apps.rackspace.com',
  timeout: 7500,
  status: function(response) {
    return $(response).find('#current #current-group-3 .field-group-message').text().match(/normally/).length > 0;
  }
})

Service({
  name: 'Github',
  url: 'http://status.github.com/',
  status: function(response) {
    return $(response).hasClass('noproblems')
  }
})

Service({
  name: 'CloudMailin',
  url: 'http://cloudmailin-status.herokuapp.com/',
  status: function(response) {
    var status = response["status"];
    return  (status == "up" || status == "reduced_capacity")
  }
})