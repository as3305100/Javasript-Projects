document.addEventListener('DOMContentLoaded', () => {

    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = expenseNameInput.value.trim();
      // every single value comes in string format even if we declared input type number
      const amount = parseFloat(expenseAmountInput.value.trim());
      if (name !== "" && !isNaN(amount) && amount > 0) {
        const newExpense = {
          id: Date.now(),
          name: name,
          amount: amount,
        };
        expenses.push(newExpense);
        saveExpensesTolocal();       
        renderExpenses();
        updateTotal()

         //clear input
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
      }
    });          
   
   
    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => { 
            const li = document.createElement("li");
            li.innerHTML = `
             ${expense.name} - $${expense.amount}
             <button data-id = "${expense.id}">Delete</button>
            `
            expenseList.appendChild(li);
        })
    }

     function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
     }    
                  

    function calculateTotal() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0)
    }
    function saveExpensesTolocal() { 
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            // converting into number using parseInt 
            // console.log("hiii")
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter((expense) => expense.id !== expenseId);
            saveExpensesTolocal();
            renderExpenses()
            updateTotal()
        }
    })
})