import React, { useState } from "react";
import { GameHistory, PairHistory } from "../../../types";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import WaitingPlayers from "../../molecules/WaitingPlayers";
import CurrentMatch from "../../molecules/CurrentMatch";
import PlayerStatusCard from "../../atoms/PlayerStatusCard";
import useMatchManagement from "../../../hooks/useMatchManagement";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";

function MainComponent() {
  const {
    players,
    setPlayers,
    addPlayer,
    playerCount,
    onBreak,
    setOnBreak,
    availablePlayers,
  } = usePlayerContext();
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [gameHistory, setGameHistory] = useState<GameHistory>({});
  const [pairHistory, setPairHistory] = useState<PairHistory>({});
  // const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{
    matchIndex: number;
    team: number;
    playerIndex: number;
  } | null>(null);

  const completeMatches = () => {
    const updatedPlayers = players.map((player) => ({
      ...player,
      gamesPlayed: gameHistory[player.id] || 0,
    }));
    setPlayers(updatedPlayers);
    setMatches([]);
  };

  const swapPlayers = (
    matchIndex: number,
    teamNumber: number,
    playerIndex: number
  ) => {
    if (!selectedPlayer) {
      setSelectedPlayer({ matchIndex, team: teamNumber, playerIndex });
      return;
    }

    const newMatches = [...matches];
    const currentMatch = newMatches[matchIndex];
    const previousMatch = newMatches[selectedPlayer.matchIndex];

    const currentTeam = teamNumber === 1 ? "team1" : "team2";
    const previousTeam = selectedPlayer.team === 1 ? "team1" : "team2";

    const temp = currentMatch[currentTeam][playerIndex];
    currentMatch[currentTeam][playerIndex] =
      previousMatch[previousTeam][selectedPlayer.playerIndex];
    previousMatch[previousTeam][selectedPlayer.playerIndex] = temp;

    setMatches(newMatches);
    setSelectedPlayer(null);
  };

  const setMatchWinner = (matchIndex: number, winningTeam: number) => {
    const newMatches = [...matches];
    const match = newMatches[matchIndex];
    match.winner = winningTeam;
    setMatches(newMatches);

    // 勝利数を更新
    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    const winningPlayerIds = new Set(winningPlayers.map((player) => player.id));

    const updatedPlayers = players.map((player) =>
      winningPlayerIds.has(player.id)
        ? { ...player, wins: player.wins + 1 }
        : player
    );

    setPlayers(updatedPlayers);
  };

  const resetMatchWinner = (matchIndex: number) => {
    const newMatches = [...matches];
    const match = newMatches[matchIndex];
    const winningTeam = match.winner;

    // 試合の勝者をリセット
    match.winner = null;
    setMatches(newMatches);

    // 勝利数をリセット
    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    const winningPlayerIds = new Set(winningPlayers.map((player) => player.id));

    const updatedPlayers = players.map((player) =>
      winningPlayerIds.has(player.id)
        ? { ...player, wins: player.wins - 1 }
        : player
    );

    setPlayers(updatedPlayers);
  };

  const { matches, setMatches, generateMatches, isPlayerInMatch } =
    useMatchManagement({
      availablePlayers,
      courts,
      gameHistory,
      pairHistory,
      setGameHistory,
      setPairHistory,
    });

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        バドミントン試合マッチング
      </h1>

      <div className="mb-8 space-y-4">
        <CourtCounter
          courts={courts}
          onIncrement={incrementCourts}
          onDecrement={decrementCourts}
          className="flex items-center gap-4"
        />
        <button
          onClick={addPlayer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          参加者を追加（現在: {playerCount}人）
        </button>
      </div>

      <div className="mb-8">
        {players.map((player) => {
          const isPlaying = isPlayerInMatch(player.id);
          return (
            <PlayerStatusCard
              key={player.id}
              player={player}
              gameHistory={gameHistory}
              onBreak={onBreak}
              isPlaying={isPlaying}
              selectedPlayer={!!selectedPlayer}
              setOnBreak={setOnBreak}
              isPlayerInMatch={isPlayerInMatch}
            />
          );
        })}
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

      <GenerateMatchesButton
        onClick={generateMatches}
        matches={matches}
        players={players}
      />

      {matches.length > 0 && (
        <div>
          <CurrentMatch
            matches={matches}
            selectedPlayer={selectedPlayer}
            swapPlayers={swapPlayers}
            setMatchWinner={setMatchWinner}
            setSelectedPlayer={setSelectedPlayer}
            resetMatchWinner={resetMatchWinner}
          />

          <WaitingPlayers
            isPlayerInMatch={isPlayerInMatch}
            selectedPlayer={selectedPlayer}
            matches={matches}
            setMatches={setMatches}
            setSelectedPlayer={setSelectedPlayer}
            gameHistory={gameHistory}
          />
          <CompleteMatchesButton onClick={completeMatches} />
        </div>
      )}
    </div>
  );
}

export default MainComponent;
