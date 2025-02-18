import { useStore } from '../store/useStore';

interface PriceDisplayProps {
  amount: number;
  className?: string;
}

export function PriceDisplay({ amount, className = '' }: PriceDisplayProps) {
  const { currencySymbol } = useStore();
  
  return (
    <span className={className}>
      {currencySymbol}{amount}
    </span>
  );
} 