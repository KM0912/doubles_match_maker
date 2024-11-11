import React from "react";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerStatusCards from "../../molecules/PlayerStatusCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";
import PairHistoryTable from "../../organisms/PairHistoryTable";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 max-w-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg shadow-md mb-8">
        <h1 className="text-xl font-bold text-center">
          ダブルス組み合わせメーカー
        </h1>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <CourtCounter
            courts={courts}
            onIncrement={incrementCourts}
            onDecrement={decrementCourts}
          />
        </div>
        <AddPlayerButton />
      </div>

      <div className="mb-8">
        <PlayerStatusCards />
      </div>

      <div className="mb-8">
        <PairHistoryTable />
      </div>

      <MatchControlPanel courts={courts} />
    </div>
  );
}

export default MainComponent;
