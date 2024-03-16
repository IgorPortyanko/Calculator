
const buttonContainer = document.querySelector('.button-container')
const output = document.querySelector('.output-container-window')

let firstElement = ''
let secondElement = ''
let arithmeticOperation = ''
let isClickedArithmetic = false
let isClickedResult = false

renderButton()

function renderButton () {
    buttonDescription.forEach((elem) => {
        const button  = new Button(elem.id, elem.classes, elem.value)
        button.render(buttonContainer)
    })
}


buttonContainer.addEventListener('click', function(event){
    buttonsHandler(event)
})

document.addEventListener('keypress', function(event){
    keysHandler(event) 
})

document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') {
        clearAll()
    }
    if (event.key === 'Backspace') {
        if (output.textContent === '0') {
            return
        }
        output.textContent = output.textContent.slice(0, -1)
        if (output.textContent === '') {
            output.textContent = '0'
        }
        
    }
})



function writeNumber (event) {
    let content = ''
    if (output.textContent === '0' || isClickedArithmetic || isClickedResult) {
        output.textContent = ''
    }
    if (output.textContent.length >= 16) return
    if (isClickedResult) {
        firstElement = ''
        secondElement = ''
        arithmeticOperation = ''
    }
    content = event
    output.textContent += content
    isClickedResult = false
    isClickedArithmetic = false
}

function clearAll () {
    firstElement = ''
    secondElement = ''
    arithmeticOperation = ''
    isClickedArithmetic = false
    isClickedResult = false
    output.textContent = '0'
}

function writeWithDot () {
    if (output.textContent.includes('.')) {
        return
    }
    if (isClickedResult) {
        return
    }
    output.textContent += '.'
}

function addMinus () {
    if (output.textContent === '0') {
        return
    }
    else if (output.textContent.includes('-')) {
        output.textContent = output.textContent.substr(1)
    } else {
        output.textContent = '-' + output.textContent;
    }
}

function arithmeticalOperations (event) {
    if (arithmeticOperation) {
        secondArithmeticalOperations(event)
    } else 
    {
        firstArithmeticalOperations(event)
    }
} 

function firstArithmeticalOperations (event) {
    arithmeticOperation = event
    firstElement = output.textContent
    isClickedArithmetic = true
    isClickedResult = false
}

function secondArithmeticalOperations (event) {
    getResult()
    firstElement = output.textContent
    secondElement = ''
    arithmeticOperation = event
    isClickedArithmetic = true
}

function getResult () {
    if (firstElement === '') return
    if (secondElement === '') {
        secondElement = output.textContent
    }
    let num1 = parseFloat(firstElement);
    let num2 = parseFloat(secondElement);
    let result
    switch (arithmeticOperation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
        case '*':    
            result = num1 * num2;
            break;
        case '/':
            if (secondElement === '0') {
                result = 'ERROR'
                output.textContent = result
                return
            } else {
            result = num1 / num2;
            }
            break;
    }
    output.textContent = sortResultByNumber(result)
}

function clearResult () {
    firstElement = ''
    secondElement = ''
    arithmeticOperation = ''
    isClickedResult = true
    isClickedArithmetic = false
} 

function sizeCheckResult (number) {
    const sizeNumber = number.toString().length
    if (sizeNumber > 16) {
        const checkNumber = number.toExponential([8])
        return checkNumber
    } else {
        return number
    }
}

function rounded (number) {
    const roundedNum = Math.round(number).toString().length
    if (roundedNum >= 15)  {
        return number
    } else {
        const remnant = 15 - roundedNum
        const result = number.toFixed(remnant)
        return result
    }
}

function sortResultByNumber (num) {
    if (Number.isInteger(num)) {
        return sizeCheckResult(num)
    } else {
        return rounded(num)
    }
}