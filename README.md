# AI-Assisted Software Engineering Experiments

## Key Insight

Structured prompting workflows produced more compact and stable evolving codebases, while less structured approaches led to faster code growth and higher accumulation of maintainability issues.

## Overview

This project explores how AI-assisted coding workflows influence the structure and evolution of software systems.

While AI tools can quickly generate working applications, it is still unclear how those systems behave as they grow over time. This project investigates whether different prompting approaches lead to different architectural outcomes and how those systems evolve when new features are added.

The goal is not to test whether AI can write code, but to understand:

- how AI-generated systems are structured  
- how they evolve under change  
- how maintainability and complexity develop over time  

---

## Research Focus

The central question explored in this project is:

> Does the way we prompt AI during code generation influence how software systems evolve as new features are added?

This is studied through controlled experiments comparing different prompting workflows and measuring their impact on system evolution.

---

## Experiment 1: Initial System Generation

### Objective

Evaluate how different prompting workflows affect the **initial structure and quality** of AI-generated software.

### Conditions

Three workflows were tested:

- **Condition A: Generate then Fix**  
  A single prompt is used to generate the application, followed by corrections if needed.

- **Condition B: Structured Workflow**  
  The process is broken into steps: specification → architecture → implementation.

- **Condition C: One-Shot Structured Prompt**  
  A detailed prompt describing structure and requirements is provided in a single step.

### Observations

- All workflows produced working applications.
- Some workflows missed functional requirements initially and required correction.
- Structured prompting produced more modular architectures.
- Simpler prompting produced faster results but less organized code.

---

## Experiment 2: System Evolution

### Objective

Evaluate how systems generated in Experiment 1 behave as they evolve through sequential feature additions.

### Setup

Each system was extended with the same four features:

1. Edit task  
2. Filter tasks  
3. Clear completed tasks  
4. Add due date  

The same prompting structure was used across all systems.

### Metrics Collected

- Prompts and corrections  
- Development time  
- Regression count  
- Code changes (files, lines added/removed)  
- Code quality metrics (SonarQube):
  - code smells  
  - duplication  
  - cyclomatic complexity  
  - cognitive complexity  
  - technical debt ratio  

---

## Key Findings

- Systems generated using structured workflows required **significantly less code growth** to support new features.
- One-shot structured prompting led to **faster accumulation of code smells and larger codebases**.
- Generate-then-fix workflows produced **simple but stable structures**, though less modular.
- No regressions were observed across feature additions in this small-scale setup.
- Development time was similar across all workflows.

---

## Interpretation

The results suggest that prompting strategy influences not only the initial architecture, but also how efficiently a system evolves over time.

Structured workflows appear to encourage more compact and reusable architectures, while less structured approaches may lead to faster initial results but less controlled growth.

---

## Practical Implications

These findings are relevant for real-world AI-assisted development workflows.

As teams increasingly rely on AI to generate and modify code, initial prompting decisions may influence:

- long-term maintainability  
- codebase growth  
- technical debt accumulation  

Understanding this behavior can help guide better use of AI tools in software development.

---

## Limitations

- The experiment was conducted on a small application.
- Feature complexity was moderate.
- Results may differ for larger systems or longer development cycles.

---

## Next Steps

Future experiments will explore:

- behavior on larger and more complex systems  
- impact of documentation and memory during development  
- architectural degradation over longer feature sequences  

---

## Repository Structure

experiment-1/
├─ condition-a/
├─ condition-b/
├─ condition-c/
├─ execution-log.md
├─ results.md

experiment-2/
├─ system-a/
├─ system-b/
├─ system-c/
├─ experiment-data/
├─-- execution-log.md
├─-- results.md

---

## Why This Project

AI-assisted coding is rapidly changing how software is built.

This project aims to move beyond simple productivity discussions and explore a deeper question:

> What happens to software systems when AI is involved not just in writing code, but in evolving it?
