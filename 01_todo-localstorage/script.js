document.addEventListener('DOMContentLoaded', () => {
    // accessing the variable and button through DOM

const todoInput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")

// declaring an arr to store the input and other value

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // JSON.parse convert data into its original format

//  At very first time our page loads 
// we have read value's from local storage and then 
// grab all task add into our array
// and then run a loop and read individual task from the array

tasks.forEach( (task) => renderTasks(task))
  


// adding click event to addTaskButton
addTaskButton.addEventListener('click', (e) => {
  // geting input value and   todoInput.value.trim()
  //  method is used to remove extra space at start and end position
  
     const taskText = todoInput.value.trim()
    // checking if input is empty string

    if(taskText === "") return; // If input is nothing then it return nothing and we will exit the program

    // adding task to the array and giving unique id

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }

   // pushing the newTask to array tasks
   tasks.push(newTask)
   // now sending the data to local storage
   saveTasks()
   renderTasks(newTask)
   // now clearing the input after adding the task
   todoInput.value = ""

   console.log(tasks)
})
// writing a function to store our tasks in localstorage

function saveTasks() {
  // first we have to setItem is used to set data into local storage
  // "tasks" is the key we can change whatever we want
  // It only take string so we use JSON.stringify
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// making the that rendering the value's from local storage

function renderTasks(task) {
      console.log(task.text)
      const li = document.createElement('li')
      li.setAttribute('data-id', task.id)
      if(task.completed) li.classList.add('completed')
      li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>
      `;
      li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
      })

      li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()
        tasks = tasks.filter( (t) => t.id !== task.id)
        li.remove()
        saveTasks()
      })

      todoList.appendChild(li)
}


})