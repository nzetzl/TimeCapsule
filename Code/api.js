/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
	'use strict';
	
	var modal = $("#addGroupModal")[0];
	console.log(modal);
	var span = $(".close")[0];
	var groupNameInput = $("#addGroupModal input")[0];
	var groupNameDiv = $("#group");
	
	$("#addGroupName").click(function (){
		
		//display popup to get user input for new group name
		modal.style.display = "block";
	});
	
	$("#submitNewName").click(function () {
		//get data from input
		console.log(groupNameInput.value);
		if (groupNameInput.value !== "") {
			//call lambda function with new group name
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   console.log(xhttp.responseText);
				}
			};
			xhttp.open("POST", "https://31wdumruph.execute-api.us-east-2.amazonaws.com/test/NewGroupName", true);
			var request = {
				"body": groupNameInput.value
			};
			console.log(request);
			xhttp.send(JSON.stringify(request));
			modal.style.display = "none";
			displayAllGroups();
		} else {
			modal.style.display = "none";
		}
	});
	
	$("#GroupButton").click(function () {
		console.log("group clicked");
		$("#personal").fadeOut();
		$("#group").delay(500).fadeIn();
		displayAllGroups();
	});
	
	function displayAllGroups() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			    console.log(xhttp.responseText);
				var obj = JSON.parse(xhttp.responseText);
				console.log(obj);
				$("#group *:not(#addGroupName)").remove();
				for (var i = 0; i < obj.length; i++) {
					var newButton = document.createElement("button");
					newButton.setAttribute("type", "button");
					$(newButton).attr("class", "btn btn-secondary groupType");
					newButton.innerHTML = obj[i];
					var lineBreak = document.createElement("br");
					groupNameDiv.append(lineBreak);
					groupNameDiv.append(newButton);
				}
			}
		};
		xhttp.open("GET", "https://31wdumruph.execute-api.us-east-2.amazonaws.com/test/getgroupnames", true);
		xhttp.send();
	}
	
	$("#PersonalButton").click(function () {
		console.log("personal clicked");
		$("#group").fadeOut();
		$("#personal").delay(500).fadeIn();
	});
	
	window.onclick = function (event) {
		if(event.target === modal) {
			modal.style.display = "none";
		}
	};
	
	span.onclick = function () {
		modal.style.display = "none";
	};

});