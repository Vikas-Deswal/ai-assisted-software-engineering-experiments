import TodoItem from './TodoItem';

function TodoList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
        />
      ))}
    </ul>
  );
}

export default TodoList;
