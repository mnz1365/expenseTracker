// script.js 
// Get form, expense list, and total amount elements 

const expenseForm = 
	document.getElementById("expense-form"); 
const expenseList = 
	document.getElementById("expense-list"); 
const totalAmountElement = 
	document.getElementById("total-amount"); 
const totalItemElement = 
	document.getElementById("total-item"); 

// Initialize expenses array from localStorage 
let expenses = 
	JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 

	// Clear expense list 
	expenseList.innerHTML = ""; 

	// Initialize total amount 
	let totalAmount = 0; 

	// Loop through expenses array and create table rows 
	for (let i = 0; i < expenses.length; i++) { 
        
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
    <td>${expense.qty}</td>
	<td>$${expense.amount}</td>
    <td>$${expense.totalAmountAll}</td>
	<td class="delete-btn" data-id="${i}">Delete</td> 
	`; 
		expenseList.appendChild(expenseRow); 

		// Update total amount 
        
		totalAmount += expense.amount; 
	} 

	// Update total amount display 
	totalAmountElement.textContent = 
		totalAmount.toFixed(2); 

    // Items
    totalItemElement.innerHTML = expenses.length;

	// Save expenses to localStorage 
	localStorage.setItem("expenses", 
		JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
	event.preventDefault(); 
   
	// Get expense name and amount from form 
	const expenseNameInput = 
		document.getElementById("expense-name"); 
    const expenseQtyInput = 
		document.getElementById("expense-Qty");
	const expenseAmountInput = 
		document.getElementById("expense-amount"); 
	const expenseName = 
		expenseNameInput.value; 
    const expenseQty = 
		parseFloat(expenseQtyInput.value);
	const expenseAmount = 
		parseFloat(expenseAmountInput.value);
    const expenseTotalAmount = parseFloat(expenseQty * expenseAmount);  

	// Clear form inputs 
	expenseNameInput.value = ""; 
	expenseQtyInput.value = ""; 
	expenseAmountInput.value = ""; 

	// Validate inputs 
	if (expenseName === "" || isNaN(expenseAmount) || isNaN(expenseQty)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 

	// Create new expense object 
	const expense = { 
		name: expenseName,
        qty: expenseQty,
		amount: expenseAmount,
        totalAmountAll: expenseTotalAmount, 
	}; 

	// Add expense to expenses array 
	expenses.push(expense); 

	// Render expenses 
	renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
	if (event.target.classList.contains("delete-btn")) { 

		// Get expense index from data-id attribute 
		const expenseIndex = 
			parseInt(event.target.getAttribute("data-id")); 

		// Remove expense from expenses array 
		expenses.splice(expenseIndex, 1); 

		// Render expenses 
		renderExpenses(); 
	} 
} 

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 

// Render initial expenses on page load 
renderExpenses();
console.log(expenses);

function myPrint(){
	window.print();
}

function myClear(){
	localStorage.clear();
	location.reload();

}

async function myPdf() {
	const pdfElement = document.getElementById("print-of-page");
	var doc = new jsPDF('l', 'pt');
	await html2canvas(pdfElement, {
		allowTaint: true,
		useCORS: true,
		width: 550
	}).then((canvas) => {
		doc.addImage(canvas.toDataURL("image/png"), "PNG", 5, 5, 500, 500);
	})

	doc.save("Document.pdf");
}