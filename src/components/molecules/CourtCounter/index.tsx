import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';

type Props = {
  courts: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CourtCounter: React.FC<Props> = ({ courts, onIncrement, onDecrement }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        width: '100%',
        overflow: 'visible',
        bgcolor: 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Typography
        variant='h6'
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2.5,
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        <SportsBaseballIcon sx={{ mr: 1.5, fontSize: '1.5rem', color: 'primary.main' }} />
        コート数
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 2,
        }}
      >
        <IconButton
          onClick={onDecrement}
          color='primary'
          size='medium'
          disabled={courts <= 1}
          sx={{
            bgcolor: 'rgba(25, 118, 210, 0.08)',
            borderRadius: 2,
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 },
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.16)',
              transform: 'scale(1.05)',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              color: 'text.disabled',
            },
          }}
        >
          <RemoveIcon />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            py: 1.5,
            px: 2,
            minWidth: { xs: 80, sm: 100 },
          }}
        >
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              lineHeight: 1,
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
            bgcolor: 'rgba(25, 118, 210, 0.08)',
            borderRadius: 2,
            width: { xs: 44, sm: 48 },
            height: { xs: 44, sm: 48 },
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'rgba(25, 118, 210, 0.16)',
              transform: 'scale(1.05)',
            },
            '&.Mui-disabled': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              color: 'text.disabled',
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CourtCounter;
