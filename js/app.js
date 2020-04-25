const expenseForm = document.getElementById('expense-form')
const expenseName = document.getElementById('expense')
const price = document.getElementById('price')
const category = document.getElementById('category')
const listExpenses = document.querySelector('.list-expenses')

//event listening for submission of expense 
expenseForm.addEventListener('submit', function(){
    let expense = {
        name: expenseName.value,
        price: parseFloat(price.value).toFixed(2),
        category: category.value,
    } //create expense object
    
    if(expense.name === ''){
        alert('Cannot leave expense name empty')
    }else{
        //adds expense to local storage and to list
        addStorage(expense)
    }
})

//event listening for deletion of expense
listExpenses.addEventListener('click', function(event){
    //if the delete button is clicked
    if(event.target.classList.contains('btn-danger')){
        let parent = event.target.parentElement;
        listExpenses.removeChild(parent);
        let id = event.target.parentElement.getAttribute('id'); //gets id of item to delete
        deleteExpense(id);
    }
})

document.addEventListener('DOMContentLoaded', function(){
    listItems(); //lists all expenses
})


//adds to storage and to html item list
function addStorage(expense){
    let items
    if(localStorage.getItem('expenses')){ //if not empty
        items = JSON.parse(localStorage.getItem('expenses'))
    }else{
        items = []
    }
    expense.id = "item-" + items.length.toString() //instantiate id
    items.push(expense)
    localStorage.setItem('expenses', JSON.stringify(items))
    
    //create the item expense element
    const div = document.createElement('div');
    div.classList.add('item', 'd-flex','justify-content-between');
    div.setAttribute('id', expense.id);
    div.innerHTML = `<h5 class="item-title text-capitalize">Name: ${expense.name}</h5>
    <h5 class="item-price">Price: \$${expense.price}</h5> 
    <h5 class="item-category">Category: ${expense.category}</h5>
    <button type="button" class="btn btn-danger">Delete</button>
    </div>`
    listExpenses.appendChild(div)
    expenseName.value = ''
    price.value = ''
    category.value = '' //clear inputs
}

//deletes one expense
function deleteExpense(expenseID){
    const temp = JSON.parse(localStorage.getItem('expenses'))
    //filters for all objects that are not equal to the item id
    const items = temp.filter(function(item){
        if(expenseID !== item.id){ //if the expense ids match
            return item
        }
    })
    localStorage.removeItem('expenses')
    localStorage.setItem('expenses', JSON.stringify(items))
}
//lists all expenses added
function listItems(){
    
    if(localStorage.getItem('expenses')){
        const items = JSON.parse(localStorage.getItem('expenses'))
        //iterates through each item
        items.forEach(function(item){
            const div = document.createElement('div');
            div.classList.add('item', 'd-flex', 'justify-content-between');
            div.setAttribute('id', item.id)
            div.innerHTML = `
            <h5 class="item-title text-capitalize">Name: ${item.name}</h5>
            <h5 class="item-price">Price: \$${item.price}</h5> 
            <h5 class="item-category">Category: ${item.category}</h5>
            <button type="button" class="btn btn-danger">Delete</button>
            </div>`
            listExpenses.appendChild(div)
        })
    }
}
