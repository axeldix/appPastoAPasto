var pantalla;
setScreen("ScreenINICIO");
onEvent("btn_Comenzar", "click", function( ) {
  setScreen("screenPaso1");
});
// Eventos paso 1
onEvent("btn_paso2p1", "click", function( ) {
var Fe= getText("text_inputFecha");
var Cartel="msj_errorFecha";
  if (validaFecha(Fe,Cartel)) {
    setScreen("screenPaso2");
  } else {
    showElement("msj_errorFecha");
  }
});
onEvent("btn_paso3p1", "click", function( ) {
var Fe= getText("text_inputFecha");
var Cartel="msj_errorFecha";
  if (validaFecha(Fe,Cartel)) {
    setScreen("screenPaso3");
  } else {
    showElement("msj_errorFecha");
  }
});
onEvent("btn_paso4p1", "click", function( ) {
var Fe= getText("text_inputFecha");
var Cartel="msj_errorFecha";
  if (validaFecha(Fe,Cartel)) {
    setScreen("screenPaso4");
  } else {
    showElement("msj_errorFecha");
  }
});
onEvent("btn_paso5p1", "click", function( ) {
var Fe= getText("text_inputFecha");
var Cartel="msj_errorFecha";
  if (validaFecha(Fe,Cartel)) {
      Calculos();
  } else {
    showElement("msj_errorFecha");
  }
});
onEvent("btn_P1aInicio", "click", function( ) {
  setScreen("screenPreguntaSalir");
  pantalla = "screenPaso1";
});
//Eventos paso 2 
onEvent("btn_Paso1P2", "click", function( ) {
  setScreen("screenPaso1");
});
onEvent("btn_Paso3P2", "click", function( ) {
  setScreen("screenPaso3");
});
onEvent("btn_Paso4P2", "click", function( ) {
  setScreen("screenPaso4");
});
onEvent("btn_Paso5P2", "click", function( ) {
  Calculos();
});
onEvent("btn_P2aInicio", "click", function( ) {
  setScreen("screenPreguntaSalir");
    pantalla = "screenPaso2";
});
// eventos paso 3
onEvent("btn_paso1P3", "click", function( ) {
  setScreen("screenPaso1");
});
onEvent("btn_paso2P3", "click", function( ) {
  setScreen("screenPaso2");
});
onEvent("btn_paso4P3", "click", function( ) {
  setScreen("screenPaso4");
});
onEvent("btn_paso5P3", "click", function( ) {
  Calculos();
});
onEvent("btn_P3aInicio", "click", function( ) {
  setScreen("screenPreguntaSalir");
    pantalla = "screenPaso3";
});
// Eventos Paso 4
onEvent("btn_Paso1P4", "click", function( ) {
  setScreen("screenPaso1");
});
onEvent("btn_Paso2P4", "click", function( ) {
  setScreen("screenPaso2");
});
onEvent("btn_Paso3P4", "click", function( ) {
  setScreen("screenPaso3");
});
onEvent("btn_Paso5P4", "click", function( ) {
  Calculos();
});
onEvent("btn_P4aInicio", "click", function( ) {
  setScreen("screenPreguntaSalir");
    pantalla = "screenPaso4";
});
// eventos paso 5
onEvent("btn_Paso1P5", "click", function( ) {
  setScreen("screenPaso1");
});
onEvent("btn_Paso2P5", "click", function( ) {
  setScreen("screenPaso2");
});
onEvent("btn_Paso3P5", "click", function( ) {
  setScreen("screenPaso3");
});
onEvent("btn_Paso4P5", "click", function( ) {
  setScreen("screenPaso4");
});

