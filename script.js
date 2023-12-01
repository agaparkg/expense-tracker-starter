const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTransactionText = document.getElementById("text");
const newTransactionAmount = document.getElementById("amount");

let transactions = [];

// [
//   {
//     id: 1,
//     text: "Grocery",
//     amount: -200
//   },
//   {
//     id: 2,
//     text: "Cash",
//     amount: 900
//   }
// ]

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  // Add your code

  if (
    newTransactionText.value.trim() === "" ||
    newTransactionAmount.value.trim() === ""
  ) {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateRandomId(),
      text: newTransactionText.value,
      amount: +newTransactionAmount.value,
    };
  }
}

// Generate Random ID function
function generateRandomId() {
  return Math.floor(Math.random() * 10000000000);
}

// Add your code
addTransactionForm.addEventListener("submit", addTransaction);

// addTransactionForm.onsubmit = addTransaction1;
// addTransactionForm.onsubmit = addTransaction2;
// addTransactionForm.addEventListener("submit", addTransaction1);
// addTransactionForm.addEventListener("submit", addTransaction2);
