import { useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createTask } from './utils/taskUtils';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('todos', []);

  const addTask = useCallback((text) => {
    const newTask = createTask(text);
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <Header taskCount={tasks.length} completedCount={completedCount} />
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
