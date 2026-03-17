# Results

Results will be recorded after all experimental conditions have been executed.

## Condition A: Generate then Fix

### Metrics

- Total prompts: **2**
- Correction prompts: **1**
- Total time to working application: **~1 min 32 sec**
- Compile success: **Yes**
- Regression count: **0**

---

### Project Structure

todo-app/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css

The application was implemented primarily within a **single main React component (`App.jsx`)**, with minimal modular separation.

---

### Functional Verification

All required features worked after correction:

- Add task
- Delete task
- Mark task complete
- Persistence via localStorage

---

### Observations

- Implementation structure is **minimal and monolithic**, with most logic located inside `App.jsx`.
- No modular component separation was generated.
- The model produced a **working application quickly**, but required a correction prompt to implement persistence.
- An additional feature displaying **“X of Y tasks completed”** was generated despite not being explicitly requested.

---

### Quality Evaluation

- Functional correctness: **2 / 2**
- Regression stability: **2 / 2**
- Implementation cleanliness: **1 / 2**
- UI adequacy: **1 / 2**

**Total score: 6 / 8**

---

## Condition B: Structured Workflow

### Metrics

Total prompts: 4  
Correction prompts: 0  
Total time to working application: 3 minutes 56 seconds  
Compile success: Yes  
Regression count: 0

### Architecture

src/
├── App.jsx
├── components/
│   ├── Header.jsx
│   ├── TodoInput.jsx
│   ├── TodoList.jsx
│   └── TodoItem.jsx
├── hooks/
│   └── useLocalStorage.js
└── utils/
    └── taskHelpers.js

### Quality Evaluation

Functional correctness: 2 / 2  
Regression stability: 2 / 2  
Implementation cleanliness: 2 / 2  
UI adequacy: 1 / 2  

Total score: 7 / 8