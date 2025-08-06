import { usePWA } from '../hooks/usePWA';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-sm">
        <WifiOff className="h-4 w-4" />
        <span>You're offline. Changes will sync when you're back online.</span>
      </div>
    </div>
  );
}