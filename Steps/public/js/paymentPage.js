$(document).ready(function(){
  //alert();
  var user = Parse.User.current();

  var service = Parse.Object.extend("service");

  var query = new Parse.Query(service);

  query.equalTo("serviceBuyer", user);
  query.equalTo("paymentState", "waiting");

  query.find({
    success: function(results) {
      $("#service").html("");
      var template = Handlebars.compile($("#pymtable").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#pymtable").append(template(q));
      })


    },
    error: function (error) {
      console.log(error.message);
    }
  });






});