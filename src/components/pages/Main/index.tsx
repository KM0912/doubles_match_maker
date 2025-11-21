import { useState, useCallback } from 'react';
import useCourtManagement from '../../../hooks/useCourtManagement';
import Header from '../../molecules/Header';
import MatchControlPanel from '../../organisms/MatchControlPanel';
import PlayerManagementDrawer from '../../organisms/PlayerManagementDrawer';
import HistoryDrawer from '../../organisms/HistoryDrawer';
import QuickStats from '../../molecules/QuickStats';
import { Container, Box, useTheme, Fab, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [playerDrawerOpen, setPlayerDrawerOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const theme = useTheme();

  const handlePlayerDrawerToggle = useCallback(() => {
    setPlayerDrawerOpen((prev) => !prev);
  }, []);

  const handleHistoryDrawerToggle = useCallback(() => {
    setHistoryDrawerOpen((prev) => !prev);
  }, []);

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
      }}
    >
      <Header
        onPlayerDrawerToggle={handlePlayerDrawerToggle}
        onHistoryDrawerToggle={handleHistoryDrawerToggle}
      />

      <Container
        component='section'
        maxWidth='lg'
        sx={{
          py: { xs: 2, sm: 3 },
          pb: { xs: 10, sm: 12 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <QuickStats courts={courts} />

        <Box sx={{ mt: 3, flexGrow: 1 }}>
          <MatchControlPanel
            courts={courts}
            onIncrementCourts={incrementCourts}
            onDecrementCourts={decrementCourts}
          />
        </Box>
      </Container>

      {/* フローティングアクションボタン */}
      <Tooltip title='プレイヤー管理' placement='left'>
        <Fab
          color='primary'
          aria-label='プレイヤー管理'
          onClick={handlePlayerDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
          }}
        >
          <PeopleIcon />
        </Fab>
      </Tooltip>

      <Tooltip title='履歴' placement='left'>
        <Fab
          color='secondary'
          aria-label='履歴'
          onClick={handleHistoryDrawerToggle}
          sx={{
            position: 'fixed',
            bottom: { xs: 160, sm: 100 },
            right: { xs: 16, sm: 24 },
            zIndex: 1000,
          }}
        >
          <HistoryIcon />
        </Fab>
      </Tooltip>

      {/* ドロワー */}
      <PlayerManagementDrawer
        open={playerDrawerOpen}
        onClose={handlePlayerDrawerToggle}
        courts={courts}
        onIncrementCourts={incrementCourts}
        onDecrementCourts={decrementCourts}
      />

      <HistoryDrawer open={historyDrawerOpen} onClose={handleHistoryDrawerToggle} />
    </Box>
  );
}

export default MainComponent;
