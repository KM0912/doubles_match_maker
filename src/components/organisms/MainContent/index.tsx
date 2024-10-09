import React, { useEffect, useState } from "react";
import SetupControls from "../SetupControls";
import { Space, Typography } from "antd";
import {
  getMatchesFromLocalStorage,
  getPlayersFromLocalStorage,
  getPreviousPlayersFromLocalStorage,
} from "../../../utils/localStorageUtils";
import useMatchManagement from "../../../hooks/useMatchManagement";
import { usePlayers } from "../../../context/PlayersContext";
import PlayerList from "../PlayerList";
import PairingCounts from "../PairingCounts";
import MatchList from "../MatchList";
import ResetButton from "../../atom/ResetButton";

const { Text } = Typography;

type Props = {
  selectedMenuKey: "player" | "pairing" | "match";
};

const MainContent: React.FC<Props> = ({ selectedMenuKey }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [playerCount, setPlayerCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const { setPlayers } = usePlayers();
  const {
    pairingCounts,
    matches,
    setMatches,
    setPreviousPlayers,
    addNewMatch,
    updateMatch,
    deleteMatch,
    finalizeMatch,
  } = useMatchManagement({
    courtCount,
  });

  useEffect(() => {
    const newPlayers = getPlayersFromLocalStorage();
    const newMatches = getMatchesFromLocalStorage();
    const newPreviousPlayers = getPreviousPlayersFromLocalStorage();
    if (newPlayers && newMatches && newPreviousPlayers) {
      setPlayers(newPlayers);
      setMatches(newMatches);
      setPreviousPlayers(newPreviousPlayers);
      setIsSetupComplete(true);
    } else {
      setIsSetupComplete(false);
      setPlayers([]);
      setMatches([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePlayerCount = (count: number) => {
    setPlayerCount(count);
  };

  const updateCourtCount = (count: number) => {
    setCourtCount(count);
  };

  const handleReset = () => {
    setPlayerCount(4);
    setCourtCount(1);
    setIsSetupComplete(false);
    setPlayers([]);
    setMatches([]);
  };

  // 確定ボタンを押したときの処理
  const handleSetupComplete = () => {
    const newPlayers = Array.from({ length: playerCount }).map((_, index) => ({
      id: index + 1,
      matchCount: 0,
      wins: 0,
      rating: 1500,
    }));
    setPlayers(newPlayers);
    setIsSetupComplete(true);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {!isSetupComplete && (
        <>
          <SetupControls
            playerCount={playerCount}
            courtCount={courtCount}
            updatePlayerCount={updatePlayerCount}
            updateCourtCount={updateCourtCount}
            handleSetupComplete={handleSetupComplete}
          />
        </>
      )}
      {isSetupComplete && (
        <>
          <Space direction="horizontal">
            <ResetButton onClick={handleReset} />
            <Text strong>
              参加者数：{playerCount}人、コート数：{courtCount}面
            </Text>
          </Space>
          {selectedMenuKey === "player" && <PlayerList />}
          {selectedMenuKey === "pairing" && (
            <PairingCounts pairingCounts={pairingCounts} />
          )}
          {selectedMenuKey === "match" && (
            <MatchList
              matches={matches}
              addNewMatch={addNewMatch}
              updateMatch={updateMatch}
              deleteMatch={deleteMatch}
              finalizeMatch={finalizeMatch}
            />
          )}
        </>
      )}
    </Space>
  );
};

export default MainContent;
