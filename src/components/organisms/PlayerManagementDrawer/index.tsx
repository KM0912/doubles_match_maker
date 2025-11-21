import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CourtCounter from '../../molecules/CourtCounter';
import AddPlayerButton from '../../atoms/AddPlayerButton';
import PlayerCards from '../../molecules/PlayerCards';
import ResetButton from '../../atoms/ResetButton';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface PlayerManagementDrawerProps {
  open: boolean;
  onClose: () => void;
  courts: number;
  onIncrementCourts: () => void;
  onDecrementCourts: () => void;
}

const PlayerManagementDrawer: React.FC<PlayerManagementDrawerProps> = ({
  open,
  onClose,
  courts,
  onIncrementCourts,
  onDecrementCourts,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400, md: 450 },
          height: { xs: '85vh', sm: '100%' },
          borderTopLeftRadius: { xs: 16, sm: 0 },
          borderTopRightRadius: { xs: 16, sm: 0 },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* ヘッダー */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <PersonAddIcon sx={{ mr: 1 }} />
            プレイヤー管理
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* コンテンツ */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          {/* コート数設定 */}
          <Box sx={{ mb: 3 }}>
            <CourtCounter
              courts={courts}
              onIncrement={onIncrementCourts}
              onDecrement={onDecrementCourts}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* プレイヤー追加 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 1.5 }}>
              プレイヤーを追加
            </Typography>
            <AddPlayerButton />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* プレイヤー一覧 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 1.5 }}>
              参加者一覧
            </Typography>
            <PlayerCards />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* リセット */}
          <Box>
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 600,
                mb: 1.5,
                color: 'error.main',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WarningAmberIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              データリセット
            </Typography>
            <ResetButton />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PlayerManagementDrawer;
