import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { soundManager } from '@/lib/sounds';

interface ControlsProps {
  onHit: () => void;
  onStand: () => void;
  onSplit: () => void;
  onFold: () => void;
  canSplit: boolean;
  disabled: boolean;
}

export function Controls({ onHit, onStand, onSplit, onFold, canSplit, disabled }: ControlsProps) {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  const toggleSound = () => {
    const enabled = soundManager.toggleSound();
    setSoundEnabled(enabled);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 justify-center">
        <Button
          onClick={onHit}
          disabled={disabled}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto font-medium"
        >
          Hit
        </Button>
        <Button
          onClick={onStand}
          disabled={disabled}
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto font-medium"
        >
          Stand
        </Button>
        {canSplit && (
          <Button
            onClick={onSplit}
            disabled={disabled}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto col-span-2 sm:col-span-1 font-medium"
          >
            Split
          </Button>
        )}
        <Button
          onClick={onFold}
          disabled={disabled}
          variant="destructive"
          size="lg"
          className="w-full sm:w-auto col-span-2 sm:col-span-1 font-medium"
        >
          Fold
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={toggleSound}
          variant="ghost"
          size="sm"
          className="flex gap-2 items-center text-sm"
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {soundEnabled ? 'Sound On' : 'Sound Off'}
        </Button>
      </div>
    </div>
  );
}