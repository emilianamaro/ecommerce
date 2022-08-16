let email = document.getElementById("email");
let contraseña = document.getElementById("contraseña");
let ingresar = document.getElementById("ingresar");

ingresar.addEventListener("click", () => {

    if (email.value != null  && contraseña.value != null) {
        console.log("entro al if");
        window.location.href = "";
    } else {
        console.log("entro al else");
    }
});