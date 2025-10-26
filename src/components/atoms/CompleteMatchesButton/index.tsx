import { useMatchContext } from "../../../contexts/MatchContext";
import ActionButton from "../ActionButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Box } from "@mui/material";

const CompleteMatchesButton: React.FC = () => {
  const { completeMatches } = useMatchContext();
  return (
    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
      <ActionButton
        onClick={() => completeMatches()}
        color="primary"
        variant="outlined"
        startIcon={<DoneAllIcon />}
        sx={{
          py: { xs: 1, sm: 1.5 },
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        試合終了
      </ActionButton>
    </Box>
  );
};

export default CompleteMatchesButton;
