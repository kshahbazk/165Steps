require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("queryServices", function(request, response) {

  var query = new Parse.Query("service");

  query.contains("name", request.param.serviceQuery);

  query.find({
    success: function(results) {

      response.success(results);
    },
    error: function() {
      response.error("Query Failed");
    }
  });
});

/*Parse.Cloud.beforeSave("service", function(request, response) {

  var _apiKey = "key-f630b4300fcb468b8791446715741d07";
  var _domainName = "sandbox849033cc1d2d4cac8be3884abbb52a4c.mailgun.org";

  Parse.Cloud.httpRequest({
      method: "POST",
      url: "https://api:" + _apiKey + "@api.mailgun.net/v2/" + _domainName + "/messages",
      body: {
          to: "fernandohsabolafio@gmail.com",
          from: "postmaster@sandbox849033cc1d2d4cac8be3884abbb52a4c.mailgun.org",
          subject: "Hello from Cloud Code!",
          text: "Using Parse and Mailgun is great!"
      },
      success: function(httpResponse) {
        console.log(httpResponse);
        response.success("Email sent!");
      },
      error: function(httpResponse) {
        console.error(httpResponse);
        response.error("Uh oh, something went wrong");
      }
    });


/*  var Mailgun = require('mailgun');
  Mailgun.initialize('https://api.mailgun.net/v3/steps165.parseapp.com', 'key-f630b4300fcb468b8791446715741d07');

  Mailgun.sendEmail({
    to: "fernandohsabolafio@gmail.com",
    from: "Mailgun@CloudCode.com",
    subject: "Hello from Cloud Code!",
    text: "Using Parse and Mailgun is great!"
  }, {
    success: function(httpResponse) {
      console.log(httpResponse);
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      console.error(httpResponse);
      response.error("Uh oh, something went wrong");
    }
  });

});*/
