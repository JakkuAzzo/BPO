// scripts.js

// Initialize Pyodide for SQL interaction
let pyodide;

async function initializePyodide() {
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
    });
    await pyodide.loadPackage("sqlite3");
    console.log("Pyodide initialized");
}

initializePyodide();

// Sample data for tasks
const tasks = {
    new: [],
    pending: [],
    completed: [],
};

// Function to render tasks
function renderTasks() {
    const newTasksList = document.getElementById('new-tasks-list');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');

    newTasksList.innerHTML = tasks.new
        .map(
            (task) => `
            <div class="card task-card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <button class="btn btn-sm btn-primary" onclick="takeTask('${task.id}')">Take Task</button>
                    <button class="btn btn-sm btn-danger" onclick="clearTask('${task.id}')">Clear Task</button>
                    <button class="btn btn-sm btn-warning" onclick="editTask('${task.id}')">Edit Task</button>
                </div>
            </div>
        `
        )
        .join('');

    pendingTasksList.innerHTML = tasks.pending
        .map(
            (task) => `
            <div class="card task-card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <button class="btn btn-sm btn-success" onclick="completeTask('${task.id}')">Complete Task</button>
                </div>
            </div>
        `
        )
        .join('');

    completedTasksList.innerHTML = tasks.completed
        .map(
            (task) => `
            <div class="card task-card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                </div>
            </div>
        `
        )
        .join('');
}

// Function to create a task
document.getElementById('create-task-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const task = {
        id: Date.now(),
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        date: document.getElementById('task-date').value,
        employee: document.getElementById('task-employee').value,
    };
    tasks.new.push(task);
    renderTasks();
    $('#createTaskModal').modal('hide');
});

// Function to take a task
function takeTask(taskId) {
    const task = tasks.new.find((t) => t.id === taskId);
    if (task) {
        tasks.new = tasks.new.filter((t) => t.id !== taskId);
        tasks.pending.push(task);
        renderTasks();
    }
}

// Function to complete a task
function completeTask(taskId) {
    const task = tasks.pending.find((t) => t.id === taskId);
    if (task) {
        tasks.pending = tasks.pending.filter((t) => t.id !== taskId);
        tasks.completed.push(task);
        renderTasks();
    }
}

// Function to clear a task
function clearTask(taskId) {
    tasks.new = tasks.new.filter((t) => t.id !== taskId);
    tasks.pending = tasks.pending.filter((t) => t.id !== taskId);
    tasks.completed = tasks.completed.filter((t) => t.id !== taskId);
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.new.find((t) => t.id === taskId) || tasks.pending.find((t) => t.id === taskId);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-date').value = task.date;
        document.getElementById('task-employee').value = task.employee;
        $('#createTaskModal').modal('show');
    }
}

// Function to update rates
function updateRates() {
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const overtimeRate = parseFloat(document.getElementById('overtime-rate').value) || 0;
    alert(`Rates updated: Hourly Rate = $${hourlyRate}, Overtime Rate = $${overtimeRate}`);
}

// Initial render
renderTasks();