var arr = [];
var arrayForServicesId = [];
$(function(){
	//newLogin();

	 if (Parse.User.current()){
	 	getRequestedServices();
	 	getServices();
	 }
	 

	 if(isLoggedIn)
	 {
		$(".ifLoggedIn").show();
		$(".ifNotLoggedIn").hide();
		$("#editPageBtn").show();
	 }
	 else
	 {
		$(".ifLoggedIn").hide();
		$(".ifNotLoggedIn").show();
	 }

	 //Parse.User.logOut();
	 if(isUser)
		{
			$("#editPageBtn").show();
		}

	$('#addBtnForPref').on('click', function(){
		var idString = "list" + count;
		var idString2 = "rlist" + count;
		var idString3 = "reqlist" + count;
		var idString4 = "histlist" + count;

		var PrefListItemEdit = document.createElement("div");
		PrefListItemEdit.setAttribute("id",idString);
		PrefListItemEdit.setAttribute("class","input-group theInput");
		PrefListItemEdit.innerHTML = "<input class='forforms' placeholder='&nbsp;&nbsp;&nbsp;Insert Service here...' id='input"+count+"' style='width:100%; padding:0px; margin:0px;'>"+
		"<span class='input-group-btn' id='redBtn'>"+
		  "<button type='button' class='btn btn-danger btn-number' data-type='plus' id='add"+count+"' onClick='sub("+idString+","+idString2+")'>"+
			  "<span class='glyphicon glyphicon-minus'>"+"</span>"+
		  "</button>"+
	  "</span>";

	  /*var prefServListItem = createServicePref(idString2, "a");
	  for(i=0;i<5;i++)
	  {
			var servReqListItem = createServReq();
	  }*/

	  var prefServListItem = document.createElement("a");
	  prefServListItem.setAttribute("id",idString2);
	  prefServListItem.setAttribute("class","list-group-item editableListPref");
	  prefServListItem.setAttribute("value",count);
	  prefServListItem.setAttribute("style","display:none;");
	  prefServListItem.innerHTML = "<font id='actual"+count+"'></font><span class='badge'>50</span>";


		count++;
		$("#list").prepend(PrefListItemEdit);
		$("#list").prepend(prefServListItem);
	});
 });



 function createServiceHistory(idString, link, desc, date){
	 var c = document.createElement("a");
	  c.setAttribute("id",idString);
	  c.setAttribute("class","list-group-item editableListCreate");
	  //c.setAttribute("href",link);
	  c.setAttribute("style","display:none;");
	  c.innerHTML = "<font id='actual"+count+"'>"+desc+"</font><span class='badge'>"+date+"</span>";
	  return c;
 }

 function createServiceReq(idString, link, desc){
	 var c = document.createElement("a");
	  c.setAttribute("id",idString);
	  c.setAttribute("class","list-group-item editableListReq");
	  //c.setAttribute("href",link);
	  c.setAttribute("style","display:none;");
	  c.innerHTML = "<font id='actual"+count+"'>"+desc+"</font>";
	  return c;
 }

 function createServicePref(idString, desc){
	 var c = document.createElement("a");
	  c.setAttribute("id",idString);
	  c.setAttribute("class","list-group-item editableListHist");
	  c.setAttribute("style","display:none;");
	  c.innerHTML = "<font id='actual"+count+"'>"+desc+"</font>";
	  return c;
 }

 function editHide(){
	 $(".forforms").removeAttr("readonly");
	 $("#editBtnForPref").hide();
	 $("#saveBtnForPref").show();
	 $("#addBtnForPref").show();
	 $(".input-group-btn").show();
	 $(".editableListPref").hide();
	 for(i=0;i<count;i++)
	 {
		 if($("#input"+i).val()!="")
		 {
			 $("#list"+i).show();
		 }
	 }
 }

  function saveHide(){
	 $(".forforms").prop("readonly", true);
	 $("#editBtnForPref").show();
	 $("#saveBtnForPref").hide();
	 $("#addBtnForPref").hide();
	 $(".editableListPref").show();
	 $(".input-group-btn").hide();

	 for(i=0;i<count;i++)
	 {
		 $("#actual"+i).text($("#input"+i).val());
		 $("#list"+i).hide();
		 arr.push($("#input"+i).val());
		 if($("#input"+i).val() == "")
		 {
			 $("#rlist"+i).hide();

			$("#add"+i).hide();
		 }
	 }
  }

function sub(theID, theID2){

	   $(document.getElementById(theID.getAttribute("id"))).remove();
	 $(document.getElementById(theID.getAttribute("id"))).hide();
	 $(document.getElementById(theID2.getAttribute("id"))).remove();
	 $(document.getElementById(theID2.getAttribute("id"))).hide();
 }

 function editPage(){
	 $("#editBtnForPref").show();
	 $("#editPageBtn").hide();
	 $("#savePageBtn").show();
 }

 function savePage(){
	 saveHide();
	 $("#editBtnForPref").hide();
	 $("#savePageBtn").hide();
	 $("#editPageBtn").show();
}


// backend stuff



 function getRequestedServices(){

	var services = Parse.Object.extend("requestedServices");
	var query = new Parse.Query(services);

	query.equalTo("user", Parse.User.current());

	query.find({
    success: function (results){
      $("#reqList").html("");
      var template = Handlebars.compile($("#requested-post-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();

        $("#reqList").append(template(q));
      })

    },
    error: function(error){
      console.log(error.message);
    }
  })

}

function getServices(){

	var services = Parse.Object.extend("service");
	var querySeller = new Parse.Query(services);
	var queryBuyer = new Parse.Query(services);

	querySeller.equalTo("serviceSeller", Parse.User.current());
	queryBuyer.equalTo("serviceBuyer", Parse.User.current());

	var mainQuery = Parse.Query.or(queryBuyer,querySeller);

	mainQuery.find({
    success: function (results){
      $("#histList").html("");
      var template = Handlebars.compile($("#history-post-template").html());
      $(results).each(function (i,e){
        var q = e.toJSON();
        for (var i=0; i< results.length ; i++){
        	var object = results[i];
        	arrayForServicesId.push(object.id);
        	console.log(object.id);
        }

        $("#histList").append(template(q));
      })

    },
    error: function(error){
      console.log(error.message);
    }
  })

}

 function linkToServicePage(serviceId){
	console.log(serviceId);
	sessionStorage.setItem("serviceId", serviceId);
	document.location.href = "servicePage.html";
}
