import { Box, Paper, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CourtCounter from "../../molecules/CourtCounter";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import PlayerCards from "../../molecules/PlayerCards";
import ResetButton from "../../atoms/ResetButton";
import {
  commonPaperStyles,
  commonTypographyStyles,
} from "../../../styles/common";

interface SettingsMenuProps {
  courts: number;
  onIncrementCourts: () => void;
  onDecrementCourts: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({
  courts,
  onIncrementCourts,
  onDecrementCourts,
}) => {
  return (
    <Box>
      <Paper
        component="article"
        elevation={1}
        sx={{ ...commonPaperStyles, mb: 3 }}
      >
        <Typography component="h2" variant="h6" sx={commonTypographyStyles}>
          <span style={{ fontSize: "1.2em", marginRight: "0.4em" }}>⚙️</span>
          基本設定
        </Typography>
        <CourtCounter
          courts={courts}
          onIncrement={onIncrementCourts}
          onDecrement={onDecrementCourts}
        />
      </Paper>

      <Paper
        component="article"
        elevation={1}
        sx={{ ...commonPaperStyles, mb: 3 }}
      >
        <Typography component="h2" variant="h6" sx={commonTypographyStyles}>
          <PersonAddIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
          参加者一覧
        </Typography>
        <Box sx={{ mb: 3 }}>
          <AddPlayerButton />
        </Box>
        <PlayerCards />
      </Paper>

      <Paper
        component="article"
        elevation={1}
        sx={{ ...commonPaperStyles, mb: 5 }}
      >
        <Typography
          component="h2"
          variant="h6"
          sx={{
            ...commonTypographyStyles,
            color: "error.main",
          }}
        >
          <WarningAmberIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
          データリセット
        </Typography>
        <ResetButton />
      </Paper>
    </Box>
  );
};

export default SettingsMenu;
