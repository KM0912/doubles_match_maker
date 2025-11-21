import { Box, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

type PlayerActionsProps = {
  isOnBreak: boolean;
  onBreakToggle: () => void;
  onRemove: () => void;
};

export const PlayerActions = ({ isOnBreak, onBreakToggle, onRemove }: PlayerActionsProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Tooltip title={isOnBreak ? '復帰' : '休憩'}>
        <IconButton
          size='medium'
          color='default'
          onClick={onBreakToggle}
          sx={{
            p: 1,
            color: isOnBreak ? 'primary.main' : 'warning.main',
            bgcolor: isOnBreak ? 'rgba(25, 118, 210, 0.08)' : 'rgba(237, 108, 2, 0.08)',
            borderRadius: 1.5,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: isOnBreak ? 'rgba(25, 118, 210, 0.16)' : 'rgba(237, 108, 2, 0.16)',
              transform: 'scale(1.1)',
            },
          }}
        >
          {isOnBreak ? <PlayCircleIcon fontSize='medium' /> : <PauseCircleIcon fontSize='medium' />}
        </IconButton>
      </Tooltip>

      <Tooltip title='削除'>
        <IconButton
          size='medium'
          color='error'
          onClick={onRemove}
          sx={{
            p: 1,
            bgcolor: 'rgba(211, 47, 47, 0.08)',
            borderRadius: 1.5,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'rgba(211, 47, 47, 0.16)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <DeleteIcon fontSize='medium' />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
