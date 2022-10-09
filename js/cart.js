let cartArray = [];
let precArt ="";

document.addEventListener("DOMContentLoaded", function(e){

    const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/"+ 25801 +".json";
    
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data.articles;

            mostrarCart()
            
        }
    });

    mostrarUsuario()

});

function mostrarCart(){

    let htmlContentToAppend = "";

    for (let i=0; i<cartArray.length; i++){
        let infocart = cartArray[i];        

        htmlContentToAppend += `            
            <td><img src="${infocart.image}" class="card-img-top" height="60px"></td>
            <td>${infocart.name}</td>
            <td>${infocart.currency} ${infocart.unitCost}</td>
            <td><input onclick="resultado()" type="number" class="form-control" id="cantidad" style="width:70px;" value="${infocart.count}" min="1" max="10"></td>
            <td><div class="input-group"><span class="input-group-text"><strong>${infocart.currency}</strong></span><input type="number" class="form-control" id="subtot" style="width:100px; font-weight: bold;" value="${subtotal(infocart.unitCost,infocart.count)}" disabled></div></td>
        `

        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        precArt=infocart.unitCost;

    }
}

function subtotal(prec,cant){
    return prec*cant;
}

function resultado(){
  let cant = document.getElementById("cantidad").value;

  let subtotaln=cant*precArt;
  document.getElementById("subtot").value=subtotaln;

}

