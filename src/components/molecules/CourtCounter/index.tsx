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
        p: { xs: 3, sm: 3.5 },
        borderRadius: 4,
        width: '100%',
        overflow: 'visible',
        bgcolor: 'background.paper',
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Typography
        variant='h6'
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
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
          <SportsBaseballIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
        </Box>
        コート数
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 2.5,
        }}
      >
        <IconButton
          onClick={onDecrement}
          color='primary'
          size='large'
          disabled={courts <= 1}
          sx={{
            bgcolor: `${theme.palette.primary.main}10`,
            borderRadius: 2.5,
            width: { xs: 52, sm: 56 },
            height: { xs: 52, sm: 56 },
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            border: `2px solid ${theme.palette.primary.main}20`,
            '&:hover': {
              bgcolor: `${theme.palette.primary.main}20`,
              transform: 'scale(1.1)',
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-disabled': {
              bgcolor: `${theme.palette.grey[200]}40`,
              borderColor: theme.palette.divider,
              color: 'text.disabled',
            },
          }}
        >
          <RemoveIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            borderRadius: 4,
            py: 2,
            px: 3,
            minWidth: { xs: 100, sm: 120 },
            boxShadow: `0px 4px 16px ${theme.palette.primary.main}30`,
          }}
        >
          <Typography
            variant='h3'
            sx={{
              textAlign: 'center',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3rem' },
              lineHeight: 1,
              textShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            {courts}
          </Typography>
        </Box>

        <IconButton
          onClick={onIncrement}
          color='primary'
          size='large'
          disabled={courts >= 10}
          sx={{
            bgcolor: `${theme.palette.primary.main}10`,
            borderRadius: 2.5,
            width: { xs: 52, sm: 56 },
            height: { xs: 52, sm: 56 },
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            border: `2px solid ${theme.palette.primary.main}20`,
            '&:hover': {
              bgcolor: `${theme.palette.primary.main}20`,
              transform: 'scale(1.1)',
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-disabled': {
              bgcolor: `${theme.palette.grey[200]}40`,
              borderColor: theme.palette.divider,
              color: 'text.disabled',
            },
          }}
        >
          <AddIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CourtCounter;
