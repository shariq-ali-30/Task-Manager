let taskForm = document.getElementById("taskForm");
let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");
let taskListContainer = document.querySelector(".task-list");
let para = document.getElementById("para");

function addTaskToList(taskObj) {
    let taskItem = document.createElement("li");

    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskObj.text;
    taskSpan.style.marginRight = "10px";

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== taskObj.text);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (taskList.children.length === 0) {
            taskListContainer.style.display = "none";
            para.style.display = "block";
        }
    });

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;

    if (checkbox.checked) {
        taskSpan.style.textDecoration = "line-through";
        taskSpan.style.color = "gray";
    }

    checkbox.addEventListener("change", function () {
        taskObj.completed = checkbox.checked;

        if (checkbox.checked) {
            taskSpan.style.textDecoration = "line-through";
            taskSpan.style.color = "gray";
        } else {
            taskSpan.style.textDecoration = "none";
            taskSpan.style.color = "black";
        }

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        let index = tasks.findIndex(task => task.text === taskObj.text);
        if (index !== -1) {
            tasks[index].completed = taskObj.completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);
    taskItem.prepend(checkbox);
    taskList.appendChild(taskItem);
}

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let taskText = taskInput.value.trim();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (taskText === "") return;
    if (tasks.some(task => task.text === taskText)) {
        alert("Task already exists!");
        return;
    }

    let newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToList(newTask);


    taskListContainer.style.display = "block";
    para.style.display = "none";

    taskInput.value = "";
});

window.addEventListener('DOMContentLoaded', function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
        taskListContainer.style.display = "none";
        para.style.display = "block";
    } else {
        taskListContainer.style.display = "block";
        para.style.display = "none";
    }

    tasks.forEach(task => {
        addTaskToList(task);
    });
});