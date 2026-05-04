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
  const r = addTask([], { title: "New", owner: "Human", status: "Planned" });
  assert("addTask: adds one item",     r.length === 1);
  assert("addTask: title correct",     r[0].title === "New");
  assert("addTask: id assigned",       typeof r[0].id === "string" && r[0].id.length > 0);
  assert("addTask: prepends to list",  addTask(seed, { title: "X", owner: "AI", status: "Planned" }).length === seed.length + 1);
  assert("addTask: new item is first", addTask(seed, { title: "X", owner: "AI", status: "Planned" })[0].title === "X");
}

// updateTask
{
  const r = updateTask(seed, "2", { status: "Ready for Review" });
  assert("updateTask: same length",        r.length === seed.length);
  assert("updateTask: target updated",     r.find((t) => t.id === "2").status === "Ready for Review");
  assert("updateTask: others unchanged",   r.find((t) => t.id === "1").status === "Planned");
  assert("updateTask: unknown id safe",    updateTask(seed, "999", { status: "Planned" }).length === seed.length);
}

// deleteTask
{
  const r = deleteTask(seed, "2");
  assert("deleteTask: removes one",        r.length === seed.length - 1);
  assert("deleteTask: correct item gone",  !r.find((t) => t.id === "2"));
  assert("deleteTask: others preserved",   r.find((t) => t.id === "1") !== undefined);
  assert("deleteTask: unknown id safe",    deleteTask(seed, "999").length === seed.length);
}

// audit
{
  clearAudit();
  const e = recordAction("Test", "detail");
  assert("recordAction: is array",         Array.isArray(e));
  assert("recordAction: one entry",        e.length === 1);
  assert("recordAction: action matches",   e[0].action === "Test");
  assert("recordAction: detail matches",   e[0].detail === "detail");
  assert("recordAction: at is ISO string", typeof e[0].at === "string" && e[0].at.includes("T"));
  recordAction("Second", "b");
  assert("recordAction: prepends",         loadAudit()[0].action === "Second");
  clearAudit();
  assert("clearAudit: empties log",        loadAudit().length === 0);
}

// Render
const output  = document.querySelector("#output");
const summary = document.querySelector("#summary");
const suites  = { "tasks.js": results.slice(0, 13), "audit.js": results.slice(13) };

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
