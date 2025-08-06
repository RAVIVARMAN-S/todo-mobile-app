interface TodoStatsProps {
  total: number;
  completed: number;
}

export function TodoStats({ total, completed }: TodoStatsProps) {
  const remaining = total - completed;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50">
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-2xl font-medium text-primary">{remaining}</p>
          <p className="text-sm text-muted-foreground">Remaining</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-primary">{completed}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-medium text-primary">{completionPercentage}%</p>
        <p className="text-sm text-muted-foreground">Progress</p>
      </div>
    </div>
  );
}