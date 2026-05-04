# PR Granularity Experiment — Results

> Experiment design reference: [ai-team-development-best-practices.md](./ai-team-development-best-practices.md#recommended-experiment-one-demo-project-multiple-branches)
>
> Demo project: `prj/ai-team-demo/`  
> Baseline commit: `5de2524`  
> Branches: `exp/small-pr` (6 PRs) · `exp/medium-pr` (3 PRs) · `exp/large-pr` (2 PRs)

---

## 1. Delivery efficiency

| Metric | exp/small-pr (6 PRs) | exp/medium-pr (3 PRs) | exp/large-pr (2 PRs) |
|---|---|---|---|
| Total commits | 6 | 3 | 2 |
| Total lines changed | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Avg lines per PR | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Time to first working PR (min) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Time to final accepted branch (min) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Review turnaround per PR (min) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Number of review cycles per PR | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |

---

## 2. Engineering quality

| Metric | exp/small-pr | exp/medium-pr | exp/large-pr |
|---|---|---|---|
| Defects found in review (count) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Defects found after merge (count) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Test coverage (assertions) | 17 | 17 | 17 |
| Regressions found | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Rework required? (yes / no / minor) | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |

---

## 3. Change quality (reviewer rating 1–5)

| Metric | exp/small-pr | exp/medium-pr | exp/large-pr |
|---|---|---|---|
| PR readability | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Reviewability of diffs | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Clarity of commit history | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Ease of isolating failures | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |
| Ease of rollback | <!-- fill in --> | <!-- fill in --> | <!-- fill in --> |

---

## 4. Review checklist (use per PR)

- [ ] Scope is clearly stated in PR description
- [ ] All acceptance criteria from the spec are met
- [ ] Tests cover the new behaviour
- [ ] No dead code, unused imports, or debug statements
- [ ] README / docs are updated if needed
- [ ] The diff can be understood in one sitting
- [ ] No unrelated changes are bundled in

---

## 5. Observations

### exp/small-pr

<!-- Write what was easy or hard to review. Examples:
- Easy to reason about each change in isolation
- Required more context-switching between PRs
- Review comments were precise
-->

### exp/medium-pr

<!-- Write what was easy or hard to review. Examples:
- Each PR told a coherent product story
- Occasionally had to hold two concerns in mind at once
-->

### exp/large-pr

<!-- Write what was easy or hard to review. Examples:
- Harder to track which line belonged to which feature
- Fast to merge, but review required more effort
-->

---

## 6. Hypothesis check

From the best-practices doc:

> "In many teams, the best result is not the smallest possible PR and not the largest possible PR. A medium PR size often gives the best tradeoff between AI productivity, human review efficiency, and defect control."

**Did the experiment support this?**

<!-- yes / no / partially — explain briefly -->

---

## 7. Recommendation

<!-- Which strategy suits your team? Why? One or two sentences. -->

---

## 8. Appendix — PR summary

### exp/small-pr

| # | Title | Files | Lines |
|---|---|---|---|
| 1 | Auth module + login screen | auth.js, index.html, styles.css, app.js | <!-- fill in --> |
| 2 | Task CRUD + card UI | tasks.js, index.html, styles.css, app.js | <!-- fill in --> |
| 3 | Search & live filter | index.html, styles.css, app.js | <!-- fill in --> |
| 4 | Audit log panel | audit.js, index.html, styles.css, app.js | <!-- fill in --> |
| 5 | Unit tests | test-runner.js, tests.html | <!-- fill in --> |
| 6 | README & run docs | README.md | <!-- fill in --> |

### exp/medium-pr

| # | Title | Files | Lines |
|---|---|---|---|
| 1 | Auth + CRUD slice | auth.js, tasks.js, index.html, styles.css, app.js | <!-- fill in --> |
| 2 | Search/filter + audit slice | audit.js, index.html, styles.css, app.js | <!-- fill in --> |
| 3 | Tests + deploy docs | test-runner.js, tests.html, README.md | <!-- fill in --> |

### exp/large-pr

| # | Title | Files | Lines |
|---|---|---|---|
| 1 | All features in one PR | auth.js, tasks.js, audit.js, package.json, index.html, styles.css, app.js | 424 |
| 2 | Tests + docs | test-runner.js, tests.html, README.md | 179 |
