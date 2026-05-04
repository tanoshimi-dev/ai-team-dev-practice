// Minimal test runner — no external dependencies

const results = [];

function assert(description, condition) {
  results.push({ description, pass: Boolean(condition) });
}

// ── tasks.js tests ─────────────────────────────────────────────────
// Import pure functions only (no DOM, no localStorage side-effects in unit tests)

import { addTask, updateTask, deleteTask } from "./tasks.js";

// Seed a local array instead of using localStorage
const seed = [
  { id: "1", title: "First",  owner: "Human",  status: "Planned"           },
  { id: "2", title: "Second", owner: "AI",     status: "In Progress"       },
  { id: "3", title: "Third",  owner: "Shared", status: "Ready for Review"  },
];

// addTask
{
  const updated = addTask([], { title: "New task", owner: "Human", status: "Planned" });
  assert("addTask: adds one item", updated.length === 1);
  assert("addTask: title is correct", updated[0].title === "New task");
  assert("addTask: owner is correct", updated[0].owner === "Human");
  assert("addTask: id is assigned",   typeof updated[0].id === "string" && updated[0].id.length > 0);
  assert("addTask: prepends to existing list", addTask(seed, { title: "X", owner: "AI", status: "Planned" }).length === seed.length + 1);
  assert("addTask: new item is first", addTask(seed, { title: "X", owner: "AI", status: "Planned" })[0].title === "X");
}

// updateTask
{
  const updated = updateTask(seed, "2", { status: "Ready for Review" });
  assert("updateTask: returns same length", updated.length === seed.length);
  assert("updateTask: changed status on target", updated.find((t) => t.id === "2").status === "Ready for Review");
  assert("updateTask: did not change other items", updated.find((t) => t.id === "1").status === "Planned");
  assert("updateTask: unknown id leaves list unchanged", updateTask(seed, "999", { status: "Planned" }).length === seed.length);
}

// deleteTask
{
  const updated = deleteTask(seed, "2");
  assert("deleteTask: removes one item", updated.length === seed.length - 1);
  assert("deleteTask: correct item removed", !updated.find((t) => t.id === "2"));
  assert("deleteTask: other items preserved", updated.find((t) => t.id === "1") !== undefined);
  assert("deleteTask: unknown id leaves list unchanged", deleteTask(seed, "999").length === seed.length);
}

// ── audit.js tests ─────────────────────────────────────────────────
import { recordAction, clearAudit, loadAudit } from "./audit.js";

{
  clearAudit();
  const entries = recordAction("Test action", "detail text");
  assert("recordAction: returns an array", Array.isArray(entries));
  assert("recordAction: adds one entry", entries.length === 1);
  assert("recordAction: action field matches", entries[0].action === "Test action");
  assert("recordAction: detail field matches", entries[0].detail === "detail text");
  assert("recordAction: at field is ISO string", typeof entries[0].at === "string" && entries[0].at.includes("T"));

  recordAction("Second", "b");
  assert("recordAction: second call adds to front", loadAudit()[0].action === "Second");

  clearAudit();
  assert("clearAudit: empties the log", loadAudit().length === 0);
}

// ── Render results ──────────────────────────────────────────────────
const output = document.querySelector("#output");
const summary = document.querySelector("#summary");

const suites = {
  "tasks.js": results.slice(0, 12),
  "audit.js": results.slice(12),
};

for (const [suite, items] of Object.entries(suites)) {
  const section = document.createElement("div");
  section.className = "suite";
  const heading = document.createElement("h2");
  heading.textContent = suite;
  section.appendChild(heading);

  items.forEach(({ description, pass }) => {
    const div = document.createElement("div");
    div.className = `result ${pass ? "pass" : "fail"}`;
    div.textContent = `${pass ? "✓" : "✗"} ${description}`;
    section.appendChild(div);
  });

  output.appendChild(section);
}

const passed = results.filter((r) => r.pass).length;
const total  = results.length;
summary.textContent = `${passed} / ${total} tests passed`;
summary.style.color = passed === total ? "#166534" : "#991b1b";
