import { useState } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createTask, toggleTaskCompletion, deleteTask, editTask, clearCompletedTasks } from './utils/taskHelpers';

function App() {
  const [tasks, setTasks] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (text, dueDate) => {
    if (text.trim()) {
      setTasks([...tasks, createTask(text, dueDate)]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(toggleTaskCompletion(tasks, id));
  };

  const handleDeleteTask = (id) => {
    setTasks(deleteTask(tasks, id));
  };

  const handleEditTask = (id, newText) => {
    if (newText.trim()) {
      setTasks(editTask(tasks, id, newText));
    }
  };

  const handleClearCompleted = () => {
    setTasks(clearCompletedTasks(tasks));
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Header />
          <TodoInput onAddTask={handleAddTask} />
          <FilterButtons currentFilter={filter} onFilterChange={setFilter} onClearCompleted={handleClearCompleted} />
          <TodoList
            tasks={getFilteredTasks()}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
