const AUDIT_KEY = "ai_demo_audit";
const MAX_ENTRIES = 50;

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function loadAudit() {
  const raw = localStorage.getItem(AUDIT_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordAction(action, detail) {
  const entries = loadAudit();
  const entry = { id: uuid(), action, detail, at: new Date().toISOString() };
  const updated = [entry, ...entries].slice(0, MAX_ENTRIES);
  localStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAudit() {
  localStorage.removeItem(AUDIT_KEY);
}
