import { Card } from './Card';

interface HandProps {
  cards: string[];
  isDealer?: boolean;
  hideSecondCard?: boolean;
  active?: boolean;
}

export function Hand({ cards, isDealer, hideSecondCard, active }: HandProps) {
  return (
    <div className={`relative flex items-center justify-center gap-4 p-4 rounded-xl 
      ${active ? 'ring-2 ring-primary' : ''}`}>
      {cards.map((card, index) => (
        <Card
          key={card + index}
          card={card}
          hidden={isDealer && hideSecondCard && index === 1}
          index={index}
        />
      ))}
    </div>
  );
}
