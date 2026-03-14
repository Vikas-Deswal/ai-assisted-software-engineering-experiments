# React Component Architecture - Todo Web App

## Component Hierarchy

```
App
├── Header
├── TaskInput
└── TaskList
    ├── EmptyState
    └── TaskItem (multiple instances)
```

---

## Component Specifications

### 1. App (Root Component)

**Responsibility**: Application state management and orchestration

**State**:
```javascript
const [tasks, setTasks] = useState([])
```

**Effects**:
- Load tasks from localStorage on mount
- Save tasks to localStorage on state change

**Props**: None (root component)

**Methods**:
```javascript
addTask(text: string): void
deleteTask(id: string): void
toggleTask(id: string): void
```

**File**: `App.jsx` or `App.tsx`

```jsx
function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Load from localStorage
  }, []);
  
  useEffect(() => {
    // Save to localStorage
  }, [tasks]);
  
  const addTask = (text) => { /* ... */ };
  const deleteTask = (id) => { /* ... */ };
  const toggleTask = (id) => { /* ... */ };
  
  return (
    <div className="app">
      <Header taskCount={tasks.length} />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
```

---

### 2. Header Component

**Responsibility**: Display application title and task statistics

**Props**:
```javascript
{
  taskCount?: number,
  completedCount?: number
}
```

**State**: None (stateless/presentational)

**File**: `components/Header.jsx`

```jsx
function Header({ taskCount = 0, completedCount = 0 }) {
  return (
    <header className="header">
      <h1>Todo Application</h1>
      <div className="task-stats">
        {taskCount > 0 && (
          <span>{completedCount} / {taskCount} completed</span>
        )}
      </div>
    </header>
  );
}
```

---

### 3. TaskInput Component

**Responsibility**: Handle new task creation

**Props**:
```javascript
{
  onAddTask: (text: string) => void
}
```

**State**:
```javascript
const [inputValue, setInputValue] = useState('')
```

**Methods**:
```javascript
handleSubmit(e: Event): void
handleChange(e: Event): void
```

**Validation**:
- Trim whitespace
- Prevent empty submissions
- Clear input after successful submission

**File**: `components/TaskInput.jsx`

```jsx
function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue) {
      onAddTask(trimmedValue);
      setInputValue('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />
      <button type="submit" disabled={!inputValue.trim()}>
        Add
      </button>
    </form>
  );
}
```

---

### 4. TaskList Component

**Responsibility**: Render list of tasks or empty state

**Props**:
```javascript
{
  tasks: Task[],
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}
```

**State**: None (stateless/presentational)

**Conditional Rendering**:
- Show `EmptyState` when `tasks.length === 0`
- Show list of `TaskItem` components otherwise

**File**: `components/TaskList.jsx`

```jsx
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }
  
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
```

---

### 5. TaskItem Component

**Responsibility**: Display individual task with interactions

**Props**:
```javascript
{
  task: {
    id: string,
    text: string,
    completed: boolean
  },
  onToggle: (id: string) => void,
  onDelete: (id: string) => void
}
```

**State**: None (stateless/presentational)

**Events**:
- Checkbox change → `onToggle(task.id)`
- Delete button click → `onDelete(task.id)`

**Styling**:
- Apply strike-through class when `task.completed === true`

**File**: `components/TaskItem.jsx`

```jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <span className="task-text">{task.text}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label={`Delete "${task.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
```

---

### 6. EmptyState Component

**Responsibility**: Display message when no tasks exist

**Props**: None

**State**: None (stateless/presentational)

**File**: `components/EmptyState.jsx`

```jsx
function EmptyState() {
  return (
    <div className="empty-state">
      <p>No tasks yet. Add one to get started!</p>
    </div>
  );
}
```

---

## Custom Hooks (Optional)

### useLocalStorage Hook

**Responsibility**: Encapsulate localStorage logic

**File**: `hooks/useLocalStorage.js`

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
```

