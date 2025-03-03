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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HistoryIcon from "@mui/icons-material/History";

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
            variant="h6"
            align="center"
            noWrap
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.05em",
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: { xs: "1rem", sm: "1.25rem" },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            <SportsTennisIcon
              sx={{ mr: 1, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
            />
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
            <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1.2em", marginRight: "0.4em" }}>
                  ⚙️
                </span>
                基本設定
              </Typography>
              <CourtCounter
                courts={courts}
                onIncrement={incrementCourts}
                onDecrement={decrementCourts}
              />
            </Paper>

            <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PersonAddIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                参加者一覧
              </Typography>
              <Box sx={{ mb: 3 }}>
                <AddPlayerButton />
              </Box>
              <PlayerCards />
            </Paper>

            <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <HistoryIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                ペア履歴
              </Typography>
              <PairHistoryTable />
            </Paper>

            <Paper elevation={1} sx={{ p: 2, mb: 5, borderRadius: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: theme.palette.error.main,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WarningAmberIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
                データ管理
              </Typography>
              <ResetButton />
            </Paper>
          </Box>
        </Fade>

        <Fade in={activeMenu === "match"} unmountOnExit>
          <Box sx={{ display: activeMenu === "match" ? "block" : "none" }}>
            <Paper
              elevation={1}
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 5,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                <span style={{ fontSize: "1.2em", marginRight: "0.4em" }}>
                  🎮
                </span>
                試合管理
              </Typography>
              <MatchControlPanel courts={courts} />
            </Paper>
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
            height: { xs: 60, sm: 65 },
            "& .MuiBottomNavigationAction-root": {
              py: 1,
              minWidth: 0,
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: { xs: "0.7rem", sm: "0.75rem" },
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
