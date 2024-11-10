import { useMatchContext } from "../../../contexts/MatchContext";
import useSwapPlayer from "../../../hooks/useSwapPlayer";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CurrentMatch from "../../molecules/CurrentMatch";
import WaitingPlayers from "../../molecules/WaitingPlayers";

type Props = {
  courts: number;
};

const MatchControlPanel: React.FC<Props> = ({ courts }) => {
  const { matches } = useMatchContext();
  const {
    selectedPlayer,
    updateSelectedPlayer,
    isPlayerSelected,
    swapPlayers,
  } = useSwapPlayer();

  return (
    <>
      <GenerateMatchesButton courts={courts} />

      {matches.length > 0 && (
        <div>
          <CurrentMatch
            selectedPlayer={selectedPlayer}
            updateSelectedPlayer={updateSelectedPlayer}
            isPlayerSelected={isPlayerSelected}
            swapPlayers={swapPlayers}
          />
          <WaitingPlayers
            selectedPlayer={selectedPlayer}
            updateSelectedPlayer={updateSelectedPlayer}
          />
          <CompleteMatchesButton />
        </div>
      )}
    </>
  );
};

export default MatchControlPanel;
