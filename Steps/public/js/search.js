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

    },
    error: function(error) {
    }
});


function writeResults() {

    return html;
}


