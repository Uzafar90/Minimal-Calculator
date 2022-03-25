const display1 = document.querySelector('.result1');
const display2 = document.querySelector('.userChoice');
const allClear = document.querySelector('.clear1');
const clearLast = document.querySelector('.clear2');
const numbers = document.querySelectorAll('.number');
const symbols = document.querySelectorAll('.operand');
const answer = document.querySelector('.equal');

let dp1 = '';
let dp2 = '';
let result = 0;
let dot = false;

// declaring number and dot element
numbers.forEach((number) => {
	number.addEventListener('click', (e) => {
		if (e.target.innerText === '.' && !dot) {
			dot = true;
		} else if (e.target.innerText === '.' && dot) {
			return;
		}
		dp2 += e.target.innerText;
		display2.innerText = dp2;
	});
});

// declaring operation elements
symbols.forEach((operand) => {
	operand.addEventListener('click', (e) => {
		if (!dp2) return;
		dot = false;
		const operation = e.target.innerText;
		if (dp1 && dp2) {
			mathCalculation();
		} else {
			result = parseFloat(dp2);
		}
		removeNum(operation);
		dp1 = operation;
	});
});

// declaring function to store the number
function removeNum(name = '') {
	dp2 = dp2 + ' ' + name + ' ';
}

// declaring function to perform the math calculation (math functionality will be here)
// Calling parseFloat(dp2) will only collect the first value and clears anything after that is whitespace.
// Creating a new array that will hold the two values and then calling the split function can split dp2
function mathCalculation() {
	const valuesInput = dp2.split(' '); //splitting the two numbers with the delimiter being ' ' *whitespace*
	valuesInput[0] + ' ' + valuesInput[2]; //value[0] will be the first value, and value[2] will be the second value, value[1] being the expression only on for debug to show the values, can be removed
	if (dp1 === '×') {
		result = parseFloat(valuesInput[0]) * parseFloat(valuesInput[2]);
	} else if (dp1 === '÷') {
		result = parseFloat(valuesInput[0]) / parseFloat(valuesInput[2]);
	} else if (dp1 === '+') {
		result = parseFloat(valuesInput[0]) + parseFloat(valuesInput[2]);
	} else if (dp1 === '−') {
		result = parseFloat(valuesInput[0]) - parseFloat(valuesInput[2]);
	} else if (dp1 === '%') {
		result = parseFloat(valuesInput[0]) % parseFloat(valuesInput[2]);
	}
}

//declaring equal element to provide results (EQUAL BUTTON this is where we update the HTML with updated answer)
answer.addEventListener('click', (e) => {
	if (!dp1 || !dp2) return;
	dot = false;
	mathCalculation();
	removeNum();
	display1.innerText = result;
	display2.innerTest = '';
	dp1 = result;
	dp2 = '';
});

//declaring clear All element to remove all calculation from memory (AC Button)
allClear.addEventListener('click', (e) => {
	display1.innerText = '0';
	display2.innerText = '0';
	dp1 = '';
	dp2 = '';
	result = 0;
});

//declaring clear last element to remove last number added. (C Button)
clearLast.addEventListener('click', (e) => {
	display2.innerText = '0'; // need to find a way to slice it.
	dp2 = '';
});
