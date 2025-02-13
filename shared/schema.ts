import { z } from "zod";

export const gameState = z.object({
  playerHands: z.array(z.array(z.string())),
  dealerHand: z.array(z.string()),
  deck: z.array(z.string()),
  currentBet: z.number(),
  balance: z.number(),
  gameStatus: z.enum(['betting', 'playing', 'dealerTurn', 'complete']),
  activeHandIndex: z.number(),
});

export type GameState = z.infer<typeof gameState>;