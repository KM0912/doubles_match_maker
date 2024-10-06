import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
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
};

const Matchup: React.FC<Props> = ({
  match,
  index,
  onClickWin,
  updateMatch,
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
    <Space direction="horizontal">
      <WinButton
        match={match}
        pairIndex={0}
        onClick={() => onClickWin(index, 0)}
        disabled={!match.editable}
      />
      <div>
        {match.pairs[0].map((player, index) => (
          <Button
            disabled={match.isEnd || !match.editable}
            onClick={() => handlePlayerClick(0, index)}
            type={isSelected(0, index) ? "primary" : "default"}
          >
            {player.id}
          </Button>
        ))}
      </div>
      <Text>VS</Text>
      <div>
        {match.pairs[1].map((player, index) => (
          <Button
            disabled={match.isEnd || !match.editable}
            onClick={() => handlePlayerClick(1, index)}
            type={isSelected(1, index) ? "primary" : "default"}
          >
            {player.id}
          </Button>
        ))}
      </div>
      <WinButton
        match={match}
        pairIndex={1}
        onClick={() => onClickWin(index, 1)}
        disabled={!match.editable}
      />
    </Space>
  );
};

export default React.memo(Matchup);
