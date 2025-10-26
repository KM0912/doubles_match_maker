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
          size="small"
          color="default"
          onClick={onBreakToggle}
          sx={{ 
            p: 0.5,
            color: isOnBreak ? "success.main" : "warning.main"
          }}
        >
          {isOnBreak ? (
            <PlayCircleIcon fontSize="small" />
          ) : (
            <PauseCircleIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="削除">
        <IconButton
          size="small"
          color="error"
          onClick={onRemove}
          sx={{ p: 0.5 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
