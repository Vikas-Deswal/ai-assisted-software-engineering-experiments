# 1. Objective

Examine how AI-generated software architectures evolve when new features are added sequentially.

## Hypothesis

Applications generated using structured prompting workflows will evolve more smoothly and require fewer modifications during feature additions compared to applications generated using reactive prompting workflows.

# 2. Systems Under Study

Three systems generated in Experiment 1:
- **System A**: generated using generate-then-fix workflow
- **System B**: generated using staged structured workflow
- **System C**: generated using one-shot structured prompt

These serve as baseline states:
```
A0, B0, C0
```

# 3. Experiment Design

Each system will evolve through four sequential feature additions:
1. Edit task
2. Filter tasks (all / completed / pending)
3. Clear completed tasks
4. Add due date to tasks

For each feature, the modification will be applied to all systems sequentially:
```
Feature 1 → A1, B1, C1
Feature 2 → B2, C2, A2
Feature 3 → C3, A3, B3
Feature 4 → A4, C4, B4
```
To reduce experimenter learning bias, the execution order of systems is rotated across features.

## Prompt Control

The same feature description and prompting structure will be used across all systems.
Prompts will request minimal modification of existing architecture and avoidance of unnecessary rewrites.
Each prompt must instruct the AI to modify the existing codebase rather than regenerate the application.
Only files necessary for implementing the feature should be modified.

# 4. Metrics

## Behavioral metrics
- total prompts used
- correction prompts
- time required for implementation
- regression count

## Evolution metrics (from Git)
- files changed
- lines added
- lines deleted

## Structural metrics (from SonarQube)
- code smells
- duplication percentage
- cyclomatic complexity
- cognitive complexity
- technical debt ratio

SonarQube will be executed at:
- baseline: A0 B0 C0
- after each feature addition

## Regression Definition

A regression is defined as a previously working feature that stops functioning after a new feature or correction is introduced.

Examples include:
- inability to add tasks
- loss of persistence
- broken UI interaction
- runtime errors preventing application use

---

# 6. Stopping Rule

For each feature addition:

Stop when:
- the feature works and all previous functionality still works

**OR**

- 5 correction prompts have been used.

---
# 7. Prompts to be used

## Prompt Template

```
Add the following feature to the existing Todo application.

Feature:
[Feature description]

Requirements:
- existing features must continue working
- tasks must persist using localStorage
- the application must continue compiling and running successfully

Important instructions:
Modify the existing codebase to implement the feature.
Do not rewrite the application.
Preserve the existing architecture and file structure.
Only modify the files necessary for implementing the feature.
```
### Feature Description

Feature 1: Edit Task
```
Users should be able to edit an existing task.

Requirements:
- an edit option should allow modification of the task text
- changes should update the stored task
- persistence must remain functional
```

Feature 2: Filter Tasks
```
Users should be able to filter tasks.

Filters required:
- all tasks
- completed tasks
- pending tasks
```

Feature 3: Clear Completed Tasks
```
Add an option to remove all completed tasks at once.

Requirements:
- a clear completed button
- only completed tasks should be removed
```

Feature 4: Add Due Date
```
Tasks should support optional due dates.

Requirements:
- users can assign a due date to a task
- due dates should persist in localStorage
- tasks should display the due date if present
```

## Correction Template

```
The following issue exists in the current implementation:

[describe the problem]

Please fix the issue while preserving the existing architecture and functionality.
Only modify the necessary parts of the code.
```
Only problem will be added & not the solution

---
# 8. Data Recording

Results will be recorded in a CSV dataset with fields such as:
```
system,feature,prompts,corrections,time,regressions,files_changed,lines_added,lines_deleted,code_smells,duplication,complexity,maintainability
```

