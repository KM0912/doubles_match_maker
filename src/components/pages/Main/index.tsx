import { useCallback, useState } from "react";
import useCourtManagement from "../../../hooks/useCourtManagement";
import Header from "../../molecules/Header";
import { BottomNav } from "../../molecules/BottomNav";
import SettingsMenu from "../../organisms/SettingsMenu";
import MatchMenu from "../../organisms/MatchMenu";
import HistoryMenu from "../../organisms/HistoryMenu";
import {
  Container,
  Box,
  Fade,
  Paper,
  Stack,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

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
        position: "relative",
        pb: { xs: 10, sm: 12 },
      }}
    >
      <Header />

      <Container
        component="section"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 5 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 3, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(135deg, rgba(56,96,240,0.12), rgba(255,255,255,0.95))",
            border: "1px solid rgba(56, 96, 240, 0.15)",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
            >
              <Stack spacing={1}>
                <Chip
                  color="primary"
                  label="リアルタイムでダブルス運営"
                  icon={<SportsTennisIcon sx={{ fontSize: "1rem" }} />}
                  sx={{
                    width: "fit-content",
                    fontWeight: 600,
                    px: 1,
                  }}
                />
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: "text.primary",
                  }}
                >
                  参加者管理から試合進行、履歴まで。
                  <br />
                  チームの状況を一目で把握しましょう。
                </Typography>
              </Stack>

              <Box
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  display: "grid",
                  gap: 1,
                  gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(1, minmax(0, 1fr))" },
                }}
              >
                <SummaryChip label={`コート数: ${courts}`} />
                <SummaryChip label="ペア履歴をリアルタイムに蓄積" color="secondary" />
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary">
              メニューから設定・試合管理・履歴を切り替えて、スムーズな大会運営を実現します。
            </Typography>
          </Stack>
        </Paper>

        <Fade in={activeMenu === "settings"} unmountOnExit>
          <Box
            component="section"
            sx={{ display: activeMenu === "settings" ? "block" : "none" }}
          >
            <SettingsMenu
              courts={courts}
              onIncrementCourts={incrementCourts}
              onDecrementCourts={decrementCourts}
            />
          </Box>
        </Fade>

        <Fade in={activeMenu === "match"} unmountOnExit>
          <Box
            component="section"
            sx={{ display: activeMenu === "match" ? "block" : "none" }}
          >
            <MatchMenu courts={courts} />
          </Box>
        </Fade>

        <Fade in={activeMenu === "history"} unmountOnExit>
          <Box
            component="section"
            sx={{ display: activeMenu === "history" ? "block" : "none" }}
          >
            <HistoryMenu />
          </Box>
        </Fade>
      </Container>

      <BottomNav activeMenu={activeMenu} onMenuChange={handleMenuChange} />
    </Box>
  );
}

type SummaryChipProps = {
  label: string;
  color?: "primary" | "secondary";
};

const SummaryChip = ({ label, color = "primary" }: SummaryChipProps) => (
  <Chip
    label={label}
    color={color}
    variant="outlined"
    sx={{
      fontWeight: 600,
      px: 1.5,
      py: 1,
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.8)",
      borderColor:
        color === "primary"
          ? "rgba(56, 96, 240, 0.2)"
          : "rgba(244, 91, 105, 0.25)",
      color: color === "primary" ? "primary.main" : "secondary.main",
    }}
  />
);

export default MainComponent;
