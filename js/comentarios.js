/* Este js está para subir un comentario a la bd.
 * Si busca el de pintar los comentarios, está cerca del comienzo de ANARCHY.js*/

var img="boss";

function cambiarReaccion(name) {
    document.getElementById("imgComentario").src = "images/reacciones/" + name + ".png";
    img=name;
}

function mostrarImgPicker() {
    var picker = document.getElementById("imagePicker");
    var coords = document.getElementById("btnImagePicker").getBoundingClientRect();
    picker.style.top = (coords.top -100) + "px";
    picker.style.left = (coords.right + 50) + "px";
    setTimeout(ocultarImgPicker,4000);
}

function ocultarImgPicker(){
    var picker = document.getElementById("imagePicker");
    picker.style.top = "0px";
    picker.style.left = "120%";
}

function enviarComentario(){
    var formData = {        
        msg: document.getElementById("comentarioMsg").value,
        calificacion: document.getElementById("comentarioCalificacion").value,
        img:img
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