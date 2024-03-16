function keysHandler (event) {
    if (event.keyCode >= 48 && event.keyCode <= 57){
        writeNumber(event.key)
    }
    if ( [42, 43, 45, 47].includes(event.keyCode)) {
        arithmeticalOperations(event.key)
    }
    if (event.key === 'Enter') {
        getResult()
    }
    if (event.key === '.') {
        writeWithDot()
    }
}

function buttonsHandler (event) {
    if (event.target.id === 'ac') {
        clearAll()
        return
    }
    if (event.target.classList.contains('buttons-number')) {
        writeNumber(event.target.textContent.trim())
    }
    if (event.target.classList.contains('button-dot')) {
        writeWithDot()
    }
    if (event.target.classList.contains('button-sign')) {
        addMinus()
    }
    if (event.target.classList.contains('arithmetical')) {
        arithmeticalOperations(event.target.textContent.trim())
    }
    if (event.target.classList.contains('button-equals')) {
        getResult()
        clearResult()
    }
}