
document.addEventListener('DOMContentLoaded', function() {
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', function() {
if (this.checked) {
document.body.classList.add('dark');
document.body.classList.remove('bg-gray-100');
document.body.classList.add('bg-gray-900');
} else {
document.body.classList.remove('dark');
document.body.classList.remove('bg-gray-900');
document.body.classList.add('bg-gray-100');
}
});
});


document.addEventListener('DOMContentLoaded', function() {
const calculator = document.querySelector('.calculator-content');
const modeSlider = document.getElementById('modeSlider');
const basicModeBtn = document.getElementById('basicModeBtn');
const scientificModeBtn = document.getElementById('scientificModeBtn');
basicModeBtn.addEventListener('click', function() {
calculator.classList.remove('scientific-mode');
modeSlider.classList.remove('scientific');
basicModeBtn.classList.add('text-white');
basicModeBtn.classList.remove('text-gray-700');
scientificModeBtn.classList.remove('text-white');
scientificModeBtn.classList.add('text-gray-700');
});
scientificModeBtn.addEventListener('click', function() {
calculator.classList.add('scientific-mode');
modeSlider.classList.add('scientific');
scientificModeBtn.classList.add('text-white');
scientificModeBtn.classList.remove('text-gray-700');
basicModeBtn.classList.remove('text-white');
basicModeBtn.classList.add('text-gray-700');
});
});


document.addEventListener('DOMContentLoaded', function() {
const historyToggle = document.getElementById('historyToggle');
const closeHistory = document.getElementById('closeHistory');
const historyPanel = document.querySelector('.history-panel');
historyToggle.addEventListener('click', function() {
historyPanel.classList.add('active');
});
closeHistory.addEventListener('click', function() {
historyPanel.classList.remove('active');
});
});


document.addEventListener('DOMContentLoaded', function() {
const expressionRow = document.querySelector('.expression-row');
const resultRow = document.querySelector('.result-row');
const memoryIndicator = document.getElementById('memoryIndicator');
let memoryValue = 0;
function updateMemoryIndicator() {
    memoryIndicator.textContent = `M: ${memoryValue}`;
    memoryIndicator.style.opacity = memoryValue !== 0 ? '1' : '0.7';
}
function animateMemoryButton(button) {
    button.classList.add('scale-95', 'bg-opacity-80');
    setTimeout(() => {
        button.classList.remove('scale-95', 'bg-opacity-80');
    }, 100);
}
document.getElementById('memoryAdd').addEventListener('click', function() {
    animateMemoryButton(this);
    memoryValue += parseFloat(currentResult) || 0;
    updateMemoryIndicator();
});
document.getElementById('memoryAddScientific').addEventListener('click', function() {
    animateMemoryButton(this);
    memoryValue += parseFloat(currentResult) || 0;
    updateMemoryIndicator();
});
document.getElementById('memorySubtract').addEventListener('click', function() {
    animateMemoryButton(this);
    memoryValue -= parseFloat(currentResult) || 0;
    updateMemoryIndicator();
});
document.getElementById('memoryClear').addEventListener('click', function() {
    animateMemoryButton(this);
    memoryValue = 0;
    updateMemoryIndicator();
});
document.getElementById('memoryRecall').addEventListener('click', function() {
    animateMemoryButton(this);
    if (memoryValue !== 0) {
        if (lastOperation) {
            currentResult = memoryValue.toString();
        } else {
            currentResult = currentResult === '0' ? 
                memoryValue.toString() : 
                currentResult + memoryValue.toString();
        }
        updateDisplay();
    }
});
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const functionButtons = document.querySelectorAll('.function-btn');
let currentExpression = '';
let currentResult = '0';
let lastOperation = false;
// Update display
function updateDisplay() {
expressionRow.textContent = currentExpression || '0';
resultRow.textContent = currentResult;
}
// Add button press animation
function animateButton(button) {
button.classList.add('scale-95', 'shadow-inner');
setTimeout(() => {
button.classList.remove('scale-95', 'shadow-inner');
}, 100);
}
// Number button click
numberButtons.forEach(button => {
button.addEventListener('click', function() {
animateButton(this);
const value = this.textContent.trim();
if (lastOperation) {
currentResult = '0';
lastOperation = false;
}
if (currentResult === '0' && value !== '.') {
currentResult = value;
} else {
// Prevent multiple decimal points
if (value === '.' && currentResult.includes('.')) return;
currentResult += value;
}
updateDisplay();
});
});
// Operator button click
operatorButtons.forEach(button => {
button.addEventListener('click', function() {
animateButton(this);
const operator = this.textContent.trim();
if (operator === '=') {
try {
// Prepare expression for evaluation
let evalExpression = currentExpression + currentResult;
evalExpression = evalExpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
// Evaluate and format result
const result = eval(evalExpression);
currentExpression += currentResult + ' = ';
currentResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
lastOperation = true;
} catch (error) {
currentResult = 'Error';
}
} else {
// Add operator to expression
currentExpression += currentResult + ' ' + operator + ' ';
lastOperation = true;
}
updateDisplay();
});
});
// Function button click
functionButtons.forEach(button => {
button.addEventListener('click', function() {
animateButton(this);
const func = this.textContent.trim();
if (func === 'C') {
currentExpression = '';
currentResult = '0';
} else if (func === '±') {
currentResult = (parseFloat(currentResult) * -1).toString();
} else if (func === '%') {
currentResult = (parseFloat(currentResult) / 100).toString();
} else if (func === 'sin') {
currentResult = Math.sin(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'cos') {
currentResult = Math.cos(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'tan') {
currentResult = Math.tan(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'log') {
currentResult = Math.log10(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'ln') {
currentResult = Math.log(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === '√') {
currentResult = Math.sqrt(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'π') {
currentResult = Math.PI.toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'x²') {
currentResult = (parseFloat(currentResult) ** 2).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'x³') {
currentResult = (parseFloat(currentResult) ** 3).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'e^x') {
currentResult = Math.exp(parseFloat(currentResult)).toFixed(8).replace(/\.?0+$/, '');
} else if (func === 'n!') {
const factorial = n => {
if (n <= 1) return 1;
return n * factorial(n - 1);
};
const num = parseInt(currentResult);
if (num < 0 || !Number.isInteger(num)) {
currentResult = 'Error';
} else {
currentResult = factorial(num).toString();
}
}
updateDisplay();
});
});
// Keyboard support
document.addEventListener('keydown', function(event) {
const key = event.key;
// Find corresponding button
let targetButton;
if (/[0-9.]/.test(key)) {
targetButton = Array.from(numberButtons).find(btn => btn.textContent.trim() === key);
} else if (['+', '-', '*', '/', '=', 'Enter'].includes(key)) {
let operatorKey = key;
if (key === '*') operatorKey = '×';
if (key === '/') operatorKey = '÷';
if (key === '-') operatorKey = '−';
if (key === 'Enter') operatorKey = '=';
targetButton = Array.from(operatorButtons).find(btn => btn.textContent.trim() === operatorKey);
} else if (key === 'Escape') {
targetButton = Array.from(functionButtons).find(btn => btn.textContent.trim() === 'C');
} else if (key === '%') {
targetButton = Array.from(functionButtons).find(btn => btn.textContent.trim() === '%');
}
// Simulate button click if found
if (targetButton) {
targetButton.click();
event.preventDefault();
}
});
});
