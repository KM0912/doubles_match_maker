import { usePlayerContext } from "../../../contexts/PlayerContext";
import PlayerStatusCard from "../../atoms/PlayerStatusCard";

type Props = {
  isPlayerInMatch: (playerId: number) => boolean;
  selectedPlayer: {
    matchIndex: number;
    team: number;
    playerIndex: number;
  } | null;
};

const PlayerStatusCards: React.FC<Props> = ({
  isPlayerInMatch,
  selectedPlayer,
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
