// mouse input with screen buttons
document.querySelectorAll(".btn").forEach(item => {
   item.addEventListener("click", event => {
      inputSymbol = event.target.innerHTML;
      displaySymbols = calculation(inputSymbol);

      document.querySelector(".calculator-display").innerHTML = displaySymbols;
   });
});

// keyboard input allowed keys only
document.querySelector("body").addEventListener("keydown", event => {
      keyInput = event.key;   
      keyInput === "Enter" ? keyInput="=" : null;
      keyInput === "Backspace"? keyInput="CE" : null;
      if (allowedKeys.indexOf(keyInput)>=0) {
         displaySymbols = calculation(keyInput);
         document.querySelector(".calculator-display").innerHTML = displaySymbols;
      }      
   });

let allowedKeys = ["1","2","3","4","5","6","7","8","9","0","/","*","-","+",".","=","CE"];
let displaySymbols;
let sequenceArray = [];
let numberA="e";
let numberB;
let operation;
let result;

function calculation(symbol) { 
   if (symbol==="C") {
      numberA = "e";
      sequenceArray = [];
      return 0;   
   }
   if (symbol==="CE") {
      sequenceArray.pop();
      return sequenceArray.join("");
   }
   sequenceArray.push(symbol); 
   result = sequenceArray.join("");
   // next if-part will check for no second "." and prevent "." be first in sequence
   if (symbol === "." && ((sequenceArray.length-1 > sequenceArray.indexOf(symbol)) || sequenceArray.length === 1)) {
      sequenceArray.pop();      
      return sequenceArray.join("");
   } 
   
   if (isNaN(symbol) && symbol !== ".") {
      sequenceArray.pop();
      // cut x. or x+ to x
      if (sequenceArray[sequenceArray.length - 1]===".") {
         sequenceArray.pop();
      }
      // define A and B and perform calculation
      if (numberA==="e") {
         operation = symbol;
         numberA = Number(sequenceArray.join(""));
         result = numberA;
      } else
         if (sequenceArray.length > 0) {
            // case prev performed operation was "=" we need update numberA
            if (operation==="=") {
               numberA = Number(sequenceArray.join(""));
               operation = symbol;
               sequenceArray = [];    
               return numberA;            
            }
            
            numberB = Number(sequenceArray.join(""));
            // prevent divide by zero
            if (numberB===0 && operation==="/"){
               numberA="e";
               sequenceArray = [];  
               return "can't divide by zero!";
            }
            // calculating expression result
            result = getResult(numberA,numberB,operation);
            numberA = result;
            operation = symbol;         
         } else {
            operation = symbol;
            return numberA;
         }
      sequenceArray = [];       
   }  
   console.log(sequenceArray);
   console.log(numberA," ",numberB," ",operation," ",result);
   return result;
}

function getResult(a,b,op){
   let result;
   switch(op) {
      case "+": result=a+b; break;
      case "-": result=a-b; break;
      case "*": result=a*b; break;
      case "/": result=a/b; break;
      default: null;
   }
   // round to 5 numbers after float if result is non integer
   Number.isInteger(result) ? null : result = Math.round(result*100000)/100000;
   return result;
}


