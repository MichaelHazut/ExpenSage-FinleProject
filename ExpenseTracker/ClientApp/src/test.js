function calculateNumber(operator){
    return function actualCalc(number1, number2){
        switch(operator){
            case '+':
                return number + number2
            case '-':
                return number - number2
            case '/':
                return number / number2
            case '*':
                return number * number2
        }
    }
}