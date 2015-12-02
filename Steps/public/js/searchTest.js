function getInfo(searchWord){
  sessionStorage.myValue = $("#searchTerm").val();
  //document.location.href = "searchResultsPage.html";

}
function getServices () {

  var searchedWord = sessionStorage.myValue;
  console.log(searchedWord);
  Parse.Cloud.run('queryServices', { serviceQuery: searchedWord }, {
    success: function(results) {
      $("#services-result-list").html("");
      var template = Handlebars.compile($("#services-result-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#services-result-list").append(template(q));
      })


      },
      error: function (error) {
        console.log(error.message);
      }
  });

/*  var services = Parse.Object.extend("service");
  var mainQuery = new Parse.Query(services);


  mainQuery.equalTo("serviceState", "open");




  mainQuery.find({
    success: function (results){
      $("#services-result-list").html("");
      var template = Handlebars.compile($("#services-result-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#services-result-list").append(template(q));
      })

    },
    error: function(error){
      console.log(error.message);
    }
  })*/

  }

function linkToServicePage(serviceId){
 console.log(serviceId);
 sessionStorage.setItem("serviceId", serviceId);
 document.location.href = "servicePage.html";
}

$(document).ready(function () {
  getServices();
})
