document.addEventListener('DOMContentLoaded',function(){

    /* console.log(document);
    console.log(document.title);
    document.title="Mi Proyecto calculadora por rummy";
    console.log(document.title); */


    const pantalla_calculadora =document.getElementById("pantalla-calculadora");
    const titulo= document.querySelector(".botones-calculadora");
    const primerBoton=document.querySelector(".botones-calculadora button");
    const botonesCalculadora=document.querySelectorAll(".botones-calculadora button");

    /* console.log(pantalla_calculadora)
    pantalla_calculadora.textContent="holoholo"
    console.log(pantalla_calculadora)

   
    console.log(titulo);
    titulo.textContent="calculardorita"
    
    console.log(primerBoton);
    console.log(botonesCalculadora);

    botonesCalculadora.forEach(function(boton){
        console.log(boton.textContent);
    }) */

    /* pantalla_calculadora.textContent = "bienvenido"
    const mensaje =document.querySelector(".pantalla-calculadora");
    mensaje.textContent="nueva calc"; */

    /* const mensaje = document.querySelector(".pantalla-calculadora");
    mensaje.innerHTML="<strong>Calculadora lista</strong>"; */

    /* const inputNombre = document.querySelector("#nombre-usuario");
    inputNombre.addEventListener("input", function() {
    console.log(inputNombre.value);
    }); */
    /* botonesCalculadora.forEach(function(boton) {
    boton.addEventListener("click", function() {
            console.log("Hiciste clic en:", boton.textContent);
        });
    }); */
    /* botonesCalculadora.forEach(function(boton) {
        boton.addEventListener("click", function(event) {
            console.log(event);
            console.log(event.type);
        });
    
    }); */
   /*  botonesCalculadora.forEach(function(boton) {
        boton.addEventListener("click", function(event) {
            console.log(event.target);
            console.log(event.target.textContent);
        });
    });  */
    /* botonesCalculadora.forEach(function(boton) {
        boton.addEventListener("click", function(event) {
            pantalla_calculadora.textContent = event.target.textContent;
        });
    }); */

    /* const formularioNombre = document.querySelector("#formulario-nombre");
    const inputNombre = document.querySelector("#nombre-usuario");
    const mensaje = document.querySelector("#mensaje");

    formularioNombre.addEventListener("submit", function(event) {
        event.preventDefault();

        mensaje.textContent = "Nombre guardado: " + inputNombre.value;
    }); */
     /*    const calculadora = document.querySelector(".marco-calculadora");

        calculadora.addEventListener("click", function() {
            console.log("Click en la calculadora");
        });

        botonesCalculadora.forEach(function(boton) {
        boton.addEventListener("click", function(event) {
            event.stopPropagation();
            console.log("Click en botón:", event.target.textContent);
        });
    }); */

    
 /*    const historial = document.querySelector("#historial");
    const item = document.createElement("li");
    item.textContent = "Primer cálculo";
    historial.appendChild(item);
    console.log(item);
    botonesCalculadora.forEach(function(boton) {
    boton.addEventListener("click", function(event) {
        const item = document.createElement("li");
        item.textContent = "Presionaste: " + event.target.textContent;

        historial.appendChild(item);
    });
}); 

    const btnLimpiarHistorial = document.querySelector("#limpiar-historial");
  
    btnLimpiarHistorial.addEventListener("click", function() {
    historial.innerHTML = "";
});
 
btnLimpiarHistorial.addEventListener("click", function() {
    const ultimoItem = historial.querySelector("li:last-child");

    if (ultimoItem) {
        ultimoItem.remove();
    }
}); */

/* const contenedorBotones = document.querySelector(".botones-calculadora");

contenedorBotones.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        pantalla_calculadora.textContent = event.target.textContent;
    }
});
     */
});