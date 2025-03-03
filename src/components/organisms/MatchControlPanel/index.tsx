import { useMatchContext } from "../../../contexts/MatchContext";
import useSwapPlayer from "../../../hooks/useSwapPlayer";
import CompleteMatchesButton from "../../atoms/CompleteMatchesButton";
import GenerateMatchesButton from "../../atoms/GenerateMatchesButton";
import CurrentMatch from "../../molecules/CurrentMatch";
import WaitingPlayers from "../../molecules/WaitingPlayers";
import { Box, Button, Stack } from "@mui/material";

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
    <Stack spacing={2}>
      <Box sx={{ width: "100%" }}>
        <GenerateMatchesButton courts={courts} />
      </Box>

      {matches.length > 0 && (
        <Stack spacing={3} sx={{ width: "100%", pb: { xs: 8, sm: 10 } }}>
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
          <Box sx={{ mt: 2 }}>
            <CompleteMatchesButton />
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default MatchControlPanel;
