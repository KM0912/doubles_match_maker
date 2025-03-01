import React, { useState } from "react";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerCards from "../../molecules/PlayerCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";
import PairHistoryTable from "../../organisms/PairHistoryTable";
import ResetButton from "../../atoms/ResetButton";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Toolbar,
  Typography,
  Box,
  Fade,
  useTheme,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeMenu, setActiveMenu] = useState("settings");
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: theme.palette.grey[50],
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: theme.palette.primary.main }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.1em",
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.2em", marginRight: "0.4em" }}>🏸</span>
            ダブルス組み合わせメーカー
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          py: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Fade in={activeMenu === "settings"} unmountOnExit>
          <Box sx={{ display: activeMenu === "settings" ? "block" : "none" }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                基本設定
              </Typography>
              <CourtCounter
                courts={courts}
                onIncrement={incrementCourts}
                onDecrement={decrementCourts}
              />
            </Box>

            <AddPlayerButton />

            <Box sx={{ mb: 3 }}>
              <ResetButton />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                参加者一覧
              </Typography>
              <PlayerCards />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                ペア履歴
              </Typography>
              <PairHistoryTable />
            </Box>
          </Box>
        </Fade>

        <Fade in={activeMenu === "match"} unmountOnExit>
          <Box sx={{ display: activeMenu === "match" ? "block" : "none" }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              試合管理
            </Typography>
            <MatchControlPanel courts={courts} />
          </Box>
        </Fade>
      </Container>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={activeMenu}
          onChange={(event, newValue) => {
            setActiveMenu(newValue);
          }}
          sx={{
            height: 65,
            "& .MuiBottomNavigationAction-root": {
              py: 1,
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
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MainComponent;
