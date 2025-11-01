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
            color: isOnBreak ? "primary.main" : "warning.main",
            bgcolor: isOnBreak
              ? "rgba(56, 96, 240, 0.12)"
              : "rgba(244, 160, 0, 0.12)",
            borderRadius: 2,
            transition: "all 0.2s ease",
            boxShadow: "0 6px 12px rgba(15, 23, 42, 0.1)",
            "&:hover": {
              bgcolor: isOnBreak
                ? "rgba(56, 96, 240, 0.2)"
                : "rgba(244, 160, 0, 0.2)",
            },
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
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: "rgba(244, 67, 54, 0.12)",
            transition: "all 0.2s ease",
            boxShadow: "0 6px 12px rgba(244, 67, 54, 0.2)",
            "&:hover": {
              bgcolor: "rgba(244, 67, 54, 0.2)",
            },
          }}
        >
          <DeleteIcon fontSize="medium" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
