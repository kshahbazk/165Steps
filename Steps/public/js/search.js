/**
 * Created by shahbazkhan on 11/23/15.
 */

//
//$(document).ready ( function(){
//    alert('ok');
//});​


var searchedWord = $("#searchTerm").val();

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


function writeResults() {

    return html;
}


