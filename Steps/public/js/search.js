/**
 * Created by shahbazkhan on 11/23/15.
 */

var searchedWord = $("#searchTerm").val();

function search() {

    var searchedWord = $("#searchTerm").val();

    var ReturnedResults = Parse.Object.extend("service");

    var query = new Parse.Query(ReturnedResults);

    query.whereMatches("name", "(" + searchedWord + ")", "i").find({
        success: function(comments) {
            // comments now contains the comments for myPost
        }
    });


}

