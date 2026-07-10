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
                result = 'Error';
                addToHistory(previousNumber, operation, currentNumber, result);
                return result;
                    //return 'Error';
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
        addToHistory(previousNumber, operation, currentNumber, result);
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

        switch (true) {
            case this.classList.contains('number'):
                addDigit(value);
                break;

            case this.classList.contains('operator'):
                switch (value) {
                    case '=':
                        handleEquals();
                        break;

                    case '.':
                        addDigit(value);
                        break;

                    case '+-':
                        if (currentNumber !== '') {
                            if (currentNumber.startsWith('-')) {
                                currentNumber = currentNumber.substring(1);
                            } else {
                                currentNumber = '-' + currentNumber;
                            }

                            updateDisplay(currentNumber);
                        }
                        break;

                    default:
                        handleOperator(value);
                        break;
                }
                break;

            case this.classList.contains('clear-button'):
                clearAll();
                break;
            }
        });
    });

    //logica para agraegar al historial con Local storage
 
    let countOperation = 1;
    let historyData = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

 
    function addToHistory(firstNumber, operation, secondNumber, result) {
        const operationSymbol = operation === "X" ? "*" : operation;

        const operationText = `${firstNumber} ${operationSymbol} ${secondNumber} = ${result}`;

        historyData.push(operationText);

        localStorage.setItem("calculatorHistory", JSON.stringify(historyData));

        renderHistory();

        countOperation++;
    } 

    function renderHistory() {
        const displayHistory = document.querySelector(".history");

        displayHistory.innerHTML = "";

        historyData.forEach((item, index) => {
            const newRow = document.createElement("li");
            const titleHistory = document.createElement("h5");
            const operationText = document.createElement("p");

            titleHistory.textContent = `Operación #${index + 1}`;
            operationText.textContent = item;

            newRow.classList.add("history-item");
            titleHistory.classList.add("history-title");
            operationText.classList.add("history-operation");

            newRow.appendChild(titleHistory);
            newRow.appendChild(operationText);

            displayHistory.prepend(newRow);
        });
    }
        renderHistory();

        if (historyData.length > 0) {
            countOperation = historyData[historyData.length - 1].number + 1;
        };
        
    const cleanHistory = document.querySelector(".clean-history");

    cleanHistory.addEventListener('click',()=>{
        localStorage.removeItem("calculatorHistory")
        historyData = [];
        countOperation=0;
        renderHistory();
    })

} )

