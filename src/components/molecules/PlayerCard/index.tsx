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
        elevation={0}
        sx={{
          mb: 2,
          border: isPlaying
            ? `2px solid ${theme.palette.success.main}`
            : `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: 3,
          bgcolor: isPlaying
            ? `linear-gradient(135deg, ${theme.palette.success.light}08 0%, ${theme.palette.success.main}08 100%)`
            : 'background.paper',
          backgroundImage: isPlaying
            ? `linear-gradient(135deg, ${theme.palette.success.light}08 0%, ${theme.palette.success.main}08 100%)`
            : 'none',
          position: 'relative',
          overflow: 'visible',
          '&::before': isPlaying
            ? {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
                borderRadius: 3,
                zIndex: -1,
                opacity: 0.3,
                filter: 'blur(8px)',
              }
            : {},
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isPlaying
              ? `0px 12px 32px ${theme.palette.success.main}25`
              : '0px 8px 24px rgba(0, 0, 0, 0.12)',
            borderColor: isPlaying ? theme.palette.success.dark : theme.palette.primary.main,
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <PlayerAvatar player={player} isPlaying={isPlaying} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
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
