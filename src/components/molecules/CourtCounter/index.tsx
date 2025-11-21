import React from 'react';
import { Box, Typography, IconButton, Paper, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

type Props = {
  courts: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CourtCounter: React.FC<Props> = ({ courts, onIncrement, onDecrement }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        width: '100%',
        overflow: 'visible',
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifySelf: 'start',
          mb: 2,
          fontWeight: 600,
        }}
      >
        <SportsBaseballIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
        コート数
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <IconButton
          onClick={onDecrement}
          color='primary'
          size='medium'
          disabled={courts <= 1}
          sx={{
            justifySelf: 'center',
            bgcolor: theme.palette.primary.light,
            color: 'white',
            '&:hover': { bgcolor: theme.palette.primary.main },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <RemoveIcon />
        </IconButton>

        <Box
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            minWidth: 80,
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem' },
            }}
          >
            {courts}
          </Typography>
        </Box>

        <IconButton
          onClick={onIncrement}
          color='primary'
          size='medium'
          disabled={courts >= 10}
          sx={{
            justifySelf: 'center',
            bgcolor: theme.palette.primary.light,
            color: 'white',
            '&:hover': { bgcolor: theme.palette.primary.main },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CourtCounter;
