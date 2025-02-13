import { useState, useEffect } from 'react';
import { GameState } from '../../../../../../Downloads/BlackjackShowdown/shared/schema';
import { Hand } from '../components/game/Hand';
import { Controls } from '../components/game/Controls';
import { BettingControls } from '../components/game/BettingControls';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { INITIAL_STATE, createDeck, calculateHandValue, isBlackjack, isBust, canSplit } from '../lib/blackjack';
import { useToast } from '../hooks/use-toast';
import { useLocation } from 'wouter';
import { ArrowLeft, Power, Pencil, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ScoreBoard, type GameResult } from '../components/game/ScoreBoard';

export default function Blackjack() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('blackjack-state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('blackjack-player-name') || '';
  });
  const [showNameDialog, setShowNameDialog] = useState(!playerName);
  const [gameMessage, setGameMessage] = useState<string>('');
  const [editingName, setEditingName] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName);
  const [gameResults, setGameResults] = useState<GameResult[]>(() => {
    const saved = localStorage.getItem('blackjack-results');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    localStorage.setItem('blackjack-state', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem('blackjack-results', JSON.stringify(gameResults));
  }, [gameResults]);

  const handleEndGame = () => {
    setGameState(INITIAL_STATE);
    setGameResults([]);
    localStorage.removeItem('blackjack-results');
    toast({
      title: "Game Ended",
      description: "Your game has been reset.",
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
    setGameState(prev => ({
      ...prev,
      currentBet: prev.currentBet + amount,
      balance: prev.balance - amount
    }));
  };

  const clearBet = () => {
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
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem('blackjack-player-name', playerName);
      setShowNameDialog(false);
      toast({
        title: "Welcome!",
        description: `Good luck, ${playerName}!`,
      });
    }
  };

  const handleNameEdit = () => {
    if (editingName) {
      if (newPlayerName.trim()) {
        setPlayerName(newPlayerName);
        localStorage.setItem('blackjack-player-name', newPlayerName);
        toast({
          title: "Name Updated",
          description: `Your name has been changed to ${newPlayerName}`,
        });
      }
    }
    setEditingName(!editingName);
  };

  const determineGameResult = (dealerHand: string[], playerHands: string[][]) => {
    const dealerValue = calculateHandValue(dealerHand);
    const results: string[] = [];
    const newResults: GameResult[] = [];

    playerHands.forEach((hand, index) => {
      const playerValue = calculateHandValue(hand);
      const handNumber = playerHands.length > 1 ? ` (Hand ${index + 1})` : '';
      let result: GameResult['result'] = 'tie';
      let profit = 0;

      if (isBust(hand)) {
        results.push(`Bust${handNumber}! You lose.`);
        result = 'lose';
        profit = -gameState.currentBet;
      } else if (isBust(dealerHand)) {
        results.push(`Dealer busts! You win${handNumber}!`);
        result = 'win';
        profit = gameState.currentBet;
      } else if (playerValue > dealerValue) {
        results.push(`You win${handNumber}!`);
        result = 'win';
        profit = gameState.currentBet;
      } else if (playerValue < dealerValue) {
        results.push(`Dealer wins${handNumber}.`);
        result = 'lose';
        profit = -gameState.currentBet;
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

    setGameResults(prev => [...newResults, ...prev]);
    return results.join('\n');
  };

  return (
      <div className="min-h-screen bg-background p-4">
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
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
              </div>
              <Button type="submit" className="w-full">Start Playing</Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center mb-4">
            <Button
                variant="ghost"
                onClick={() => setLocation('/')}
                className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-center flex items-center justify-center gap-2">
              {editingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        className="w-40"
                        placeholder="Enter name"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNameEdit}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
              ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Player: {playerName}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNameEdit}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
              )}
            </div>
            <Button
                variant="destructive"
                onClick={handleEndGame}
                className="flex items-center gap-2"
            >
              <Power className="h-4 w-4" />
              End Game
            </Button>
          </div>

          <Card className="p-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Blackjack</h1>
              <p className="text-xl">Balance: ${gameState.balance}</p>
              {gameState.gameStatus === 'betting' && (
                  <p className="text-lg">Current Bet: ${gameState.currentBet}</p>
              )}
              {gameMessage && (
                  <p className={`text-lg font-medium ${gameMessage.includes('win') ? 'text-green-600' : gameMessage.includes('lose') ? 'text-red-600' : 'text-yellow-600'}`}>
                    {gameMessage}
                  </p>
              )}
            </div>

            <div className="mt-8 space-y-8">
              <div className="text-center">
                <h2 className="text-xl mb-4">Dealer</h2>
                <Hand
                    cards={gameState.dealerHand}
                    isDealer
                    hideSecondCard={gameState.gameStatus === 'playing'}
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl mb-4">Player</h2>
                {gameState.playerHands.map((hand, index) => (
                    <Hand
                        key={index}
                        cards={hand}
                        active={index === gameState.activeHandIndex}
                    />
                ))}
              </div>

              {gameState.gameStatus === 'betting' && (
                  <BettingControls
                      onPlaceBet={placeBet}
                      onClearBet={clearBet}
                      onDeal={dealCards}
                      currentBet={gameState.currentBet}
                      balance={gameState.balance}
                      disabled={gameState.gameStatus !== 'betting'}
                  />
              )}

              {gameState.gameStatus === 'playing' && (
                  <Controls
                      onHit={hit}
                      onStand={stand}
                      onSplit={split}
                      onFold={fold}
                      canSplit={canSplit(gameState.playerHands[gameState.activeHandIndex])}
                      disabled={gameState.gameStatus !== 'playing'}
                  />
              )}

              {gameState.gameStatus === 'complete' && (
                  <Button
                      onClick={startNewGame}
                      className="w-full"
                      size="lg"
                  >
                    New Game
                  </Button>
              )}
            </div>
            <ScoreBoard results={gameResults} />
          </Card>
        </div>
      </div>
  );
}