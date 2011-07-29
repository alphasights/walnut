Open Nut
=================

This is a tiny pure JS/HTML/CSS app for monitoring third party services, integrating with CI or whatever you like and displaying it on your wall!

Features
========

* No deployment: JS only
* Five visual states for services
* Plays the [inception](http://inception.davepedu.com/) sound if a service fails
* Polls server every 20 seconds
* Non-blocking
* Good for displaying on a flatscreen TV

Here's how it [looks like on our wall](http://alphadev.tumblr.com/post/7651471438/hazel-is-a-rails-monitoring-app-which-keeps-an-eye).

Service States
--------------

* Green: up and running
* Red: service is misbehaving
* Polling service: making HTTP request to a status api/page
* Pending: good for CI build/test process
* Unknown: HTTP request to a status page/api has failed

Limitations
==========

Due to security reasons browsers do not allow cross-domain AJAX requests, therefore you have to configure your browser accordingly. Please do so at your own risk!

Safari
------

Seems to work by default.

Chrome
------

You will have to disable web security. Pass `-disable-web-security` when starting chrome.
Eg. in OS X:

    open /Applications/Google\ Chrome.app --args -disable-web-security

Other Browsers
--------------

Haven't tested yet. Please report in Issues if you can get it running on other browsers.

Monitored Services
==================

* Heroku Apps
* Heroku Tools
* Amazon EC2 N.Virginia (Heroku lives there)
* MongoHQ Rose
* Pusher App
* Rackspace Email
* Github

Monitoring other services
=========================

It is very easy to add any service you want. Just add another service to the `services.js` file. Here's a helpful example:

    Service({
      name: 'Some Cool Apps',                 // will be displayed in the view
      url: 'https://example.com/status.json', // url to call
      dataType: "json",                       // optional. datatype to set in http header
      username: 'jamesbond',                  // optional. http basic auth username
      password: 'secret007',                  // optional. http basic auth password

                                              // a function to parse the response.
                                              // must return true, false or "pending"
      status: function(response) {            // In case of HTML response jQuery can be used
        return JSON.parse(response)["status"].length == "ok";
      }
    });

Monitoring Jenkins CI
----------------------

Example of how to monitor Jenkins CI. Will display grey icon while building

    Service({
      name: 'Jenkins',
      url: 'http://myjenkinsurl.com/job/Prject/lastBuild/api/json',
      username: 'jenkinsuser',
      password: 'someweirdpassword',
      dataType: "json",
      status: function(response) {
        if(response["building"]){
          return "pending";
        };
        return response["result"].toLowerCase() == "success";
      }
    });

You shouldn't need to touch `app.js` at all.

Styling
=======

You should modify `src/screen.sass`. We are using [compass](https://github.com/chriseppstein/compass). To compile it to css just run `compass watch` in a project directory. You can also modify `stylesheets/screen.css` directly if you can't use compass for some serious reason.

Contributing
============

Please make pull requests with useful services to monitor, SASS/CSS styles, new fancy sounds or any other cool features.

Credits
=======

John Griffin, Tor Erik Linnerud, Tadas Tamosauskas
Icons: [Glyphich free icon set](http://glyphish.com/)