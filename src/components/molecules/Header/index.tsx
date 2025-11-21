import React from 'react';
import { AppBar, Toolbar, Typography, useTheme, IconButton, Box } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';

interface HeaderProps {
  onPlayerDrawerToggle?: () => void;
  onHistoryDrawerToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPlayerDrawerToggle, onHistoryDrawerToggle }) => {
  const theme = useTheme();

  return (
    <AppBar
      position='sticky'
      elevation={0}
      component='header'
      sx={{
        top: 0,
        bgcolor: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <SportsTennisIcon
            sx={{
              mr: 1,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              color: 'white',
            }}
          />
          <Typography
            variant='h6'
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: '0.02em',
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              color: 'white',
            }}
          >
            ダブルス組み合わせ
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {onHistoryDrawerToggle && (
            <IconButton
              onClick={onHistoryDrawerToggle}
              size='small'
              sx={{
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              }}
              aria-label='履歴'
            >
              <HistoryIcon />
            </IconButton>
          )}
          {onPlayerDrawerToggle && (
            <IconButton
              onClick={onPlayerDrawerToggle}
              size='small'
              sx={{
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              }}
              aria-label='プレイヤー管理'
            >
              <PeopleIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
