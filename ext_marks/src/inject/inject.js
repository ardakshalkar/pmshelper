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
		    $(".modTitle").append("<textarea id='pasteBin'></textarea>");
		    //$(".modTitle").append();
				$(document).on('click',"#recount",function(){
					$(".clsTbl tr td").on("keyup",'input',function(){
						console.log("Do it");
						console.log($(this).val());
						var m1 = $(this).parent().parent().children().eq(6).html();
						var m2 = $(this).parent().parent().children().eq(7).html();
						var m3 = $(this).val();
						var total = Math.floor(m1*0.3+m2*0.3+m3*0.4);
						console.log(total)
						$(this).parent().parent().children().eq(11).html(total);
					});
				});
				$(document.body).append("<button id='recount' style='position:fixed;top:0px;right:200px;'>Recount</button>");

				$("#recount").click(function(){
							$(".clsTbl tr").each(function(){
								//console.log($(this).children(":eq(0)"));
								var m1 = $(this).children().eq(6).html();
								var m2 = $(this).children().eq(7).html();
								var m3 = $(this).children().eq(8).html();

								var m3val = $(this).children().eq(8).children().eq(0).val();
								console.log(m3val);
								//console.log(m1+" "+m2+" "+m3);
								$(this).children().eq(11).html(Math.floor(m1*0.3+m2*0.3+m3val*0.4));

							});
				});
		    $("#pasteBin").change(function(){
		        let data = $(this).val();
		        let lines = data.split("\n");
		        //console.log(lines.length);
		        for (let i=0;i<lines.length;i++){
		            let line = lines[i];
		            let parts = line.split(" ");
		            console.log(parts.length);
								let grade = 0;
								let name_surname = "undefined";
								if (parts.length == 3){
									name_surname = parts[0].trim()+" "+parts[1].trim();
									grade = parts[2].trim();
								}
								else if (parts.length == 2){
									console.log("--->"+parts[1]+parts[1].split("\t"));
									name_surname = parts[0].trim()+" "+parts[1].split("\t")[0].trim();
									grade = parts[1].split("\t")[1].trim();
									console.log(name_surname+"<>"+grade);
								}
								else{
									continue;
								}
		            //console.log(parts[0]+parts[1]);

		            if (grade>100)
		                grade = 100;
		            $(".clsTbl tr td:contains('"+name_surname+"')").css("background-color","#FFFF99");
		            //$(".clsTbl tr td:contains('"+name_surname+"')").parent().children("td").has("input[type='text']").val(grade);
		            $(".clsTbl tr td:contains('"+name_surname+"')").parent().children("td").has("input").eq(1).children().eq(0).val(""+grade);
		        }
		        // console.log($(this).val());
		    });
		})();
	}
	}, 10);
});
