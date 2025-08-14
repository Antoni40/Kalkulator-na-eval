// zrobić własny parser


const calculatorDisplay = document.getElementById('display');
document.getElementById('error');
let expression = "";
document.addEventListener('keydown', function(event) {
  if ((/^[0-9]$/.test(event.key)) || event.key === "." || (/^[+\-*/%]$/.test(event.key))){
    expression += event.key;
    displayOnCalculator(expression);
  }

  if (event.key === "Enter") {
    input();
}
});
document.querySelectorAll('#calculator button').forEach(function(button){
  button.addEventListener('click', function operate(){
    if (button.dataset.action === "equals"){
      input();

    } else if (button.dataset.action === "clear"){
      expression = "";
      displayOnCalculator(expression);
    } else if (button.dataset.action === "delete"){
      expression = expression.slice(0, expression.length - 1);
      displayOnCalculator(expression);
    } 
    else {
      expression += button.innerText;
      console.log(expression);
      displayOnCalculator(expression);
    }
  });

});

function displayOnCalculator(string){
  calculatorDisplay.value = string;
}
function input(){
  if (expression.includes('%')) {
    expression = expression.replace(/(\d+(\.\d+)?)%/, (match, p1, p2, offset, str) => {
      let number = parseFloat(p1) / 100;

      // fragment przed dopasowaniem
      let before = str.slice(0, offset).trim();
      let operator = before[before.length - 1];

      // liczba przed operatorem
      let left = parseFloat(before.slice(0, -1));

      switch (operator) {
        case '+':
        case '-':
          return left * number;
        case '*':
        case '/':
          return number;
        default:
          return number;
      }
    });
  }
  expression = eval(expression).toString();
  displayOnCalculator(expression);
}