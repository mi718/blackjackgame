# Modern React Blackjack Game

A sleek and interactive Blackjack game built with React, featuring a modern UI design with animations and comprehensive game history tracking.

![Blackjack Game Screenshot](./attached_assets/Blackjack.png)

## Features

### 🎮 Core Gameplay
- Interactive betting system with chip selection
- Split hands functionality
- Double down option
- Fold/Surrender capability
- Dealer AI following standard casino rules (hit on 16, stand on 17)

### 💫 Modern UI/UX
- Responsive design that works on mobile and desktop
- Smooth animations for card dealing and chip placement
- Real-time balance updates
- Clear game status messages
- Dark/Light theme toggle

### 📊 Game History
- Comprehensive game history tracking
- Animated side panel with game statistics
- Results grouped by date
- Win/Loss/Tie statistics
- Profit/Loss tracking per game

### 🎯 Technical Features
- Local storage persistence for game state
- Responsive mobile-first design
- Framer Motion animations
- TypeScript for type safety
- Modern React patterns and hooks

## Technology Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Type Safety**: TypeScript
- **Storage**: Local Storage
- **Build Tool**: Vite

## Game Rules

1. **Objective**: Beat the dealer's hand without going over 21
2. **Card Values**:
   - Number cards (2-10): Face value
   - Face cards (J, Q, K): 10
   - Ace: 1 or 11
3. **Betting**:
   - Minimum bet: $5
   - Maximum bet: $500
   - Chips available: $5, $25, $100, $500
4. **Actions**:
   - Hit: Take another card
   - Stand: Keep current hand
   - Split: Split paired cards into two hands
   - Fold: Surrender hand and receive half bet back

## Screenshots

### Main Game Interface
![Game Interface](./attached_assets/game-interface.png)
The main game interface showing the dealer's hand, player's hand, and betting controls.

### Betting Controls
![Betting Controls](./attached_assets/betting-controls.png)
Interactive chip selection with animations and current bet display.

### Game History
![Game History](./attached_assets/game-history.png)
Detailed game history panel showing past games and statistics.

## How to Play

1. **Start Game**: Enter your name to begin
2. **Place Bet**: Select chips to place your bet
3. **Play Hand**: Choose from available actions (Hit, Stand, Split, Fold)
4. **View Results**: See if you won, lost, or tied
5. **Track History**: View your game history in the side panel

## Development

This project is built and hosted on Replit, providing a seamless development experience with instant deployment.

### Key Files

- `blackjack.tsx`: Main game logic and UI
- `ScoreBoard.tsx`: Game history tracking
- `BettingControls.tsx`: Betting interface
- `Hand.tsx`: Card display logic

### Running Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:5173` in your browser

## Credits

Built with ❤️ using React and modern web technologies. Special thanks to:
- shadcn/ui for the beautiful component library
- Framer Motion for smooth animations
- Lucide React for the icon set
