function CargaInicial() {
    abrirPanelesLaterales();
    document.getElementById("tabInicial").click();
    preCargarDatos();
}

function preCargarDatos() {
    enviar("", "/Anarchyback/Inicio", postCargarDatos);
}

function postCargarDatos(result, state) {
//Maneje aquí la respuesta del servidor.
    if (state == "success") {
        console.log(result);
        var json = JSON.parse(result);
        document.getElementById("frase").innerHTML=json.frase;
        document.getElementById("calificacion").innerHTML=json.calificacion;
        //paint estrellitas
        
        document.getElementById("numLineas").innerHTML=json.numLineas;
        document.getElementById("numProyectos").innerHTML=json.numProyectos;
        
        console.log(json.comentarios);
        
        
    } else {
        var msg = {
            tipo: "danger",
            titulo: "Lo sentimos, no dejes de querernos",
            cuerpo: "El servidor se encuentra fuera de servicio en estos momentos.(u.u)",
            avatar: "gatoMistico.png"
        };
        mostrarMensajito(msg);
    }
}

var abiertoPLeft = false;
var abiertoPRight = false;
function cambiarBotonMedio(mostrar) {
    if (mostrar) {
        setTimeout(function () {
            if (abiertoPRight && abiertoPLeft) { //siii, estoy haciendo doble validación jajaja shhhh
                document.getElementById("botonMedio").style.display = "initial";
                document.getElementById("botonMedio").style.opacity = 1;
            }
        }, 3000);
    } else {
        document.getElementById("botonMedio").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("botonMedio").style.display = "none";
        }, 2000);
    }
}

function ocultarPanelesLaterales() {
    ocultarPanelLateral(true);
    ocultarPanelLateral(false);
    cambiarBotonMedio(false);
}

function abrirPanelesLaterales() {
    setTimeout(function () {
        abrirPanelLateral(true);
        abrirPanelLateral(false);
        cambiarBotonMedio(true);
    }, 500);
}

function ocultarPanelLateral(left) {
    if (left) {
        document.getElementById("panelLateral-left").style.left = "-50%";
        document.getElementById("botonPanelLateral-left").onclick = function () {
            abrirPanelLateral(true)
        };
        document.getElementById("botonPL-L").innerHTML = ">";
        abiertoPLeft = false;
    } else {
        document.getElementById("panelLateral-right").style.right = "-50%";
        document.getElementById("botonPanelLateral-right").onclick = function () {
            abrirPanelLateral(false)
        };
        document.getElementById("botonPL-R").innerHTML = "<";
        abiertoPRight = false;
    }
    cambiarBotonMedio(false); //ocultarlo siempre
}

function abrirPanelLateral(left) {
    if (left) {
        document.getElementById("panelLateral-left").style.left = "0%";
        document.getElementById("botonPanelLateral-left").onclick = function () {
            ocultarPanelLateral(true)
        };
        document.getElementById("botonPL-L").innerHTML = "<";
        abiertoPLeft = true;
    } else {
        document.getElementById("panelLateral-right").style.right = "0%";
        document.getElementById("botonPanelLateral-right").onclick = function () {
            ocultarPanelLateral(false)
        };
        document.getElementById("botonPL-R").innerHTML = ">";
        abiertoPRight = true;
    }
    if (abiertoPRight && abiertoPLeft) {
        cambiarBotonMedio(true);
    }
}