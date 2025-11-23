import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useTheme } from '@mui/material/styles';

type PlayerActionsProps = {
  isOnBreak: boolean;
  onBreakToggle: () => void;
  onRemove: () => void;
};

export const PlayerActions = ({ isOnBreak, onBreakToggle, onRemove }: PlayerActionsProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title={isOnBreak ? '復帰' : '休憩'} arrow>
        <IconButton
          size='medium'
          onClick={onBreakToggle}
          sx={{
            p: 1.25,
            color: isOnBreak ? theme.palette.success.main : theme.palette.warning.main,
            bgcolor: isOnBreak
              ? `${theme.palette.success.main}15`
              : `${theme.palette.warning.main}15`,
            borderRadius: 2,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor: isOnBreak
                ? `${theme.palette.success.main}25`
                : `${theme.palette.warning.main}25`,
              transform: 'scale(1.1) rotate(5deg)',
            },
          }}
        >
          {isOnBreak ? (
            <PlayCircleIcon sx={{ fontSize: '1.5rem' }} />
          ) : (
            <PauseCircleIcon sx={{ fontSize: '1.5rem' }} />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title='削除' arrow>
        <IconButton
          size='medium'
          color='error'
          onClick={onRemove}
          sx={{
            p: 1.25,
            bgcolor: `${theme.palette.error.main}15`,
            borderRadius: 2,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              bgcolor: `${theme.palette.error.main}25`,
              transform: 'scale(1.1) rotate(-5deg)',
            },
          }}
        >
          <DeleteIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
