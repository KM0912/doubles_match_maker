import React, { useState } from "react";
import {
  GameHistory,
  Match,
  OnBreakState,
  PairHistory,
  Player,
} from "../../../types";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import WaitingPlayers from "../../molecules/WaitingPlayers";
import CourtCounter from "../../molecules/CourtCounter";
import CurrentMatch from "../../molecules/CurrentMatch";
import PlayerStatusCard from "../../atoms/PlayerStatusCard";
import useMatchManagement from "../../../hooks/useMatchManagement";

function MainComponent() {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [courts, setCourts] = useState<number>(1);
  const [gameHistory, setGameHistory] = useState<GameHistory>({});
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, gamesPlayed: 0 },
    { id: 2, gamesPlayed: 0 },
    { id: 3, gamesPlayed: 0 },
    { id: 4, gamesPlayed: 0 },
  ]);
  const [pairHistory, setPairHistory] = useState<PairHistory>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [wins, setWins] = useState<GameHistory>({});
  const [selectedPlayer, setSelectedPlayer] = useState<{
    matchIndex: number;
    team: number;
    playerIndex: number;
  } | null>(null);
  const [onBreak, setOnBreak] = useState<OnBreakState>({});

  const addPlayer = () => {
    setPlayerCount((prev) => prev + 1);
    setPlayers([...players, { id: playerCount + 1, gamesPlayed: 0 }]);
  };

  const availablePlayers = [...players]
    .filter((player) => !onBreak[player.id])
    .sort((a, b) => a.gamesPlayed - b.gamesPlayed);

  const isPlayerInMatch = (playerId: number) => {
    return matches.some(
      (match) =>
        match.team1.some((p) => p.id === playerId) ||
        match.team2.some((p) => p.id === playerId)
    );
  };

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

    const updatedWins = { ...wins };
    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    winningPlayers.forEach((player) => {
      updatedWins[player.id] = (updatedWins[player.id] || 0) + 1;
    });
    setWins(updatedWins);
  };

  const resetMatchWinner = (matchIndex: number) => {
    const newMatches = [...matches];
    const match = newMatches[matchIndex];
    const winningTeam = match.winner;

    // 試合の勝者をリセット
    match.winner = null;
    setMatches(newMatches);

    // 勝利数をリセット
    const updatedWins = { ...wins };
    const winningPlayers = winningTeam === 1 ? match.team1 : match.team2;
    winningPlayers.forEach((player) => {
      updatedWins[player.id] = (updatedWins[player.id] || 0) - 1;
    });
    setWins(updatedWins);
  };

  const { matches, setMatches, generateMatches } = useMatchManagement({
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
          setCourts={setCourts}
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
              wins={wins}
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
            players={players}
            isPlayerInMatch={isPlayerInMatch}
            onBreak={onBreak}
            selectedPlayer={selectedPlayer}
            matches={matches}
            setMatches={setMatches}
            setSelectedPlayer={setSelectedPlayer}
            gameHistory={gameHistory}
            wins={wins}
          />
          <CompleteMatchesButton onClick={completeMatches} />
        </div>
      )}
    </div>
  );
}

export default MainComponent;
