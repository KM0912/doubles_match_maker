import { useCallback, useState } from "react";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerCards from "../../molecules/PlayerCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";
import PairHistoryTable from "../../organisms/PairHistoryTable";
import ResetButton from "../../atoms/ResetButton";
import Header from "../../molecules/Header";
import { BottomNav } from "../../molecules/BottomNav";
import {
  Container,
  Paper,
  Typography,
  Box,
  Fade,
  useTheme,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HistoryIcon from "@mui/icons-material/History";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeMenu, setActiveMenu] = useState("settings");
  const theme = useTheme();

  const handleMenuChange = useCallback((newValue: string) => {
    setActiveMenu(newValue);
  }, []);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: theme.palette.grey[50],
      }}
    >
      <Header />

      <Container
        component="section"
        maxWidth="md"
        sx={{
          py: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Fade in={activeMenu === "settings"} unmountOnExit>
          <Box
            component="section"
            sx={{ display: activeMenu === "settings" ? "block" : "none" }}
          >
            <Paper
              component="article"
              elevation={1}
              sx={{ p: 2, mb: 3, borderRadius: 2 }}
            >
              <Typography
                component="h2"
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

            <Paper
              component="article"
              elevation={1}
              sx={{ p: 2, mb: 3, borderRadius: 2 }}
            >
              <Typography
                component="h2"
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

            <Paper
              component="article"
              elevation={1}
              sx={{ p: 2, mb: 3, borderRadius: 2 }}
            >
              <Typography
                component="h2"
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

            <Paper
              component="article"
              elevation={1}
              sx={{ p: 2, mb: 5, borderRadius: 2 }}
            >
              <Typography
                component="h2"
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
          <Box
            component="section"
            sx={{ display: activeMenu === "match" ? "block" : "none" }}
          >
            <Paper
              component="article"
              elevation={1}
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 5,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Typography
                component="h2"
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

      <BottomNav activeMenu={activeMenu} onMenuChange={handleMenuChange} />
    </Box>
  );
}

export default MainComponent;
