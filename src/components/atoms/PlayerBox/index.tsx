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
          ? "primary.light"
          : "background.paper",
        border: isPlayerSelected(index, team, playerIndex)
          ? `2px none ${theme.palette.primary.main}`
          : "1px none #e0e0e0",
        "&:hover": {
          bgcolor: match.winner ? "action.disabledBackground" : "action.hover",
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
