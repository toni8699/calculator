let display = document.getElementById("display");
let clearEntryButton= document.querySelector(".clear-entry");
let clearAllButton= document.querySelector(".clear-all");
let percentButton= document.querySelector(".percent");
let signButton= document.querySelector(".sign");
let operatorButton= document.querySelectorAll(".operator");
let numberButton= document.querySelectorAll(".number");
let dotButton= document.querySelector(".dot");
let equalsButton= document.querySelector(".equals");

let currentNumber = "";
let previousNumber = "";
let currentOperator = "";
let operatorClicked = false;
let result = 0;
function operate(operator, a, b) {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        console.log(a, b);
        return a-  b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      case "^":
        return Math.pow(a, b);
      default:
        return 0;
    }
  }
  function populateDisplay(value) {
    if (value.endsWith(".0")) {
        value = value.slice(0, -2);
      }
    display.textContent = value;
  }

  function clearAll(){
    currentNumber = "";
    previousNumber = "";
    currentOperator = "";
    result = 0;
    populateDisplay("");
  }
  function clearEntry(){
    currentNumber = "";
    populateDisplay("");
  }
  clearAllButton.addEventListener("click", clearAll);
  clearEntryButton.addEventListener("click", clearEntry);


  function calculate() {
    if (currentOperator === "") {
      return;
    }
    result =operate(currentOperator, parseFloat(previousNumber), parseFloat(currentNumber)).toFixed(1);
    console.log("result", result);
    currentNumber = result.toString();
    previousNumber = "";
    currentOperator = "";
    populateDisplay(result);
  }

  equalsButton.addEventListener(("click"), () => {
    if (currentNumber === "") {
      return;
    }
    calculate();
  })

function updateDisplay(input) {
    if (operatorClicked) {
        currentNumber = input;
        operatorClicked = false;
    }else if (currentNumber === "") {
        currentNumber = input;
    }   else {
        currentNumber += input;
    }
    populateDisplay(currentNumber);
}
operatorButton.forEach(button => {
    button.addEventListener("click", (e) => 
        // handle when 2 operator is clicked ? not sure how to handle it though.
        { if (operatorClicked) {
            currentOperator = e.target.value;
            return ;
        }
                //if there's a current operator, calculate first


            if (currentOperator !== "") {
            calculate();
        }
            console.log("currentNumber, previousNumber, currentOperator", currentNumber, previousNumber, currentOperator);  
            currentOperator = e.target.value;
            operatorClicked = true;
            previousNumber = currentNumber; // store the previous number
            currentNumber = ""; //reset the current number
        })
})

  numberButton.forEach(button => {
    button.addEventListener("click", (e) => 
        { if (result !== 0) {
            clearEntry();
        }
            let input=e.target.value;
            updateDisplay(input);
        })
  });
percentButton.addEventListener("click", () => {
    currentNumber = (currentNumber / 100).toString();
    populateDisplay(currentNumber);
})
signButton.addEventListener("click", () => {
    currentNumber = (-currentNumber).toString();
    populateDisplay(currentNumber);
})
dotButton.addEventListener("click", () => {
    if (currentNumber.includes(".")) {
        return;
    }
    currentNumber += ".";
    populateDisplay(currentNumber);
})

