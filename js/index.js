(function(){


	let c1 = app.getComponente('c1');
	console.log(c1);
	let $ctrl = c1.$ctrl;

		var caixaImagem = "";
		var primeiraCartaVirada = "";
		var paresAchados = 0;
		var contadorTentativas = 0;
		var contadorErros = 0;
		var contadorAcertos = 0;
		let paresTotais = 8;
		var tempototal = 0;
		var Source = "#divCards";
		var imagens = [
		 	 "img/img1.png",
			 "img/img2.png",
		 	 "img/img3.png",
		 	 "img/img4.png",
		   "img/img5.png",
		   "img/img6.png",
		   "img/img7.png",
		   "img/img8.png"
		];

			$ctrl.iniciar = function ResetarJogo() {
			pegar();
			Embaralhar();
			$(Source + " div img").show(3000);
			$(Source + " div img").hide(400);
			$(Source + " div").css("visibility", "visible");
			$("#success").remove();
			caixaImagem = "";
			primeiraCartaVirada = "";
			paresAchados = 0;
			return false;
		}

		function calcTempo(a, b){
			tempototal = b - a;
			return tempototal;
		}




		function amostraCarta(divCartas) {
			$("#"+divCartas).toggle();
			$("#" + id + " img").fadeIn('fast');
			}

		function VirarCarta() {
			var tempoInicio = performance.now();
			var id = $(this).attr("id");

						if ($("#" + id + " img").is(":hidden")) {
							$(Source + " div").unbind("click", VirarCarta);
							$("#" + id + " img").slideDown('fast');
							if (primeiraCartaVirada == "") {
								caixaImagem = id;
								primeiraCartaVirada = $("#" + id + " img").attr("src");
								setTimeout(function() {
									$(Source + " div").bind("click", VirarCarta)
								}, 400);
							} else {
								segundaCartaVirada = $("#" + id + " img").attr("src");
								if (primeiraCartaVirada != segundaCartaVirada) {
									setTimeout(function() {
										$("#" + id + " img").slideUp('fast');
										$("#" + caixaImagem + " img").slideUp('fast');
										caixaImagem = "";
										primeiraCartaVirada = "";
										contadorErros++;

									}, 700);
								} else {
									$("#" + id + " img").parent().css("visibility", "visible");
									$("#" + caixaImagem + " img").parent().css("visibility", "visible");
									caixaImagem = "";
									primeiraCartaVirada = "";
									paresAchados++;
								}
								setTimeout(function() {
									$(Source + " div").bind("click", VirarCarta)
								}, 700);
							}

							if (contadorTentativas === parseInt(contadorTentativas,10)) {

							}
								if (paresAchados == paresTotais) {
								 var tempoFinal = performance.now();
								 calcTempo(tempoInicio, tempoFinal);


								alert("Parabéns, você ganhou o jogo! Suas estatísticas: \n"
									+ "\nTempo: " + tempototal + "segundos");

								Save();

							}
						}
					}

		function RandomFunction(MaxValue, MinValue) {
				return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
			}
		function Embaralhar() {

			var ImgAll = $(Source).children();
			var ImgThis = $(Source + " div:first-child");
			var ImgArr = new Array();

			for (var i = 0; i < ImgAll.length; i++) {
				ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
				ImgThis = ImgThis.next();
			}

				ImgThis = $(Source + " div:first-child");

			for (var z = 0; z < ImgAll.length; z++) {
			var RandomNumber = RandomFunction(0, ImgArr.length - 1);

				$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
				ImgArr.splice(RandomNumber, 1);
				ImgThis = ImgThis.next();
			}
		}



		$(function() {

		for (var y = 1; y < 3 ; y++) {
			$.each(imagens, function(i, val) {
				$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
			});
		}
			$(Source + " div").click(VirarCarta);
			Embaralhar();
		});



		function Save(){

		var objLS = ("Tempo em ms :" + milisegundos);
		var tempo1 = JSON.parse(localStorage.getItem('objLS'));

		if (tempo1 == null) {
			localStorage.setItem('objLS', JSON.stringify(objLS));
		} else {
				if (objLS <= tempo1) {
						localStorage.setItem('objLS', JSON.stringify(objLS));
						}
				}
		}

		function pegar(){
			var retrievedObject = JSON.parse(localStorage.getItem('objLS'));
				$("#ultimaEstat").html("" + retrievedObject)
				console.log('retrievedObject: ', retrievedObject)
		}



})();
