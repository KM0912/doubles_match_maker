type Props = {
  courts: number;
  setCourts: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

const CourtCounter: React.FC<Props> = ({ courts, setCourts, className }) => {
  return (
    <div className={className}>
      <button
        onClick={() => setCourts((prev) => Math.max(1, prev - 1))}
        className="bg-gray-200 px-3 py-1 rounded"
      >
        -
      </button>
      <span className="text-lg">{courts}コート</span>
      <button
        onClick={() => setCourts((prev) => prev + 1)}
        className="bg-gray-200 px-3 py-1 rounded"
      >
        +
      </button>
    </div>
  );
};

export default CourtCounter;
