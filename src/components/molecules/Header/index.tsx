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
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            py: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 2,
              p: 0.75,
              backdropFilter: 'blur(10px)',
            }}
          >
            <SportsTennisIcon
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                color: 'white',
              }}
            />
          </Box>
          <Typography
            variant='h1'
            align='center'
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: { xs: '0.02em', sm: '0.05em' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
