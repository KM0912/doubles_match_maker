import React, { useState } from 'react';
import { Player } from '../../../types';
import { usePlayerContext } from '../../../contexts/PlayerContext';
import ConfirmDialog from '../ConfirmDialog';
import { Card, CardContent, Box, useTheme } from '@mui/material';
import { PlayerAvatar } from './PlayerAvatar';
import { PlayerStats } from './PlayerStats';
import { PlayerStatus } from './PlayerStatus';
import { PlayerActions } from './PlayerActions';

type PlayerStatusCardProps = {
  player: Player;
  isPlaying: boolean;
  setOnBreak: (playerId: number, isOnBreak: boolean) => void;
  isInMatch: boolean;
};

const PlayerCard: React.FC<PlayerStatusCardProps> = ({
  player,
  isPlaying,
  setOnBreak,
  isInMatch: isPlayerInMatch,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { removePlayer } = usePlayerContext();
  const theme = useTheme();

  const handleBreakToggle = () => {
    setOnBreak(player.id, !player.onBreak);
  };

  const handleRemove = () => {
    setShowConfirm(true);
  };

  return (
    <>
      <Card
        elevation={isPlaying ? 3 : 1}
        sx={{
          mb: 1.5,
          border: isPlaying
            ? `2px solid ${theme.palette.success.main}`
            : player.onBreak
              ? `1px solid ${theme.palette.grey[400]}`
              : `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          borderRadius: 2,
          bgcolor: player.onBreak ? 'action.disabledBackground' : 'background.paper',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 2,
          },
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PlayerAvatar player={player} isPlaying={isPlaying} sx={{ mr: 1.5 }} />
              <Box>
                <PlayerStatus isPlaying={isPlaying} isOnBreak={player.onBreak} />
                <PlayerStats player={player} />
              </Box>
            </Box>

            {!isPlayerInMatch && (
              <PlayerActions
                isOnBreak={player.onBreak}
                onBreakToggle={handleBreakToggle}
                onRemove={handleRemove}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {showConfirm && (
        <ConfirmDialog
          confirmText='本当に削除しますか？'
          okText='削除'
          okColor='error'
          cancelText='キャンセル'
          onConfirm={() => {
            removePlayer(player.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default PlayerCard;
