import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { TodosPage } from './components/TodosPage';
import { AnalyticsPage } from './components/AnalyticsPage';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type PageType = 'home' | 'todos' | 'analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Welcome to your mobile todo app!',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2', 
      text: 'Try adding a new todo',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      text: 'Mark this todo as complete',
      completed: true,
      createdAt: new Date(),
    },
  ]);

  const navigateToTodos = () => setCurrentPage('todos');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToAnalytics = () => setCurrentPage('analytics');

  if (currentPage === 'home') {
    return (
      <HomePage 
        todos={todos}
        onNavigateToTodos={navigateToTodos}
        onNavigateToAnalytics={navigateToAnalytics}
      />
    );
  }

  if (currentPage === 'analytics') {
    return (
      <AnalyticsPage 
        todos={todos}
        onNavigateHome={navigateToHome}
      />
    );
  }

  return (
    <TodosPage 
      todos={todos}
      onUpdateTodos={setTodos}
      onNavigateHome={navigateToHome}
    />
  );
}