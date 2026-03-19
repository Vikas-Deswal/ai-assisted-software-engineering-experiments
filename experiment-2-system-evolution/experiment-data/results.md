# Experiment 2 Results

## Overview

This experiment evaluated how software systems generated using different prompting workflows evolve under sequential feature additions.

Three systems were studied:

- System A: Generate-then-fix workflow
- System B: Staged structured workflow
- System C: One-shot structured prompt

Each system was extended through four feature additions:

1. Edit task  
2. Filter tasks  
3. Clear completed tasks  
4. Add due date  

---
## 1. Codebase Growth

The total growth in lines of code (LOC) from baseline to Feature 4 was:

- System A: 231 → 471 (**+240 LOC**)
- System B: 183 → 322 (**+139 LOC**)
- System C: 264 → 495 (**+231 LOC**)

System B exhibited significantly lower code growth compared with Systems A and C.

This suggests that the architecture generated through the staged structured workflow required fewer additional lines of code to support feature evolution.

---
## 2. Maintainability (Code Smells)

Growth in code smells was observed as follows:

- System A: 2 → 9 (**+7**)
- System B: 17 → 27 (**+10**)
- System C: 15 → 32 (**+17**)

System C showed the fastest increase in code smells across feature additions.
System A showed the slowest accumulation, while System B exhibited moderate growth despite starting with a higher baseline.

---
## 3. Complexity Evolution

### Cyclomatic Complexity

- System A: 20 → 49 (**+29**)
- System B: 28 → 59 (**+31**)
- System C: 21 → 52 (**+31**)

All systems exhibited similar increases in cyclomatic complexity as features were added.
This indicates that feature complexity contributes similarly across architectures, regardless of prompting workflow.

---
### Cognitive Complexity

- System A: 8 → 21 (**+13**)
- System B: 8 → 18 (**+10**)
- System C: 6 → 18 (**+12**)

System B showed slightly lower cognitive complexity growth compared with Systems A and C.
This suggests that its architecture may better distribute reasoning complexity across components.

---

## 4. Technical Debt

Debt ratio trends:

- System A: 0.1% → 0.3%
- System B: 1.6% → 1.4%
- System C: 0.9% → 1.1%

System B showed a slight decrease in technical debt ratio over time, while Systems A and C showed small increases.

---
## 5. Development Effort

Total implementation time across all features:

- System A: ~7 min 45 sec
- System B: ~7 min 57 sec
- System C: ~7 min 24 sec

Development time remained comparable across all systems.

No significant differences in developer effort were observed at this scale.

---

## 6. Regression Analysis

No regressions were observed in any system during feature evolution.

All previously implemented functionality remained intact after each feature addition.

---

## 7. Observations

- System B consistently required fewer additional lines of code for feature implementation.
- System C exhibited the fastest growth in code smells and overall code size.
- System A maintained relatively stable complexity growth despite a monolithic structure.
- Differences in developer effort were minimal across systems.

---

## 8. Interpretation

The results suggest that prompting workflow influences the structural evolution of AI-generated software systems.

- The staged structured workflow (System B) produced the most compact evolving architecture, with lower code growth and moderate maintainability degradation.
- The generate-then-fix workflow (System A) resulted in a larger codebase but showed relatively stable complexity growth.
- The one-shot structured workflow (System C) led to faster codebase expansion and higher accumulation of maintainability issues.

---

## 9. Limitation

This experiment was conducted on a relatively small application with a limited number of feature additions.

The absence of regressions suggests that short-term evolution of small AI-generated systems may remain stable.

Further experiments are required to evaluate behavior in larger and more complex systems.

---

## 10. Key Insight

The results indicate that initial prompting workflow can influence not only the generated architecture but also how efficiently the system evolves over time.

## 11. Practical Implications

Structured staged prompting appears to promote more compact and controlled architectural growth compared with simpler prompting strategies.

The findings suggest that prompting strategy may influence long-term maintainability of AI-generated codebases.

In practical development environments, where systems evolve over time, structured prompting workflows may reduce code growth and limit accumulation of technical debt.
This has implications for teams adopting AI-assisted development tools, as initial prompting decisions may impact long-term system quality.