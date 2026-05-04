import { initAuth } from "./auth.js";
import { loadTasks, addTask, updateTask, deleteTask } from "./tasks.js";

const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-template");
const taskForm = document.querySelector("#task-form");
const statusFilter = document.querySelector("#status-filter");
const searchInput = document.querySelector("#search-input");

let tasks = [];

function renderTasks() {
  const filterValue = statusFilter.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  let visibleTasks = filterValue === "All"
    ? tasks
    : tasks.filter((task) => task.status === filterValue);

  if (searchValue) {
    visibleTasks = visibleTasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue)
    );
  }

  taskList.innerHTML = "";

  if (visibleTasks.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No work items match the selected filter.";
    taskList.appendChild(emptyState);
    return;
  }

  visibleTasks.forEach((task) => {
    const fragment = taskTemplate.content.cloneNode(true);
    const ownerBadge = fragment.querySelector(".badge-owner");
    const statusBadge = fragment.querySelector(".badge-status");
    const titleEl = fragment.querySelector(".task-title");
    const deleteBtn = fragment.querySelector(".task-delete");
    const statusSelect = fragment.querySelector(".task-status-select");

    ownerBadge.textContent = task.owner;
    statusBadge.textContent = task.status;
    statusBadge.dataset.status = task.status;
    titleEl.textContent = task.title;

    // Populate status select and sync badge
    Array.from(statusSelect.options).forEach((opt) => {
      if (opt.value === task.status) opt.selected = true;
    });
    statusSelect.addEventListener("change", () => {
      tasks = updateTask(tasks, task.id, { status: statusSelect.value });
      renderTasks();
    });

    deleteBtn.dataset.id = task.id;
    deleteBtn.addEventListener("click", () => {
      tasks = deleteTask(tasks, task.id);
      renderTasks();
    });

    taskList.appendChild(fragment);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = String(formData.get("title")).trim();
  const owner = String(formData.get("owner"));
  const status = String(formData.get("status"));

  if (!title) return;

  tasks = addTask(tasks, { title, owner, status });
  taskForm.reset();
  renderTasks();
});

statusFilter.addEventListener("change", renderTasks);
searchInput.addEventListener("input", renderTasks);

initAuth({
  onLogin: () => {
    tasks = loadTasks();
    renderTasks();
  },
  onLogout: () => {
    tasks = [];
    taskList.innerHTML = "";
  },
});
