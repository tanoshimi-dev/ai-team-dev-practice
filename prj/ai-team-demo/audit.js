const AUDIT_KEY = "ai_demo_audit";
const MAX_ENTRIES = 50;

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
  const entry = {
    id: crypto.randomUUID(),
    action,
    detail,
    at: new Date().toISOString(),
  };
  const updated = [entry, ...entries].slice(0, MAX_ENTRIES);
  localStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAudit() {
  localStorage.removeItem(AUDIT_KEY);
}
