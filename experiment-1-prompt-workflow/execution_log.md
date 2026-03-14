# Execution Log

This file records the real-time execution of the experiment.

All conditions were executed on the same machine with timestamps using:
- Windsurf IDE
- Claude Sonnet 4.5
- Same system environment
- Same application requirements

Each condition started from a clean project directory.

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
Only total experiment time was measured. Start time was 14-03-2026 13:29 and ended at 13:34. Time taken: 5 mins 40 seconds

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

## Condition C — One-Shot Structured Prompt

Prompt C1 executed at 14-03-2026 21:34 and ended at 21:35.  
Time taken: **1 min 04 seconds**

Prompt used a one-shot structured workflow instructing the model to internally:

1. define specification  
2. define component architecture  
3. implement the application  
4. verify implementation

### Execution Summary

Total prompts used: 1  
Correction prompts used: 0  

Application compiled successfully and ran without errors.

Features verified:

- add task
- delete task
- mark task complete
- persistence via localStorage

Generated architecture:

todo-app/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
        ├── AddTodo.jsx
        ├── TodoList.jsx
        └── TodoItem.jsx

### Observations

- Basic component separation was introduced (`AddTodo`, `TodoList`, `TodoItem`).
- Architecture was cleaner than Condition A but less modular than Condition B.
- No hooks or utility modules were generated.
- No specification or architecture documentation files were produced.

UI was functional but visually basic compared to the structured workflow implementation.