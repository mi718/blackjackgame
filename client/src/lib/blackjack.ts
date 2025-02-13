import { GameState } from '../../../../../../Downloads/BlackjackShowdown/shared/schema';

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function createDeck(): string[] {
  const deck: string[] = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push(`${value}_of_${suit}`);
    }
  }
  return shuffle(deck);
}

export function shuffle(deck: string[]): string[] {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

export function calculateHandValue(hand: string[]): number {
  let value = 0;
  let aces = 0;

  for (const card of hand) {
    const cardValue = card.split('_')[0];
    if (cardValue === 'A') {
      aces++;
    } else if (['K', 'Q', 'J'].includes(cardValue)) {
      value += 10;
    } else {
      value += parseInt(cardValue);
    }
  }

  for (let i = 0; i < aces; i++) {
    if (value + 11 <= 21) {
      value += 11;
    } else {
      value += 1;
    }
  }

  return value;
}

export function isBlackjack(hand: string[]): boolean {
  return hand.length === 2 && calculateHandValue(hand) === 21;
}

export function isBust(hand: string[]): boolean {
  return calculateHandValue(hand) > 21;
}

export const INITIAL_STATE: GameState = {
  playerHands: [[]],
  dealerHand: [],
  deck: createDeck(),
  currentBet: 0,
  balance: 1000,
  gameStatus: 'betting',
  activeHandIndex: 0,
};

export function canSplit(hand: string[]): boolean {
  if (hand.length !== 2) return false;
  const [card1, card2] = hand;
  const value1 = card1.split('_')[0];
  const value2 = card2.split('_')[0];
  return value1 === value2;
}
