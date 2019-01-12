var projectData = {
    leng: "JAVA",
    sgbd: ["MYSQL"],
    web: "true",
    plantilla: "0",
    reqs: []    
};

function cambiarLeng(leng){
    projectData.leng=leng;
}

function cambiarGestor(gestor){
    var sgbd=projectData.sgbd;
    var index = sgbd.indexOf(gestor);
    if(index > -1){
        sgbd.splice(index, 1);
    }else{
        sgbd.push(gestor);
    }    
}

function cambiarWeb() {
    var isWeb = document.getElementById("isWeb").checked;
    projectData.web=isWeb;
    if (isWeb) {
        $("#webOptions").removeClass('disabled');
    } else {
        $("#webOptions").addClass('disabled');
    }
    $("#webOptions :input").attr("disabled", !isWeb);
}

function cambiarPlantilla() {
    var desc = "";
    var img = "";
    
    var selector = document.getElementById('plantilla');
    var value = selector[selector.selectedIndex].value;
    
    projectData.plantilla=value;
    
    switch (value) {
        case "0":
        {
            desc = "<h4><b>Blank</b></h4>"
                    + "<p>Una plantilla en blanco ansiosa por ser editada</p>";
            img = "Blank";
            break;
        }
        case "2":
        {
            desc = "<h4><b>Simple</b></h4>"
                    + "<p>Un menú y amplio espacio para desplegar información</p>";
            img = "Simple";            
            break;
        }
        case "1":
        {
            desc = "<h4><b>Doble</b></h4>"
                    + "<p>Es como la simple, ¡pero doble!</p>";
            img = "Doble";
            break;
        }

    }
    document.getElementById("descPlantilla").innerHTML = desc;
    document.getElementById("imgPlantilla").src = "images/plantillas/" + img + ".png";
}