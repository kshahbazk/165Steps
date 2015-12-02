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
      console.log(results.length);
      var template = Handlebars.compile($("#services-result-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();


        $("#services-result-list").append(template(q));
        console.log(q);
      })
      if(results.length == 0){
        console.log("no results");
        $("#services-result-list").replaceWith( "<h2 style='text-align: center;'>No results for that search</h2>" );

      }

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
 sessionStorage.setItem("currentUser", false);
 document.location.href = "servicePage.html";
}

$(document).ready(function () {
  getServices();
})
