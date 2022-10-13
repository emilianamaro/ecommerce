let email = document.getElementById("email");
let contraseña = document.getElementById("contraseña");
let ingresar = document.getElementById("ingresar");

ingresar.addEventListener("click", function() {
    if (email.value.length >= 1 && contraseña.value.length >= 1) {
        localStorage.setItem("userId", email.value);
        window.location = "main.html"
    } else {
        alert("Ingrese todos los datos para iniciar sesión.")
    }
});
