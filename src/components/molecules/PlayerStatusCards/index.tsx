import { useMatchContext } from "../../../contexts/MatchContext";
import { usePlayerContext } from "../../../contexts/PlayerContext";
import PlayerStatusCard from "../PlayerStatusCard";

const PlayerStatusCards: React.FC = () => {
  const { players, setOnBreak } = usePlayerContext();
  const { isPlayerInMatch } = useMatchContext();
  return (
    <>
      {players.map((player) => {
        const isInMatch = isPlayerInMatch(player.id);
        return (
          <PlayerStatusCard
            key={player.id}
            player={player}
            isPlaying={isInMatch}
            setOnBreak={setOnBreak}
            isInMatch={isInMatch}
          />
        );
      })}
    </>
  );
};

export default PlayerStatusCards;
