function applyForTheJob(objectId){

	var Service = Parse.Object.extend("service");
	var query = new Parse.Query(Service);


	query.get(objectId, {
  success: function(service) {
    // The object was retrieved successfully.
		var relation = service.relation("applicant");
		relation.add(Parse.User.current());
		service.save();
		alert();


  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log(error.message);

  }
});




}

function getService(objectId){

	var Service = Parse.Object.extend("service");
	var query = new Parse.Query(Service);



	query.get(objectId, {
  success: function(service) {
    // The object was retrieved successfully.
    $("#serviceName").html(service.get("name"));
    $("#serviceDescription").html(service.get("description"));
    $("#servicePrice").html("$"+service.get("price")+ ".00");


		var userx;

		if(service.get("buying")){
			userx = service.get("serviceBuyer");

		}else{
			userx = service.get("serviceSeller");

		}
		var userId = userx.id;
		getUser(userId);
		getApplicants(service);


  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log(error.message);

  }
});





}

function getApplicants (service) {


  var relation = service.relation("applicant");
	var query = relation.query();






  query.find({
    success: function (results){
      $("#applicant-list").html("");
      var template = Handlebars.compile($("#applicant-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#applicant-list").append(template(q));
      })

    },
    error: function(error){
      console.log(error.message);
    }
  })
}

function getUser(userId) {

	Parse.Cloud.run('getUserId', { objectId: userId }, {
	    success: function(user) {

	        // Do something with the returned Parse.Object values
					//console.log(user.get("firstName"));
					if(user == Parse.User.current()){

						console.log("same");
						$("#apply-for-job").hide();

					}
					$("#userName").html(user.get("firstName") + " " + user.get("lastName"));
					$("#userEmail").html(user.get("email"));

					try {
			        $("#profile-picture-service")[0].src = user.get("profileImage").url();
			    } catch (e) {

			    } finally {

			    }

	    },
	    error: function(error) {
				console.log(error.message);
	    }
	});

}

$(document).ready(function(){
var id = 	sessionStorage.getItem("serviceId");
getService(id);


	//var qs = new Querystring();
//	var v1 = qs.get("objectId");

	console.log("este e o id"+ id);
	$("#apply-for-job").on("click", function () {
		//alert();
		applyForTheJob(id);
	});


})
