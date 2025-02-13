import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ChipProps {
  amount: number;
  onClick: () => void;
  disabled?: boolean;
}

export function Chip({ amount, onClick, disabled }: ChipProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
    >
      <Button
        onClick={onClick}
        disabled={disabled}
        className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg
          relative overflow-hidden border-4 border-primary/20"
      >
        <motion.div
          className="absolute inset-0 bg-white/10"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{
            scale: 4,
            opacity: 0.3,
            transition: { duration: 0.5 }
          }}
        />
        <span className="text-lg font-bold">${amount}</span>
      </Button>
    </motion.div>
  );
}
