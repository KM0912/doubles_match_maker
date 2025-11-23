import { useCallback, useState } from 'react';
import useCourtManagement from '../../../hooks/useCourtManagement';
import Header from '../../molecules/Header';
import { BottomNav } from '../../molecules/BottomNav';
import SettingsMenu from '../../organisms/SettingsMenu';
import MatchMenu from '../../organisms/MatchMenu';
import HistoryMenu from '../../organisms/HistoryMenu';
import { Container, Box, Fade, useTheme } from '@mui/material';

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeMenu, setActiveMenu] = useState('match');
  const theme = useTheme();

  const handleMenuChange = useCallback((newValue: string) => {
    setActiveMenu(newValue);
  }, []);

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: theme.palette.grey[50],
      }}
    >
      <Header />

      <Container
        component='section'
        maxWidth='md'
        sx={{
          py: { xs: 4, sm: 5 },
          pb: { xs: 11, sm: 12 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Fade in={activeMenu === 'settings'} unmountOnExit>
          <Box component='section' sx={{ display: activeMenu === 'settings' ? 'block' : 'none' }}>
            <SettingsMenu
              courts={courts}
              onIncrementCourts={incrementCourts}
              onDecrementCourts={decrementCourts}
            />
          </Box>
        </Fade>

        <Fade in={activeMenu === 'match'} unmountOnExit>
          <Box component='section' sx={{ display: activeMenu === 'match' ? 'block' : 'none' }}>
            <MatchMenu courts={courts} />
          </Box>
        </Fade>

        <Fade in={activeMenu === 'history'} unmountOnExit>
          <Box component='section' sx={{ display: activeMenu === 'history' ? 'block' : 'none' }}>
            <HistoryMenu />
          </Box>
        </Fade>
      </Container>

      <BottomNav activeMenu={activeMenu} onMenuChange={handleMenuChange} />
    </Box>
  );
}

export default MainComponent;
