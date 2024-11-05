import React from "react";
import CourtCounter from "../../molecules/CourtCounter";

type Props = {
  courts: number;
  playerCount: number;
  onIncrementCourts: () => void;
  onDecrementCourts: () => void;
  onClickAddPlayer: () => void;
};

const CourtManager: React.FC<Props> = ({
  courts,
  playerCount,
  onIncrementCourts,
  onDecrementCourts,
  onClickAddPlayer,
}) => {
  return (
    <>
      <CourtCounter
        courts={courts}
        onIncrement={onIncrementCourts}
        onDecrement={onDecrementCourts}
        className="flex items-center gap-4"
      />

      <button
        onClick={onClickAddPlayer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        参加者を追加（現在: {playerCount}人）
      </button>
    </>
  );
};

export default CourtManager;
