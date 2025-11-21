import { useMatchContext } from '../../../contexts/MatchContext';
import useSwapPlayer from '../../../hooks/useSwapPlayer';
import CompleteMatchesButton from '../../atoms/CompleteMatchesButton';
import GenerateMatchesButton from '../../atoms/GenerateMatchesButton';
import CurrentMatch from '../../molecules/CurrentMatch';
import WaitingPlayers from '../../molecules/WaitingPlayers';
import { Box, Stack, Paper, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  courts: number;
  onIncrementCourts: () => void;
  onDecrementCourts: () => void;
};

const MatchControlPanel: React.FC<Props> = ({ courts, onIncrementCourts, onDecrementCourts }) => {
  const { matches } = useMatchContext();
  const { selectedPlayer, updateSelectedPlayer, isPlayerSelected, swapPlayers } = useSwapPlayer();
  const theme = useTheme();

  return (
    <Stack spacing={3}>
      {/* 試合生成ボタン */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          textAlign: 'center',
        }}
      >
        <GenerateMatchesButton courts={courts} />
      </Paper>

      {matches.length > 0 && (
        <>
          {/* 現在の試合 */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CurrentMatch
              selectedPlayer={selectedPlayer}
              updateSelectedPlayer={updateSelectedPlayer}
              isPlayerSelected={isPlayerSelected}
              swapPlayers={swapPlayers}
            />
          </Paper>

          {/* 待機中の選手 */}
          {selectedPlayer && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                bgcolor: 'action.hover',
                border: `2px dashed ${theme.palette.primary.main}`,
              }}
            >
              <Typography
                variant='subtitle2'
                sx={{
                  mb: 1.5,
                  color: 'primary.main',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                👆 入れ替えたい選手をタップしてください
              </Typography>
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <WaitingPlayers
              selectedPlayer={selectedPlayer}
              updateSelectedPlayer={updateSelectedPlayer}
            />
          </Paper>

          <Divider />

          {/* 試合終了ボタン */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CompleteMatchesButton />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default MatchControlPanel;
