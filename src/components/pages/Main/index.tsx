import React, { useState } from "react";
import CourtCounter from "../../molecules/CourtCounter";
import useCourtManagement from "../../../hooks/useCourtManagement";
import PlayerCards from "../../molecules/PlayerCards";
import AddPlayerButton from "../../atoms/AddPlayerButton";
import MatchControlPanel from "../../organisms/MatchControlPanel";
import PairHistoryTable from "../../organisms/PairHistoryTable";
import ResetButton from "../../atoms/ResetButton";
import Tabs from "@mui/material/Tabs";
import { Tab } from "@mui/material";

function MainComponent() {
  const { courts, incrementCourts, decrementCourts } = useCourtManagement();
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 max-w-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg shadow-md mb-8">
        <h1 className="text-xl font-bold text-center">
          ダブルス組み合わせメーカー
        </h1>
      </div>

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
    </div>
  );
}

export default MainComponent;
