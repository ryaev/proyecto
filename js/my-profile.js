
var inputEmail = document.getElementById('emailuser');
/*var inputPrimernom = document.getElementById('primernom');
var inputSegundonom = document.getElementById('segundonom');
var inputPrimerape = document.getElementById('primerape');
var inputSegundoape = document.getElementById('segundoape');
var inputTelefono = document.getElementById('telefono');*/

document.addEventListener("DOMContentLoaded", function(e){
    mostrarUsuario()
    emailUsuario()
})

function emailUsuario(){

    if (usuario==null){
      alert('Debe iniciar sesión para ingresar a eMercado')
      location.href="login.html";
      }
      else{
      inputEmail.value = usuario.email;
      /*inputPrimernom.value = usuario.primernombre;
      inputSegundonom.value = usuario.segundonombre;
      inputPrimerape.value = usuario.primerapellido;
      inputSegundoape.value = usuario.segundoapellido;
      inputTelefono.value = usuario.telefonousu;*/
      }
  }

  function validarDatosuser(){

    let prinom = document.getElementById("primernom").value;
    let priape = document.getElementById("primerape").value;

    if(prinom!="" && priape!=""){
        alert('Cambios en usuario almacenados correctamente')
        usuario.primernombre = document.getElementById("primernom").value;
        usuario.primerapellido = document.getElementById("primerape").value;
        usuario.segundonombre = document.getElementById("segundonom").value;
        usuario.segundoapellido = document.getElementById("segundoape").value;
        usuario.telefonousu = document.getElementById("telefono").value;
        sessionStorage.setItem('datos', JSON.stringify(usuario))
        location.reload();
    }
    else{
        alert('Debe completar los datos requeridos (*)')
    }

  }