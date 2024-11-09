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
    swapPlayers,
    setMatchWinner,
    resetMatchWinner,
    isPlayerInMatch,
  } = useMatchContext();

  return (
    <>
      <GenerateMatchesButton courts={courts} />

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
          />
          <CompleteMatchesButton onClick={completeMatches} />
        </div>
      )}
    </>
  );
};

export default MatchControlPanel;
