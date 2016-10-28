chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("!!!Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		// ==UserScript==
		// @name         New Userscript
		// @namespace    http://tampermonkey.net/
		// @version      0.1
		// @description  try to take over the world!
		// @author       You
		// @match        https://pms.sdu.edu.kz/index.php?mod=grades
		// @grant        none
		// @require http://code.jquery.com/jquery-latest.js
		// ==/UserScript==
		console.log("Changes");
		(function() {
		    $(".modTitle").css("color","green");
		    $(".modTitle").text("Student operations");
				//$("#tblStudList tr:gt(1) td:nth-child(2)").css("color","green");
				$("#tblStudList tr:gt(1) td:nth-child(2)").css("color","green").each(function(){
					console.log($(this).html());
					var student_id = $(this).html();
					var student_link = $(this).next();
					var popup = $("<div>Hi</div>");
					popup.css("border","1px solid blue").css("position","absolute").css("background-color","white").css("display","none");
					student_link.append(popup);
					student_link.children().first().hover(function(){
						$(this).next().show();
					});
					student_link.children().first().mouseleave(function(){
						$(this).next().hide();
					});
					$.ajax({
						url:"https://pms.sdu.edu.kz/index.php",
						method:"POST",
						data:{ajx:"1",mod:"studops",action:"GetStudGrades",yt:"2016#1",stud_id:student_id}
					}).done(function(msg){
						json_msg = JSON.parse(msg);
						console.log(student_id);
						//console.log(json_msg["DATA"]);
						popup.html(json_msg["DATA"]);
					});
				});
		})();
	}
	}, 10);
});
