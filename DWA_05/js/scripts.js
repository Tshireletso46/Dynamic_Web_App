const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  
  if (dividend === "" || divider === "" ) {
 result.innerText = "Division is not performed. Both values are required in the inputs. Try again"
  }
  else if (dividend < 0  || divider < 0  ) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error()
  } else if(isNaN(dividend) || (isNaN(divider))){
    console.error (new error(`Something critical went wrong. Please reload the page!`));
    document.body.innerHTML = '<h1>Something critical went wrong. Please reload the page!</h1>'
  }
  else{
  result.innerText = Math.floor(dividend / divider);
  }
});
window.addEventListener("error", () =>{
    document.body.innerHTML = `Something critical went wrong. Please reload the page!`
});