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

export const sortTasks = (tasks) => {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
};
