import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface GameResult {
  bet: number;
  result: 'win' | 'lose' | 'tie';
  profit: number;
  timestamp: string;
}

interface ScoreBoardProps {
  results: GameResult[];
  onClose: () => void;
}

const GameHistoryContent = ({ results }: { results: GameResult[] }) => {
  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-600';
      case 'lose': return 'text-red-600';
      case 'tie': return 'text-muted-foreground';
      default: return '';
    }
  };

  // Group results by date
  const groupedResults = results.reduce((groups: Record<string, GameResult[]>, result) => {
    const date = new Date(result.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(result);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Game History</h3>
        <span className="text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? 'game' : 'games'}
        </span>
      </div>
      <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]">
        <div className="pr-4">
          <Accordion type="single" collapsible className="space-y-2">
            {Object.entries(groupedResults).map(([date, dateResults], groupIndex) => (
              <AccordionItem
                key={date}
                value={date}
                className="border rounded-lg px-2 bg-secondary/5"
              >
                <AccordionTrigger className="text-sm py-3 px-2 hover:no-underline">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-medium">{date}</span>
                    <span className="text-muted-foreground text-xs">
                      {dateResults.length} {dateResults.length === 1 ? 'game' : 'games'}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 py-2">
                    {dateResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 bg-secondary/10 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${getResultColor(result.result)}`}>
                            {result.result.charAt(0).toUpperCase() + result.result.slice(1)}
                          </span>
                          <span className="text-sm font-medium">
                            Bet: ${result.bet}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className={`text-sm font-medium ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {result.profit >= 0 ? '+' : ''}{result.profit}$
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(result.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export function ScoreBoard({ results, onClose }: ScoreBoardProps) {
  return (
    <Card className="h-full shadow-lg overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="font-semibold text-lg">Game History</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <GameHistoryContent results={results} />
      </div>
    </Card>
  );
}