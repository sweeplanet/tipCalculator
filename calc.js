/*Inicializamos variables globales*/
var bill = 0;
var totalNumPersonas = 0;
var valorTipPct = 0;
var valorTipNum = 0;

/*Detección de eventos en pantalla*/
/*En el momento que el mouse entra en el bloque para introducir el número de personas debe aparecer el mensaje
"Can't be zero". Para ello añadimos una nueva clase al elemento para cambiar el opacity a '1'. Cuando el mouse sale
del mismo recuadro se vuelve a eliminar la clase añadida*/
$(".second-input").hover(
  function() {
    $(".cant_be_zero").addClass("cant_be_zero_op");;
  },
  function() {
    $(".cant_be_zero").removeClass("cant_be_zero_op");;
  }
);

/*Una vez insertado un valor en el recuadro del total de la factura lo recogemos en la variable "bill" y cambiamos el estilo
del recuadro añadiendo al elemento una nueva clase "inputinsert". Por ultimo llamamos a la función para el cálculo del total
de factura por persona y total de propina por persona.*/
$("#billinput").on("input", function() {
  bill = parseFloat($("#billinput").val());
  $("#billinput").addClass("inputinsert");
  calcular();
});

/*Una vez insertado un valor en el recuadro del total de numero de personas lo recogemos en la variable "totalNumPersonas" y
cambiamos el estilo del recuadro añadiendo al elemento una nueva clase "inputinsert".Por ultimo llamamos a la función
para el cálculo del totalde factura por persona y total de propina por persona.*/
$("#numberpersoninput").on("input", function() {
  totalNumPersonas = parseInt($("#numberpersoninput").val());
  $("#numberpersoninput").addClass("inputinsert");
  calcular();
});

/*Si insertamos una propina por defecto distinta de los porcentajes de los botones, la recogemos en la variable "valorTipNum" y
ponemos a 0 la variable de "valorTipPct" por si se pulso antes algún boton. Además cambiamos el estilo del recuadro donde
se añade la propina por defecto añadiendo  una nueva clase al elemento "customSelect". Por ultimo llamamos a la función
para el cálculo del total de factura por persona y total de propina por persona.*/
$(".custom").on("input", function(){
  valorTipNum = parseFloat($(".custom").val());
  $(".custom").addClass("customSelect");
  valorTipPct = 0;
  calcular();
});

/*Recogemos el evento del click del mouse en alguno de los botones con las propinas por defecto. Además ponemos a 0 el valor
de la propina numerica por si la introducimos anteriormente.Por ultimo llamamos a la función para el cálculo del total
de factura por persona y total de propina por persona.*/
$(".btn").on("click", function() {
  switch ($(this).html().length) {
    case 2:
        valorTipPct = $(this).html().substr(0, 1) / 100;
        break;
    case 3:
        valorTipPct = $(this).html().substr(0, 2) / 100;
        break;
      default:
        console.log($(this).html().length);
        break;
  }
  valorTipNum = 0;
  $(".custom").removeClass("customSelect");
  $(".custom").val(""); //val("") -> Eliminamos el valor que haya en el elemento ".custom"
  calcular();
});

/*Si pulsamos el boton de "RESET" procedemos a restrablecer todas las variables y textos en pantalla a sus valores
por defecto. Inicializamos la pantalla*/
$(".btn-segunda_columna").on("click", function(){
    $(".btn-segunda_columna").blur(); //blur() -> Hacemos que el botón no se quede pulsado. Lo liberamos tras pulsarlo.
    cleanPantalla();
});

/*Realizamos los cálculos númericos necesarios y los pintamos en sus respectivos elementos dentro de la pantalla*/
function calcular() {
  var billPersona = 0;
  var tipPersona = 0;

  if (valorTipPct !=0){
    billPersona = Math.round(((bill * (1 +valorTipPct) / totalNumPersonas) + Number.EPSILON) * 100) / 100;
    tipPersona = Math.round((((bill * valorTipPct) / totalNumPersonas) + Number.EPSILON) * 100) / 100;
  }else{
    billPersona = Math.round((((bill + valorTipNum) / totalNumPersonas) + Number.EPSILON) * 100) / 100;
    tipPersona = Math.round(((valorTipNum / totalNumPersonas) + Number.EPSILON) * 100) / 100;
  }

  if (totalNumPersonas != 0) {
    $(".tip_final_person").text("$" + billPersona);
    $(".tip_final").text("$" + tipPersona);
  } else {
    $(".tip_final_person").text("$0.00");
    $(".tip_final").text("$0.00");
  }
}

/*Función para limpiar la pantalla una vez pulsado el boton "RESET"*/
function cleanPantalla() {
  bill = 0;
  totalNumPersonas = 0;
  valorTipPct = 0;
  valorTipNum = 0;

  $(".tip_final_person").text("$0.00");
  $(".tip_final").text("$0.00");
  $(".custom").val("");
  $("#billinput").val("");
  $("#numberpersoninput").val("");
}
