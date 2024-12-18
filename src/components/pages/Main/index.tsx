import React, { useState } from "react";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerCards from "../../molecules/PlayerCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";
import PairHistoryTable from "../../organisms/PairHistoryTable";
import ResetButton from "../../atoms/ResetButton";
import Tabs from "@mui/material/Tabs";
import { AppBar, Container, Tab, Toolbar, Typography } from "@mui/material";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeTab, setActiveTab] = useState("settings");

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

      <Container>
        <div className="mb-8">
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => {
              setActiveTab(newValue);
            }}
            variant="fullWidth"
          >
            <Tab label="設定" value="settings" />
            <Tab label="試合" value="match" />
          </Tabs>
        </div>

        {activeTab === "settings" && (
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

        {activeTab === "match" && (
          <div className="mb-8">
            <MatchControlPanel courts={courts} />
          </div>
        )}
      </Container>
    </>
  );
}

export default MainComponent;
