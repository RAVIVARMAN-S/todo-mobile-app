import { Button } from './ui/button';
import { Card } from './ui/card';
import { InstallBanner } from './InstallBanner';
import { OfflineIndicator } from './OfflineIndicator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CheckCircle, Plus, Target, TrendingUp, BarChart3 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface HomePageProps {
  todos: Todo[];
  onNavigateToTodos: () => void;
  onNavigateToAnalytics: () => void;
}

export function HomePage({ todos, onNavigateToTodos, onNavigateToAnalytics }: HomePageProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Get recent todos (last 3)
  const recentTodos = todos
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <OfflineIndicator />
      
      {/* Multiple Background Images for Visual Interest */}
      <div className="absolute inset-0 z-0">
        {/* Primary background */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1625461291092-13d0c45608b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBkZXNrJTIwY2xlYW4lMjBtaW5pbWFsfGVufDF8fHx8MTc1NDQ1MzEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern workspace background"
          className="w-full h-full object-cover opacity-8"
        />
        {/* Secondary background for depth */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1618424562492-f778e25652a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwbGFwdG9wJTIwY29mZmVlfGVufDF8fHx8MTc1NDQ1MzE0NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Minimalist workspace"
            className="w-full h-full object-cover opacity-3"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/90" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with enhanced gradient */}
        <div className="bg-gradient-to-br from-primary/8 via-primary/5 to-primary/12 pb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent" />
          <div className="max-w-md mx-auto px-4 pt-12 pb-6 relative">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                <CheckCircle className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-primary mb-2 drop-shadow-sm">Welcome Back!</h1>
              <p className="text-muted-foreground">Let's make today productive</p>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="p-4 text-center bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="text-2xl text-primary mb-1 drop-shadow-sm">{totalTodos}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </Card>
              <Card className="p-4 text-center bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="text-2xl text-primary mb-1 drop-shadow-sm">{activeTodos}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </Card>
              <Card className="p-4 text-center bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="text-2xl text-primary mb-1 drop-shadow-sm">{completionRate}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </Card>
            </div>

            {/* Enhanced Progress Ring */}
            {totalTodos > 0 && (
              <Card className="p-6 text-center mb-6 bg-card/98 backdrop-blur-md border-border/50 shadow-sm">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-muted/40"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${completionRate * 0.628} 62.8`}
                      className="text-primary drop-shadow-sm"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(3, 2, 19, 0.3))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl text-primary drop-shadow-sm">{completionRate}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Today's Progress</p>
              </Card>
            )}
          </div>
        </div>

        {/* Install Banner */}
        <div className="pt-4">
          <InstallBanner />
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto px-4 pb-6">
          {/* Recent Todos */}
          {recentTodos.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 drop-shadow-sm">
                <Target className="h-5 w-5" />
                Recent Todos
              </h3>
              <div className="space-y-3 mb-4">
                {recentTodos.map(todo => (
                  <Card key={todo.id} className="p-3 bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shadow-sm ${todo.completed ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <p className={`flex-1 text-sm ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.text}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onNavigateToTodos}
              className="w-full h-14 text-base touch-manipulation shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary to-primary/90"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {totalTodos > 0 ? 'Manage Todos' : 'Get Started'}
            </Button>

            {totalTodos > 0 && (
              <Button 
                onClick={onNavigateToAnalytics}
                variant="outline"
                className="w-full h-14 text-base touch-manipulation bg-card/98 backdrop-blur-md border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Analytics
              </Button>
            )}

            {totalTodos === 0 && (
              <Card className="p-6 text-center bg-card/98 backdrop-blur-md border-border/50 shadow-sm">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4 drop-shadow-sm" />
                <h3 className="mb-2">No todos yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by creating your first todo to stay organized and productive.
                </p>
              </Card>
            )}

            {completionRate === 100 && totalTodos > 0 && (
              <Card className="p-6 text-center bg-gradient-to-br from-green-50/98 to-green-100/95 border-green-200/80 backdrop-blur-md shadow-sm">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4 drop-shadow-sm" />
                <h3 className="text-green-800 mb-2">All Done! 🎉</h3>
                <p className="text-sm text-green-700">
                  Congratulations! You've completed all your todos. Take a moment to celebrate your productivity.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}