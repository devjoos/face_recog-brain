const calculator = () => {
    let firstNum = prompt('What is your first number?');
    let secondNum = prompt('What is your second number?');
    let whichOne = prompt('Would you like to add, subtract, multiply, or divide?');
    let add = Number(firstNum) + Number(secondNum);
    let subtract = Number(firstNum) - Number(secondNum);
    let multi = Number(firstNum) * Number(secondNum);
    let divide = Number(firstNum) / Number(secondNum);

    if (whichOne === 'add') {
        alert(`the answer is ${add}`)

    } else if (whichOne === 'subtract') {
        alert(`the answer is ${subtract}`)
    } else if (whichOne === 'multiply') {
        alert(`the answer is ${multi}`)
    } else if (whichOne === 'divide') {
        alert(`the answer is ${divide}`)
    } else {
        return alert('this is not an option, this program will terminate')

    }
    calculator();

}

calculator();