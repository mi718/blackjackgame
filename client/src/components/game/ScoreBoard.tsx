import { useState } from 'react';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'framer-motion';

export interface GameResult {
  bet: number;
  result: 'win' | 'lose' | 'tie';
  profit: number;
  timestamp: string;
}

interface ScoreBoardProps {
  results: GameResult[];
}

export function ScoreBoard({ results }: ScoreBoardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-600';
      case 'lose': return 'text-red-600';
      case 'tie': return 'text-gray-400';
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-20 z-10"
    >
      <Card className={`p-4 ${isExpanded ? 'w-80' : 'w-12'} transition-all duration-300`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -left-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          {isExpanded ? '>' : '<'}
        </button>
        
        {isExpanded && (
          <div>
            <h3 className="font-bold text-lg mb-2">Game History</h3>
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-2 bg-secondary/10 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${getResultColor(result.result)}`}>
                        {result.result.toUpperCase()}
                      </span>
                      <span className="text-sm">
                        Bet: ${result.bet}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className={`text-sm ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {result.profit >= 0 ? '+' : ''}{result.profit}$
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
