const boxText = document.getElementById('box-text')
const buttons = document.querySelectorAll('.button')
const buttonsContainer = document.getElementById('buttons-container');
boxText.textContent = 0;

let number1 = false;;
let operatorsArray = []
let numbersArray = []
let resultado = 0;

buttonsContainer.addEventListener('click', e =>{
    if (e.target.classList.contains('button')){
        const button = e.target

        if (button.dataset.number){
            printNumber(button)
        }

        if (button.dataset.operation){
            saveOperation(button)
        }

        if (button.dataset.result){
            giveResult(button)
        }
    }
})

const printNumber = el =>{
    if (boxText.textContent == "0" || boxText.textContent == 'Error'){
        boxText.textContent = el.dataset.number;
    } else{
        boxText.textContent += el.dataset.number
    }
}

const saveOperation = el =>{
    let operator = el.textContent;

    if (number1 == false){
        number1 = true;
        numbersArray.push(parseInt(boxText.textContent))
        boxText.textContent += operator;
        operatorsArray.push(operator);

    }else{
        numbersArray.push(getLastNumber())
        boxText.textContent += operator;
        operatorsArray.push(operator)
    }
}

const giveResult = el =>{
    if (el.dataset.result == "equals"){
        numbersArray.push(getLastNumber())

        checkIfMultiplicationAndDivision();

        let positionOperator = 0;
        if (operatorsArray.length==0){
            resultado = numbersArray[0];
        }else{
            operatorsArray.forEach( operator =>{
                if (positionOperator == 0){
                    resultado = chooseOperation(operator, numbersArray[0], numbersArray[1])
                    positionOperator ++;
                }else{
                    resultado = chooseOperation(operator, resultado, numbersArray[positionOperator+1] )
                    positionOperator++
                }
            })
        }
        

        Number.isNaN(resultado) ? boxText.textContent = 'Error' : boxText.textContent = resultado;
        operatorsArray = []
        numbersArray = []

    } else{
        boxText.textContent = 0;
        operatorsArray = []
        numbersArray = []
    }
}

const chooseOperation = (operator, number1, number2) =>{
    let result;
    switch(operator){
        case "+":
            result = number1 + number2;
            break;
        case "-":
            result = number1 - number2;
            break;
        case "/":
            result = number1 / number2;
            break;
        case "x":
            result = number1 * number2;
            break;
    }
    return result;
}






const getLastNumber = () =>{
    let positionLastOperator = boxText.textContent.lastIndexOf(operatorsArray[operatorsArray.length-1]);
    let newNumber = parseInt(boxText.textContent.slice(positionLastOperator+1))
    return newNumber
}


const checkIfMultiplicationAndDivision = () =>{
    let isMultiplicationOrDivision = true;

    while (isMultiplicationOrDivision == true){
        let positionMultiplications = [];
        let positionDivisions = [];
        if (operatorsArray.includes("x")){
            for (i=0; i<operatorsArray.length; i++){
                if (operatorsArray[i] == "x"){
                    positionMultiplications.push(i)
                    console.log(positionMultiplications)
                }
            }
        }
        if (operatorsArray.includes("/")){
            for (i=0; i<operatorsArray.length; i++){
                if (operatorsArray[i] == "/"){
                    positionDivisions.push(i)
                }
            }
        }


        if (positionMultiplications.length >0 || positionDivisions.length >0){
            isMultiplicationOrDivision = true
    
            if (positionMultiplications.length>0 && positionDivisions.length >0){
                if (positionMultiplications[0] < positionDivisions[0]){
                    runMultiplication(positionMultiplications)
                    positionMultiplications.shift()
                }else{
                    runDivision(positionDivisions)
                    positionDivisions.shift()
                }
            } else if (positionMultiplications.length>0){
                runMultiplication(positionMultiplications)
                positionMultiplications.shift()
            } else{
                runDivision(positionDivisions)
                positionDivisions.shift()
            }
        }else{
            isMultiplicationOrDivision = false;
        }
    }
}


const runMultiplication = (multiplication) =>{
    console.log(numbersArray[multiplication[0]])
    console.log(numbersArray[multiplication[0]+1])
    let result = chooseOperation("x", numbersArray[multiplication[0]], numbersArray[multiplication[0]+1])
    numbersArray.splice(multiplication[0], 2, result)
    console.log(numbersArray)
    operatorsArray.splice(multiplication[0], 1)
    multiplication.shift()
}

const runDivision = division =>{
    let result = chooseOperation("/", numbersArray[division[0]], numbersArray[division[0]+1])
    numbersArray.splice(division[0], 2, result)
    operatorsArray.splice(division[0], 1)
    division.shift()
}