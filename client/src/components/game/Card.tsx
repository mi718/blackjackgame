import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { soundManager } from '../../lib/sounds';

interface CardProps {
  card: string;
  hidden?: boolean;
  index: number;
}

export function Card({ card, hidden, index }: CardProps) {
  useEffect(() => {
    // Play sound effect when card is dealt
    soundManager.playCardDeal();
  }, []);

  const variants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  // Function to format the card filename correctly
  const getCardFilename = (card: string) => {
    const [value, , suit] = card.split('_');
    // Keep face cards uppercase, convert numbers to lowercase
    const formattedValue = ['K', 'Q', 'J', 'A'].includes(value) ? value : value.toLowerCase();
    return `${formattedValue}_of_${suit.toLowerCase()}.png`;
  };

  return (
      <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          className="relative w-24 h-36 sm:w-32 sm:h-48"
      >
        <div className={`absolute inset-0 rounded-lg shadow-lg ${hidden ? 'bg-indigo-600' : ''}`}>
          {!hidden && (
              <img
                  src={`/images/${getCardFilename(card)}`}
                  alt={card}
                  className="w-full h-full object-cover rounded-lg"
              />
          )}
        </div>
      </motion.div>
  );
}