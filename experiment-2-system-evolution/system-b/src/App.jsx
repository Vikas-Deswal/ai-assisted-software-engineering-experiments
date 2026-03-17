import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createTask, toggleTaskCompletion, deleteTask } from './utils/taskHelpers';

function App() {
  const [tasks, setTasks] = useLocalStorage('todos', []);

  const handleAddTask = (text) => {
    if (text.trim()) {
      setTasks([...tasks, createTask(text)]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(toggleTaskCompletion(tasks, id));
  };

  const handleDeleteTask = (id) => {
    setTasks(deleteTask(tasks, id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <Header />
          <TodoInput onAddTask={handleAddTask} />
          <TodoList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
