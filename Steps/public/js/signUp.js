

function signUp(){
	// variables to control de events in the front-end
	if(Parse.User.current()){
		Parse.User.logOut();
	}
	var passwordMatchesWithConfirmPassword = false;
	var emailIsFromSJSU = false;

	var firstName = $("#inputFirstName").val();
	var lastName = $("#inputLastName").val();
	var email = $("#inputEmail").val();
	var password = $("#inputPassword").val();
	var confirmPassword = $("#confirmPassword").val();

	var user = new Parse.User();




	user.set("username",email);
	user.set("firstName",firstName);
	user.set("lastName",lastName);

	//check password
	if(password == confirmPassword){
		user.set("password", password);
		passwordMatchesWithConfirmPassword = true;
	}else{
		console.log("password doesn`t matches"); //development test
	}

	var emailSubstract = email.slice(email.length-8, email.length);

	//check email
	if(emailSubstract == "sjsu.edu"){

		user.set("email",email);
		emailIsFromSJSU = true;
	}else{
		if($("#emailInput").hasClass("has-success"))
		{
			$("#emailInput").removeClass("has-success");
		}
		$("#emailInput").addClass("has-error");
		console.log("email is not from SJSU"); //development test
	}



	if((emailIsFromSJSU == true) && (passwordMatchesWithConfirmPassword == true)){
			user.signUp(null,{
			success: function(user){
				console.log("signup succesfull");
				document.location.href = "index.html";

		},
			error: function(user, error){
				console.log(error.message);
				$("#errorMessage").html(error.message);
			}
		})
	}



}

function validateEmail(){

	var email = $("#inputEmail").val();
	var emailSubstract = email.slice(email.length-8, email.length);

	//check email
	if(emailSubstract == "sjsu.edu"){
		if($("#emailInput").hasClass("has-error"))
		{
			$("#emailInput").removeClass("has-error");
		}
		$(".glyphicon-ok").show();
		$(".glyphicon-remove").hide();
		$("#emailInput").addClass("has-success");
	}else{
		if($("#emailInput").hasClass("has-success"))
		{
			$("#emailInput").removeClass("has-success");
		}
		$(".glyphicon-ok").hide();
		$(".glyphicon-remove").show();
		$("#emailInput").addClass("has-error");
	}

	if(email == "")
	{
		$(".glyphicon").hide();
			$("#emailInput").removeClass("has-error");
			$("#emailInput").removeClass("has-success");
	}

}

$(document).ready(function(){

	$(".glyphicon").hide();


	$("#signUp").submit(function(event){
		event.preventDefault();

		signUp();

	});

	var email = $("#inputEmail").val();
	var emailSubstract = email.slice(email.length-8, email.length);

	$("#inputEmail").live("keypress", function(e){

			if(emailSubstract == "sjsu.edu"){
				$("#inputEmail").addClass('has-success');
			}else{
				$("#inputEmail").addClass('has-error');
			}

	});
});
