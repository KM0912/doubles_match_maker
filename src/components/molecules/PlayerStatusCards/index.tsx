import { usePlayerContext } from "../../../contexts/PlayerContext";
import { GameHistory } from "../../../types";
import PlayerStatusCard from "../../atoms/PlayerStatusCard";

type Props = {
  isPlayerInMatch: (playerId: number) => boolean;
  selectedPlayer: {
    matchIndex: number;
    team: number;
    playerIndex: number;
  } | null;
  gameHistory: GameHistory;
};

const PlayerStatusCards: React.FC<Props> = ({
  isPlayerInMatch,
  selectedPlayer,
  gameHistory,
}) => {
  const { players, setOnBreak } = usePlayerContext();
  return (
    <>
      {players.map((player) => {
        const isPlaying = isPlayerInMatch(player.id);
        return (
          <PlayerStatusCard
            key={player.id}
            player={player}
            gameHistory={gameHistory}
            isPlaying={isPlaying}
            selectedPlayer={!!selectedPlayer}
            setOnBreak={setOnBreak}
            isPlayerInMatch={isPlayerInMatch}
          />
        );
      })}
    </>
  );
};

export default PlayerStatusCards;
