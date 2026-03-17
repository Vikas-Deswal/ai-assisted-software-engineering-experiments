# Todo App - React Component Architecture

## Component Hierarchy

```
App
├── Header
├── TodoInput
└── TodoList
    └── TodoItem (multiple instances)
```

## Component Specifications

### 1. App Component
**Type**: Container/Smart Component  
**Responsibility**: Application state management and orchestration

**State**:
```javascript
const [tasks, setTasks] = useState([])
```

**Effects**:
- Load tasks from localStorage on mount
- Save tasks to localStorage on state change

**Props Passed Down**:
- To `TodoInput`: `onAddTask` handler
- To `TodoList`: `tasks` array, `onToggleComplete` handler, `onDeleteTask` handler

**File**: `src/App.jsx`

```javascript
// State management
- tasks: Task[]

// Methods
- handleAddTask(text: string): void
- handleToggleComplete(id: string): void
- handleDeleteTask(id: string): void
- loadTasksFromStorage(): void
- saveTasksToStorage(tasks: Task[]): void
```

---

### 2. Header Component
**Type**: Presentational Component  
**Responsibility**: Display application title

**Props**: None (or optional `title` prop)

**File**: `src/components/Header.jsx`

```javascript
// Simple presentational component
// Renders application title/branding
```

---

### 3. TodoInput Component
**Type**: Controlled Component  
**Responsibility**: Handle new task input and submission

**Local State**:
```javascript
const [inputValue, setInputValue] = useState('')
```

**Props**:
```javascript
{
  onAddTask: (text: string) => void
}
```

**Methods**:
- `handleInputChange(e)`: Update local input state
- `handleSubmit(e)`: Validate and call `onAddTask`, clear input
- `handleKeyPress(e)`: Submit on Enter key

**File**: `src/components/TodoInput.jsx`

---

### 4. TodoList Component
**Type**: Presentational Component  
**Responsibility**: Render list of tasks

**Props**:
```javascript
{
  tasks: Task[],
  onToggleComplete: (id: string) => void,
  onDeleteTask: (id: string) => void
}
```

**Rendering Logic**:
- Map over tasks array
- Render `TodoItem` for each task
- Show empty state message if no tasks

**File**: `src/components/TodoList.jsx`

---

### 5. TodoItem Component
**Type**: Presentational Component  
**Responsibility**: Display individual task with interactions

**Props**:
```javascript
{
  task: {
    id: string,
    text: string,
    completed: boolean,
    createdAt: number
  },
  onToggleComplete: (id: string) => void,
  onDelete: (id: string) => void
}
```

**Rendering**:
- Checkbox bound to `completed` status
- Task text with conditional styling (strikethrough if completed)
- Delete button

**File**: `src/components/TodoItem.jsx`

---

## Data Flow

### Adding a Task
```
TodoInput (user types) 
  → TodoInput (local state update)
  → TodoInput (submit/Enter)
  → App.handleAddTask()
  → App (update tasks state)
  → App (save to localStorage)
  → TodoList (receives new tasks)
  → TodoItem (new item rendered)
```

### Toggling Complete
```
TodoItem (checkbox clicked)
  → App.handleToggleComplete(id)
  → App (update tasks state)
  → App (save to localStorage)
  → TodoList (receives updated tasks)
  → TodoItem (re-renders with new completed status)
```

### Deleting a Task
```
TodoItem (delete button clicked)
  → App.handleDeleteTask(id)
  → App (update tasks state)
  → App (save to localStorage)
  → TodoList (receives updated tasks)
  → TodoItem (removed from DOM)
```

---

## State Management Strategy

### Option 1: Local State (Recommended for this app)
- Use `useState` in App component
- Props drilling for handlers
- Simple and sufficient for small app

### Option 2: Context API (Alternative)
- Create `TodoContext`
- Avoid props drilling
- Useful if app grows in complexity

```javascript
// TodoContext.jsx
const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  // ... methods
  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask }}>
      {children}
    </TodoContext.Provider>
  )
}
```

---

## Custom Hooks

### useLocalStorage Hook
**Purpose**: Abstract localStorage logic

```javascript
// src/hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
```

**Usage in App**:
```javascript
const [tasks, setTasks] = useLocalStorage('todos', [])
```

---

## File Structure

```
src/
├── App.jsx                 # Main app component
├── App.css                 # App styles
├── main.jsx               # Entry point
├── components/
│   ├── Header.jsx
│   ├── TodoInput.jsx
│   ├── TodoInput.css
│   ├── TodoList.jsx
│   ├── TodoList.css
│   ├── TodoItem.jsx
│   └── TodoItem.css
├── hooks/
│   └── useLocalStorage.js
└── utils/
    └── taskHelpers.js     # Helper functions (generateId, etc.)
```

---

## Helper Functions

### taskHelpers.js
```javascript
// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Create new task object
export const createTask = (text) => {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now()
  }
}

// Toggle task completion
export const toggleTaskCompletion = (tasks, id) => {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
}

// Delete task
export const deleteTask = (tasks, id) => {
  return tasks.filter(task => task.id !== id)
}
```

---

## Component Implementation Examples

### App.jsx (Simplified)
```javascript
import { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { createTask, toggleTaskCompletion, deleteTask } from './utils/taskHelpers'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) setTasks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, createTask(text)])
    }
  }

  const handleToggleComplete = (id) => {
    setTasks(toggleTaskCompletion(tasks, id))
  }

  const handleDeleteTask = (id) => {
    setTasks(deleteTask(tasks, id))
  }

  return (
    <div className="app">
      <Header />
      <TodoInput onAddTask={handleAddTask} />
      <TodoList 
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  )
}

export default App
```

### TodoInput.jsx
```javascript
import { useState } from 'react'

function TodoInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddTask(inputValue)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoInput
```

### TodoList.jsx
```javascript
import TodoItem from './TodoItem'

function TodoList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above!</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  )
}

export default TodoList
```

### TodoItem.jsx
```javascript
function TodoItem({ task, onToggleComplete, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  )
}

export default TodoItem
```

---

## Styling Approach

### Option 1: CSS Modules
- Scoped styles per component
- `TodoItem.module.css`

### Option 2: Styled Components
- CSS-in-JS solution
- Component-level styling

### Option 3: Tailwind CSS (Recommended)
- Utility-first CSS
- Rapid development
- Modern UI with minimal custom CSS

---

## Testing Strategy

### Unit Tests
- **TodoInput**: Test input handling, submission, validation
- **TodoItem**: Test checkbox toggle, delete button
- **Helper functions**: Test task creation, toggling, deletion

### Integration Tests
- **App**: Test full add/delete/toggle workflows
- **localStorage**: Test persistence and loading

### Tools
- Vitest or Jest
- React Testing Library
- Mock localStorage

---

## Performance Considerations

1. **Memoization**: Use `React.memo` for TodoItem if list grows large
2. **Callback Stability**: Use `useCallback` for handlers passed to children
3. **Key Props**: Use stable IDs (not array index) for list items
4. **Lazy Loading**: Not needed for this simple app

---

## Accessibility

- Semantic HTML (`<form>`, `<button>`, `<ul>`, `<li>`)
- Proper labels for inputs
- Keyboard navigation support
- ARIA attributes where needed
- Focus management

---

## Future Enhancements (Scalability)

- Filter tasks (all/active/completed)
- Edit task text
- Task categories/tags
- Due dates
- Drag and drop reordering
- Backend sync
- Multiple lists
