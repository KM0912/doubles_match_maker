import React, { useEffect, useState } from "react";
import { Button, Layout, Space, Typography } from "antd";
import SetupControls from "../organisms/SetupControls";
import useMatchManagement from "../../hooks/useMatchManagement";
import PlayerList from "../organisms/PlayerList";
import Matchup from "../molecules/Matchup";
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

  const handleClickWin = (matchIndex: number, pairIndex: number) => {
    finalizeMatch(matchIndex, pairIndex);
  };

  const handleReset = () => {
    setPlayerCount(4);
    setCourtCount(1);
    setIsSetupComplete(false);
    setPlayers([]);
    setMatches([]);
  };

  // すべての試合が終了しているかどうか
  const isAllMatchEnd = matches.every((match) => match.isEnd);

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header>
        <HeaderMenu onResetConfirm={handleReset} />
      </Header>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Space direction="vertical">
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
                <>
                  {matches.map((match, index) => (
                    <Matchup
                      key={index}
                      match={match}
                      index={index}
                      onClickWin={handleClickWin}
                      updateMatch={(match) => updateMatch(index, match)}
                      deleteMatch={() => deleteMatch(index)}
                    />
                  ))}
                  <Button
                    type="primary"
                    onClick={() => addNewMatch()}
                    disabled={!isAllMatchEnd}
                  >
                    試合を追加
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => addNewMatch(true)}
                    disabled={!isAllMatchEnd}
                  >
                    ランダム
                  </Button>
                </>
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
