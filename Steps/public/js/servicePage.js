function applyForTheJob(objectId){

	var Service = Parse.Object.extend("service");
	var query = new Parse.Query(Service);




	query.get(objectId, {
	  success: function(service) {
	    // The object was retrieved successfully.
			var relation = service.relation("applicant");
			relation.add(Parse.User.current());
			if(service.get("buying")){
				service.set("sellerAccepted", true);
			}else{
				service.set("buyerAccepeted", true);
			}
			if(service.get("sellerAccepted") && service.get("buyerAccepeted")){
				service.set("serviceState", "waiting");
			}
			service.save();
		},
		error: function (error){
			console.log(error.message);
		}

	});

}

	function applyForTheJobTwo (objectId){
		var Service = Parse.Object.extend("service");
		var query = new Parse.Query(Service);


		query.get(objectId, {
	  success: function(service) {
	    // The object was retrieved successfully.
			if(service.get("buying")){
				service.set("buyerAccepeted", true);
			}else{
				service.set("sellerAccepted", true);
			}
			if(service.get("sellerAccepted") && service.get("buyerAccepeted")){
				service.set("serviceState", "waiting");
			}

			var userId = sessionStorage.getItem("userView");
			console.log(userId);
			Parse.Cloud.run('getUserId', { objectId: userId }, {
			    success: function(user) {
						if(service.get("buying")){
							console.log("tste");
							console.log(user.get("firstName"));
							service.set("serviceSeller", user);
						}else{
							service.set("serviceBuyer", user);
						}
						service.save();
					},
					error: function (error){
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

function populateViewModal(userId) {
	sessionStorage.setItem("userView", userId);

	Parse.Cloud.run('getUserId', { objectId: userId }, {
		success: function(user) {

			// Do something with the returned Parse.Object values
			//console.log(user.get("firstName"));

			$("#modalName").html(user.get("firstName") + " " + user.get("lastName"));
			$("#email").html(user.get("email"));
			$("#cellphone").html(user.get("cellphone"));

			try {
				$("#popup-profileImage")[0].src = user.get("profileImage").url();
			} catch (e) {

			} finally {

			}


			var review = Parse.Object.extend("Review");
			var query = new Parse.Query(review);
			query.equalTo("reviewedFor", user);

			query.find({
				success: function (results){
					$("#popup-review-list").html("");
					var template = Handlebars.compile($("#popup-review-template").html());
					$(results).each(function (i,e){
						var q = e.toJSON();


						$("#popup-review-list").append(template(q));
					})

				},
				error: function(error){
					console.log(error.message);
				}
			})

		},
		error: function(error) {
			console.log(error.message);
		}
	});
}


function getUser(userId) {
	sessionStorage.setItem("userPage", userId);

	Parse.Cloud.run('getUserId', { objectId: userId }, {
	    success: function(user) {

	        // Do something with the returned Parse.Object values
					//console.log(user.get("firstName"));

					$("#userName").html(user.get("firstName") + " " + user.get("lastName"));
					$("#userEmail").html(user.get("email"));
					$("#userCellphone").html(user.get("cellphone"));

					try {
			        $("#profile-picture-service")[0].src = user.get("profileImage").url();
			    } catch (e) {

			    } finally {

			    }


					if (user.get("firstName") == Parse.User.current().get("firstName")){
						console.log("same");
						$("#apply-for-job").hide();
						$("#user_confirm").show();

					}else{
						console.log("not same");
						$("#leave-review2").attr("style","visibility:visible;");
						$("#leave-review").show();
						$("#apply-for-job").show();
						$("#user_confirm").hide();
					}

					var review = Parse.Object.extend("Review");
					var query = new Parse.Query(review);
					query.equalTo("reviewedFor", user);

					query.find({
				    success: function (results){
				      $("#main-review-list").html("");
				      var template = Handlebars.compile($("#main-review-template").html());
				      $(results).each(function (i,e){
				        var q = e.toJSON();


				        $("#main-review-list").append(template(q));
				      })

				    },
				    error: function(error){
				      console.log(error.message);
				    }
				  })


	    },
	    error: function(error) {
				console.log(error.message);
	    }
	});

}
function leaveReview (){
	var userId = sessionStorage.getItem("userPage");
	var Review = Parse.Object.extend("Review")
	var review = new Review();
	//var query = new Parse.Query(review);



	Parse.Cloud.run('getUserId', { objectId: userId }, {
		success: function (user){
			console.log( $("#service-description").val())
			review.set("review", $("#service-description").val());

			review.set("rating", parseInt($("#review-rating option:selected").val()));
		//	alert();
			review.set("reviewedBy", Parse.User.current());
			//alert();
			review.set("reviewedFor", user);
			//alert();
			review.save();
			//alert();
		},
		error: function (user) {

		}

	});


}

$(document).ready(function(){
	var id = 	sessionStorage.getItem("serviceId");
	var currentUser = sessionStorage.getItem("currentUser");
	console.log("USUARIO"+currentUser);





	getService(id);


	//var qs = new Querystring();
//	var v1 = qs.get("objectId");

	console.log("este e o id"+ id);
	$("#contract_confirm").on("click", function (e) {
		e.preventDefault();
		//alert();
		applyForTheJob(id);
	});

	$("#user_confirm").on("click", function (e){
		e.preventDefault();
		$("#user_modal").hide();
		$("#contract_confirm2").on("click",function(e){
			applyForTheJobTwo(id);

		})
	});

	$("#confirm-review").on("click", function(e){
		e.preventDefault();
		 leaveReview();
	});


})
