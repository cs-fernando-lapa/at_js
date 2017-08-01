(function(){

	var boxImg = "";
	var firstTurned = "";
	var pairs = 0;
	var counterTry = 0;
	var counterError = 0;
	let pairsTotal = 8;
	var finalTime = 0;
	var src = "#showCards";
	var images = [
		"img/img1.png",
		"img/img2.png",
		"img/img3.png",
		"img/img4.png",
		"img/img5.png",
		"img/img6.png",
		"img/img7.png",
		"img/img8.png"
	];

	let c1 = app.getComponente('c1');
	console.log(c1);
	let $ctrl = c1.$ctrl;



	$ctrl.start = function ResetGame() {
		getCards();
		shuffle();
		$(src + " div img").show(3000);
		$(src + " div img").hide(400);
		$(src + " div").css("visibility", "visible");
		$("#success").remove();
		boxImg = "";
		firstTurned = "";
		pairs = 0;
		return false;
	}


	function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	function shuffle() {

		var ImgAll = $(src).children();
		var ImgThis = $(src + " div:first-child");
		var ImgArr = new Array();

		for (var i = 0; i < ImgAll.length; i++) {
			ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
			ImgThis = ImgThis.next();
		}

		ImgThis = $(src + " div:first-child");

		for (var z = 0; z < ImgAll.length; z++) {
			var RandomNumber = RandomFunction(0, ImgArr.length - 1);

			$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
			ImgArr.splice(RandomNumber, 1);
			ImgThis = ImgThis.next();
		}
	}

	function calcTime(a, b){
		finalTime = b - a;
		return finalTime;
	}



	function turnCard() {
		var initTime = performance.now();
		var id = $(this).attr("id");
		if ($("#" + id + " img").is(":hidden")) {
			$(src + " div").unbind("click", turnCard);
			$("#" + id + " img").slideDown('fast');
			if (firstTurned == "") {
				boxImg = id;
				firstTurned = $("#" + id + " img").attr("src");
				setTimeout(function() {
					$(src + " div").bind("click", turnCard)
				}, 400);
			} else {
				secondTurned = $("#" + id + " img").attr("src");
				if (firstTurned != secondTurned) {
					setTimeout(function() {
						$("#" + id + " img").slideUp('fast');
						$("#" + boxImg + " img").slideUp('fast');
						boxImg = "";
						firstTurned = "";
						counterError++;

					}, 700);
				} else {
					$("#" + id + " img").parent().css("visibility", "visible");
					$("#" + boxImg + " img").parent().css("visibility", "visible");
					boxImg = "";
					firstTurned = "";
					pairs++;
				}
				setTimeout(function() {
					$(src + " div").bind("click", turnCard)
				}, 700);
			}

			if (counterTry === parseInt(counterTry,10)) {

			}
			if (pairs == pairsTotal) {
				var endTime = performance.now();
				calcTime(initTime, endTime);


				alert("Parabéns, você ganhou o jogo! Suas estatísticas: \n"
				+ "\nTempo: " + finalTime + "Ms");

				Save();

			}
		}
	}

	$(function() {

		for (var y = 1; y < 3 ; y++) {
			$.each(images, function(i, val) {
				$(src).append("<div id=card" + y + i + "><img src=" + val + " />");
			});
		}
		$(src + " div").click(turnCard);
		shuffle();
	});



	function Save(){

		var objLS = ("Tempo em ms :" + finalTime);
		var tempo1 = JSON.parse(localStorage.getItem('objLS'));

		if (tempo1 == null) {
			localStorage.setItem('objLS', JSON.stringify(objLS));
		} else {
			if (objLS <= tempo1) {
				localStorage.setItem('objLS', JSON.stringify(objLS));
			}
		}
	}

	function getCards(){
		var retrievedObject = JSON.parse(localStorage.getItem('objLS'));
		$("#ultimaEstat").html("" + retrievedObject)
		console.log('retrievedObject: ', retrievedObject)
	}



})();
