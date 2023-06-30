import './count.js';

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');
const confirm = document.querySelector('[data-key="confirm"]');


const subtractHandler = () => {
  const newValue = parseInt(number.value) - STEP_AMOUNT;
  number.value = newValue;
  if (add.disabled === true) {
    add.disabled = false;
  }

  if (newValue <= MIN_NUMBER) {
    subtract.disabled = true;
  }
};

const addHandler = () => {
  const newValue = parseInt(number.value) + STEP_AMOUNT;
  number.value = newValue;
  if (subtract.disabled === true) {
    subtract.disabled = false;
  }

  if (newValue >= MAX_NUMBER) {
    add.disabled = true;
  }
};
const resetHandler = () => {
  const newValue = 0;
  number.value = newValue;
  confirm.show();

}
subtract.addEventListener("click", subtractHandler);
add.addEventListener("click", addHandler);
reset.addEventListener("click", resetHandler);

const app = () => {

  return html`
  `
}
