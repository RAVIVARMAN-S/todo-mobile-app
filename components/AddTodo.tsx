import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 bg-card/95 backdrop-blur-sm rounded-lg border border-border/50 shadow-sm">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 text-base"
      />
      <Button 
        type="submit" 
        disabled={!text.trim()}
        className="min-w-12 h-12 p-0"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}