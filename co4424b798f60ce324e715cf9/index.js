/* === ELEMENT REFERENCES === */
const mainAccount = document.getElementById("main-account")
const expensesAccount = document.getElementById("expenses-account")
const savingsAccount = document.getElementById("savings-account")
const allAccounts = [] // [mainAccount, expensesAccount, savingsAccount]
const accountsContainer = document.getElementById("all-accounts")
const spendingsData = document.getElementById("spendings-data")


/*=== IMPORT DATA ===*/
import { accounts } from "./accounts.js"


/* === GLOBAL VARIABLES === */
let selectedAccount


/* === FUNCTIONS ===*/
// 1) Visually render data from accounts array
function displayAccountInfo() {
    for (let i = 0; i < accounts.length; i++) {
        // Create element for each account
        let accountEl = document.createElement("div")
        accountEl.id = accounts[i].id
        accountEl.classList.add("account")
        accountsContainer.appendChild(accountEl)
        accountEl.innerHTML = `
            <p>${accounts[i].title}</p>
            <p>$${numberWithCommas(accounts[i].balance)}</p>
            `
        // Push to array for styling purposes
        allAccounts.push(accountEl)
    }
}

// 1.1) Add commas to improve readability
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 2) Click an account to select it and show spendings
accountsContainer.addEventListener("click", function(e){
    // Call function to clear previous selected-account class
    clearSelectedAccountClasses()
    // Triggers when clicking the account div or the text inside it
    // Nothing happens when clicking container.
    if (e.target.classList.contains("account")) {
        selectedAccount = e.target
    } else if (e.target.nodeName === "P") {
        selectedAccount = e.target.parentElement
    }
    selectedAccount.classList.add("selected-account")
    showSpendings(selectedAccount)
})

// 2.1) Clear old selected-account class whenever a new account is selected
function clearSelectedAccountClasses() {
    for (let i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].classList.contains("selected-account")) {
            allAccounts[i].classList.remove("selected-account")
        }
    }
}

// 3) Clear spendings data and call appropriate function to render new data
function showSpendings(selectedAccount) {
    spendingsData.innerHTML = ""
    if (selectedAccount.id === "1") {
        populateSpendings(accounts[0])
    } else if (selectedAccount.id === "2") {
        populateSpendings(accounts[1])
    } else {
        spendingsData.innerHTML = `<p class="NA">No spendings in this account</p>`
    }
}

// 4) Visually display spendings data
function populateSpendings(selectedAccountObject) {
    for (let i = 0; i < selectedAccountObject.spendings.length; i++) {
        spendingsData.innerHTML += `
            <div class="spending-category" id="spending-${i}">
                <p>${selectedAccountObject.spendings[i].category}</p>
                <p>$${selectedAccountObject.spendings[i].spent}</p>
            </div>
        `
    }
}

/* === FUNCTION CALLS === */
displayAccountInfo()


// TEST STUFF
function compareSpendings(acct) {
    function findHighestSpending(acct) {
        
        function createSpendingsArray(acct) {
            let spendingsArr = []
            for (let i = 0; i < acct.spendings.length; i++) {
                spendingsArr.push(acct.spendings[i].spent)
            }
            return (spendingsArr)
        }
        
        let highestSpending = Math.max(...createSpendingsArray(acct))
        return highestSpending
    }
    
     
}    
    

console.log(findHighestSpending(accounts[0]))