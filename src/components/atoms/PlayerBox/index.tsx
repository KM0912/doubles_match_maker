import React from "react";
import { Box, useTheme } from "@mui/material";
import { Match } from "../../../types";
import { PlayerAvatar } from "../../molecules/PlayerCard/PlayerAvatar";

type PlayerBoxProps = {
  match: Match;
  index: number;
  team: number;
  playerIndex: number;
  isPlayerSelected: (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => boolean;
  handleClickPlayer: (
    matchIndex: number,
    team: number,
    playerIndex: number
  ) => void;
};

const PlayerBox: React.FC<PlayerBoxProps> = ({
  match,
  index,
  team,
  playerIndex,
  isPlayerSelected,
  handleClickPlayer,
}) => {
  const theme = useTheme();
  const teamPlayers = team === 1 ? match.team1 : match.team2;

  return (
    <Box
      sx={{
        p: 0.5,
        textAlign: "center",
        borderRadius: 1,
        cursor: match.winner ? "default" : "pointer",
        bgcolor: match.winner
          ? "action.disabledBackground"
          : isPlayerSelected(index, team, playerIndex)
          ? "rgba(56, 96, 240, 0.16)"
          : "rgba(255,255,255,0.95)",
        border: isPlayerSelected(index, team, playerIndex)
          ? `2px solid ${theme.palette.primary.main}`
          : "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: isPlayerSelected(index, team, playerIndex)
          ? "0 8px 20px rgba(56, 96, 240, 0.25)"
          : "0 6px 14px rgba(15, 23, 42, 0.12)",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: match.winner
            ? "action.disabledBackground"
            : "rgba(56, 96, 240, 0.12)",
        },
        width: "50%",
        minWidth: 0,
        opacity: match.winner ? 0.5 : 1,
        display: "flex",
        justifyContent: "center",
      }}
      onClick={() =>
        !match.winner && handleClickPlayer(index, team, playerIndex)
      }
    >
      <PlayerAvatar player={teamPlayers[playerIndex]} />
    </Box>
  );
};

export default PlayerBox;
