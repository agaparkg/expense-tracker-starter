const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTransactionText = document.getElementById("text");
const newTransactionAmount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
// array or null

// let transactions = localStorageTransactions || [];
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

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

// [-200, 900, ...]

function startTheApp() {
  historyList.innerHTML = "";

  transactions.forEach(addTransactionToHistory);

  updateValues();
}

startTheApp();

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

    transactions.push(transaction);

    updateValues();

    updateLocalStorage();

    addTransactionToHistory(transaction);

    newTransactionText.value = "";
    newTransactionAmount.value = "";
  }
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add each transaction to history list
function addTransactionToHistory(transaction) {
  const { text, amount, id } = transaction;
  //   {
  //     id: 2,
  //     text: "Cash",
  //     amount: 900
  //   }
  const sign = amount > 0 ? "+" : "-";

  const item = document.createElement("li");

  item.classList.add(amount > 0 ? "plus" : "minus");

  item.innerHTML = `${text} <span>${sign}$${Math.abs(
    amount
  )}</span><button class="delete-btn" onclick="removeTransaction(event, ${id})">x</button>`;

  historyList.appendChild(item);
  // <li class="minus">
  //   Cash <span>-$400</span><button class="delete-btn">x</button>
  // </li>
}

function removeTransaction(event, id) {
  // console.log(event.target.parentElement, id);
  transactions = transactions.filter((transaction) => {
    // if(transaction.id !== id){
    //   return true
    // } else {
    //   return false
    // }
    return transaction.id !== id;
  });

  updateLocalStorage();

  // Option 1
  // startTheApp()

  // Option 2
  updateValues();

  event.target.parentElement.remove();
}

// Update balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  // [-200, 900, ...]

  // const total = amounts.reduce((sum, number) => {
  //   return sum + number
  // }, 0)

  const total = amounts.reduce((sum, number) => sum + number, 0).toFixed(2);

  const income = amounts
    .filter((number) => number > 0) // [300, 900, ...]
    .reduce((sum, num) => sum + num, 0) // 1200
    .toFixed(2); // 1200.00

  const expense =
    amounts
      .filter((number) => number < 0)
      .reduce((sum, number) => sum + number, 0)
      .toFixed(2) * -1;

  balanceAmount.innerText = `$${total}`; // "balance is "+total
  moneyPlusAmount.innerText = `$${income}`;
  moneyMinusAmount.innerText = `$${expense}`;
  // moneyMinusAmount.innerText = `$${-expense}`;
  // moneyMinusAmount.innerText = `$${Math.abs(expense)}`;
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
