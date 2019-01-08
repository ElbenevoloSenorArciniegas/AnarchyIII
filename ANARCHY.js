function CargaInicial() {
    abrirPanelesLaterales();
    document.getElementById("tabInicial").click();
    preCargarDatos();
}

function pintarEstrellas(calif) {
    var estrellas = "<span>"+calif+"</span> &nbsp";
    for (var j = 0; j < 5; j++) {
        style = 'color: black';
        if (calif >= 1) {
            style = 'color: orange';
        } else if (calif > 0.5) {
            style = 'color: orange';
        }
        calif -= 1;
        estrellas += "<span style='" + style + "'>&#9733</span>";
    }
    return estrellas;
}

function preCargarDatos() {
    enviar("", "/Anarchyback/Inicio", postCargarDatos);
}

function postCargarDatos(result, state) {
//Maneje aquí la respuesta del servidor.
    if (state == "success") {        
        var json = JSON.parse(result);
        document.getElementById("frase").innerHTML = json.frase;
        document.getElementById("calificacion").innerHTML = pintarEstrellas(json.calificacion);
        //paint estrellitas

        document.getElementById("numLineas").innerHTML = json.numLineas;
        document.getElementById("numProyectos").innerHTML = json.numProyectos;
        var com = "";
        for (var i = 0; i < json.comentarios.length; i++) {
            var comentario = json.comentarios[i];
            var estrellas = pintarEstrellas(comentario.calificacion);
            com += ""
                    + "<div class='ibox'>"
                    + "<div class='ibox-title'>"
                    + comentario.fecha
                    + "<span style='float: right;'>"
                    + estrellas
                    + "</span>"
                    + "</div>"
                    + "<div class='ibox-content'>"
                    + comentario.msg
                    + "</div>"
                    + "</div>";
        }
        if(com==""){
            com="Aún no hemos recibido comentarios sobre Anarchy. Sé el primero cuando descargues tu proyecto."
        }
        document.getElementById("panel-comentarios").innerHTML = com;
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

function preDescargar() {
    var reqs = ""; //manage
    var formData = {
        leng: document.getElementById("leng").value,
        sgbd: document.getElementById("gestores").value,
        web: document.getElementById("web").value,
        plantilla: document.getElementById("plantilla").value,
        reqs: reqs
    };
    enviar(formData, "/Anarchyback/Descargar", postDescargar);
}

function postDescargar(result, state) {

}

function preInsertComentario() {
    var formData = {
        msg: document.getElementById("comentarioMsg").value,
        calificacion: document.getElementById("comentarioCalificacion").value
    };
    enviar(formData, "/Anarchyback/insertComentario", postInsertComentario);
}

function postInsertComentario(result, state) {
//Maneje aquí la respuesta del servidor.
    if (state == "success") {
        var tipo = "success";
        if (result.tipo == "Fail") {
            tipo = "danger";
        }
        var msg = {
            tipo: tipo,
            titulo: result.msg,
            cuerpo: result.cuerpo,
            avatar: "gatoMistico.png"
        };
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