import { useState, useEffect } from 'react';
import { GameState } from '@shared/schema';
import { Hand } from '@/components/game/Hand';
import { Controls } from '@/components/game/Controls';
import { BettingControls } from '@/components/game/BettingControls';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INITIAL_STATE, createDeck, calculateHandValue, isBlackjack, isBust, canSplit } from '@/lib/blackjack';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { History } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScoreBoard, type GameResult } from '@/components/game/ScoreBoard';
import { soundManager } from '@/lib/sounds';
import { X } from 'lucide-react';

const MIN_WIDTH = 'min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(0,100,0,0.1),transparent_70%)] before:z-0 pb-8';

export default function Blackjack() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('blackjack-state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('blackjack-player-name') || '';
  });
  const [showNameDialog, setShowNameDialog] = useState(!playerName);
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const [gameMessage, setGameMessage] = useState<string>('');
  const [editingName, setEditingName] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName);
  const [gameResults, setGameResults] = useState<GameResult[]>(() => {
    const saved = localStorage.getItem('blackjack-results');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(() => {
    return localStorage.getItem('blackjack-show-history') === 'true';
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    localStorage.setItem('blackjack-state', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem('blackjack-results', JSON.stringify(gameResults));
  }, [gameResults]);

  useEffect(() => {
    localStorage.setItem('blackjack-show-history', showHistory.toString());
  }, [showHistory]);

  const handleEndGame = () => {
    setShowEndGameDialog(true);
  };

  const confirmEndGame = () => {
    // Add final game result to history before resetting
    const finalResult: GameResult = {
      bet: gameState.currentBet,
      result: 'tie', // Using 'tie' for game end
      profit: gameState.balance - INITIAL_STATE.balance, // Calculate total profit
      timestamp: new Date().toISOString(),
    };

    // Add the final result to game history
    setGameResults(prev => [{
      ...finalResult,
      bet: 0, // Set bet to 0 for game end entry
      result: 'tie',
      profit: gameState.balance - INITIAL_STATE.balance,
    }, ...prev]);

    // Now reset the game state
    setGameState(INITIAL_STATE);
    localStorage.removeItem('blackjack-state');
    setShowEndGameDialog(false);
    toast({
      title: "Game Ended",
      description: `Final balance: $${gameState.balance}`,
    });
  };

  const dealCards = () => {
    const deck = [...gameState.deck];
    const playerHand = [deck.pop()!, deck.pop()!];
    const dealerHand = [deck.pop()!, deck.pop()!];

    setGameState(prev => ({
      ...prev,
      playerHands: [playerHand],
      dealerHand,
      deck,
      gameStatus: 'playing',
      activeHandIndex: 0,
    }));
  };

  const hit = () => {
    soundManager.playButtonClick();
    const deck = [...gameState.deck];
    const card = deck.pop()!;
    const playerHands = [...gameState.playerHands];
    playerHands[gameState.activeHandIndex] = [...playerHands[gameState.activeHandIndex], card];

    let newStatus = gameState.gameStatus;
    if (isBust(playerHands[gameState.activeHandIndex])) {
      if (gameState.activeHandIndex < playerHands.length - 1) {
        newStatus = 'playing';
      } else {
        newStatus = 'complete';
      }
    }

    setGameState(prev => ({
      ...prev,
      deck,
      playerHands,
      gameStatus: newStatus,
      activeHandIndex: isBust(playerHands[gameState.activeHandIndex]) ?
        Math.min(gameState.activeHandIndex + 1, playerHands.length - 1) :
        gameState.activeHandIndex
    }));
  };

  const stand = () => {
    soundManager.playButtonClick();
    if (gameState.activeHandIndex < gameState.playerHands.length - 1) {
      setGameState(prev => ({
        ...prev,
        activeHandIndex: prev.activeHandIndex + 1
      }));
      return;
    }

    let dealerHand = [...gameState.dealerHand];
    const deck = [...gameState.deck];

    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(deck.pop()!);
    }

    const dealerValue = calculateHandValue(dealerHand);
    let newBalance = gameState.balance;

    gameState.playerHands.forEach(hand => {
      const playerValue = calculateHandValue(hand);
      if (!isBust(hand) && (isBust(dealerHand) || playerValue > dealerValue)) {
        newBalance += gameState.currentBet * 2;
      } else if (!isBust(hand) && playerValue === dealerValue) {
        newBalance += gameState.currentBet;
      }
    });

    const result = determineGameResult(dealerHand, gameState.playerHands);
    setGameMessage(result);

    setGameState(prev => ({
      ...prev,
      dealerHand,
      deck,
      balance: newBalance,
      gameStatus: 'complete'
    }));
  };

  const split = () => {
    if (!canSplit(gameState.playerHands[gameState.activeHandIndex])) return;
    soundManager.playButtonClick();
    const playerHands = [...gameState.playerHands];
    const currentHand = playerHands[gameState.activeHandIndex];
    const newHand = [currentHand.pop()!];
    playerHands[gameState.activeHandIndex] = [...currentHand];
    playerHands.splice(gameState.activeHandIndex + 1, 0, newHand);

    setGameState(prev => ({
      ...prev,
      playerHands,
      balance: prev.balance - prev.currentBet
    }));
  };

  const fold = () => {
    soundManager.playButtonClick();
    const returnAmount = Math.floor(gameState.currentBet / 2);

    if (gameState.activeHandIndex < gameState.playerHands.length - 1) {
      setGameState(prev => ({
        ...prev,
        balance: prev.balance + returnAmount,
        activeHandIndex: prev.activeHandIndex + 1
      }));
    } else {
      setGameMessage("You folded. Half your bet is returned.");
      setGameState(prev => ({
        ...prev,
        balance: prev.balance + returnAmount,
        gameStatus: 'complete'
      }));
    }
  };

  const placeBet = (amount: number) => {
    if (gameState.balance < amount) return;
    soundManager.playButtonClick();
    setGameState(prev => ({
      ...prev,
      currentBet: prev.currentBet + amount,
      balance: prev.balance - amount
    }));
  };

  const clearBet = () => {
    soundManager.playButtonClick();
    setGameState(prev => ({
      ...prev,
      balance: prev.balance + prev.currentBet,
      currentBet: 0
    }));
  };

  const startNewGame = () => {
    setGameState(prev => ({
      ...INITIAL_STATE,
      balance: prev.balance,
      deck: createDeck()
    }));
    setGameMessage(''); // Clear the game message when starting a new game
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayerName.trim()) {
      setPlayerName(newPlayerName);
      localStorage.setItem('blackjack-player-name', newPlayerName);
      setEditingName(false);
      toast({
        title: "Name Updated",
        description: `Your name has been changed to ${newPlayerName}`,
      });
    }
  };

  const handleNameEdit = () => {
    setEditingName(true);
  };

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  const determineGameResult = (dealerHand: string[], playerHands: string[][]) => {
    const dealerValue = calculateHandValue(dealerHand);
    const results: string[] = [];
    const newResults: GameResult[] = [];
    let hasWin = false;
    let hasLoss = false;

    playerHands.forEach((hand, index) => {
      const playerValue = calculateHandValue(hand);
      const handNumber = playerHands.length > 1 ? ` (Hand ${index + 1})` : '';
      let result: GameResult['result'] = 'tie';
      let profit = 0;

      if (isBust(hand)) {
        results.push(`Bust${handNumber}! You lose.`);
        result = 'lose';
        profit = -gameState.currentBet;
        hasLoss = true;
      } else if (isBust(dealerHand)) {
        results.push(`Dealer busts! You win${handNumber}!`);
        result = 'win';
        profit = gameState.currentBet;
        hasWin = true;
      } else if (playerValue > dealerValue) {
        results.push(`You win${handNumber}!`);
        result = 'win';
        profit = gameState.currentBet;
        hasWin = true;
      } else if (playerValue < dealerValue) {
        results.push(`Dealer wins${handNumber}.`);
        result = 'lose';
        profit = -gameState.currentBet;
        hasLoss = true;
      } else {
        results.push(`Push${handNumber}! It's a tie.`);
        result = 'tie';
        profit = 0;
      }

      newResults.push({
        bet: gameState.currentBet,
        result,
        profit,
        timestamp: new Date().toISOString(),
      });
    });

    if (hasWin) {
      soundManager.playWin();
    } else if (hasLoss) {
      soundManager.playLose();
    }

    setGameResults(prev => [...newResults, ...prev]);
    return results.join('\n');
  };

  return (
    <div className={MIN_WIDTH}>
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Blackjack!</DialogTitle>
            <DialogDescription>
              Please enter your name to start playing.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <Button type="submit" className="w-full">Start Playing</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showEndGameDialog} onOpenChange={setShowEndGameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End Game Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to end the current game? This will reset your balance and clear all game history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowEndGameDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmEndGame}>
              End Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showHistory && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setShowHistory(false)}
        />
      )}

      <div className="container max-w-7xl mx-auto p-3 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1 space-y-4">
            <Card className="p-4 md:p-6 mb-20 md:mb-0 shadow-lg relative z-10 max-w-4xl mx-auto">
              <header className="border-b pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blackjack</h1>
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowHistory(prev => !prev)}
                      className={showHistory ? 'text-primary' : ''}
                    >
                      <History className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={handleEndGame}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </header>
              <div className="text-center space-y-2">
                <p className="text-lg md:text-xl font-medium">
                  Balance: <span className="text-primary">${gameState.balance}</span>
                </p>
                {gameState.gameStatus === 'betting' && (
                  <p className="text-base md:text-lg">
                    Current Bet: <span className="font-medium">${gameState.currentBet}</span>
                  </p>
                )}
              </div>
              {gameMessage && (
                <p className={`text-base md:text-lg font-medium animate-in fade-in-0 text-center mt-2 ${
                  gameMessage.includes('win') ? 'text-green-600' :
                    gameMessage.includes('lose') ? 'text-red-600' :
                      'text-yellow-600'
                }`}>
                  {gameMessage}
                </p>
              )}
              <div className="mt-6 md:mt-8 space-y-6 md:space-y-8">
                <div className="text-center">
                  <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Dealer's Hand</h2>
                  <Hand
                    cards={gameState.dealerHand}
                    isDealer
                    hideSecondCard={gameState.gameStatus === 'playing'}
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4">Your Hand</h2>
                  {gameState.playerHands.map((hand, index) => (
                    <Hand
                      key={index}
                      cards={hand}
                      active={index === gameState.activeHandIndex}
                    />
                  ))}
                </div>

                {gameState.gameStatus === 'betting' && (
                  <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-sm border-t border-border z-40 md:relative md:p-0 md:bg-transparent md:backdrop-blur-none md:border-none">
                    <BettingControls
                      onPlaceBet={placeBet}
                      onClearBet={clearBet}
                      onDeal={dealCards}
                      currentBet={gameState.currentBet}
                      balance={gameState.balance}
                      disabled={gameState.gameStatus !== 'betting'}
                    />
                  </div>
                )}

                {gameState.gameStatus === 'playing' && (
                  <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-sm border-t border-border z-40 md:relative md:p-0 md:bg-transparent md:backdrop-blur-none md:border-none">
                    <Controls
                      onHit={hit}
                      onStand={stand}
                      onSplit={split}
                      onFold={fold}
                      canSplit={canSplit(gameState.playerHands[gameState.activeHandIndex])}
                      disabled={gameState.gameStatus !== 'playing'}
                    />
                  </div>
                )}

                {gameState.gameStatus === 'complete' && (
                  <div className="flex gap-2">
                    <Button
                      onClick={startNewGame}
                      className="w-full text-base md:text-lg font-medium"
                      size="lg"
                    >
                      New Game
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div
            className={`fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-50 transform transition-transform duration-300 ease-in-out ${
              showHistory ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="h-full pt-3 px-3">
              <ScoreBoard results={gameResults} onClose={() => setShowHistory(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}