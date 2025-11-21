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
  const selected = isPlayerSelected(index, team, playerIndex);

  return (
    <Box
      sx={{
        flex: 1,
        p: 1,
        textAlign: 'center',
        borderRadius: 2,
        cursor: match.winner ? 'default' : 'pointer',
        bgcolor: match.winner
          ? `${theme.palette.grey[200]}40`
          : selected
            ? `${theme.palette.primary.main}20`
            : `${theme.palette.grey[100]}80`,
        border: match.winner
          ? `2px solid ${theme.palette.divider}`
          : selected
            ? `2px solid ${theme.palette.primary.main}`
            : `2px solid ${theme.palette.divider}`,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        '&:hover': {
          bgcolor: match.winner
            ? `${theme.palette.grey[200]}40`
            : selected
              ? `${theme.palette.primary.main}25`
              : `${theme.palette.primary.main}10`,
          transform: match.winner ? 'none' : 'scale(1.05)',
          borderColor: match.winner ? theme.palette.divider : theme.palette.primary.main,
          boxShadow: match.winner ? 'none' : `0px 4px 12px ${theme.palette.primary.main}20`,
        },
        opacity: match.winner ? 0.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => !match.winner && handleClickPlayer(index, team, playerIndex)}
    >
      <PlayerAvatar player={teamPlayers[playerIndex]} size='small' />
    </Box>
  );
};

export default PlayerBox;
