import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Match } from '../../../types';
import { PlayerAvatar } from '../../molecules/PlayerCard/PlayerAvatar';

type PlayerBoxProps = {
  match: Match;
  index: number;
  team: number;
  playerIndex: number;
  isPlayerSelected: (matchIndex: number, team: number, playerIndex: number) => boolean;
  handleClickPlayer: (matchIndex: number, team: number, playerIndex: number) => void;
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
        p: 0.75,
        textAlign: 'center',
        borderRadius: 2,
        cursor: match.winner ? 'default' : 'pointer',
        bgcolor: match.winner
          ? 'action.disabledBackground'
          : isPlayerSelected(index, team, playerIndex)
            ? 'rgba(25, 118, 210, 0.12)'
            : 'background.paper',
        border: isPlayerSelected(index, team, playerIndex)
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: match.winner
            ? 'action.disabledBackground'
            : isPlayerSelected(index, team, playerIndex)
              ? 'rgba(25, 118, 210, 0.16)'
              : 'action.hover',
          transform: match.winner ? 'none' : 'scale(1.05)',
          borderColor: match.winner
            ? theme.palette.divider
            : theme.palette.primary.main,
        },
        width: '50%',
        minWidth: 0,
        opacity: match.winner ? 0.6 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => !match.winner && handleClickPlayer(index, team, playerIndex)}
    >
      <PlayerAvatar player={teamPlayers[playerIndex]} />
    </Box>
  );
};

export default PlayerBox;
