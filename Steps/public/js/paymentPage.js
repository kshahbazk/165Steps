$(document).ready(function(){
  //alert();

getPayment();





});
function changePaymentState (objectId){
  //alert();
  var service = Parse.Object.extend("service");

  var query = new Parse.Query(service);

  query.get(objectId,{
    success: function (service){

      service.set("serviceState", "closed");
      service.save();
    },
    error: function (error){
      console.log(error.message);
    }
  });
}
function getPayment() {
  var user = Parse.User.current();

  var service = Parse.Object.extend("service");

  var query = new Parse.Query(service);
  var query2 = new Parse.Query(service);

  query.equalTo("serviceBuyer", user);
  query2.equalTo("paymentState", "waiting");

  var mainQuery = Parse.Query.or(query,query2);

  mainQuery.find({
    success: function(results) {
      //$("#payment-list").html("");
      var template = Handlebars.compile($("#pymtable").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#payment-list").append(template(q));
      })


    },
    error: function (error) {
      console.log(error.message);
    }
  });
}
