import { usePlayerContext } from "../../../contexts/PlayerContext";
import PlayerStatusCard from "../../atoms/PlayerStatusCard";

type Props = {
  isPlayerInMatch: (playerId: number) => boolean;
};

const PlayerStatusCards: React.FC<Props> = ({ isPlayerInMatch }) => {
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
            setOnBreak={setOnBreak}
            isPlayerInMatch={isPlayerInMatch}
          />
        );
      })}
    </>
  );
};

export default PlayerStatusCards;
