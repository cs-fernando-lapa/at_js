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



(function(){
  let c1 = app.getComponente('c1');
  console.log(c1);
  let $ctrl = c1.$ctrl;


};)

$ctrl.iniciar = function ResetarJogo() {
pegar();
Embaralhar();
$(Source + " div img").show(300);
$(Source + " div img").hide(600);
$(Source + " div").css("visibility", "visible");
contadorClicks = 0;
contadorTentativas = 0;
contadorAcertos = 0;
contadorErros = 0;
$("#success").remove();
$("#contadorClicks").html("" + contadorClicks);
$("#contadorTentativas").html("" + contadorTentativas);
$("#contadorAcertos").html("" + contadorAcertos);
$("#contadorErros").html("" + contadorErros);
caixaImagem = "";
primeiraCartaVirada = "";
paresAchados = 0;
return false;
}
