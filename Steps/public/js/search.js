/**
 * Created by shahbazkhan on 11/23/15.
 */


    var services = [];

function getQuery() {

    var searchedWord = $("#searchTerm").val();

    var ReturnedResults = Parse.Object.extend("service");

    var query = new Parse.Query(ReturnedResults);

    query.contains("name", searchedWord);

    query.find({
        success: function(services) {
            for (var i = 0; i < services.length; i++) {
                // This does not require a network access.
                 services.push(comments[i]);
            }
        }
    });

}

function writeResults() {



    return html;
}


