import { initAuth } from "./auth.js";

const initialTasks = [
  { title: "Draft feature spec", owner: "Human", status: "Planned" },
  { title: "Generate first UI scaffold", owner: "AI", status: "In Progress" },
  { title: "Review generated changes", owner: "Shared", status: "Ready for Review" },
];

const taskList = document.querySelector("#task-list");
const taskTemplate = document.querySelector("#task-template");
const taskForm = document.querySelector("#task-form");
const statusFilter = document.querySelector("#status-filter");

let tasks = [...initialTasks];

function renderTasks() {
  const filterValue = statusFilter.value;
  const visibleTasks =
    filterValue === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterValue);

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
    const title = fragment.querySelector(".task-title");

    ownerBadge.textContent = task.owner;
    statusBadge.textContent = task.status;
    statusBadge.dataset.status = task.status;
    title.textContent = task.title;

    taskList.appendChild(fragment);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = String(formData.get("title")).trim();
  const owner = String(formData.get("owner"));
  const status = String(formData.get("status"));

  if (!title) {
    return;
  }

  tasks = [{ title, owner, status }, ...tasks];
  taskForm.reset();
  renderTasks();
});

statusFilter.addEventListener("change", renderTasks);

initAuth({
  onLogin: () => renderTasks(),
  onLogout: () => { taskList.innerHTML = ""; },
});
