export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createTask = (text) => {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now()
  };
};

export const toggleTaskCompletion = (tasks, id) => {
  return tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
};

export const deleteTask = (tasks, id) => {
  return tasks.filter(task => task.id !== id);
};
