//alert("hello ... ");
const todoInput = document.querySelector(".input");
const addTodoButton = document.querySelector(".button");
let showTodo = document.querySelector(".todos-container");

let localData = JSON.parse(localStorage.getItem("todo"));
let todo;
let todoList = localData || [];

// Creating function to generate unique id
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param){

        // This line generates a random number between 0 and 15 (inclusive) by multiplying Math.random()
        // by 16 and using a bitwise OR (| 0) operation to truncate the decimal part and obtain an integer value.
        let number = Math.random()*16 | 0;

        /**
         * This line determines whether to replace 'x' or 'y' in the template string. 
         * 
         * If param is 'x', it uses the random number generated in step 2. 
         * If param is 'y', it performs a bitwise AND operation (&) with 0x3 and a bitwise OR operation (|) with 0x8. 
         * 
         * This manipulation ensures that the generated character follows the UUID version 4 format.
         */
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16);
    });
}


addTodoButton.addEventListener("click", (event)=>{
    event.preventDefault();
    todo = todoInput.value; 

    if(todo.length > 0){
        todoList.push({id :uuid(), todo, isCompleted:false })
    }
    todoInput.value = "";
    renderTodoList(todoList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    
})

showTodo.addEventListener("click", (event)=>{
    let key = event.target.dataset.key;
    let delTodoKey = event.target.dataset.delkey;
    // console.log(event.target.dataset.delkey);
    // console.log(delTodoKey);

    //map runs the all the element to the given function one by one
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo);

    //filter return only those values from array those who have staisfied the conditon
    todoList = todoList.filter(todo => todo.id !== delTodoKey);
    //console.log(todoList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList(todoList);
    
})

function renderTodoList(todoList){
    //As map passes 1 element at a time from arrray, and we have array of objects, 
    //here we have destructured the id, todo, and isCompleted property from the objects 
    showTodo.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class="todo relative">
    <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key="${id}"  ${isCompleted && "checked"}/>
    <label for="item-${id}" data-key="${id}" class="todo todo-text t-pointer ${isCompleted && "checked-todo"}">${todo}</label>
    <button class="button del-btn absolute-right-0"> <span data-delkey=${id} class="material-symbols-outlined" >delete</span> </button></div>`)
    //here attribute data-* the aplhabets used should be in samll case;
    //otherwise they are converted to lowercase
}

renderTodoList(todoList);

