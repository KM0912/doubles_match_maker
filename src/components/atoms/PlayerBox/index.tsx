import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Match } from "../../../types";

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
          ? `2px solid ${theme.palette.primary.main}`
          : "1px solid #e0e0e0",
        "&:hover": {
          bgcolor: match.winner ? "action.disabledBackground" : "action.hover",
        },
        width: "50%",
        minWidth: 0,
        opacity: match.winner ? 0.5 : 1,
      }}
      onClick={() =>
        !match.winner && handleClickPlayer(index, team, playerIndex)
      }
    >
      <Typography
        variant="body2"
        noWrap
        sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
      >
        #{teamPlayers[playerIndex].id}
      </Typography>
    </Box>
  );
};

export default PlayerBox;
