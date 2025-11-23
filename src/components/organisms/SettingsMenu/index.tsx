import { Box, Paper, Typography, useTheme } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CourtCounter from '../../molecules/CourtCounter';
import AddPlayerButton from '../../atoms/AddPlayerButton';
import PlayerCards from '../../molecules/PlayerCards';
import ResetButton from '../../atoms/ResetButton';
import { commonPaperStyles, commonTypographyStyles } from '../../../styles/common';

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
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <CourtCounter
          courts={courts}
          onIncrement={onIncrementCourts}
          onDecrement={onDecrementCourts}
        />
      </Box>

      <Paper component='article' elevation={1} sx={{ ...commonPaperStyles, mb: 3 }}>
        <Typography
          component='h2'
          variant='h6'
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3.5,
            fontWeight: 700,
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            color: 'text.primary',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${theme.palette.primary.main}15`,
              borderRadius: 2,
              p: 1,
              mr: 1.5,
            }}
          >
            <PersonAddIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
          </Box>
          参加者一覧
        </Typography>
        <Box sx={{ mb: 3 }}>
          <AddPlayerButton />
        </Box>
        <PlayerCards />
      </Paper>

      <Paper component='article' elevation={1} sx={{ ...commonPaperStyles, mb: 5 }}>
        <Typography
          component='h2'
          variant='h6'
          sx={{
            ...commonTypographyStyles,
            color: 'error.main',
          }}
        >
          <WarningAmberIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
          データリセット
        </Typography>
        <ResetButton />
      </Paper>
    </Box>
  );
};

export default SettingsMenu;
