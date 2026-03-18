import React from 'react';
import './TodoFilter.css';

function TodoFilter({ currentFilter, setFilter }) {
  return (
    <div className="todo-filter">
      <button
        className={currentFilter === 'all' ? 'filter-button active' : 'filter-button'}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={currentFilter === 'pending' ? 'filter-button active' : 'filter-button'}
        onClick={() => setFilter('pending')}
      >
        Pending
      </button>
      <button
        className={currentFilter === 'completed' ? 'filter-button active' : 'filter-button'}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
