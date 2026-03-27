let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    name: taskName,
    status: "Open"
  });

  taskInput.value = "";
  saveTasks();
  showTasks("Open");
}

// Show Tasks
function showTasks(statusValue) {
  let table = document.getElementById("taskTable");
  table.innerHTML = "";

  let filteredTasks = tasks.filter(task => task.status === statusValue);

  if (filteredTasks.length === 0) {
    table.innerHTML = "<tr><td colspan='3'>No Tasks</td></tr>";
    return;
  }

  filteredTasks.forEach(task => {
    let row = "<tr>";

    // Checkbox
    if (statusValue === "Open") {
      row += `<td><input type="checkbox" onchange="markDone('${task.name}')"></td>`;
    } else {
      row += `<td><input type="checkbox" checked disabled></td>`;
    }

    // Task name
    row += `<td class="${task.status === 'Done' ? 'done' : ''}">
              ${task.name}
            </td>`;

    // Delete button
    row += `<td>
              <button onclick="deleteTask('${task.name}')">Delete</button>
            </td>`;

    row += "</tr>";

    table.innerHTML += row;
  });
}

// Mark as Done
function markDone(taskName) {
  tasks.forEach(task => {
    if (task.name === taskName) {
      task.status = "Done";
    }
  });

  saveTasks();
  showTasks("Open");
}

// Delete Task
function deleteTask(taskName) {
  tasks = tasks.filter(task => task.name !== taskName);
  saveTasks();
  showTasks("Open");
}

// Load Open tasks at start
showTasks("Open");