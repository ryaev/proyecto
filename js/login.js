function login(){
    let correo = document.getElementById("email").value;
    let contra = document.getElementById("contra").value;

    if (correo!="" && contra!=""){
        location.href="index.html"
    }
    else{
        alert("Usuario y clave son requeridos");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ingresar").addEventListener("click", () => {
        login();
    })
})