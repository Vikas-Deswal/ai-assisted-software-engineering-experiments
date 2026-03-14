# Todo Web App - Specification

## UI Structure

### Main Layout
```
┌─────────────────────────────────────┐
│         Todo Application            │
├─────────────────────────────────────┤
│  [Add Task Input Field]  [Add Btn]  │
├─────────────────────────────────────┤
│  Task List Container                │
│  ┌───────────────────────────────┐  │
│  │ ☐ Task 1          [Delete]   │  │
│  │ ☑ Task 2          [Delete]   │  │
│  │ ☐ Task 3          [Delete]   │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Components

#### 1. Header
- Application title/logo
- Optional task count display

#### 2. Task Input Section
- **Input Field**: Text input for new task description
- **Add Button**: Submit button to create new task
- **Validation**: Prevent empty task submission

#### 3. Task List Section
- **Task Items**: List of all tasks (scrollable if needed)
- **Empty State**: Message when no tasks exist

#### 4. Task Item
- **Checkbox**: Toggle completion status
- **Task Text**: Display task description
  - Strike-through styling when completed
  - Normal styling when incomplete
- **Delete Button**: Remove task from list

---

## Data Model

### Task Object
```javascript
{
  id: string | number,        // Unique identifier (timestamp or UUID)
  text: string,               // Task description
  completed: boolean,         // Completion status
  createdAt: number          // Timestamp (optional, for sorting)
}
```

### Application State
```javascript
{
  tasks: Task[]              // Array of task objects
}
```

### Local Storage Schema
```javascript
// Key: "todos" or "todoApp"
// Value: JSON stringified array of tasks
localStorage.setItem("todos", JSON.stringify(tasks))
```

---

## Interactions

### 1. Add Task
**Trigger**: User clicks "Add" button or presses Enter in input field

**Flow**:
1. Validate input is not empty/whitespace
2. Create new task object with unique ID
3. Add task to tasks array
4. Save updated tasks to localStorage
5. Clear input field
6. Update UI to display new task

**Validation**:
- Trim whitespace from input
- Reject empty strings
- Optional: Character limit (e.g., 200 chars)

---

### 2. Delete Task
**Trigger**: User clicks delete button on a task

**Flow**:
1. Identify task by ID
2. Remove task from tasks array
3. Save updated tasks to localStorage
4. Update UI to remove task element
5. Optional: Show confirmation dialog for safety

---

### 3. Mark Task Complete/Incomplete
**Trigger**: User clicks checkbox on a task

**Flow**:
1. Identify task by ID
2. Toggle `completed` boolean value
3. Save updated tasks to localStorage
4. Update UI to reflect completion state
   - Add/remove strike-through styling
   - Update checkbox visual state

---

### 4. Load Tasks on Page Load
**Trigger**: Application initialization

**Flow**:
1. Retrieve tasks from localStorage
2. Parse JSON data
3. Handle missing/corrupted data gracefully
4. Render tasks in UI
5. If no data exists, initialize empty array

---

## Application States

### 1. Initial/Empty State
- **Condition**: No tasks exist
- **UI Display**:
  - Empty task list
  - Message: "No tasks yet. Add one to get started!"
  - Input field and add button enabled

### 2. Active State
- **Condition**: One or more tasks exist
- **UI Display**:
  - Task list visible with all tasks
  - All interactions enabled
  - Tasks sorted by creation time (newest first or oldest first)

### 3. All Tasks Completed State
- **Condition**: All tasks have `completed: true`
- **UI Display**:
  - All tasks shown with strike-through
  - Optional: Congratulatory message
  - Optional: "Clear completed" button

### 4. Input Focus State
- **Condition**: User is typing in input field
- **UI Display**:
  - Input field highlighted/focused
  - Add button may change appearance when input is valid

### 5. Error State
- **Condition**: localStorage unavailable or corrupted data
- **UI Display**:
  - Error message to user
  - Fallback to in-memory storage
  - Tasks work but won't persist

---

## Technical Considerations

### LocalStorage
- **Key**: `"todos"`
- **Max Size**: ~5-10MB (browser dependent)
- **Data Format**: JSON string
- **Error Handling**: Try-catch for quota exceeded or unavailable

### Task ID Generation
**Options**:
- Timestamp: `Date.now()`
- UUID: `crypto.randomUUID()` or library
- Incremental: Counter-based (less reliable)

### Sorting/Filtering (Optional Extensions)
- Sort by: creation date, completion status, alphabetical
- Filter by: all, active, completed

### Accessibility
- Semantic HTML elements
- ARIA labels for buttons and checkboxes
- Keyboard navigation support
- Focus management

---

## User Flow Summary

```
1. User opens app
   ↓
2. App loads tasks from localStorage
   ↓
3. Tasks displayed in list
   ↓
4. User can:
   - Add new task → Task appears in list
   - Click checkbox → Task marked complete/incomplete
   - Click delete → Task removed from list
   ↓
5. All changes automatically saved to localStorage
   ↓
6. User closes/refreshes app
   ↓
7. Tasks persist and reload on next visit
```
