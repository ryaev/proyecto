document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

let usuario = JSON.parse(sessionStorage.getItem('datos'));
if (usuario==null){
    alert('Debe iniciar sesión para ingresar a eMercado')
    location.href="login.html";
}
else{
    emailusu.innerHTML = usuario.email;
}

});