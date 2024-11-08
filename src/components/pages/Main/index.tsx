import React, { useState } from "react";
import { PairHistory } from "../../../types";
import useMatchManagement from "../../../hooks/useMatchManagement";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerStatusCards from "../../molecules/PlayerStatusCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [pairHistory, setPairHistory] = useState<PairHistory>({});
  // const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  const {
    matches,
    setMatches,
    setMatchWinner,
    resetMatchWinner,
    generateMatches,
    completeMatches,
    isPlayerInMatch,
    selectedPlayer,
    setSelectedPlayer,
    swapPlayers,
  } = useMatchManagement({
    courts,
    pairHistory,
    setPairHistory,
  });

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        バドミントン試合マッチング
      </h1>

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
        <PlayerStatusCards isPlayerInMatch={isPlayerInMatch} />
      </div>

      {/* <div className="mb-8">
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="flex justify-between items-center w-full bg-gray-100 p-4 rounded-lg mb-2"
        >
          <h2 className="text-xl font-bold">ペア履歴</h2>
          <i
            className={`fas ${
              isHistoryOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </button>

        {isHistoryOpen && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="p-2 border">選手</th>
                  {players.map((player) => (
                    <th key={player.id} className="p-2 border">
                      No.{player.id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id}>
                    <td className="p-2 border font-bold">No.{player.id}</td>
                    {players.map((partner) => (
                      <td key={partner.id} className="p-2 border text-center">
                        {player.id === partner.id
                          ? "-"
                          : pairHistory[player.id]?.[partner.id] || 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}

      <MatchControlPanel
        courts={courts}
        pairHistory={pairHistory}
        setPairHistory={setPairHistory}
      />
    </div>
  );
}

export default MainComponent;
