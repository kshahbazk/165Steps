function saveService(){

  var Service = Parse.Object.extend("service");
  var service = new Service();

  var name = $("#serviceName").val();
  var description = $("#serviceDescription").val();
  var deadline = ($("#month").val() + "/" + $("#day").val() + "/" + $("#year").val());
  var price = $("#servicePrice").val();

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

}

$(document).ready(function(){
  $("#createService").submit(function(e){
    e.preventDefault();
    if(Parse.User.current()){
      saveService();
    }

  })

})
