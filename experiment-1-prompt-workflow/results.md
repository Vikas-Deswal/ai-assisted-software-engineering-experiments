# Results

Results will be recorded after all experimental conditions have been executed.

Quality scores were calculated using the evaluation rubric defined in the experiment protocol, which assesses functional correctness, regression stability, implementation cleanliness, and UI adequacy.

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

## Condition C: One-Shot Structured Prompt

### Metrics

- Total prompts: **2**
- Correction prompts: **1**
- Total time to working application: **~1 minute 33 seconds**
- Compile success: **Yes**
- Regression count: **0**

---

### Project Structure
condition-c-one-shot-structured/
├── package.json
├── README.md
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── index.css
    ├── App.js
    ├── App.css
    └── components/
        ├── TodoForm.js
        ├── TodoForm.css
        ├── TodoList.js
        ├── TodoList.css
        ├── TodoItem.js
        └── TodoItem.css

The implementation generated multiple components and separate CSS files for each component.  
Compared with Condition A, the structure was more modular, but it lacked the architectural organization observed in Condition B (such as dedicated hooks or utility modules).

---

### Functional Verification

After correction, all required features worked:

- Add task
- Delete task
- Mark task complete
- Persistence via localStorage

Initial generation omitted local storage persistence, requiring one correction prompt.

---

### Observations

- The generated architecture was component-based but somewhat fragmented due to multiple CSS files.
- The UI included styled layout and gradient background.
- Persistence functionality was missing in the initial generation and required a correction prompt.
- The project used a different run command (`npm start`) compared with other conditions (`npm run dev`).

---

### Quality Evaluation

- Functional correctness: **2 / 2**
- Regression stability: **2 / 2**
- Implementation cleanliness: **1 / 2**
- UI adequacy: **2 / 2**

**Total score: 7 / 8**

# Experiment 1 Interpretation

The results suggest that prompting workflow significantly influences the characteristics of AI-generated software systems.

- The **generate-then-fix workflow (Condition A)** produced the fastest initial implementation but resulted in a simple and largely monolithic architecture.
- The **staged structured workflow (Condition B)** generated the most organized architecture, including component separation and supporting modules. It required more prompting steps but avoided functional omissions during initial generation.
- The **one-shot structured prompt (Condition C)** generated a modular component-based architecture and visually styled interface quickly, but still omitted an important functional requirement (local storage persistence) during initial generation.

Overall, staged prompting appeared to improve architectural structure and completeness, while simpler prompting workflows produced faster results but occasionally missed functional requirements.
The results suggest that stepwise prompting improves requirement completeness compared with both reactive prompting and one-shot structured prompts.

# Hypothesis Evaluation

The experiment tested the following hypothesis:

"A structured prompting workflow will require fewer correction prompts and produce a more reliable implementation than a reactive generate-then-fix workflow."

### Findings

- The staged structured workflow (Condition B) required **zero correction prompts**, while the generate-then-fix workflow (Condition A) required **one correction prompt** to complete the required functionality.
- Condition B also produced a **more organized and modular architecture**, resulting in a higher overall quality score.

### Result

The results **support the hypothesis**.  
Structured prompting improved both **implementation reliability** and **architectural quality** compared with the generate-then-fix workflow.

### Practical Implication

Although the staged structured workflow required more prompting steps, it avoided correction prompts and initial functional defects. 
In practical development workflows, correction prompts represent debugging effort. 
This suggests that structured prompting may reduce developer debugging time and improve reliability in AI-assisted development workflows.