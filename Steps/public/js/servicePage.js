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

	var user;

	query.get(objectId, {
  success: function(service) {
    // The object was retrieved successfully.
    $("#serviceName").html(service.get("name"));
    $("#serviceDescription").html(service.get("description"));
    $("#servicePrice").html("$"+service.get("price")+ ".00");
    user = service.get("serviceSeller");
    getUser(user);

  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
    console.log(error.message);

  }
});


	return user;


}


function getUser(user) {

	$("#userName").html(user.get("firstName"));
	 $("#userEmail").html(user.get("email"));

}

$(document).ready(function(){
var id = 	sessionStorage.getItem("serviceId");
var user = getService(id);
	//var qs = new Querystring();
//	var v1 = qs.get("objectId");

	console.log("este e o id"+ id);
	$("#apply-for-job").on("click", function () {
		//alert();
		applyForTheJob(id);
	});


})
