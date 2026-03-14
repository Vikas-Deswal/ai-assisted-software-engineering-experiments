# Results

Results will be recorded after all experimental conditions have been executed.

# Experiment 1 Results

## Condition A — Generate then Fix

Functional correctness: 2
Regression stability: 2
Implementation cleanliness: 1
UI adequacy: 1

Total score: 6 / 8

## Condition B — Structured Workflow

### Metrics

Total prompts: 4  
Correction prompts: 0  
Total time to working application: 5 minutes 40 seconds  
Compile success: Yes  
Regression count: 0

### Quality Evaluation

Functional correctness: 2 / 2  
Regression stability: 2 / 2  
Implementation cleanliness: 2 / 2  
UI adequacy: 2 / 2

Total score: **8 / 8**

### Observations

- Generated architecture was modular and followed common React patterns.
- Code was split into components, hooks, and utility modules.
- A reusable `useLocalStorage` hook was introduced for persistence.
- Task-related helper functions were extracted into a utility module.
- Architecture improved readability and separation of concerns compared to Condition A.

### Additional Features Observed

The generated UI included an additional feature displaying task completion progress:

"X tasks completed out of Y".

This feature was not explicitly requested in the original prompt but appeared in the structured workflow implementation.

### Documentation Artifacts Generated

The model produced three documentation files:

- todo-app-specification.md
- react-component-architecture.md
- implementation-comparison.md

The specification and architecture documents appear consistent with the structured prompting workflow. The comparison file was generated during the verification step.

### Interpretation

Compared with Condition A, the structured workflow produced:

- more modular architecture
- additional documentation artifacts
- slightly richer UI behavior

However, generation time increased significantly (approximately **5.5× slower** than Condition A).

Further experiments will evaluate whether this architectural structure reduces modification effort as the system evolves.