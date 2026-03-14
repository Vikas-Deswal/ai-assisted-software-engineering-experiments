export function Header({ taskCount = 0, completedCount = 0 }) {
  return (
    <header className="header">
      <h1>Todo Application</h1>
      {taskCount > 0 && (
        <div className="task-stats">
          <span>{completedCount} / {taskCount} completed</span>
        </div>
      )}
    </header>
  );
}
