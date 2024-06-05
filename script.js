

// Task input from user
var inputTasks = document.getElementById('taskInput'); 
// Add button to add task and clear input
var addBtn = document.getElementById('add');
// Tasks container
var text = document.getElementById('tasks');
// Delete All button to clear screen and delete one task
var delAllBtn = document.getElementById('delAll');
// Date input
var dateInput = document.getElementById('date');
// Show date on top
var dateText = document.querySelector('.date');

// Load tasks from local storage if they exist
var toDoArray = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];


// Function to show tasks
function showTasks() {
    let taskBlock = '';
    for (let i = 0; i < toDoArray.length; i++) {
        const task = `

        <div id="taskContainer">
            <p class="${toDoArray[i].done ? 'done' : ''}">task ${i + 1} : ${toDoArray[i].task}</p>
                
            <div>
                <button onclick='doneTask(${i})' id='done'>Task Done</button>
                <button id="delBtn" onclick='deleteTask(${i})'>Delete</button>
            </div>
            
        </div>`;

        taskBlock += task;
    }
    text.innerHTML = taskBlock;
    dateText.innerHTML = dateInput.value;
}


// Function to clear the task input
function clearInput() {
    inputTasks.value = '';
}

// Function to delete one  task
function deleteTask(i) {
    toDoArray.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(toDoArray));
    showTasks();
}

// Function to mark a task as done
function doneTask(i) {
    toDoArray[i].done = true;
    localStorage.setItem('tasks', JSON.stringify(toDoArray));
    showTasks();
}

//  delete all tasks
delAllBtn.addEventListener('click', function() {
    toDoArray = [];
    localStorage.removeItem('tasks');
    showTasks();
});


addBtn.addEventListener('click', function() {
    const task = {
        task: inputTasks.value,
        date: dateInput.value,
        done: false
    };

    toDoArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(toDoArray));

    showTasks();
    clearInput();
});


showTasks();
