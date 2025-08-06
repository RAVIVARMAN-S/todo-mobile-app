import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Input } from './ui/input';

interface TodoItemMobileProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItemMobile({ id, text, completed, onToggle, onDelete, onEdit }: TodoItemMobileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeToDelete, setIsSwipeToDelete] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isEditing) return;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || isEditing) return;
    
    currentX.current = e.touches[0].clientX;
    const diff = startX.current - currentX.current;
    
    // Only allow swipe to left (positive diff)
    if (diff > 0) {
      const offset = Math.min(diff, 100);
      setSwipeOffset(offset);
      setIsSwipeToDelete(offset > 60);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || isEditing) return;
    
    isDragging.current = false;
    
    if (isSwipeToDelete && swipeOffset > 60) {
      onDelete(id);
    } else {
      // Reset position
      setSwipeOffset(0);
      setIsSwipeToDelete(false);
    }
  };

  // Add haptic feedback for supported devices
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (isSwipeToDelete) {
      triggerHapticFeedback();
    }
  }, [isSwipeToDelete]);

  return (
    <div 
      className="relative overflow-hidden rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-200"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Enhanced Delete background */}
      <div className={`absolute inset-0 bg-gradient-to-l from-destructive to-destructive/80 flex items-center justify-end pr-6 transition-opacity duration-200 ${
        swipeOffset > 0 ? 'opacity-100' : 'opacity-0'
      }`}>
        <Trash2 className={`h-6 w-6 text-white transition-transform duration-200 drop-shadow-md ${
          isSwipeToDelete ? 'scale-110' : 'scale-100'
        }`} />
      </div>

      {/* Enhanced Main content */}
      <div 
        ref={itemRef}
        className={`flex items-center gap-3 p-4 bg-card/98 backdrop-blur-md transition-all duration-200 ${
          isSwipeToDelete ? 'bg-destructive/10' : ''
        }`}
        style={{ transform: `translateX(-${swipeOffset}px)` }}
      >
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="min-w-5 min-h-5 touch-manipulation shadow-sm"
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="text-base bg-background/80 backdrop-blur-sm border-border/60"
              autoFocus
            />
          ) : (
            <p 
              className={`text-base break-words transition-all duration-200 ${
                completed ? 'line-through text-muted-foreground' : 'drop-shadow-sm'
              }`}
            >
              {text}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="min-w-11 h-11 p-0 touch-manipulation hover:bg-green-100 hover:text-green-700 transition-colors duration-200"
              >
                <Check className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="min-w-11 h-11 p-0 touch-manipulation hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="min-w-11 h-11 p-0 touch-manipulation hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                disabled={completed}
              >
                <Edit2 className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(id)}
                className="min-w-11 h-11 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 touch-manipulation transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Swipe hint */}
      {swipeOffset === 0 && !isEditing && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none transition-opacity duration-300">
          <div className="text-xs text-muted-foreground drop-shadow-sm">← Swipe</div>
        </div>
      )}
    </div>
  );
}