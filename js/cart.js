let cartArray = [];
let monArt ="";
let validar = true;
let formaPago = true;
let datosPago = true;
let datosEnvio=true;

var radioCredito = document.getElementById('credito');
var radioTrans = document.getElementById('transferencia');

var inputCreditotar = document.getElementById('numtarje');
var inputCreditoseg = document.getElementById('codsegu');
var inputCreditoven = document.getElementById('vencimiento');
var inputTrans = document.getElementById('numcuen');

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

    /*document.getElementById("regBtn").addEventListener("click", () => {
        validar();
    })*/

});

function mostrarCart(array){

    let htmlContentToAppend = "";

    for (let i=0; i<cartArray.length; i++){
        let infocart = cartArray[i];        

        htmlContentToAppend += `            
            <td><img src="${infocart.image}" class="card-img-top" height="60px"></td>
            <td>${infocart.name}</td>
            <td>${infocart.currency} <span class="precioart">${infocart.unitCost}</span></td>
            <td><input onchange="resultado()" type="number" class="cantidadart form-control" style="width:70px;" value="${infocart.count}" min="1" max="10"></td>
            <td>${infocart.currency} <span class="subtotalart">0</span></td>
        `

        monArt= infocart.currency;
        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        document.getElementById("monedaarts").innerHTML = monArt;
        document.getElementById("monedaartc").innerHTML = monArt;
        document.getElementById("monedaartt").innerHTML = monArt;
        resultado();

    }
}

function resultado(){

    let precios = document.getElementsByClassName('precioart');
    let cantidades = document.getElementsByClassName('cantidadart');
    let subtotales = document.getElementsByClassName('subtotalart');
    let envios = document.getElementsByName('tipoenvio');
    
    let subtotaln=0, costoEnvio=0, total = 0
    
    for (i=0; i< cantidades.length; i++){
        subtotaln += parseInt(cantidades[i].value) * parseFloat(precios[i].innerHTML);
        subtotales[i].innerHTML = (parseInt(cantidades[i].value) * parseFloat(precios[i].innerHTML)).toFixed(2);    
    }
    
    for (let envio of envios){
        if (envio.checked){
            costoEnvio = subtotaln * envio.value;
        }
        envio.addEventListener('click',()=>{resultado()})
    }

    total = subtotaln + costoEnvio;

    document.getElementById('subtotal').innerHTML=subtotaln.toFixed(2);
    document.getElementById('costenvio').innerHTML=costoEnvio.toFixed(2);
    document.getElementById('totalgen').innerHTML=total.toFixed(2);

}

function validarCompra(){

    validarDatospago();
    validarDatosenvio();

    if (!document.querySelector('input[name="tipoenvio"]:checked')){
        document.getElementById("feedback-tipoenvio").style.display = "inline";
        validar=false;
    } else {
        document.getElementById("feedback-tipoenvio").style.display = "none";
        validar=true
    }

    if (datosPago===true&&validar===true&&datosEnvio===true){
        alert('Su compra fue procesada exitosamente.')
        location.reload();
    }
    else{
        alert('Error al validar los datos de su compra. Revise los detalles y vuelva a intentarlo.')
    }
}

function validarFormapago(){
    if (!document.querySelector('input[name="formapago"]:checked')){
        document.getElementById("feedback-modal-pago").style.display = "inline";
        formaPago=false;
    } else {
        document.getElementById("feedback-modal-pago").style.display = "none";
        formaPago=true;
    }
    return formaPago;
}

function validarDatospago(){
    validarFormapago();

    let tarjeta = document.getElementById("numtarje").value;
    let codigo = document.getElementById("codsegu").value;
    let vencitarj = document.getElementById("vencimiento").value;
    let cuenta = document.getElementById("numcuen").value;

    if (formaPago===true && document.querySelector('input[id=credito]:checked') && tarjeta!="" && codigo!="" && vencitarj!=""){
        document.getElementById("feedback-modal-formapago").style.display = "none";
        document.getElementById("feedback-modal-formapago2").style.display = "none";
        datosPago = true;
    }
    else{
        if (formaPago===true && document.querySelector('input[id=transferencia]:checked') && cuenta!=""){
            document.getElementById("feedback-modal-formapago").style.display = "none";
            document.getElementById("feedback-modal-formapago2").style.display = "none";
            datosPago = true;
        }
        else{
            document.getElementById("feedback-modal-formapago").style.display = "inline";
            document.getElementById("feedback-modal-formapago2").style.display = "inline";
            datosPago=false;
        }
    }

    return datosPago;

}

function validarDatosenvio(){

    let calleenv = document.getElementById("calle").value;
    let puertaenv = document.getElementById("numpuerta").value;
    let esquinaenv = document.getElementById("esquina").value;

    if (calleenv!="" && puertaenv!="" && esquinaenv!=""){
        document.getElementById("feedback-datos-envio").style.display = "none";
        datosEnvio = true;
    }
    else{
        document.getElementById("feedback-datos-envio").style.display = "inline";
        datosEnvio = false;
    }

    return datosEnvio;

}


function deshabilitarInputs() {
    if (radioCredito.checked) {
      inputTrans.disabled = true;
      inputTrans.value = "";
      inputCreditotar.disabled=false;
      inputCreditoseg.disabled=false;
      inputCreditoven.disabled=false;
    } 
    else {
        if (radioTrans.checked){
            inputCreditotar.disabled=true;
            inputCreditoseg.disabled=true;
            inputCreditoven.disabled=true;
            inputCreditotar.value="";
            inputCreditoseg.value="";
            inputCreditoven.value="";
            inputTrans.disabled = false;
        }
        else{
            inputTrans.disabled = false;
            inputCreditotar.disabled=false;
            inputCreditoseg.disabled=false;
            inputCreditoven.disabled=false;
        }
    }
  }
  
  radioCredito.addEventListener('change', deshabilitarInputs)
  radioTrans.addEventListener('change', deshabilitarInputs)