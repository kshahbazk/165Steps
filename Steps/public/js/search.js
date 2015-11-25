/**
 * Created by shahbazkhan on 11/23/15.
 */


    var services = [];

function search() {

    var searchedWord = $("#searchTerm").val();

    var ReturnedResults = Parse.Object.extend("service");

    var query = new Parse.Query(ReturnedResults);

    query.contains("name", searchedWord);

    query.find({
        success: function(comments) {
            for (var i = 0; i < comments.length; i++) {
                // This does not require a network access.
                 services.push(comments[i]);
            }
        }
    });

}

