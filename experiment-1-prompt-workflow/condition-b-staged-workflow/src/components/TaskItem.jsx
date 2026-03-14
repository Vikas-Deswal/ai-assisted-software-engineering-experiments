import React from 'react';

export const TaskItem = React.memo(function TaskItem({ task, onToggle, onDelete }) {
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
});
