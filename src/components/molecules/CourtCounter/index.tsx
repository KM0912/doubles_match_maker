type Props = {
  courts: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
};

const CourtCounter: React.FC<Props> = ({
  courts,
  onIncrement,
  onDecrement,
  className,
}) => {
  return (
    <div className={className}>
      <button onClick={onDecrement} className="bg-gray-200 px-3 py-1 rounded">
        -
      </button>
      <span className="text-lg">{courts}コート</span>
      <button onClick={onIncrement} className="bg-gray-200 px-3 py-1 rounded">
        +
      </button>
    </div>
  );
};

export default CourtCounter;
