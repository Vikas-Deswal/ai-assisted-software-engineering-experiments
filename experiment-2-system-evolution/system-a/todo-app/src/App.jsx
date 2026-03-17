import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('todos')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('todos', JSON.stringify(tasks))
    }
  }, [tasks, isInitialized])

  const addTask = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const saveEdit = (id) => {
    if (editValue.trim() === '') return
    
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editValue } : task
    ))
    setEditingId(null)
    setEditValue('')
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>
        
        <form onSubmit={addTask} className="add-task-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-item">
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                        className="task-checkbox"
                      />
                      <span className={task.completed ? 'task-text completed' : 'task-text'}>
                        {task.text}
                      </span>
                    </div>
                    <div className="task-buttons">
                      <button
                        onClick={() => startEdit(task.id, task.text)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="task-summary">
            {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
          </div>
        )}
      </div>
    </div>
  )
}

export default App
