import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import HistoryIcon from "@mui/icons-material/History";
import { useTheme } from "@mui/material/styles";

interface BottomNavProps {
  activeMenu: string;
  onMenuChange: (value: string) => void;
}

export const BottomNav = ({ activeMenu, onMenuChange }: BottomNavProps) => {
  const theme = useTheme();

  return (
    <Paper
      component="nav"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 -12px 32px rgba(15, 23, 42, 0.12)",
      }}
      elevation={0}
    >
      <Container maxWidth="lg" disableGutters>
        <BottomNavigation
          showLabels
          value={activeMenu}
          onChange={(event, newValue) => {
            onMenuChange(newValue);
          }}
          sx={{
            height: { xs: 64, sm: 70 },
            px: { xs: 1, sm: 2 },
            "& .MuiBottomNavigationAction-root": {
              py: 1,
              minWidth: 0,
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
              fontWeight: 600,
            },
          }}
        >
          <BottomNavigationAction
            label="設定"
            icon={<SettingsIcon />}
            value="settings"
          />
          <BottomNavigationAction
            label="試合"
            icon={<SportsTennisIcon />}
            value="match"
          />
          <BottomNavigationAction
            label="履歴"
            icon={<HistoryIcon />}
            value="history"
          />
        </BottomNavigation>
      </Container>
    </Paper>
  );
};
