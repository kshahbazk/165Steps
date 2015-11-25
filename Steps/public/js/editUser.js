$(document).ready(function(){
  //alert();
  var user = Parse.User.current();

  // settin actual user data
  $("#firstNameSpan").html(user.get("firstName"));
  $("#profilePic")[0].src = user.get("profileImage").url();
  $("#lastNameSpan").html(user.get("lastName"));
  $("#emailSpan").html(user.get("email"));
  $("#phoneSpan").html(user.get("cellphone"));



  // html elements visibility controll
  $(".inputEdit").hide();
  $(".controlbtn").hide();
  $("#upload-file").hide();

  //FIRST NAME saving controll
  $("#editFirstName").on("click", function (e) {
    e.preventDefault();
    $("#editFirstName").hide();
    $("#firstNameSpan").hide();
    $("#inputFirstName").show();
    $("#saveFirstName").show();
    $("#cancelSaveFirstName").show();

    $("#cancelSaveFirstName").on("click",function (){
      $("#editFirstName").show();
      $("#firstNameSpan").show();
      $("#inputFirstName").hide();
      $("#saveFirstName").hide();
      $("#cancelSaveFirstName").hide();
    })

    $("#saveFirstName").on("click", function(e){
      e.preventDefault();
      saveFirstName();
      //change name span
      $("#firstNameSpan").html(user.get("firstName"));
      //control html elements visibility
      $("#editFirstName").show();
      $("#firstNameSpan").show();
      $("#inputFirstName").hide();
      $("#saveFirstName").hide();
      $("#cancelSaveFirstName").hide();

    })
  })

  // ----LAST NAME saving controll----
  $("#editLastName").on("click", function (e) {
    e.preventDefault();
    $("#editLastName").hide();
    $("#lastNameSpan").hide();
    $("#inputLastName").show();
    $("#saveLastName").show();
    $("#cancelSaveLastName").show();

    //cancel edit last name events
    $("#cancelSaveLastName").on("click",function (e){
      e.preventDefault();
      $("#editLastName").show();
      $("#lastNameSpan").show();
      $("#inputLastName").hide();
      $("#saveLastName").hide();
      $("#cancelSaveLastName").hide();
    })
    //save edit last name events
    $("#saveLastName").on("click",function(e){
      e.preventDefault();
      saveLastName();
      //change last name span
      $("#lastNameSpan").html(user.get("lastName"));

      //control html elements visibiliyy
      $("#editLastName").show();
      $("#lastNameSpan").show();
      $("#inputLastName").hide();
      $("#saveLastName").hide();
      $("#cancelSaveLastName").hide();
    })
  })

  // -- CELLPHONE saving control

  $("#editPhone").on("click", function (e) {
    e.preventDefault();
    $("#editPhone").hide();
    $("#phoneSpan").hide();
    $("#inputPhone").show();
    $("#savePhone").show();
    $("#cancelSavePhone").show();

    //cancel edit last name events
    $("#cancelSavePhone").on("click",function (e){
      e.preventDefault();
      $("#editPhone").show();
      $("#PhoneSpan").show();
      $("#inputPhone").hide();
      $("#savePhone").hide();
      $("#cancelSavePhone").hide();
    })
    //save edit last name events
    $("#savePhone").on("click",function(e){
      e.preventDefault();
      savePhone();
      //change last name span
      $("#phoneSpan").html(user.get("Phone"));

      //control html elements visibiliyy
      $("#editPhone").show();
      $("#phoneSpan").show();
      $("#inputPhone").hide();
      $("#savePhone").hide();
      $("#cancelSavePhone").hide();
    })
  })


  //----PASSWORD saving control ---
  $("#editPassword").on("click", function (e) {
    e.preventDefault();
    //html intial visbility controll
    $("#editPassword").hide();
    $("#passwordSpan").hide();
    $(".inputEditPassword").show();
    $("#savePassword").show();
    $("#cancelSavePassword").show();

    // cancel edit password
    $("#cancelSavePassword").on("click",function (){
      $("#editPassword").show();
      $("#passwordSpan").show();
      $(".inputEditPassword").hide();
      $("#savePassword").hide();
      $("#cancelSavePassword").hide();
    })

    // save password
    $("#savePassword").on("click", function(e){
      e.preventDefault();
      savePassword();

      $("#editPassword").show();
      $("#passwordSpan").show();
      $(".inputEditPassword").hide();
      $("#savePassword").hide();
      $("#cancelSavePassword").hide();


    })

  })

  // -- PROFILE PICTURE saving controll
  $("#change-picture").on("click", function(e){
    e.preventDefault();
    $("#upload-file").show();
    $("#profilePic").hide();
    $("#change-picture").hide();
    $("#savePicture").show();
    $("#cancelSavePicture").show();

    //cancel edit picture
    $("#cancelSavePicture").on("click", function (e){
      e.preventDefault();
      $("#upload-file").hide();
      $("#profilePic").show();
      $("#change-picture").show();
      $("#savePicture").hide();
      $("#cancelSavePicture").hide();
    })

    $("#savePicture").on("click", function(e){
      e.preventDefault();
      savePicture();

      $("#profilePic")[0].src = user.get("profileImage").url();

      $("#upload-file").hide();
      $("#profilePic").show();
      $("#change-picture").show();
      $("#savePicture").hide();
      $("#cancelSavePicture").hide();

    })

  });



})

function savePicture () {
  alert();
  var user = Parse.User.current();
  var value = false;

  var fileUploadControl = $("#upload-file")[0];
  var parseFile;
  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var name = "photo.jpg";

    parseFile = new Parse.File(name, file);
  }
  user.set("profileImage",parseFile);

  user.save(null,{
    success: function(user){

      console.log("picture success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });
  return value;
}

function saveFirstName (){
  //alert();
  var user = Parse.User.current();
  var firstName = $("#inputFirstName").val();
  var value = false;
  user.set("firstName",firstName);

  /*user.save(null,{
    success: function(){

      console.log("success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });*/

  user.save()
  .then(
    function(user) {
      return user.fetch();
    }
  )
  .then(
    function(user) {
      console.log('Password changed', user);
    },
    function(error) {
      console.log('Something went wrong', error);
    }
  );
  return value;

}

function saveLastName () {
  var user = Parse.User.current();
  var lastName = $("#inputLastName").val();
  var value = false;
  user.set("lastName",lastName);

  user.save(null,{
    success: function(user){

      console.log("success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });
  return value;

}

function savePhone () {
  var user = Parse.User.current();
  var  phone = $("#inputPhone").val();
  var value = false;
  user.set("cellphone", phone);

  user.save(null,{
    success: function(user){

      console.log("phone success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });
  return value;
}

function savePassword () {
  var password = $("#inputPassword").val();
  var confirmPassword = $("#confirmPassword").val();
  var user = Parse.User.current();
  // variable for return value boolean
  var value = false;
  // checking password and confirm password
  if(password == confirmPassword){

		user.set("password", password);
    user.save(null,{
      success: function(){

        console.log("success saved password");
        value = true;
      },
      error: function (error){
        console.error(error.message);
      }
    });
	}else{
		console.log("password doesn't matches"); //development test
	}
  return value;
}
