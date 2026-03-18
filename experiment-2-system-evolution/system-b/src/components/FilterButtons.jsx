function FilterButtons({ currentFilter, onFilterChange, onClearCompleted }) {
  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-2 mb-6 justify-center flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentFilter === filter.id
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
      <button
        onClick={onClearCompleted}
        className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all"
      >
        Clear Completed
      </button>
    </div>
  );
}

export default FilterButtons;