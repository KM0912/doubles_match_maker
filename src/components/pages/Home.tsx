import React, { useEffect, useState } from "react";
import { Layout, Space, Typography } from "antd";
import SetupControls from "../organisms/SetupControls";
import useMatchManagement from "../../hooks/useMatchManagement";
import PlayerList from "../organisms/PlayerList";
import FooterMenu from "../organisms/FooterMenu";
import { MenuType } from "../../types";
import PairingCounts from "../organisms/PairingCounts";
import { usePlayers } from "../../context/PlayersContext";
import HeaderMenu from "../organisms/HeaderMenu";
import {
  getMatchesFromLocalStorage,
  getPlayersFromLocalStorage,
  getPreviousPlayersFromLocalStorage,
} from "../../utils/localStorageUtils";
import MatchList from "../organisms/MatchList";

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  const [selectedMenuKey, setSelectedMenuKey] = useState<MenuType>("player");
  const [playerCount, setPlayerCount] = useState(4);
  const [courtCount, setCourtCount] = useState(1);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
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
  const { setPlayers } = usePlayers();

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

  const handleIncrementParticipant = () => {
    setPlayerCount(playerCount + 1);
  };

  const handleDecrementParticipant = () => {
    if (playerCount <= 4) {
      setPlayerCount(4);
    } else {
      setPlayerCount(playerCount - 1);
    }
  };

  const handleIncrementCourt = () => {
    setCourtCount(courtCount + 1);
  };

  const handleDecrementCourt = () => {
    if (courtCount <= 1) {
      setCourtCount(1);
    } else {
      setCourtCount(courtCount - 1);
    }
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

  const handleReset = () => {
    setPlayerCount(4);
    setCourtCount(1);
    setIsSetupComplete(false);
    setPlayers([]);
    setMatches([]);
  };

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header>
        <HeaderMenu onResetConfirm={handleReset} />
      </Header>
      <Content style={{ minHeight: 280, overflowY: "auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {!isSetupComplete && (
            <>
              <SetupControls
                participantCount={playerCount}
                courtCount={courtCount}
                handleIncrementParticipant={handleIncrementParticipant}
                handleDecrementParticipant={handleDecrementParticipant}
                handleIncrementCourt={handleIncrementCourt}
                handleDecrementCourt={handleDecrementCourt}
                handleSetupComplete={handleSetupComplete}
              />
            </>
          )}
          {isSetupComplete && (
            <>
              <Text strong>
                参加者数：{playerCount}人、コート数：{courtCount}面
              </Text>
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
      </Content>
      <Footer style={{ padding: "0" }}>
        <FooterMenu
          onClick={({ key }) =>
            setSelectedMenuKey(key as "player" | "pairing" | "match")
          }
        />
      </Footer>
    </Layout>
  );
};

export default Home;
