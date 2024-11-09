import { useMatchContext } from "../../../contexts/MatchContext";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CurrentMatch from "../../molecules/CurrentMatch";
import WaitingPlayers from "../../molecules/WaitingPlayers";

type Props = {
  courts: number;
};

const MatchControlPanel: React.FC<Props> = ({ courts }) => {
  const {
    matches,
    setMatches,
    completeMatches,
    selectedPlayer,
    setSelectedPlayer,
    isPlayerInMatch,
  } = useMatchContext();

  return (
    <>
      <GenerateMatchesButton courts={courts} />

      {matches.length > 0 && (
        <div>
          <CurrentMatch />

          <WaitingPlayers
            isPlayerInMatch={isPlayerInMatch}
            selectedPlayer={selectedPlayer}
            matches={matches}
            setMatches={setMatches}
            setSelectedPlayer={setSelectedPlayer}
          />
          <CompleteMatchesButton onClick={completeMatches} />
        </div>
      )}
    </>
  );
};

export default MatchControlPanel;
