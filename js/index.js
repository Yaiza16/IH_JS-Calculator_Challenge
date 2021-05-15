const boxText = document.getElementById('box-text')
const buttons = document.querySelectorAll('.button')
const buttonsContainer = document.getElementById('buttons-container');
boxText.textContent = "0"

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
            doOperation(button)
        }

        if (button.dataset.result){
            giveResult(button)
        }
    }
})

const printNumber = el =>{
    if (boxText.textContent == "0"){
        boxText.textContent = el.dataset.number;
    } else{
        boxText.textContent += el.dataset.number
    }
}

const doOperation = el =>{
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

    console.log(numbersArray);
    console.log(operatorsArray);
}

const giveResult = el =>{
    if (el.dataset.result == "equals"){

        numbersArray.push(getLastNumber())
        console.log(numbersArray)

        checkIfMultiplicationAndDivision()

        let positionOperator = 0;
        operatorsArray.forEach( operator =>{
            if (positionOperator == 0){
                resultado = chooseOperation(operator, numbersArray[0], numbersArray[1])
                positionOperator ++;
            }else{
                resultado = chooseOperation(operator, resultado, numbersArray[positionOperator+1] )
                positionOperator++
            }
        })

        boxText.textContent = resultado;
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


/* ---------------------------------------------------------- */


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

        console.log(positionMultiplications)
        console.log(positionDivisions)

    
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
                console.log("Posición multiplicación :" +positionMultiplications)
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

    console.log(numbersArray)
    console.log(operatorsArray)


    // if (positionMultiplications.length >0 || positionDivisions.length >0){
    //     isMultiplicationOrDivision = true

    //     if (positionMultiplications.length >0 && positionDivisions.length >0){
    //         runOperation(positionMultiplications, positionDivisions);
    //     } else if (positionMultiplications.length>0){
    //         runMultiplication(positionMultiplications)
    //     } else{
    //         runDivision(positionDivisions)
    //     }
    // }


    // if (isMultiplicationOrDivision){
    //     runOperation(positionMultiplications, positionDivisions);
    // }

    // console.log(positionMultiplications)
    // runMultiplication(positionMultiplications)
    // runOperation(positionMultiplications, positionDivisions)
}

const runOperation = (multiplications, divisions) =>{
    if (multiplications[0]<divisions[0]){
        // let result = chooseOperation("x", numbersArray[multiplications[0]], numbersArray[multiplications[0]+1])
        // console.log(result)
        // numbersArray = numbersArray.splice(multiplications[0], 2, result)
        // console.log(numbersArray)
        runMultiplication(multiplications)
    }else{
        runDivision(divisions)
    }
}

const runMultiplication = (multiplication) =>{
    console.log(numbersArray[multiplication[0]])
    console.log(numbersArray[multiplication[0]+1])
    let result = chooseOperation("x", numbersArray[multiplication[0]], numbersArray[multiplication[0]+1])
    console.log("resultado multiplicación: " +result)
    console.log ("Comienzo multiplicación: " + multiplication[0])
    numbersArray.splice(multiplication[0], 2, result)
    operatorsArray.splice(multiplication[0], 1)
    multiplication.shift()
    console.log(numbersArray)
    console.log(operatorsArray)
    console.log(multiplication)
}

const runDivision = division =>{
    let result = chooseOperation("/", numbersArray[division[0]], numbersArray[division[0]+1])
    numbersArray.splice(division[0], 2, result)
    operatorsArray.splice(division[0], 1)
    division.shift()
    console.log(numbersArray)
    console.log(operatorsArray)
}