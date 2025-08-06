import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export function InstallBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <Card className="mx-4 mb-4 p-4 border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Smartphone className="h-5 w-5 text-primary-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm mb-1">Install Todo App</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Add to your home screen for quick access and offline use
          </p>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={installApp}
              className="h-8 px-3"
            >
              <Download className="h-3 w-3 mr-1" />
              Install
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setIsDismissed(true)}
              className="h-8 px-2"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}