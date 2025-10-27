import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

type PlayerActionsProps = {
  isOnBreak: boolean;
  onBreakToggle: () => void;
  onRemove: () => void;
};

export const PlayerActions = ({
  isOnBreak,
  onBreakToggle,
  onRemove,
}: PlayerActionsProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title={isOnBreak ? "復帰" : "休憩"}>
        <IconButton
          size="medium"
          color="default"
          onClick={onBreakToggle}
          sx={{ 
            p: 1,
            color: isOnBreak ? "primary.main" : "warning.main"
          }}
        >
          {isOnBreak ? (
            <PlayCircleIcon fontSize="medium" />
          ) : (
            <PauseCircleIcon fontSize="medium" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="削除">
        <IconButton
          size="medium"
          color="error"
          onClick={onRemove}
          sx={{ p: 1 }}
        >
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
