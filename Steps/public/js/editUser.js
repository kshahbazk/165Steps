$(document).ready(function(){
  //alert();
  var user = Parse.User.current();

  $("#firstNameSpan").html(user.get("firstName"));

  $("#lastNameSpan").html(user.get("lastName"));
  $("#emailSpan").html(user.get("email"));
  $(".inputEdit").hide();
  $(".controlbtn").hide();

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
  $("#editPassword").on("click", function (e) {
    e.preventDefault();
    $("#editPassword").hide();
    $("#passwordSpan").hide();
    $(".inputEditPassword").show();
    $("#savePassword").show();
    $("#cancelSavePassword").show();
    $("#cancelSavePassword").on("click",function (){
      $("#editPassword").show();
      $("#passwordSpan").show();
      $(".inputEditPassword").hide();
      $("#savePassword").hide();
      $("#cancelSavePassword").hide();
    })

  })





})

function saveFirstName (){
  //alert();
  var user = Parse.User.current();
  var firstName = $("#inputFirstName").val();
  var value = false;
  user.set("firstName",firstName);

  user.save(null,{
    success: function(){

      console.log("success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });
  return value;

}

function saveLastName () {
  var user = Parse.User.current();
  var lastName = $("#inputLastName").val();
  var value = false;
  user.set("lastName",lastName);

  user.save(null,{
    success: function(){

      console.log("success saved");
      value = true;
    },
    error: function (error){
      console.error(error.message);
    }
  });
  return value;

}
