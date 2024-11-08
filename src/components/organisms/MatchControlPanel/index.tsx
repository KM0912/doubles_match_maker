import useMatchManagement from "../../../hooks/useMatchManagement";
import { PairHistory } from "../../../types";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CurrentMatch from "../../molecules/CurrentMatch";
import WaitingPlayers from "../../molecules/WaitingPlayers";

type Props = {
  courts: number;
  pairHistory: PairHistory;
  setPairHistory: React.Dispatch<React.SetStateAction<PairHistory>>;
};

const MatchControlPanel: React.FC<Props> = ({
  courts,
  pairHistory,
  setPairHistory,
}) => {
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
    <>
      <GenerateMatchesButton onClick={generateMatches} matches={matches} />

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
