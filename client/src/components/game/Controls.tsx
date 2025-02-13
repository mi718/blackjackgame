import { Button } from '../ui/button';

interface ControlsProps {
  onHit: () => void;
  onStand: () => void;
  onSplit: () => void;
  onFold: () => void;
  canSplit: boolean;
  disabled: boolean;
}

export function Controls({ onHit, onStand, onSplit, onFold, canSplit, disabled }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <Button
        onClick={onHit}
        disabled={disabled}
        variant="secondary"
        size="lg"
      >
        Hit
      </Button>
      <Button
        onClick={onStand}
        disabled={disabled}
        variant="secondary"
        size="lg"
      >
        Stand
      </Button>
      {canSplit && (
        <Button
          onClick={onSplit}
          disabled={disabled}
          variant="secondary"
          size="lg"
        >
          Split
        </Button>
      )}
      <Button
        onClick={onFold}
        disabled={disabled}
        variant="destructive"
        size="lg"
      >
        Fold
      </Button>
    </div>
  );
}