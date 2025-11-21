import { Paper, BottomNavigation, BottomNavigationAction, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import HistoryIcon from '@mui/icons-material/History';

interface BottomNavProps {
  activeMenu: string;
  onMenuChange: (value: string) => void;
}

export const BottomNav = ({ activeMenu, onMenuChange }: BottomNavProps) => {
  const theme = useTheme();

  return (
    <Paper
      component='nav'
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.drawer + 1,
        borderTop: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={activeMenu}
        onChange={(event, newValue) => {
          onMenuChange(newValue);
        }}
        sx={{
          height: { xs: 64, sm: 70 },
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            py: 1,
            minWidth: 0,
            color: theme.palette.text.secondary,
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)',
              },
            },
            '&:hover': {
              color: theme.palette.primary.main,
              bgcolor: 'rgba(25, 118, 210, 0.04)',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            fontWeight: 500,
            mt: 0.5,
            '&.Mui-selected': {
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              fontWeight: 600,
            },
          },
        }}
      >
        <BottomNavigationAction label='設定' icon={<SettingsIcon />} value='settings' />
        <BottomNavigationAction label='試合' icon={<SportsTennisIcon />} value='match' />
        <BottomNavigationAction label='履歴' icon={<HistoryIcon />} value='history' />
      </BottomNavigation>
    </Paper>
  );
};
