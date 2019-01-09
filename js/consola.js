var estaAbierta=false;
var preCursor="";
var postCursor="";
var temporizadorCerrarConsola=5000;
var cursorVisible=true;

function cosasRepetitivas() {
	setInterval(cambiarColorCursor, 500);
	setInterval(preguntarConsola, 500);
}

function cambiarColorCursor(){
	if(cursorVisible){
		document.getElementById("cursor").style.color="black";		
	}else{
		document.getElementById("cursor").style.color="#44ff00";
	}
	cursorVisible = !cursorVisible;	
}

window.onkeyup = function(e) {
   var code = e.keyCode ? e.keyCode : e.which;

   if(estaAbierta){
   		temporizadorCerrarConsola=5000;
	   if(code==13){ //enter
	   		runCommand();
	   }else if(code==27){ //escape
	   		cerrarConsola();
	   }else if(code==8){ //backspace
	   		deleteChar(true);
	   }else if(code==46){ //delete
	   		deleteChar(false);
	   }else if(code==37){ //leftArrow
	   		moverCursor(true);
	   }else if(code==39){ //RigthArrow
	   		moverCursor(false);
	   }else if(code==32){ //space
	   		validarEspacio();
	   }else if((code>=65 && code<=90) || (code>=48 && code<=57)){ //alphaNumerics
	   	 	getTeclaPulsada(e.key);
	   }
	}else{
		temporizadorCerrarConsola=5000;
		if(code==13){ //enter
	   		abrirConsola();
	   }else if((code>=65 && code<=90) || (code>=48 && code<=57)){ //alphaNumerics
	   	 	abrirConsola();
	   	 	getTeclaPulsada(e.key);
	   }else if(code==32){ //space
	   		abrirConsola();
	   		validarEspacio();
	   }
	}
}

function abrirConsola(){	
	document.getElementById("consola").style.marginTop="20px";
	estaAbierta=true;
}

function cerrarConsola(){	
	document.getElementById("consola").style.marginTop="-150px";
	estaAbierta=false;
}

function preguntarConsola() {
	temporizadorCerrarConsola-=500;
	if(temporizadorCerrarConsola<=0){
		cerrarConsola();
	}
}
function moverCursor(left){
	if(left){
		postCursor = preCursor.substring(preCursor.length-1) + postCursor;
		preCursor = preCursor.substring(0, preCursor.length-1);
	}else{
		preCursor = preCursor + postCursor.substring(0,1);
		postCursor = postCursor.substring(1);
	}
	actualizarConsola();
}

function validarEspacio(){
	var ultimo = preCursor.substring(preCursor.length-1);
	if(ultimo!=" "){
		getTeclaPulsada(" ");
	}else{
		//doNothing
	}
}

function getTeclaPulsada(key){
	preCursor+=key;
	actualizarConsola();
}

function deleteChar(backspace){	
	if(backspace){
		preCursor = preCursor.substring(0, preCursor.length-1);
	}else{
		postCursor = postCursor.substring(1);
	}
	actualizarConsola();
}

function actualizarConsola(){
	document.getElementById("preCursor").innerHTML=preCursor;
	document.getElementById("postCursor").innerHTML=postCursor;
}

function runCommand(){
	comandoActual=preCursor+postCursor;	
	var array = comandoActual.split(" ");
	var comando = array.shift().toLowerCase();
	var args = array;
	switch(comando){
		case "saludar": {
			saludar(args);
			break;
		}
		case "cls": {
			limpiar();
			break;
		}
		case "upload": {
			upload(args);
			break;
		}
		case "leng": {
			selectLenguaje(args);
			break;
		}
		case "sgbd": {
			selectGestores(args);
			break;
		}
		default: {
			mostrarMensaje("Lo sentimos, el comando no es válido.");
		} 
	}
}

function mostrarMensaje(msg){
	preCursor=msg;
	postCursor="";
	actualizarConsola();
	setTimeout(limpiar,2500);
}

function limpiar() {
	preCursor="";
	postCursor="";
	actualizarConsola();
}

function saludar(args){
	if(args.length==0){
		alert("Hola");
	}else{
		for (var i = 0; i < args.length; i++) {
			alert("Hola "+args[i]);
		}		
	}
	limpiar();
}

function upload(args){
	document.getElementById("dropzoneForm").click();
	limpiar();
}

function selectLenguaje(args){	
	if(args.length==0){
		mostrarMensaje("Lo sentimos, el comando requiere parámatros ej: j PHP Py.");
	}else{
		for (var i = 0; i < args.length; i++) {
			var arg= args[i].toUpperCase();
			switch(arg){
				case "J":{
					arg = "JAVA";
					break;
				}
				case "P":{
					arg = "PHP";
					break;
				}
				case "PY":{
					arg = "PYTHON";
					break;
				}
				case "JAVA":{
					arg = "JAVA";
					break;
				}
				case "PHP":{
					arg = "PHP";
					break;
				}
				case "PYTHON":{
					arg = "PYTHON";
					break;
				}
				default:{
					mostrarMensaje("Lo sentimos, el parámetro "+ arg +" no es válido");
				}
			}
			var checkbox = document.getElementById("leng"+arg);
			checkbox.checked = !checkbox.checked;
		}	
		limpiar();
	}
}

function selectGestores(args){	
	if(args.length==0){
		mostrarMensaje("Lo sentimos, el comando requiere parámatros ej: M mysql POSTGRESQL.");
	}else{
		for (var i = 0; i < args.length; i++) {
			var arg= args[i].toUpperCase();
			switch(arg){
				case "M":{
					arg = "MYSQL";
					break;
				}
				case "P":{
					arg = "POSTGRESQL";
					break;
				}
				case "POST":{
					arg = "POSTGRESQL";
					break;
				}
				case "O":{
					arg = "ORACLE";
					break;
				}
				default:{
					mostrarMensaje("Lo sentimos, el parámetro "+ arg +" no es válido");
				}
			}
			var checkbox = document.getElementById("gestor"+arg);
			checkbox.checked = !checkbox.checked;
		}	
		//mostrarMensaje("");
		limpiar();
	}
}