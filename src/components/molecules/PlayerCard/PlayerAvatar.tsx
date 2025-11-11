import { Avatar, SxProps, Theme } from '@mui/material';
import { Player } from '../../../types';

type PlayerAvatarProps = {
  player: Player;
  isPlaying?: boolean;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
};

export const PlayerAvatar = ({ player, isPlaying, size, sx }: PlayerAvatarProps) => {
  const avatarSize = size === 'small' ? 30 : size === 'large' ? 50 : 40;
  return (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        bgcolor: isPlaying ? '#4caf50' : player.onBreak ? '#9e9e9e' : '#1976d2',
        fontSize: '1rem',
        fontWeight: 'bold',
        ...sx,
      }}
    >
      {player.id}
    </Avatar>
  );
};
