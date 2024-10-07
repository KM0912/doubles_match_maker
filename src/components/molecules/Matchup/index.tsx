import React, { useState } from "react";
import { Button, Col, Row, Space, Typography } from "antd";
import WinButton from "../../atom/WinButton";
import { Match } from "../../../types";

const { Text } = Typography;

type SelectedPairPlayerIndex = {
  pairIndex: number;
  playerIndex: number;
};

type Props = {
  match: Match;
  index: number;
  onClickWin: (index: number, pairIndex: number) => void;
  updateMatch: (match: Match) => void;
  deleteMatch: () => void;
};

const Matchup: React.FC<Props> = ({
  match,
  index,
  onClickWin,
  updateMatch,
  deleteMatch,
}) => {
  const [selectedPairPlayerIndex, setSelectedPairPlayerIndex] =
    useState<SelectedPairPlayerIndex | null>(null);

  const swapPlayers = (pairIndex: number, playerIndex: number) => {
    const newMatch = JSON.parse(JSON.stringify(match));
    const selectedPlayer =
      newMatch.pairs[selectedPairPlayerIndex!.pairIndex][
        selectedPairPlayerIndex!.playerIndex
      ];
    const targetPlayer = newMatch.pairs[pairIndex][playerIndex];
    newMatch.pairs[selectedPairPlayerIndex!.pairIndex][
      selectedPairPlayerIndex!.playerIndex
    ] = targetPlayer;
    newMatch.pairs[pairIndex][playerIndex] = selectedPlayer;
    updateMatch(newMatch);
    setSelectedPairPlayerIndex(null);
  };

  const handlePlayerClick = (pairIndex: number, playerIndex: number) => {
    if (selectedPairPlayerIndex) {
      swapPlayers(pairIndex, playerIndex);
    } else {
      setSelectedPairPlayerIndex({ pairIndex, playerIndex });
    }
  };

  const isSelected = (pairIndex: number, playerIndex: number) => {
    return (
      selectedPairPlayerIndex?.pairIndex === pairIndex &&
      selectedPairPlayerIndex?.playerIndex === playerIndex
    );
  };

  return (
    <Row gutter={2}>
      <Col className="gutter-row" span={4}>
        <Button
          danger
          disabled={!match.editable || match.isEnd}
          onClick={deleteMatch}
          size="small"
        >
          ✖️
        </Button>
      </Col>
      <Col className="gutter-row" span={4}>
        <WinButton
          match={match}
          pairIndex={0}
          onClick={() => onClickWin(index, 0)}
          disabled={!match.editable}
          size="small"
        />
      </Col>
      <Col className="gutter-row" span={5}>
        <Space direction="horizontal">
          {match.pairs[0].map((player, index) => (
            <Button
              disabled={match.isEnd || !match.editable}
              onClick={() => handlePlayerClick(0, index)}
              type={isSelected(0, index) ? "primary" : "default"}
              size="small"
              style={{ width: "30px" }}
            >
              {player.id}
            </Button>
          ))}
        </Space>
      </Col>
      <Col className="gutter-row" span={2}>
        <Text>VS</Text>
      </Col>
      <Col className="gutter-row" span={5}>
        <Space direction="horizontal">
          {match.pairs[1].map((player, index) => (
            <Button
              disabled={match.isEnd || !match.editable}
              onClick={() => handlePlayerClick(1, index)}
              type={isSelected(1, index) ? "primary" : "default"}
              size="small"
              style={{ width: "30px" }}
            >
              {player.id}
            </Button>
          ))}
        </Space>
      </Col>
      <Col className="gutter-row" span={4}>
        <WinButton
          match={match}
          pairIndex={1}
          onClick={() => onClickWin(index, 1)}
          disabled={!match.editable}
          size="small"
        />
      </Col>
    </Row>
  );
};

export default React.memo(Matchup);
