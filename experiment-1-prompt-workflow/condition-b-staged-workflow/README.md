# Todo Web Application

A simple, elegant todo application built with React and Vite.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Persistent storage using localStorage
- ✅ Responsive design
- ✅ Modern UI with gradient styling

## Project Structure

```
src/
├── App.jsx                 # Root component with state management
├── App.css                 # Global styles
├── index.jsx               # Application entry point
├── components/
│   ├── Header.jsx          # App header with task statistics
│   ├── TaskInput.jsx       # Input form for adding tasks
│   ├── TaskList.jsx        # List container for tasks
│   ├── TaskItem.jsx        # Individual task component
│   └── EmptyState.jsx      # Empty state message
├── hooks/
│   └── useLocalStorage.js  # Custom hook for localStorage
└── utils/
    └── taskUtils.js        # Utility functions for task operations
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Architecture

### Component Hierarchy

```
App (stateful root)
├── Header (presentational)
├── TaskInput (stateful)
└── TaskList (presentational)
    ├── EmptyState (presentational)
    └── TaskItem (presentational, multiple)
```

### State Management

- **Lifted State Pattern**: All task state managed in the App component
- **Custom Hook**: `useLocalStorage` for automatic persistence
- **Unidirectional Data Flow**: Props down, callbacks up

### Data Model

```javascript
{
  id: string,           // Unique identifier
  text: string,         // Task description
  completed: boolean,   // Completion status
  createdAt: number    // Timestamp
}
```

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **localStorage** - Client-side persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
