function login(){
    let correo = document.getElementById("email").value;
    let contra = document.getElementById("contra").value;
    let emafail = document.getElementById('emafail');
    let passfail = document.getElementById('passfail');

        if (correo=="" && contra=="") {
            emafail.innerHTML = "Debe ingresar su e-mail";
            passfail.innerHTML = "Debe ingresar su password";
        }
        else { 
            if (correo=="" && contra!="") {
                emafail.innerHTML = "Debe ingresar su e-mail";
                passfail.innerHTML = "";
            }
            else {
                if (correo!="" && contra=="") {
                    passfail.innerHTML = "Debe ingresar su password";
                    emafail.innerHTML = "";
                }
                else {
                    if (correo!="" && contra!=""){
                    location.href="index.html"
                    }
                }
            }
        }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ingresar").addEventListener("click", () => {
        let usuario = {}
        usuario.email = document.getElementById("email").value;
        usuario.pass = document.getElementById("contra").value;
        sessionStorage.setItem('datos', JSON.stringify(usuario))
        login();
    })
})