const STORAGE_KEY = "ai_demo_tasks";

const DEFAULT_TASKS = [
  { id: crypto.randomUUID(), title: "Draft feature spec", owner: "Human", status: "Planned" },
  { id: crypto.randomUUID(), title: "Generate first UI scaffold", owner: "AI", status: "In Progress" },
  { id: crypto.randomUUID(), title: "Review generated changes", owner: "Shared", status: "Ready for Review" },
];

export function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...DEFAULT_TASKS];
  try {
    return JSON.parse(raw);
  } catch {
    return [...DEFAULT_TASKS];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(tasks, { title, owner, status }) {
  const updated = [{ id: crypto.randomUUID(), title, owner, status }, ...tasks];
  saveTasks(updated);
  return updated;
}

export function updateTask(tasks, id, changes) {
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
  saveTasks(updated);
  return updated;
}

export function deleteTask(tasks, id) {
  const updated = tasks.filter((t) => t.id !== id);
  saveTasks(updated);
  return updated;
}
