import { Button } from '@/components/ui/button';
import { Chip } from './Chip';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center justify-center gap-4 p-4 rounded-xl ring-2 ring-primary w-full mb-4">
        <AnimatePresence>
          {currentBet > 0 && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-xl font-bold"
            >
              ${currentBet}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {CHIPS.map((amount) => (
          <motion.div
            key={amount}
            whileHover={{ scale: 1.05 }}
            whileTap={{ 
              scale: 0.95,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
          >
            <Chip
              amount={amount}
              onClick={() => {
                onPlaceBet(amount);
              }}
              disabled={disabled || balance < amount}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 w-full max-w-xs justify-center">
        <Button
          onClick={onClearBet}
          disabled={disabled || currentBet === 0}
          variant="destructive"
          className="flex-1 text-sm md:text-base px-3 md:px-6"
        >
          Clear Bet
        </Button>
        <Button
          onClick={onDeal}
          disabled={disabled || currentBet === 0}
          variant="default"
          className="flex-1 text-sm md:text-base px-3 md:px-6"
        >
          Deal Cards
        </Button>
      </div>
    </motion.div>
  );
}