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
        elevation={isPlaying ? 4 : 1}
        sx={{
          mb: 1.5,
          border: isPlaying
            ? `2px solid ${theme.palette.success.main}`
            : `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: 2,
          bgcolor: isPlaying ? 'rgba(46, 125, 50, 0.04)' : 'background.paper',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isPlaying
              ? '0px 8px 16px rgba(46, 125, 50, 0.2)'
              : '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
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
