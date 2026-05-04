# AI Team Demo

A small static web app that demonstrates an AI-supported team task board. No build step or backend required.

## Features

- Login / logout (demo accounts, `sessionStorage`)
- Task board with create, update status, and delete
- Live search and status filter
- Activity log (persisted in `localStorage`)
- In-browser test runner

## Demo accounts

| Username | Password |
|----------|----------|
| alice    | pass1    |
| bob      | pass2    |

## Run locally

**Option 1 — Python (recommended)**

```bash
cd prj/ai-team-demo
python3 -m http.server 8000
```

Open `http://localhost:8000`.

**Option 2 — Node.js**

```bash
cd prj/ai-team-demo
npx serve .
```

Open the URL printed in the terminal.

**Option 3 — Open directly**

> ⚠️ ES modules (`import`) require a server. Opening `index.html` via `file://` will not work in most browsers.

## Run tests

Start the server as above, then open `http://localhost:8000/tests.html`.

Results are shown directly in the browser. All tests should show green.

To run headlessly with Node 18+:

```bash
cd prj/ai-team-demo
node --input-type=module <<'EOF'
global.localStorage = (() => {
  const s = {};
  return { getItem: k => s[k] ?? null, setItem: (k,v) => { s[k]=String(v); }, removeItem: k => { delete s[k]; } };
})();
const { addTask } = await import('./tasks.js');
console.log('smoke:', addTask([], { title:'t', owner:'AI', status:'Planned' }).length === 1 ? 'pass' : 'fail');
EOF
```

## Files

| File             | Purpose                                      |
|------------------|----------------------------------------------|
| `index.html`     | Page structure and templates                 |
| `styles.css`     | Responsive layout and visual styling         |
| `app.js`         | App entry point, event wiring                |
| `auth.js`        | Login/logout and session management          |
| `tasks.js`       | Task CRUD with localStorage persistence      |
| `audit.js`       | Activity log with localStorage persistence   |
| `test-runner.js` | Unit tests for tasks.js and audit.js         |
| `tests.html`     | In-browser test runner page                  |
| `package.json`   | Marks directory as ESM (`"type": "module"`)  |

## Experiment context

This project is the baseline for a PR granularity experiment.
See `docs/ai-team-development-best-practices.md` for the full experiment design.

| Branch           | PR strategy                          |
|------------------|--------------------------------------|
| `exp/small-pr`   | One narrow concern per PR (this one) |
| `exp/medium-pr`  | Grouped-by-slice PRs                 |
| `exp/large-pr`   | Few broad PRs                        |
