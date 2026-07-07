document.addEventListener('DOMContentLoaded',function(){

    
    const calculatorDisplay = document.getElementById("calculator-display");
    const calculatorButtons = document.querySelectorAll(".calculator-buttons button")
    
    let currentNumber = '';
    let previousNumber = '';
    let operation = null;
    let shouldResetDisplay = false;

   
    function updateDisplay(value) {
        calculatorDisplay.textContent = value || '0';
    }
    
    
    function addDigit(digit) {
        if (shouldResetDisplay) {
            currentNumber = '';
            shouldResetDisplay = false;
        }
        
        if (currentNumber.length >= 10) return;
       
        if (digit === '0' && currentNumber === '0') return;
        
        if (digit === '.' && currentNumber === '') {
            currentNumber = '0.';
        } 
     
        else {
            currentNumber += digit;
        }
        
        updateDisplay(currentNumber);
    }

    function clearAll(){
        currentNumber='';
        previousNumber = '';
        operation = null;
        shouldResetDisplay = false;
        updateDisplay('0');

    }

    function handleOperator(operator) {
        if (currentNumber === '' && previousNumber === '') return;
            
        if (currentNumber === '' && previousNumber !== '') {
               
                operation = operator;
                return;
            }
        
        if (previousNumber !== '' && !shouldResetDisplay) {
           
            const result = calculate();
            if (result !== null) {
                currentNumber = result.toString();
                updateDisplay(currentNumber);
            }
        }
        
        previousNumber = currentNumber;
        operation = operator;
        shouldResetDisplay = true;
    }
   
    function calculate() {
        const firstNumber = parseFloat(previousNumber);
        const secondNumber = parseFloat(currentNumber);
        
        if (isNaN(firstNumber) || isNaN(secondNumber)) return null;
        
        let result;
        switch(operation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case 'X':
                result = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber === 0) {
                    return 'Error';
                }
                result = firstNumber / secondNumber;
                break;
            case '%':
                result = firstNumber * (secondNumber / 100);
                break;
            default:
                return null;
        }
        
      
        result = Math.round(result * 1000000) / 1000000;
        return result;
    }

    function handleEquals() {
        if (previousNumber === '' || currentNumber === '') return;
        
        const result = calculate();
        if (result !== null && result !== 'Error') {
            currentNumber = result.toString();
            previousNumber = '';
            operation = null;
            updateDisplay(currentNumber);
            shouldResetDisplay = true;
        } else if (result === 'Error') {
            calculatorDisplay.textContent = 'Error';
            shouldResetDisplay = true;
            currentNumber = '';
            previousNumber = '';
            operation = null;
        }
    }

    calculatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            console.log('Botón presionado:', value);

            if (this.classList.contains('number')) {
                 addDigit(value);
                
            } else if (this.classList.contains('operator')) {
                 if (value === '=') {
                    handleEquals();
                } else if (value === '.') {
                    addDigit(value);
                } else if (value === '+-') {
                   
                    if (currentNumber !== '') {
                        if (currentNumber.startsWith('-')) {
                            currentNumber = currentNumber.substring(1);
                        } else {
                            currentNumber = '-' + currentNumber;
                        }
                        updateDisplay(currentNumber);
                    }
                } else {
                    handleOperator(value);
                }
                
            } else if (this.classList.contains('clear-button')) {
                
                clearAll();
                
            }
        });
    });
} )

