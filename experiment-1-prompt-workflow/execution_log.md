# Execution Log

This file records the real-time execution of the experiment.
Conditions will be logged sequentially with timestamps.

## Condition A — Generate then Fix

Prompt 1 executed at 13-03-2026 21:52 and ended at 21:53. Time taken: 1 min 01 seconds

AI generated a full React Todo application including:

- App.jsx
- App.css
- main.jsx
- index.html
- package.json
- vite.config.js

Features verified:

- add task
- delete task
- mark complete
- persistence via localStorage

All features worked without requiring correction prompts.

UI was simple but functional.

Corrections used: 0

## Condition B — Structured Workflow

Date: 14 March 2026  
Application: Todo Web App (React + Vite)

### Prompt Sequence

Prompt B1 — Specification generation  
Prompt B2 — Architecture design  
Prompt B3 — Implementation generation  
Prompt B4 — Specification comparison

Note:
Exact execution time for individual prompts was not recorded during this run.
Only total experiment time was measured.

### Execution Summary

Total prompts used: 4  
Correction prompts used: 0  

Total execution time: **5 minutes 40 seconds**

Application compiled successfully and ran without errors. All features were working correctly

Generated architecture:

src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── TaskInput.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   └── EmptyState.jsx
├── hooks/
│   └── useLocalStorage.js
└── utils/
    └── taskUtils.js

Additional artifacts generated:

- todo-app-specification.md
- react-component-architecture.md
- implementation-comparison.md