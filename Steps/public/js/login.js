function newLogin () {

    var name = $("#exampleInputEmail2").val();
    var pass = $("#exampleInputPassword2").val();
    Parse.User.logIn(name, pass, {

      success:function(user){
          console.log("login successfull");
          if(checkEmail()){
            console.log(checkEmail());
            document.location.href = "userProfile.html";
          }



    },
      error: function(user, error){
          console.log(error.message);
          $("#errorMessage").html(error.message);
      }
    })
  }

function checkEmail(){

  var emailOk;
	if (Parse.User.current().get("emailVerified")){
		//location.reload();
    console.log("emailOk");
    emailOk = true;

	}else{
		$("#errorMessage").html("Please, verify your email before login");
    Parse.User.logOut();
    emailOk = false;
	}
  return emailOk;
}

function checkUser(){
  if (Parse.User.current()){
    var user = Parse.User.current();
      isLoggedIn = true;

      user.fetch({
          success: function(user) {
              // change navbar name in the left
              $("#navBarName").html(user.get("firstName")+" ");

              //change names in the profile page

              try {
                  $("#profilePic")[0].src = user.get("profileImage").url();
              } catch (e) {

              } finally {

              }

              $("#profileName").html(user.get("firstName")+" "+user.get("lastName"));
              $("#profileCellphone").html(user.get("cellphone"));
              $("#profileEmail").html(user.get("email"));

          },
          error: function(myObject, error) {
              // The object was not refreshed successfully.
              // error is a Parse.Error with an error code and message.
          }
      });


    console.log(isLoggedIn);
  }

}

$(document).ready(function(){
  isLoggedIn = false;
  checkUser();

	$("#login-nav").submit(function(e){
		e.preventDefault();
		newLogin();
		//checkEmail();

	})




})

function logOut() {
  Parse.User.logOut();
  document.location.href = "index.html";

}

//exampleInputEmail2
//exampleInputPassword2
