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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeMenu, setActiveMenu] = useState("settings");

  return (
    <>
      <AppBar position="static" className="mx-0">
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            align="center"
            style={{ fontWeight: "bold", letterSpacing: "0.1em" }}
          >
            <span style={{ fontSize: "1.5em", marginRight: "0.2em" }}>🏸</span>
            ダブルス組み合わせメーカー
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className="py-8">
        {activeMenu === "settings" && (
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-4">
              <CourtCounter
                courts={courts}
                onIncrement={incrementCourts}
                onDecrement={decrementCourts}
              />
            </div>
            <AddPlayerButton />
            <ResetButton />
            <PlayerCards />
            <PairHistoryTable />
          </div>
        )}

        {activeMenu === "match" && (
          <div className="mb-8">
            <MatchControlPanel courts={courts} />
          </div>
        )}
      </Container>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={activeMenu}
          onChange={(event, newValue) => {
            console.log(newValue);

            setActiveMenu(newValue);
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
    </>
  );
}

export default MainComponent;
