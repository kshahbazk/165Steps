
function editService(objectId)
{
    $("#editModalOpen").modal();
    var Service = Parse.Object.extend("service");
  	var query = new Parse.Query(Service);
    console.log("id do serivco: " + objectId);


  	query.get(objectId, {
    success: function(service) {
      // The object was retrieved successfully.
      $("#serviceName").html(service.get("name"));
      $("#serviceDescription").html(service.get("description"));
      $("#servicePrice").html("$"+service.get("price")+ ".00");
      sessionStorage.setItem("editService", objectId);


    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
      console.log(error.message);

    }
  });

}

function saveService(id){


  var Service = Parse.Object.extend("service");
  var query = new Parse.Query(Service);

  var name = $("#serviceName").val();
  var description = $("#serviceDescription").val();
  var deadline = ($("#month").val() + "/" + $("#day").val() + "/" + $("#year").val());
  var price = $(".servicePrice").val();
  query.get(id, {
    success: function(service) {
      // The object was retrieved successfully.
      service.set("name",name);
      service.set("description", description);
      service.set("deadline", deadline);
      service.set("price", price);
      if(document.getElementById('option1').checked){
        service.set("buying", true);
        service.set("serviceBuyer",Parse.User.current());
      }else{
        if(document.getElementById('option2').checked){
          service.set("buying", false);
          service.set("serviceSeller",Parse.User.current());
        }else{
          console.log("seller or buyer not selected");
        }
      }

      service.save(null,{
        success: function(){
          console.log("service saved!");

          document.location.href = "userProfile.html";

        },
        error: function(service, error){
          console.log(error.message);

        }
      })
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
      console.log(error.message);
    }
  });





}



function deleteService(serviceId){


  var Service = Parse.Object.extend("service");
	var query = new Parse.Query(Service);



	query.get(serviceId, {
    success: function(service) {
      // The object was retrieved successfully.
      service.destroy({
        success: function (service){
          console.log("service successfully deleted");
          $("#"+serviceId).hide();
        },
        error: function (service, error){
          console.log(error.message);
        }
      });

    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and message.
      console.log(error.message);




    }
  });

  getServices();
}



function getServices(){

	var services = Parse.Object.extend("service");
	var querySeller = new Parse.Query(services);
	var queryBuyer = new Parse.Query(services);

	querySeller.equalTo("serviceSeller", Parse.User.current());
	queryBuyer.equalTo("serviceBuyer", Parse.User.current());

	//var mainQuery = Parse.Query.or(queryBuyer,querySeller);


  // query to retrive seller services to management list
  querySeller.find({
    success: function (results){
      $("#sellingManageList").html("");
      var template = Handlebars.compile($("#selling-service-post-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#sellingManageList").append(template(q));
      })

    },
    error: function(error){
      console.log("buying error: "+ error.message);
    }
  })

  // query to retrive buyer services to magament list
  queryBuyer.find({
    success: function (results){
      $("#buyingManageList").html("");
      var template = Handlebars.compile($("#buying-service-post-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();

        $("#buyingManageList").append(template(q));
      })

    },
    error: function(error){
      console.log("buying error: "+error.message);
    }
  })




}



$(document).ready(function(){
  var id = 	sessionStorage.getItem("editService");

  var arrayForServicesId;
  getServices();
  //verifyServices();
  //$("#delete-service").on("click",function (e){
    //e.preventDefault();
    //deleteService(service);
  //})
  $("#editService").submit(function(e){
    e.preventDefault();
    if(Parse.User.current()){
      saveService(id);
    }

  })




})
