const MAX_NUMBER = 15
const MIN_NUMBER = -5

const number = document.querySelector('[data-key="number"]')
const add =  document.querySelector('[data-key="add"]')
const subtract =  document.querySelector('[data-key="subtract"]')
const reset = document.querySelector('[data-key="reset"]')

const subtractHandler = () =>{
   const newValue= parseInt(number.value) - 1;
   number.value = newValue
   if (add.disabled === true){
    add.disabled = false
   }
   if (newValue <= MIN_NUMBER){
    subtract.disabled = true
}
}
const addHandler = () =>{
    const newValue= parseInt(number.value) + 1;
    number.value = newValue
    if (subtract.disabled === true){
        subtract.disabled = false
       }
    if (newValue >= MAX_NUMBER){
        add.disabled = true
    }
}
const resetButton = () => {
    number.value = 0;
    subtract.disabled = true;
    add.disabled = false;
    alert("The counter has been reset.");
 }
 
subtract.addEventListener('click', subtractHandler )
add.addEventListener('click', addHandler)
reset.addEventListener('click',resetButton )