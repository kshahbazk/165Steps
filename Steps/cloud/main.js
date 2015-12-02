require('cloud/app.js');
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("queryServices", function(request, response) {

  var query = new Parse.Query("service");

  query.contains("name", request.params.serviceQuery);

  query.find({
    success: function(results) {

      response.success(results);
    },
    error: function() {
      response.error("Query Failed");
    }
  });
});

Parse.Cloud.define("getUserId", function(request, response)
{
    //Example where an objectId is passed to a cloud function.
    var id = request.params.objectId;

    //When getUser(id) is called a promise is returned. Notice the .then this means that once the promise is fulfilled it will continue. See getUser() function below.
    getUser(id).then
    (
        //When the promise is fulfilled function(user) fires, and now we have our USER!
        function(user)
        {
            response.success(user);
        }
        ,
        function(error)
        {
            response.error(error);
        }
    );

});

function getUser(userId)
{
    Parse.Cloud.useMasterKey();
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("objectId", userId);

    //Here you aren't directly returning a user, but you are returning a function that will sometime in the future return a user. This is considered a promise.
    return userQuery.first
    ({
        success: function(userRetrieved)
        {
            //When the success method fires and you return userRetrieved you fulfill the above promise, and the userRetrieved continues up the chain.
            return userRetrieved;
        },
        error: function(error)
        {
            return error;
        }
    });
}

Parse.Cloud.beforeSave("service", function(request, response) {

  var _apiKey = "key-f630b4300fcb468b8791446715741d07";
  var _domainName = "sandbox849033cc1d2d4cac8be3884abbb52a4c.mailgun.org";

  var email;

  if(request.object.get("buying")){
    email = request.object.get("serviceBuyer").get("email");
  }else{
    email = request.object.get("serviceSeller").get("email");
  }



  Parse.Cloud.httpRequest({
      method: "POST",
      url: "https://api:" + _apiKey + "@api.mailgun.net/v2/" + _domainName + "/messages",
      body: {
          to: email,
          from: "postmaster@sandbox849033cc1d2d4cac8be3884abbb52a4c.mailgun.org",
          subject: "Hello from Cloud Code!",
          text: "A user just applied for one of your jobs"
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
    response.success();
});


 /*var Mailgun = require('mailgun');
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
  });*/
