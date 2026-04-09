let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;

  if (text === "" || amount === 0) {
    alert("Enter valid data!");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.text} ₹${t.amount}
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">x</button>
    `;
    list.appendChild(li);
  });

  updateValues();
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((a, b) => a + b, 0);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);

  document.getElementById("balance").textContent = total;
  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = Math.abs(expense);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  render();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

render();