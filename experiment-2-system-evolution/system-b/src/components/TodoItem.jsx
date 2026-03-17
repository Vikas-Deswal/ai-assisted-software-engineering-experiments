function TodoItem({ task, onToggleComplete, onDelete }) {
  return (
    <li className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-gray-800 ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
