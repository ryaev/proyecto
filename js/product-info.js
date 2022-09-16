let commentsArray = [];

document.addEventListener("DOMContentLoaded", function(e){
    let prodid = JSON.parse(localStorage.getItem('id'));
    const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+ prodid +".json";
    const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"+ prodid +".json";
    let conte = document.getElementById('imageprod');
    
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let nomprod = resultObj.data.name;
            let monprod = resultObj.data.currency;
            let preprod = resultObj.data.cost;
            let desprod = resultObj.data.description;
            let catprod = resultObj.data.category;
            let canprod = resultObj.data.soldCount;
            let imgprod = resultObj.data.images;

            document.getElementById('nombreprod').innerHTML = nomprod;
            document.getElementById('monedaprod').innerHTML = monprod;
            document.getElementById('precioprod').innerHTML = preprod;
            document.getElementById('descripprod').innerHTML = desprod;
            document.getElementById('categprod').innerHTML = catprod;
            document.getElementById('cantiprod').innerHTML = canprod;
            
            for (let i=0; i<imgprod.length; i++){
            conte.innerHTML += `
            <div class="col h-100">
                <div class="card h-100">
                <img src="${imgprod[i]}" class="card-img-top">
                </div>
            </div>   
            `
            }
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data
            showComments()
        }
    });

    mostrarUsuario()

});

function puntuacion(puntos){
    let stars="";

    for (let i=1; i<=5; i++){
        if(i<=puntos){
        stars += `<span class="fa fa-star" style="color: orange;"></span>`
        }
        else{
        stars += `<span class="fa fa-star" style="color: gray;"></span>`
        }
    }
    return stars;
}

function showComments(){

    let htmlContentToAppend = "";

    for (let i=0; i<commentsArray.length; i++){
        let coment = commentsArray[i];        

        htmlContentToAppend += `            
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <span style="color: black;"><strong>${coment.user}</strong></span><span style="color: black;"> ${coment.dateTime}</span><span> ${puntuacion(coment.score)}</span>
                    <p>${coment.description}</p>
                    </div>
                </div>
            </div>
        </div>                    
        </div>
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

function agregar(){
    if(document.getElementById("comentario").value==="" || document.getElementById("puntaje").value===""){
        document.getElementById("comentario").value="";
        document.getElementById("puntaje").value="";
        alert('Debe introducir comentario y puntaje')
    }
    else{
    let agreComen={}
    let= currentDate = new Date();
    let dia= currentDate.getDate();
    let mes= currentDate.getMonth()+1;
    let anio= currentDate.getFullYear();
    let hora= currentDate.getHours();
    let min= currentDate.getMinutes();
    let seg= currentDate.getSeconds();

    let fecha= anio + "-" + mes + "-" + dia + " " + hora + ":" + min + ":" + seg;

    agreComen.description=document.getElementById("comentario").value;
    agreComen.score=document.getElementById("puntaje").value;
    agreComen.dateTime=fecha;

    commentsArray.push(agreComen);
    listaComen(commentsArray);
    document.getElementById("comentario").value="";
    document.getElementById("puntaje").value="";
    }
}

function listaComen(){
    let filas="";

    for (let comentUsu of commentsArray){
        filas=`            
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <span style="color: black;"><strong>${usuario.email}</strong></span><span style="color: black;"> ${comentUsu.dateTime}</span><span> ${puntuacion(comentUsu.score)}</span>
                    <p>${comentUsu.description}</p>
                    </div>
                </div>
            </div>
        </div>                    
        </div>
        `
    }
    document.getElementById("comments").innerHTML+=filas;
}