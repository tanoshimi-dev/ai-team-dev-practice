const STORAGE_KEY = "ai_demo_tasks";

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const DEFAULT_TASKS = [
  { id: uuid(), title: "Draft feature spec", owner: "Human", status: "Planned" },
  { id: uuid(), title: "Generate first UI scaffold", owner: "AI", status: "In Progress" },
  { id: uuid(), title: "Review generated changes", owner: "Shared", status: "Ready for Review" },
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
  const updated = [{ id: uuid(), title, owner, status }, ...tasks];
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
