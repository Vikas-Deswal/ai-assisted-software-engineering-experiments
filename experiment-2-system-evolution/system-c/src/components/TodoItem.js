import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, deleteTodo, toggleComplete }) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
          {todo.text}
        </span>
      </div>
      <button
        className="delete-button"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
