Dropzone.options.dropzoneForm = {
    dictDefaultMessage: "<h1><i class='fa fa-upload'></i></h1><br><strong>Sube tu SQL o CHY</strong></br>",
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    acceptedFiles: ".sql,.chy",
    maxFiles: 1,
    init: function () {
        this.on("maxfilesexceeded", function (file) {
            alert("No more files please!");
        });
    },
    sending: function () {
        var msg = {
            tipo: "info",
            titulo: "Subiendo",
            cuerpo: "Espera mientras el servidor hace su magia",
            avatar: "gatoMistico.png"
        };
        mostrarMensajito(msg);
    },
    success: function (file, response) {
        //alert(response);
        var json = JSON.parse(response);
        var tipo = "dark";
        var titulo = json.msg;
        var cuerpo = "";
        
        var redirigir=false;
        switch (json.tipo) {
            case "Success":
            {
                tipo = "success";
                //manage beans y attbs
                cuerpo = "Fueron encontradas "
                        + json.cuerpo.length
                        + " entidades. Ahora puedes continuar con las configuraciones del proyecto.";
                redirigir=true;
                break;                
            }
            case "Error":
            {
                tipo = "warning";
                cuerpo = json.cuerpo;
                break;
            }
            case "Fail":
            {
                tipo = "danger";
                cuerpo = json.cuerpo;
                break;
            }
        }
        var msg = {
            tipo: tipo,
            titulo: titulo,
            cuerpo: cuerpo,
            avatar: "gatoMistico.png"
        };
        mostrarMensajito(msg);        
        if(redirigir){            
            document.getElementById("link-tab-2").click();
        }
    },
    error: function (file, errormessage, xhr) {
        var cuerpo = "";

        cuerpo = errormessage;

        var msg = {
            tipo: "danger",
            titulo: "Ha ocurrido un error al contactar al servidor",
            cuerpo: cuerpo,
            avatar: "gatoMistico.png"
        };
        mostrarMensajito(msg);
        Dropzone.forElement("#dropzoneForm").removeAllFiles(true);
    }
};


