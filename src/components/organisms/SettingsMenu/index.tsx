import { Box, Paper, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TuneIcon from "@mui/icons-material/Tune";
import CourtCounter from "../../molecules/CourtCounter";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import PlayerCards from "../../molecules/PlayerCards";
import ResetButton from "../../atoms/ResetButton";
import {
  commonPaperStyles,
} from "../../../styles/common";
import SectionTitle from "../../atoms/SectionTitle";

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
    <Stack spacing={3}>
      <Paper component="article" elevation={1} sx={{ ...commonPaperStyles, mb: 0 }}>
        <SectionTitle
          icon={<TuneIcon color="primary" sx={{ fontSize: "1.35rem" }} />}
          subtitle="コート数を状況に合わせて調整できます"
        >
          基本設定
        </SectionTitle>
        <CourtCounter
          courts={courts}
          onIncrement={onIncrementCourts}
          onDecrement={onDecrementCourts}
        />
      </Paper>

      <Paper component="article" elevation={1} sx={{ ...commonPaperStyles, mb: 0 }}>
        <SectionTitle
          icon={<PersonAddIcon color="primary" sx={{ fontSize: "1.35rem" }} />}
          subtitle="参加者の追加・休憩・削除をここから操作"
        >
          参加者一覧
        </SectionTitle>
        <Box sx={{ mb: 3 }}>
          <AddPlayerButton />
        </Box>
        <PlayerCards />
      </Paper>

      <Paper component="article" elevation={1} sx={{ ...commonPaperStyles, mb: 0 }}>
        <SectionTitle
          icon={<WarningAmberIcon color="error" sx={{ fontSize: "1.35rem" }} />}
          subtitle="すべてのデータを完全に削除します"
        >
          データリセット
        </SectionTitle>
        <ResetButton />
      </Paper>
    </Stack>
  );
};

export default SettingsMenu;
