const boxText = document.getElementById('box-text')
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const buttonsContainer = document.getElementById('buttons-container');


buttonsContainer.addEventListener('click', e =>{
    printButtons(e)
    clearText(e)
    result(e)
})

const printButtons = e =>{
    if(e.target.classList.contains('number') || e.target.classList.contains('operator')){
        boxText.innerHTML += e.target.innerHTML;
        console.log()
    }
}

const clearText = e =>{
    if (e.target.classList.contains('clear')){
        boxText.innerHTML = "";
    }
}

const result = e =>{
    if (e.target.classList.contains('equals')){
        let operation = boxText.innerHTML;
        boxText.innerHTML = operation;
        console.log(operation)
    }
}
