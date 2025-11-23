import React from 'react';
import { AppBar, Toolbar, Typography, useTheme, Box } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position='sticky'
      elevation={0}
      component='header'
      sx={{
        top: 0,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        borderBottom: 'none',
        backdropFilter: 'blur(20px)',
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: `0px 4px 20px ${theme.palette.primary.main}40`,
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: { xs: 64, sm: 72 },
          px: { xs: 3, sm: 4 },
          py: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: 3,
              p: 1.25,
              backdropFilter: 'blur(20px)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.35)',
                transform: 'scale(1.05) rotate(5deg)',
              },
            }}
          >
            <SportsTennisIcon
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem' },
                color: 'white',
                filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
              }}
            />
          </Box>
          <Typography
            variant='h1'
            align='center'
            noWrap
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              color: 'white',
              textShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            ダブルス組み合わせメーカー
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
