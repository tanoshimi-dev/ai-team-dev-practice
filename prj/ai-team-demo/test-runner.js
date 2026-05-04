// Minimal test runner — no external dependencies

const results = [];

function assert(description, condition) {
  results.push({ description, pass: Boolean(condition) });
}

import { addTask, updateTask, deleteTask } from "./tasks.js";
import { recordAction, clearAudit, loadAudit } from "./audit.js";

const seed = [
  { id: "1", title: "First",  owner: "Human",  status: "Planned"           },
  { id: "2", title: "Second", owner: "AI",     status: "In Progress"       },
  { id: "3", title: "Third",  owner: "Shared", status: "Ready for Review"  },
];

// addTask
{
  const updated = addTask([], { title: "New task", owner: "Human", status: "Planned" });
  assert("addTask: adds one item",       updated.length === 1);
  assert("addTask: title is correct",    updated[0].title === "New task");
  assert("addTask: owner is correct",    updated[0].owner === "Human");
  assert("addTask: id is assigned",      typeof updated[0].id === "string" && updated[0].id.length > 0);
  assert("addTask: prepends to list",    addTask(seed, { title: "X", owner: "AI", status: "Planned" }).length === seed.length + 1);
  assert("addTask: new item is first",   addTask(seed, { title: "X", owner: "AI", status: "Planned" })[0].title === "X");
}

// updateTask
{
  const updated = updateTask(seed, "2", { status: "Ready for Review" });
  assert("updateTask: same length",           updated.length === seed.length);
  assert("updateTask: changed target status", updated.find((t) => t.id === "2").status === "Ready for Review");
  assert("updateTask: other items unchanged", updated.find((t) => t.id === "1").status === "Planned");
  assert("updateTask: unknown id no change",  updateTask(seed, "999", { status: "Planned" }).length === seed.length);
}

// deleteTask
{
  const updated = deleteTask(seed, "2");
  assert("deleteTask: removes one item",    updated.length === seed.length - 1);
  assert("deleteTask: correct item gone",   !updated.find((t) => t.id === "2"));
  assert("deleteTask: others preserved",    updated.find((t) => t.id === "1") !== undefined);
  assert("deleteTask: unknown id no change", deleteTask(seed, "999").length === seed.length);
}

// audit
{
  clearAudit();
  const entries = recordAction("Test action", "detail text");
  assert("recordAction: returns array",   Array.isArray(entries));
  assert("recordAction: one entry",       entries.length === 1);
  assert("recordAction: action matches",  entries[0].action === "Test action");
  assert("recordAction: detail matches",  entries[0].detail === "detail text");
  assert("recordAction: at is ISO string", typeof entries[0].at === "string" && entries[0].at.includes("T"));

  recordAction("Second", "b");
  assert("recordAction: prepends",  loadAudit()[0].action === "Second");

  clearAudit();
  assert("clearAudit: empties log", loadAudit().length === 0);
}

// Render
const output  = document.querySelector("#output");
const summary = document.querySelector("#summary");

const suites = {
  "tasks.js": results.slice(0, 14),
  "audit.js": results.slice(14),
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
