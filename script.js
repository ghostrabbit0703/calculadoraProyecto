document.addEventListener('DOMContentLoaded',function(){

    
    const pantallaCalculadora= document.getElementById("pantalla-calculadora");
    const botonesCalculadora= document.querySelectorAll(".botones-calculadora button")
    
    let numeroActual = '';
    let numeroAnterior = '';
    let operacion = null;
    let reiniciarPantalla = false;

   
    function actualizarPantalla(valor) {
        pantallaCalculadora.textContent = valor || '0';
    }
    
    
    function agregarDigito(digito) {
        if (reiniciarPantalla) {
            numeroActual = '';
            reiniciarPantalla = false;
        }
        
        /* if (digito === '-') {
            if (numeroActual === '') {
                numeroActual = '-';
                actualizarPantalla(numeroActual);
            }

            return;
        } */
        if (numeroActual.length >= 10) return;
       
        if (digito === '0' && numeroActual === '0') return;
        
        if (digito === '.' && numeroActual === '') {
            numeroActual = '0.';
        } 
     
        else {
            numeroActual += digito;
        }
        
        actualizarPantalla(numeroActual);
    }

    function limpiarTodo(){
        numeroActual='';
        numeroAnterior = '';
        operacion = null;
        reiniciarPantalla = false;
        actualizarPantalla('0');

    }

    function manejarOperador(operador) {
        if (numeroActual === '' && numeroAnterior === '') return;
            
        if (numeroActual === '' && numeroAnterior !== '') {
                // Cambiar el operador actual
                operacion = operador;
                return;
            }
        
        if (numeroAnterior !== '' && !reiniciarPantalla) {
            // Si ya hay un número anterior y operación, calcular
            const resultado = calcular();
            if (resultado !== null) {
                numeroActual = resultado.toString();
                actualizarPantalla(numeroActual);
            }
        }
        
        numeroAnterior = numeroActual;
        operacion = operador;
        reiniciarPantalla = true;
    }
   
    function calcular() {
        const num1 = parseFloat(numeroAnterior);
        const num2 = parseFloat(numeroActual);
        
        if (isNaN(num1) || isNaN(num2)) return null;
        
        let resultado;
        switch(operacion) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case 'X':
                resultado = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    return 'Error';
                }
                resultado = num1 / num2;
                break;
            case '%':
                resultado = num1 * (num2 / 100);
                break;
            default:
                return null;
        }
        
      
        resultado = Math.round(resultado * 1000000) / 1000000;
        return resultado;
    }

    function manejarIgual() {
        if (numeroAnterior === '' || numeroActual === '') return;
        
        const resultado = calcular();
        if (resultado !== null && resultado !== 'Error') {
            numeroActual = resultado.toString();
            numeroAnterior = '';
            operacion = null;
            actualizarPantalla(numeroActual);
            reiniciarPantalla = true;
        } else if (resultado === 'Error') {
            pantallaCalculadora.textContent = 'Error';
            reiniciarPantalla = true;
            numeroActual = '';
            numeroAnterior = '';
            operacion = null;
        }
    }

    botonesCalculadora.forEach(boton => {
        boton.addEventListener('click', function() {
            const valor = this.getAttribute('data-valor');
            console.log('Botón presionado:', valor);

            if (this.classList.contains('numero')) {
                 agregarDigito(valor);
                
            } else if (this.classList.contains('operador')) {
                 if (valor === '=') {
                    manejarIgual();
                } else if (valor === '.') {
                    agregarDigito(valor);
                } else if (valor === '+-') {
                   
                    if (numeroActual !== '') {
                        if (numeroActual.startsWith('-')) {
                            numeroActual = numeroActual.substring(1);
                        } else {
                            numeroActual = '-' + numeroActual;
                        }
                        actualizarPantalla(numeroActual);
                    }
                } else {
                    manejarOperador(valor);
                }
                
            } else if (this.classList.contains('limpiador')) {
                
                limpiarTodo();
                
            }
        });
    });
} )

