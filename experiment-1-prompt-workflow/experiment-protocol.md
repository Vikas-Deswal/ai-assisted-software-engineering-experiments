# Experiment 1: Effect of Prompting Workflow on AI-Assisted Web App Development

Effect of Prompting Workflow on AI-Assisted Web App Development

---

### **1. Motivation**

AI-assisted coding tools can rapidly generate software code, but the quality and stability of the output may depend on the workflow used to interact with the model. Developers commonly use a reactive “generate then fix” approach, while others advocate more structured workflows that require specification and planning before code generation.

This experiment investigates whether structured prompting workflows reduce revision effort and improve implementation quality when building a small web application.

---

### **2. Research Question**

Does a structured prompting workflow produce a more reliable, efficient, and maintainable implementation than a generate-then-fix workflow when building the same web application with an AI coding assistant?

---

### **3. Hypothesis**

A structured prompting workflow will require fewer correction prompts and produce a more stable implementation than a reactive generate-then-fix workflow.

### **4. Independent Variable**

Prompting workflow structure.

Three conditions:

- A: Generate-then-fix
- B: Staged structured workflow (specify → design → implement → verify)
- C: One-shot structured prompt (single comprehensive prompt with internal stages)

---

### **5. Controlled Variables**

To maintain fairness, the following will remain constant across all conditions:

- same application (Todo web app)
- same feature requirements
- same AI tool and model (Windsurf & Claude Sonnet 4.5)
- same developer (experiment conductor)
- same maximum correction prompts
- same evaluation rubric
- same runtime environment (OS, IDE/editor, browser, Node.js version)
- same network access policy (no external API keys or backend services)
- same time-budgeting and logging granularity

---

### **6. Application Definition**

A simple Todo web application with the following features:
- add task
- delete task
- mark task complete
- store tasks locally
- display list of tasks

The application should run in a browser and persist tasks using local storage.

Acceptance criteria:
- Runs in a local development server and opens in a browser
- Tasks persist across reloads via localStorage
- No backend or external services required

---

### **7. Stopping Rule**

Each condition will stop when either:

- the application reaches acceptable functionality (quality score ≥ 6/8 and runs successfully), or
- five correction prompts have been used.

---

### **8. Evaluation Metrics**

The following metrics will be recorded:

Primary metrics
- total prompts used
- correction prompts used
- time to acceptable result (minutes)
- build/run success (app runs locally without disallowed manual edits)
- regression count

Secondary metrics
- implementation cleanliness
- UI adequacy

---

### **9. Quality Evaluation Rubric**

Each implementation will be evaluated on a 0–2 scale.

**Functional correctness**

0 = broken features

1 = partially functional

2 = all features work

**Regression stability**

0 = multiple regressions

1 = some regressions

2 = stable

**Implementation cleanliness**

0 = messy / duplicated

Signs:

- huge single file (>300 lines)
- repeated identical code blocks
- inconsistent naming
- random functions everywhere

1 = acceptable

Signs:

- code split into a few files
- some repetition but manageable
- function names understandable

2 = clean structure

Signs:

- code split into logical components
- minimal duplication
- clear function names
- structure easy to follow

**UI adequacy**

0 = broken layout

1 = usable

2 = clear and usable

Maximum score = 8

---

## Experiment rules

1. Prompts are defined before experiment execution.
2. The same feature requirements are used for all conditions.
3. Corrections must describe problems only, not implementation solutions.
4. Each condition is executed independently from scratch.
5. Results are logged with timestamps to maintain transparency.
6. No manual code edits are allowed unless required to run the generated code; such edits must be logged explicitly

---

## Apparatus & Environment

- Hardware/OS: MacOS is used
- IDE/Tooling: Windsurf with model Claude Sonnet 4.5, Chrome browser is used
- Network policy: no external APIs or credentials; internet access limited to what the IDE requires
- Logging: timestamps for all prompts/responses; record commit hashes or zipped snapshots per condition

## Procedure (per condition)

1. Initialize an empty working directory for the condition.
2. Execute the condition’s prompts exactly as specified below.
3. If a correction is needed, use the correction template. Do not provide implementation details beyond describing the problem.
4. Apply the stopping rule.
5. Record metrics, qualitative notes, and archive the final code.

## Data to Record

- Start/end timestamps per condition; per-prompt timestamps
- Full prompt texts and assistant responses
- Counts: total prompts, correction prompts
- Build/run status and steps taken to run
- Time to acceptable result
- Regression notes (if any)
- Rubric scores (functional, regression stability, cleanliness, UI)

## Analysis Plan

- Primary comparison: A vs B vs C on total prompts, correction prompts, time, build/run success, and total quality score
- Use descriptive statistics across runs; if repeating multiple times, use within-subjects comparisons and counterbalance order
- Report qualitative observations about failure modes and rework effort
- Provide archived artifacts and logs for reproducibility

## Ethics & Data Protection (GDPR)

- No personal data are collected; only code artifacts and prompt/response logs
- Store data locally; if shared, remove any identifiers and secrets
- Open-science: share anonymized logs and code under a permissive license when possible

---

Prompts:

## **Condition A: Generate then fix**

Prompt 1

```jsx
Build a simple Todo web application using React.

Features:
- add task
- delete task
- mark task complete
- store tasks locally
- display list of tasks

The UI should display tasks clearly and allow users to interact with them easily.

Keep the implementation simple and readable.
```

Correction Prompt

```jsx
The following issue exists:

[describe issue]

Please fix this with minimal changes to the existing implementation.
```

Maximum corrections allowed: 5

## **Condition B: Staged workflow**

Prompt B1:

```jsx
Given the following application requirements, create a structured specification.

Application:
Todo web app

Features:
- add task
- delete task
- mark task complete
- store tasks locally
- display list of tasks

Return:
- UI structure
- data model
- interactions
- application states
```

Prompt B2:

```jsx
Using the specification above, propose a component architecture for implementing this application using React.
```

Prompt B3:

```jsx
Generate the implementation based on the specification and architecture.
```

Prompt B4:

```jsx
Compare the implementation against the original specification and list any mismatches or missing functionality.
```

Correction template same as above

---

## **Condition C: One-shot structured prompt**

Prompt C1:

```jsx
Build a Todo web application using React.

Before generating code, perform the following steps internally:

1. define the application specification
2. define component architecture
3. implement the application
4. verify the implementation matches the specification

Features:
- add task
- delete task
- mark task complete
- store tasks locally
- display list of tasks

Keep the code simple and readable.
```