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
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.08)',
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
          height: { xs: 72, sm: 80 },
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            py: 1.5,
            minWidth: 0,
            color: theme.palette.text.secondary,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: 2,
            mx: 0.5,
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.15)',
              },
            },
            '&:hover': {
              color: theme.palette.primary.main,
              bgcolor: 'rgba(99, 102, 241, 0.05)',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            fontWeight: 500,
            mt: 0.75,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              fontWeight: 700,
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
