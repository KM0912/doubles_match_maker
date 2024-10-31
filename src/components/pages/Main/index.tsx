import React, { useState } from "react";

interface Player {
  id: number;
  gamesPlayed: number;
}

interface Match {
  team1: Player[];
  team2: Player[];
  id: number;
  winner: number | null;
}

interface GameHistory {
  [playerId: number]: number;
}

type OnBreakState = {
  [key: number]: boolean;
};

interface PairHistory {
  [playerId: number]: {
    [partnerId: number]: number;
  };
}

interface NewComponentProps {
  player: Player;
  gameHistory: GameHistory;
  winCount: number;
  onBreakToggle: (playerId: number) => void;
  isPlayerInMatch: (playerId: number) => boolean; // Add this line to the interface
}

function MainComponent() {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [courts, setCourts] = useState<number>(1);
  const [matches, setMatches] = useState<Match[]>([]);
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

  const findBestPairs = (players: Player[]) => {
    let bestPairScore = Infinity;
    let bestPairs: { team1: Player[]; team2: Player[] } | null = null;

    for (let i = 0; i < players.length - 1; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const team1 = [players[i], players[j]];
        const remaining = players.filter((p) => !team1.includes(p));

        for (let k = 0; k < remaining.length - 1; k++) {
          for (let l = k + 1; l < remaining.length; l++) {
            const team2 = [remaining[k], remaining[l]];
            const pairScore =
              (pairHistory[team1[0].id]?.[team1[1].id] || 0) +
              (pairHistory[team2[0].id]?.[team2[1].id] || 0);

            if (pairScore < bestPairScore) {
              bestPairScore = pairScore;
              bestPairs = { team1, team2 };
            }
          }
        }
      }
    }

    return bestPairs;
  };

  const generateMatches = () => {
    const maxGames = Math.min(Math.floor(availablePlayers.length / 4), courts);
    const newMatches: Match[] = [];

    for (let i = 0; i < maxGames; i++) {
      const currentPlayers = availablePlayers.slice(i * 4, i * 4 + 4);
      if (currentPlayers.length === 4) {
        const bestMatch = findBestPairs(currentPlayers);
        if (bestMatch) {
          newMatches.push({
            team1: bestMatch.team1,
            team2: bestMatch.team2,
            id: Date.now() + i,
            winner: null,
          });
        }
      }
    }

    setMatches(newMatches);
    const updatedGameHistory = { ...gameHistory };
    const updatedPairHistory = { ...pairHistory };

    newMatches.forEach((match) => {
      [...match.team1, ...match.team2].forEach((player) => {
        updatedGameHistory[player.id] =
          (updatedGameHistory[player.id] || 0) + 1;
      });

      const [p1, p2] = match.team1;
      updatedPairHistory[p1.id] = updatedPairHistory[p1.id] || {};
      updatedPairHistory[p2.id] = updatedPairHistory[p2.id] || {};
      updatedPairHistory[p1.id][p2.id] =
        (updatedPairHistory[p1.id][p2.id] || 0) + 1;
      updatedPairHistory[p2.id][p1.id] =
        (updatedPairHistory[p2.id][p1.id] || 0) + 1;

      const [p3, p4] = match.team2;
      updatedPairHistory[p3.id] = updatedPairHistory[p3.id] || {};
      updatedPairHistory[p4.id] = updatedPairHistory[p4.id] || {};
      updatedPairHistory[p3.id][p4.id] =
        (updatedPairHistory[p3.id][p4.id] || 0) + 1;
      updatedPairHistory[p4.id][p3.id] =
        (updatedPairHistory[p4.id][p3.id] || 0) + 1;
    });

    setGameHistory(updatedGameHistory);
    setPairHistory(updatedPairHistory);
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

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        バドミントン試合マッチング
      </h1>

      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
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
            <div
              key={player.id}
              className={`${onBreak[player.id] ? "opacity-50" : ""} ${
                isPlaying ? "ring-2 ring-green-500" : ""
              } relative rounded-lg ${
                selectedPlayer ? "cursor-pointer hover:bg-gray-100" : ""
              } mb-4`}
              onClick={() => {
                if (selectedPlayer && isPlaying) {
                  const match = matches.find((m) =>
                    [...m.team1, ...m.team2].some((p) => p.id === player.id)
                  );
                  if (!match) return;
                  const matchIndex = matches.indexOf(match);
                  const team = match.team1.some((p) => p.id === player.id)
                    ? 1
                    : 2;
                  const playerIndex =
                    team === 1
                      ? match.team1.findIndex((p) => p.id === player.id)
                      : match.team2.findIndex((p) => p.id === player.id);
                  swapPlayers(matchIndex, team, playerIndex);
                }
              }}
            >
              <PlayerCard
                key={player.id}
                player={player}
                gameHistory={gameHistory}
                winCount={wins[player.id] || 0}
                onBreakToggle={(playerId) => {
                  if (!selectedPlayer) {
                    setOnBreak((prev) => ({
                      ...prev,
                      [playerId]: !prev[playerId],
                    }));
                  }
                }}
                isPlayerInMatch={isPlayerInMatch}
              />

              {onBreak[player.id] && (
                <div className="text-center mt-2 text-red-500 font-bold">
                  休憩中
                </div>
              )}

              {isPlaying && (
                <div className="text-center mt-2 text-green-500 font-bold">
                  試合中
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mb-8">
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
      </div>

      <button
        onClick={generateMatches}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={matches.length > 0 || players.length < 4}
      >
        試合組み合わせ生成
      </button>

      {matches.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">現在の試合</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-4">
            {matches.map((match, index) => (
              <div
                key={match.id}
                className="bg-white p-4 rounded shadow w-full md:flex-1 min-w-[250px]"
              >
                <div className="text-lg font-bold mb-2">コート {index + 1}</div>
                <div className="flex justify-center items-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                        selectedPlayer &&
                        selectedPlayer.matchIndex === index &&
                        selectedPlayer.team === 1 &&
                        selectedPlayer.playerIndex === 0
                          ? "bg-blue-100 ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedPlayer) {
                          swapPlayers(index, 1, 0);
                        } else {
                          setSelectedPlayer({
                            matchIndex: index,
                            team: 1,
                            playerIndex: 0,
                          });
                        }
                      }}
                    >
                      選手{match.team1[0].id}
                    </div>
                    <div
                      className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                        selectedPlayer &&
                        selectedPlayer.matchIndex === index &&
                        selectedPlayer.team === 1 &&
                        selectedPlayer.playerIndex === 1
                          ? "bg-blue-100 ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedPlayer) {
                          swapPlayers(index, 1, 1);
                        } else {
                          setSelectedPlayer({
                            matchIndex: index,
                            team: 1,
                            playerIndex: 1,
                          });
                        }
                      }}
                    >
                      選手{match.team1[1].id}
                    </div>
                  </div>

                  <div className="text-center font-bold">vs</div>

                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                        selectedPlayer &&
                        selectedPlayer.matchIndex === index &&
                        selectedPlayer.team === 2 &&
                        selectedPlayer.playerIndex === 0
                          ? "bg-blue-100 ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedPlayer) {
                          swapPlayers(index, 2, 0);
                        } else {
                          setSelectedPlayer({
                            matchIndex: index,
                            team: 2,
                            playerIndex: 0,
                          });
                        }
                      }}
                    >
                      選手{match.team2[0].id}
                    </div>
                    <div
                      className={`w-full text-center cursor-pointer hover:bg-gray-100 p-2 rounded ${
                        selectedPlayer &&
                        selectedPlayer.matchIndex === index &&
                        selectedPlayer.team === 2 &&
                        selectedPlayer.playerIndex === 1
                          ? "bg-blue-100 ring-2 ring-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedPlayer) {
                          swapPlayers(index, 2, 1);
                        } else {
                          setSelectedPlayer({
                            matchIndex: index,
                            team: 2,
                            playerIndex: 1,
                          });
                        }
                      }}
                    >
                      選手{match.team2[1].id}
                    </div>
                  </div>
                </div>

                {!match.winner && (
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => setMatchWinner(index, 1)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      チーム1勝利
                    </button>
                    <button
                      onClick={() => setMatchWinner(index, 2)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      チーム2勝利
                    </button>
                  </div>
                )}

                {match.winner && (
                  <div className="text-center mt-4 font-bold text-green-500">
                    チーム{match.winner}の勝利！
                  </div>
                )}
              </div>
            ))}
          </div>

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
          <CompleteMatchesButton completeMatches={completeMatches} />
        </div>
      )}
    </div>
  );
}

const PlayerCard = ({
  player,
  gameHistory,
  winCount,
  onBreakToggle,
  isPlayerInMatch,
}: NewComponentProps) => {
  const gamesPlayed = gameHistory[player.id] || 0;

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
      <div className="font-bold">選手 {player.id}</div>
      <div>試合数: {gamesPlayed}</div>
      <div>勝利数: {winCount}</div>

      {!isPlayerInMatch(player.id) && (
        <div className="ml-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block"
            onClick={() => onBreakToggle(player.id)}
          >
            休憩
          </button>
        </div>
      )}
    </div>
  );
};

type WaitingPlayersProps = {
  players: Player[];
  isPlayerInMatch: (playerId: number) => boolean;
  onBreak: OnBreakState;
  selectedPlayer: {
    matchIndex: number;
    team: number;
    playerIndex: number;
  } | null;
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  setSelectedPlayer: (
    player: {
      matchIndex: number;
      team: number;
      playerIndex: number;
    } | null
  ) => void;
  gameHistory: GameHistory;
  wins: GameHistory;
};

const WaitingPlayers = ({
  players,
  isPlayerInMatch,
  onBreak,
  selectedPlayer,
  matches,
  setMatches,
  setSelectedPlayer,
  gameHistory,
  wins,
}: WaitingPlayersProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">待機中の選手</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {players
          .filter(
            (player) => !isPlayerInMatch(player.id) && !onBreak[player.id]
          )
          .map((player) => (
            <div
              key={player.id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => {
                if (selectedPlayer) {
                  const team = selectedPlayer.team === 1 ? "team1" : "team2";
                  const newMatches = [...matches];
                  const currentMatch = newMatches[selectedPlayer.matchIndex];
                  currentMatch[team][selectedPlayer.playerIndex] = player;
                  setMatches(newMatches);
                  setSelectedPlayer(null);
                }
              }}
            >
              <div className="text-center">選手{player.id}</div>
              <div className="text-center text-gray-500">
                試合数: {gameHistory[player.id] || 0}
              </div>
              <div className="text-center text-blue-500">
                勝利数: {wins[player.id] || 0}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const CompleteMatchesButton = ({
  completeMatches,
}: {
  completeMatches: () => void;
}) => {
  return (
    <button
      onClick={completeMatches}
      className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-8"
    >
      試合終了
    </button>
  );
};

export default MainComponent;
