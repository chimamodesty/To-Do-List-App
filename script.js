// Function to add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== '') {
        var li = document.createElement("li");
        li.textContent = taskInput.value;
        
        var span = document.createElement("span");
        span.textContent = "❌";
        span.onclick = function() {
            li.remove();
        };
        
        li.appendChild(span);
        taskList.appendChild(li);
        taskInput.value = '';
    } else {
        alert("Please enter a task!");
    }
}


// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim() !== '') {
        var task = {
            text: taskInput.value,
            completed: false
        };
        saveTask(task);
        appendTask(task);
        taskInput.value = '';
    } else {
        alert("Please enter a task!");
    }
}

// Function to save task to local storage
function saveTask(task) {
    var tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    var tasks = getTasksFromStorage();
    tasks.forEach(appendTask);
}

// Function to get tasks from local storage
function getTasksFromStorage() {
    var tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Function to append task to the list
function appendTask(task) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add("completed");
    }

    var completeBtn = document.createElement("span");
    completeBtn.textContent = "✔️";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = function() {
        toggleComplete(task.text);
        li.classList.toggle("completed");
    };

    var editBtn = document.createElement("span");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";
    editBtn.onclick = function() {
        editTask(task.text);
    };

    var deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        removeTask(task.text);
        li.remove();
    };

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to toggle task completion
function toggleComplete(taskText) {
    var tasks = getTasksFromStorage();
    tasks.forEach(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to edit a task
function editTask(taskText) {
    var tasks = getTasksFromStorage();
    var newTaskText = prompt("Edit your task:", taskText);

    if (newTaskText && newTaskText.trim() !== '') {
        tasks.forEach(task => {
            if (task.text === taskText) {
                task.text = newTaskText;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("taskList").innerHTML = '';
        loadTasks();
    }
}

// Function to remove task from local storage
function removeTask(taskText) {
    var tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

