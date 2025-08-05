document.addEventListener("DOMContentLoaded", renderTasks);

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const tasks = getTasks();
  tasks.push({ id: Date.now(), text, done: false });
  saveTasks(tasks);
  input.value = "";
  renderTasks();
}

function toggleTask(id) {
  const tasks = getTasks();
  const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveTasks(updated);
  renderTasks();
}

function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");
  const pendingCount = document.getElementById("pending-count");
  const completedCount = document.getElementById("completed-count");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  const tasks = getTasks();
  const pendingTasks = tasks.filter(t => !t.done);
  const completedTasks = tasks.filter(t => t.done);

  pendingCount.textContent = pendingTasks.length;
  completedCount.textContent = completedTasks.length;

  [...pendingTasks, ...completedTasks].forEach(task => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="toggle" onclick="toggleTask(${task.id})">
          ${task.done ? "Undo" : "Done"}
        </button>
        <button class="delete" onclick="deleteTask(${task.id})">✕</button>
      </div>
    `;
    task.done ? completedList.appendChild(li) : pendingList.appendChild(li);
  });
}
