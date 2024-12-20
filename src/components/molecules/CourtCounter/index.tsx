type Props = {
  courts: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CourtCounter: React.FC<Props> = ({
  courts,
  onIncrement,
  onDecrement,
}) => {
  return (
    <>
      <button onClick={onDecrement} className="bg-gray-200 px-3 py-1 rounded">
        -
      </button>
      <span className="text-lg">{courts}コート</span>
      <button
        onClick={onIncrement}
        className={`bg-gray-200 px-3 py-1 rounded ${
          courts >= 10 && "opacity-50"
        }`}
        disabled={courts >= 10}
      >
        +
      </button>
    </>
  );
};

export default CourtCounter;