**Usage in App**:
```javascript
const [tasks, setTasks] = useLocalStorage('todos', []);
```

---

## File Structure

```
src/
├── App.jsx                 # Root component
├── App.css                 # Global styles
├── index.jsx               # Entry point
├── components/
│   ├── Header.jsx
│   ├── TaskInput.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   └── EmptyState.jsx
├── hooks/
│   └── useLocalStorage.js
└── utils/
    └── taskUtils.js        # Helper functions (ID generation, etc.)
```

---

## Data Flow

### Adding a Task
```
TaskInput (user types & submits)
    ↓
onAddTask callback
    ↓
App.addTask() method
    ↓
Update tasks state
    ↓
useEffect triggers localStorage save
    ↓
Re-render TaskList with new task
```

### Toggling a Task
```
TaskItem (user clicks checkbox)
    ↓
onToggle callback with task.id
    ↓
App.toggleTask() method
    ↓
Update tasks state (toggle completed)
    ↓
useEffect triggers localStorage save
    ↓
Re-render TaskItem with updated state
```

### Deleting a Task
```
TaskItem (user clicks delete)
    ↓
onDelete callback with task.id
    ↓
App.deleteTask() method
    ↓
Update tasks state (filter out task)
    ↓
useEffect triggers localStorage save
    ↓
Re-render TaskList without deleted task
```

---

## State Management Strategy

### Approach: Lift State Up (React Built-in)

**Rationale**:
- Simple application with shallow component tree
- Single source of truth in App component
- Props drilling is minimal (max 2 levels)

**Alternative for Scaling**:
If the app grows, consider:
- **Context API**: For avoiding props drilling
- **Redux/Zustand**: For complex state logic
- **React Query**: If adding server sync

---

## Component Communication

### Parent → Child (Props)
- App passes data and callbacks to children
- Unidirectional data flow

### Child → Parent (Callbacks)
- Children call parent methods via props
- Events bubble up through callbacks

### Sibling Communication
- Not needed (all communication through App)

---

## Utility Functions

### taskUtils.js

```javascript
// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create new task object
export const createTask = (text) => {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now()
  };
};

// Sort tasks (newest first)
export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
};
```

---

## TypeScript Types (Optional)

### types.ts

```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface HeaderProps {
  taskCount?: number;
  completedCount?: number;
}
```

---

## Testing Strategy

### Component Tests

**TaskInput**:
- Renders input and button
- Validates empty input
- Calls onAddTask with trimmed text
- Clears input after submission

**TaskItem**:
- Renders task text
- Shows correct checkbox state
- Calls onToggle when checkbox clicked
- Calls onDelete when delete clicked

**TaskList**:
- Shows EmptyState when no tasks
- Renders correct number of TaskItems
- Passes props correctly to children

**App**:
- Loads tasks from localStorage on mount
- Saves tasks to localStorage on change
- Adds task correctly
- Deletes task correctly
- Toggles task correctly

---

## Performance Considerations

### Optimization Techniques

1. **React.memo** for TaskItem
   - Prevent re-renders when other tasks change
   
2. **useCallback** for handlers in App
   - Stable function references for memoized children
   
3. **Key prop** on TaskItem
   - Use task.id for efficient list reconciliation

### Example with Optimization

```jsx
// App.jsx
const addTask = useCallback((text) => {
  const newTask = createTask(text);
  setTasks(prev => [newTask, ...prev]);
}, []);

// TaskItem.jsx
export default React.memo(TaskItem);
```

---

## Accessibility Features

- Semantic HTML (`<header>`, `<form>`, `<ul>`, `<li>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Sufficient color contrast

---

## Summary

**Component Count**: 6 components + 1 custom hook

**Stateful Components**: 2 (App, TaskInput)

**Stateless Components**: 4 (Header, TaskList, TaskItem, EmptyState)

**Data Flow**: Unidirectional (top-down)

**State Management**: Lifted state in App component

**Persistence**: localStorage via custom hook
