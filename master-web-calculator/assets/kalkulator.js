const Calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = Calculator.displayNumber;
}

function clearCalculator() {
    Calculator.displayNumber = '0';
    Calculator.operator = null;
    Calculator.firstNumber = null;
    Calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (Calculator.displayNumber === '0') {
        Calculator.displayNumber = digit;
    } else {
        Calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }
        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inverseNumber() {
    if (Calculator.displayNumber === '0') {
        return;
    }
    Calculator.displayNumber = Calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!Calculator.waitingForSecondNumber) {
        Calculator.operator = operator;
        Calculator.waitingForSecondNumber = true;
        Calculator.firstNumber = Calculator.displayNumber;
        Calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}

function performCalculation() {
    if (Calculator.firstNumber === null || Calculator.operator === null) {
        alert('Anda belum menetapkan operator');
        return;
    }
    let result = 0;
    if (Calculator.operator === "+") {
        result = parseInt(Calculator.firstNumber) + parseInt(Calculator.displayNumber);
    } else {
        result = parseInt(Calculator.firstNumber) - parseInt(Calculator.displayNumber);
    }
    Calculator.displayNumber = result.toString();
}