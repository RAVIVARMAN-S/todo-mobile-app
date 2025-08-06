import { useState } from 'react';
import { AddTodo } from './AddTodo';
import { TodoItemMobile } from './TodoItemMobile';
import { TodoStats } from './TodoStats';
import { InstallBanner } from './InstallBanner';
import { OfflineIndicator } from './OfflineIndicator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { CheckCircle, Circle, Trash2, ArrowLeft } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodosPageProps {
  todos: Todo[];
  onUpdateTodos: (todos: Todo[]) => void;
  onNavigateHome: () => void;
}

export function TodosPage({ todos, onUpdateTodos, onNavigateHome }: TodosPageProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    onUpdateTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    onUpdateTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    onUpdateTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    onUpdateTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    onUpdateTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <OfflineIndicator />
      
      {/* Enhanced Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Primary background */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743796055651-41c743ff2465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RlYm9vayUyMGpvdXJuYWwlMjB3cml0aW5nJTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc1NDQ1MzEzNXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Notebook journal background"
          className="w-full h-full object-cover opacity-7"
        />
        {/* Secondary background for texture */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709487229575-769eea1b8c8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6ZWQlMjBwbGFubmluZyUyMG5vdGVib29rJTIwY2xlYW58ZW58MXx8fHwxNzU0NDUyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Organized planning background"
            className="w-full h-full object-cover opacity-4"
          />
        </div>
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/96 to-background/94" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/96 via-transparent to-background/92" />
        {/* Paper texture pattern */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(0,0,0,0.05) 25px, rgba(0,0,0,0.05) 26px)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="sticky top-0 z-20 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/60 shadow-sm">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateHome}
                className="p-2 touch-manipulation hover:bg-accent/80 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="flex-1 text-center text-primary drop-shadow-sm">My Todos</h1>
              <div className="w-9" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Install Banner */}
        <div className="pt-4">
          <InstallBanner />
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 pb-20">
          {/* Add Todo */}
          <div className="mb-6">
            <AddTodo onAdd={addTodo} />
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mb-6">
              <TodoStats total={todos.length} completed={completedCount} />
            </div>
          )}

          {/* Enhanced Filter Buttons */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={`flex-1 touch-manipulation transition-all duration-200 ${
                filter === 'all' 
                  ? 'shadow-md bg-gradient-to-r from-primary to-primary/90' 
                  : 'bg-card/98 backdrop-blur-md border-border/50 hover:shadow-sm'
              }`}
            >
              <Circle className="h-4 w-4 mr-2" />
              All ({todos.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
              className={`flex-1 touch-manipulation transition-all duration-200 ${
                filter === 'active' 
                  ? 'shadow-md bg-gradient-to-r from-primary to-primary/90' 
                  : 'bg-card/98 backdrop-blur-md border-border/50 hover:shadow-sm'
              }`}
            >
              <Circle className="h-4 w-4 mr-2" />
              Active ({todos.length - completedCount})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className={`flex-1 touch-manipulation transition-all duration-200 ${
                filter === 'completed' 
                  ? 'shadow-md bg-gradient-to-r from-primary to-primary/90' 
                  : 'bg-card/98 backdrop-blur-md border-border/50 hover:shadow-sm'
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Done ({completedCount})
            </Button>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/80 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Circle className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground drop-shadow-sm">
                  {filter === 'all' 
                    ? "No todos yet. Add one above!" 
                    : filter === 'active'
                    ? "No active todos. Great job!"
                    : "No completed todos yet."
                  }
                </p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItemMobile
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>

          {/* Enhanced Clear Completed */}
          {completedCount > 0 && (
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={clearCompleted}
                className="w-full touch-manipulation bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Completed ({completedCount})
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}