//funcion que calcula el promedio de MV disponible
function promedio(datos) { 
  var acumulador = 0;
  var contador = 0;
  var res = 0;
  for (var i = 1; i < 13; i++) {
    if(getNumber(datos+i) > 0){
      acumulador += getNumber(datos+i);
      contador++;
    }
  }
  res = acumulador / contador;
  return res;
}
function KgMSDispHa() {
  var res = ((promedio("ti_MVdisp") / getNumber("text_inputCuadrante"))*(getNumber("text_inputPorcMS") *100));
  return res;
}
function KgMSRemHa() {
  var res = ((promedio("ti_MVrem") / getNumber("text_inputCuadrante"))*(getNumber("text_inputPorcMS") *100));
  return res;
}
function ConsumoKgMsHa() {
  var res = getNumber("lbl_ResMSdisp") - getNumber("lbl_ResMSrem");
  return res;
}
function PorceAprov() {
  var res = (getNumber("lbl_ResConsumoMsha") / getNumber("lbl_ResMSdisp")) * 100;
  return res;
}
function ConsumoAnimal() {
  var res = (getNumber("lbl_ResConsumoMsha") * getNumber("text_inputSupparcela")) / getNumber("text_inputNrovaca");
  return res;
}
function Calculos() {
  setText("lbl_ResMSdisp",KgMSDispHa().toFixed());
  setText("lbl_ResMSrem",KgMSRemHa().toFixed());
  setText("lbl_ResConsumoMsha", ConsumoKgMsHa().toFixed());
  setText("lbl_ResAprovechamiento", PorceAprov().toFixed(1));
  setText("lbl_ResConsumo", ConsumoAnimal().toFixed(1));
  setText("lbl_m2Animal", M2animal().toFixed());
  setScreen("screenPaso5");
}
function M2animal() {
  var res = (getNumber("text_inputSupparcela") / getNumber("text_inputNrovaca"))*10000;
  return res;
}
function validaFecha(fecha_ref,IdCartelError) {
  hideElement(IdCartelError);
  var Fecha = fecha_ref;
    if (Fecha != "") {
    var Dia = Fecha[0]+Fecha[1];
    if (Dia > 0 && Dia <= 31) {
      var Mes = Fecha[3]+Fecha[4];
      if (Mes > 0 && Mes <= 12) {
        var Anio = Fecha[6]+Fecha[7]+Fecha[8]+Fecha[9];
        if (Anio >= 2019) {
          return true;
        }
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
onEvent("btn_crearRegistro", "click", function( ) {
  crearCliente();
  createRecord("Mediciones", {Fecha:(getText("text_inputFecha")),Lote:(getText("text_inputLOte")),Recurso:(getText("text_inputRecurso")),"Sup.Parcela":(getText("text_inputSupparcela")),"Porc.MS":(getText("text_inputPorcMS")),"Nro.Vacas":(getText("text_inputNrovaca")),"KgMSDisponible":(getText("lbl_ResMSdisp")),"KgMSRemanente":(getText("lbl_ResMSrem")),"ConsumoMSHa":(getText("lbl_ResConsumoMsha")),ConsumoAnimal:(getText("lbl_ResConsumo")),"PorcAprovechamiento":(getText("lbl_ResAprovechamiento")),MetroCuadradosporanimal:(getText("lbl_m2Animal"))}, function(record) {
    
  });
  showElement("lbl_RegistroCreado");
  setTimeout(function() {
    hideElement("lbl_RegistroCreado");
    setScreen("ScreenINICIO");
  }, 1500);
});
function generarFecha() {
  var Dia = randomNumber(1, 31);
  var Mes = randomNumber(1, 12);
  if (Dia<10) {
    Dia = "0"+Dia;
  }
    if (Mes<10) {
    Mes = "0"+Mes;
  }
  return Dia+"/"+Mes+"/2019";
  }
onEvent("btn_test1", "click", function( ) {
  var ListaClientes = ["la media luna","jala","moore","la juanita","la bellota","21 de abril","la colorada","tekne","camilleti"];
  var ListaLocalidades= ["casares","frenche","suipacha","9 de julio","pehuajo","bsas"];
  var ListaRecursos= ["alfalfa","ryegrass","pastura mezcla","trebol rojo","festuca","promocion"];
  setText("text_inputFecha",generarFecha());
  setText("text_inputEstablecimiento", ListaClientes[randomNumber(0, 8)]);
  setText("text_inputLocalidad", ListaLocalidades[randomNumber(0, 5)]);
  setText("text_inputLOte", randomNumber(0,20));
  setText("text_inputRecurso",ListaRecursos[randomNumber(0, 5)] );
  setNumber("text_inputSupparcela", randomNumber(1, 5));
  setNumber("text_inputPorcMS", randomNumber(15, 25));
  setNumber("text_inputNrovaca", randomNumber(100, 450));
  setNumber("text_inputCuadrante", 0.25);
  setNumber("ti_MVdisp1",Math.random());
  setNumber("ti_MVrem1", 0.1);
});
function crearCliente() {
  readRecords("Clientes", {}, function(records) {
    var clienteNuevo = true;
    for (var i =0; i < records.length; i++) {
      if (!(getText("text_inputEstablecimiento") != ((records[i]).Establecimiento) && (getText("text_inputLocalidad")) != ((records[i]).Localidad))) {
       console.log("el establecimiento: "+getText("text_inputEstablecimiento")+" es igual a " + (records[i].Establecimiento) + " y " + getText("text_inputLocalidad") + " es igual a " + (records[i]).Localidad);
        clienteNuevo = false;
      }
    }
    if (clienteNuevo) {
      createRecord("Clientes", {Establecimiento:(getText("text_inputEstablecimiento")),Localidad:(getText("text_inputLocalidad"))}, function(record) {
        console.log("registrocreado");
      });
    }
  });
}
onEvent("btnPantallaBusqueda", "click", function( ) {
  setScreen("ScreenBusqueda");
  limpiarPantallaBusqueda();
});
onEvent("btn_Buscar", "click", function( ) {
  var Cartel="msjFechaError";
  var Fe= getText("tiFechaBusqueda");
  if (validaFecha(Fe,Cartel)) {
    BuscaLotesPorFecha();
    showElement("lbl_LoteScreenBus");
    showElement("dd_Lote");
  } else {
    showElement("msjFechaError");
  }
});
function BuscaLotesPorFecha() {
  var fecha = getText("tiFechaBusqueda");
  var listalotes = [];
  readRecords("Mediciones", {Fecha:fecha}, function(records) {
    for (var i =0; i < records.length; i++) {
      //console.log((records[i]).id + ': ' + records[i].Lote);
      appendItem(listalotes, records[i].Lote);}
    setProperty("dd_Lote", "options",listalotes);
    hideElement("btn_Buscar");
    showElement("btn_MostrarResultado");
  });
}
onEvent("btn_MostrarResultado", "click", function( ) {
  cargaPantallaResultadoBusqueda();
  setScreen("PantallaResultadoBusqueda");
});
onEvent("btn_volverScrBus", "click", function( ) {
  setScreen("ScreenINICIO");
});
function cargaPantallaResultadoBusqueda() {
 var fecha=getText("tiFechaBusqueda");
 var lote=getText("dd_Lote");
  readRecords("Mediciones", {Fecha:fecha,Lote:lote}, function(records) {
    for (var i =0; i < records.length; i++) {
      setText("lbl_fechamedbus", records[i].Fecha);
      setText("lbl_loteMedbus", (records[i]).Lote);
      setText("lbl_MSdispBus", (records[i]).KgMSDisponible);
      setText("lbl_MSremBus", records[i].KgMSRemanente);
      setText("lbl_ConsHABus", (records[i]).ConsumoMSHa);
      setText("lbl_ConsaniBus", records[i].ConsumoAnimal);
      setText("lbl_AprovBus", records[i].PorcAprovechamiento);
      setText("lbl_m2aniBus", records[i].MetroCuadradosporanimal);
    }
  });
}
onEvent("btn_salirResBus", "click", function( ) {
  setScreen("ScreenINICIO");
});
function limpiarPantallaBusqueda() {
  hideElement("btn_MostrarResultado");
  hideElement("lbl_LoteScreenBus");
  hideElement("dd_Lote");
  showElement("btn_Buscar");
}
function blanquearDatos() {
  setText("text_inputFecha","");
  setText("text_inputEstablecimiento","");
  setText("text_inputLocalidad", "");
  setText("text_inputLOte", "");
  setText("text_inputRecurso","");
  setNumber("text_inputSupparcela", "");
  setNumber("text_inputPorcMS", "");
  setNumber("text_inputNrovaca", "");
  setNumber("text_inputCuadrante","");
  setNumber("ti_MVdisp1","");
  setNumber("ti_MVrem1","");
}
function preguntaSalir() {
  setScreen("screenPreguntaSalir");
}
onEvent("btn_volverAceptado", "click", function( ) {
  blanquearDatos();
  setScreen("ScreenINICIO");
});
onEvent("btn_volverRechazado", "click", function( ) {
  setScreen(pantalla);
});
