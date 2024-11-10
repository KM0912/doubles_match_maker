import { useMatchContext } from "../../../contexts/MatchContext";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CurrentMatch from "../../molecules/CurrentMatch";
import WaitingPlayers from "../../molecules/WaitingPlayers";

type Props = {
  courts: number;
};

const MatchControlPanel: React.FC<Props> = ({ courts }) => {
  const { matches } = useMatchContext();

  return (
    <>
      <GenerateMatchesButton courts={courts} />

      {matches.length > 0 && (
        <div>
          <CurrentMatch />
          <WaitingPlayers />
          <CompleteMatchesButton />
        </div>
      )}
    </>
  );
};

export default MatchControlPanel;
