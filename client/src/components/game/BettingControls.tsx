import { Button } from '../ui/button';
import { Chip } from './Chip';
import { motion } from 'framer-motion';

const CHIPS = [5, 25, 100, 500];

interface BettingControlsProps {
  onPlaceBet: (amount: number) => void;
  onClearBet: () => void;
  onDeal: () => void;
  currentBet: number;
  balance: number;
  disabled: boolean;
}

export function BettingControls({
  onPlaceBet,
  onClearBet,
  onDeal,
  currentBet,
  balance,
  disabled
}: BettingControlsProps) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-2">
        {CHIPS.map((amount) => (
          <Chip
            key={amount}
            amount={amount}
            onClick={() => onPlaceBet(amount)}
            disabled={disabled || balance < amount}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={onClearBet}
          disabled={disabled || currentBet === 0}
          variant="destructive"
        >
          Clear
        </Button>
        <Button
          onClick={onDeal}
          disabled={disabled || currentBet === 0}
          variant="default"
        >
          Deal
        </Button>
      </div>
    </motion.div>
  );
}