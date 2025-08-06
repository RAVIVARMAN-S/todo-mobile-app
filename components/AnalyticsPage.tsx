import { useMemo } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, TrendingUp, Target, Calendar, Award, Clock, CheckCircle2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface AnalyticsPageProps {
  todos: Todo[];
  onNavigateHome: () => void;
}

export function AnalyticsPage({ todos, onNavigateHome }: AnalyticsPageProps) {
  const analytics = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Weekly completion trend (mock data for demo)
    const weeklyData = [
      { day: 'Mon', completed: 3, created: 4 },
      { day: 'Tue', completed: 5, created: 3 },
      { day: 'Wed', completed: 2, created: 6 },
      { day: 'Thu', completed: 7, created: 5 },
      { day: 'Fri', completed: 4, created: 2 },
      { day: 'Sat', completed: 6, created: 4 },
      { day: 'Sun', completed: 3, created: 1 },
    ];

    // Calculate streaks
    const completedTodos = todos.filter(todo => todo.completed);
    const currentStreak = completedTodos.length > 0 ? 
      Math.min(7, completedTodos.length) : 0; // Simplified streak calculation

    // Productivity score (based on completion rate and consistency)
    const productivityScore = Math.round(
      (completionRate * 0.7) + (currentStreak * 4.3)
    );

    return {
      total,
      completed,
      active,
      completionRate,
      weeklyData,
      currentStreak,
      productivityScore: Math.min(100, productivityScore),
      averagePerDay: total > 0 ? Math.round((completed / 7) * 10) / 10 : 0,
    };
  }, [todos]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Primary background */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748439435495-722cc1728b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyYXBocyUyMGNoYXJ0cyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTQ0NTMxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Business analytics background"
          className="w-full h-full object-cover opacity-8"
        />
        {/* Secondary background for depth */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NDQ1Mjg1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Data analytics charts"
            className="w-full h-full object-cover opacity-4"
          />
        </div>
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/96 to-background/94" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/96 via-transparent to-background/92" />
        {/* Grid pattern for analytics feel */}
        <div className="absolute inset-0 opacity-4" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
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
              <h1 className="flex-1 text-center text-primary drop-shadow-sm">Analytics</h1>
              <div className="w-9" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-md mx-auto px-4 py-6 pb-20">
          {/* Enhanced Productivity Score */}
          <Card className="p-6 mb-6 bg-card/98 backdrop-blur-md border-primary/30 shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="text-center">
              <div className="w-28 h-28 mx-auto mb-4 relative">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted/30"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${analytics.productivityScore * 0.628} 62.8`}
                    className="text-primary"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(3, 2, 19, 0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl text-primary drop-shadow-sm">{analytics.productivityScore}</span>
                </div>
              </div>
              <h3 className="mb-2 drop-shadow-sm">Productivity Score</h3>
              <p className="text-sm text-muted-foreground">
                Based on completion rate and consistency
              </p>
            </div>
          </Card>

          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="p-4 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xl text-primary drop-shadow-sm">{analytics.completed}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl text-primary drop-shadow-sm">{analytics.active}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-xl text-primary drop-shadow-sm">{analytics.averagePerDay}</div>
                  <div className="text-xs text-muted-foreground">Per Day</div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-sm">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xl text-primary drop-shadow-sm">{analytics.currentStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Weekly Activity */}
          <Card className="p-6 mb-6 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="mb-4 flex items-center gap-2 drop-shadow-sm">
              <Calendar className="h-5 w-5" />
              Weekly Activity
            </h3>
            <div className="space-y-4">
              {analytics.weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center gap-3">
                  <div className="w-8 text-xs text-muted-foreground">{day.day}</div>
                  <div className="flex-1 flex gap-2">
                    {/* Completed bar */}
                    <div className="flex-1 h-7 bg-muted/60 rounded-md overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-md shadow-sm transition-all duration-500"
                        style={{ width: `${(day.completed / 8) * 100}%` }}
                      />
                    </div>
                    {/* Created bar */}
                    <div className="flex-1 h-7 bg-muted/60 rounded-md overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-md shadow-sm transition-all duration-500"
                        style={{ width: `${(day.created / 8) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground w-8 text-right">
                    {day.completed}/{day.created}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/60">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded-sm shadow-sm" />
                <span className="text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-sm shadow-sm" />
                <span className="text-muted-foreground">Created</span>
              </div>
            </div>
          </Card>

          {/* Enhanced Completion Rate */}
          <Card className="p-6 mb-6 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="mb-4 flex items-center gap-2 drop-shadow-sm">
              <TrendingUp className="h-5 w-5" />
              Completion Rate
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Overall</span>
                <span className="text-sm drop-shadow-sm">{analytics.completionRate}%</span>
              </div>
              <div className="w-full h-3 bg-muted/60 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 shadow-sm"
                  style={{ width: `${analytics.completionRate}%` }}
                />
              </div>
            </div>

            {analytics.completionRate === 100 && analytics.total > 0 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50/90 to-green-100/80 rounded-lg border border-green-200/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-green-800">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">Perfect completion rate! 🎉</span>
                </div>
              </div>
            )}
          </Card>

          {/* Enhanced Goals & Achievements */}
          <Card className="p-6 bg-card/98 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="mb-4 flex items-center gap-2 drop-shadow-sm">
              <Award className="h-5 w-5" />
              Achievements
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                analytics.completed >= 1 ? 'bg-gradient-to-r from-green-50/90 to-green-100/80 border border-green-200/80' : 'bg-muted/50'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
                  analytics.completed >= 1 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-muted'
                }`}>
                  {analytics.completed >= 1 ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <Target className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm drop-shadow-sm">First Todo Completed</div>
                  <div className="text-xs text-muted-foreground">Complete your first todo</div>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                analytics.completed >= 5 ? 'bg-gradient-to-r from-green-50/90 to-green-100/80 border border-green-200/80' : 'bg-muted/50'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
                  analytics.completed >= 5 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-muted'
                }`}>
                  {analytics.completed >= 5 ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <Target className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm drop-shadow-sm">Getting Started</div>
                  <div className="text-xs text-muted-foreground">Complete 5 todos</div>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                analytics.currentStreak >= 3 ? 'bg-gradient-to-r from-green-50/90 to-green-100/80 border border-green-200/80' : 'bg-muted/50'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 ${
                  analytics.currentStreak >= 3 ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-muted'
                }`}>
                  {analytics.currentStreak >= 3 ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <Target className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm drop-shadow-sm">Consistency Master</div>
                  <div className="text-xs text-muted-foreground">3-day completion streak</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}