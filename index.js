//calculator object
const calculator=
{
    displayValue:'0',  //shows input of user or result of operation on screen
    firstOperand:null,
    waitingForSecondOperand:false,  //checks of both the first operand and operator have been inputted. If true then next nos. user enters will be second operand.
    operator:null,
};

function updateDisplay()
{
    const display=document.querySelector('.calculator-screen');
    display.value=calculator.displayValue;
}

//to detect the clicks
const keys=document.querySelector('.calculator-keys');
keys.addEventListener('click',function(event)
{
     //access the clicked element
    const target = event.target;

    const value = target.value;

    if(!target.matches('button'))
    {
        return;  //if target doesn't match with button then exit.
    }

    switch(value)
    {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            //checks whether the parsed value is an integer
            //parseFloat converts string to floating-point number
            if(Number.isInteger(parseFloat(value)))
            {
                inputDigit(value);
            }
    }
    updateDisplay();
});

//to make the clicked digits visible on screen.
function inputDigit(digit)
{
    const displayValue = calculator.displayValue;
    const waitingForSecondOperand = calculator.waitingForSecondOperand;
    
    if(waitingForSecondOperand === true)
    {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }
    else
    {
        //if current displayValue is 0 overwrite it othervise append to it.
        calculator.displayValue = displayValue=='0' ? digit : displayValue + digit;
    }
    
    console.log(calculator);
}


//input the decimal on screen
function inputDecimal(dot)
{
    if(calculator.waitingForSecondOperand ===true)
    {
        calculator.displayValue ='0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    //to check if displayValue already contains decimal point.
    if(!calculator.displayValue.includes(dot))
    {
        calculator.displayValue = calculator.displayValue + dot;
    }
}

//to handle the operators
function handleOperator(nextOperator)
{
    const firstOperand = calculator.firstOperand;
    const displayValue = calculator.displayValue;
    const operator     = calculator.operator;

    //parseFloat converts string to floating-point number
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand)
    {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    //isNaN() determines whether a value is Not-A-Number. Returns true if value in not a number.
    //to verify the inputValue is not a NaN value.
    if(firstOperand===null && !isNaN(inputValue))
    {
        calculator.firstOperand = inputValue;
    }
    else if(operator)
    {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = parseFloat(result.toFixed(7));
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

//when user clicks operator after 2nd operand. 
//Evaluate the previous result and display on screen. 
//Update first operand.
function calculate(firstOperand, secondOperand, operator)
{
    if(operator === '+')
    {
        return firstOperand + secondOperand;
    }
    else if(operator === '-')
    {
        return firstOperand - secondOperand;
    }
    else if(operator === '*')
    {
        return firstOperand * secondOperand;
    }
    else if(operator === '/')
    {
        return firstOperand / secondOperand;
    }
    return secondOperand;   //if the operator is '='
}

function resetCalculator()
{
    calculator.displayValue ='0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}






