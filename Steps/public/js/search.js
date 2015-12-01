/**
 * Created by shahbazkhan on 11/23/15.
 */

//
//$(document).ready ( function(){
//    alert('ok');
//});​



function writeResults(searchedWord) {
// var searchedWord = $("#searchTerm").val();
window.location = "searchResultsPage.html";
console.log(searchedWord);

Parse.Cloud.run('queryServices', { serviceQuery: searchedWord }, {
    success: function(results) {
        alert("Successfully retrieved " + results.length + " results.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
            var object = results[i];
            alert(object.id + ' - ' + object.get('name'));
        }

    },
    error: function(error) {
    }
});


    //return html;
}
