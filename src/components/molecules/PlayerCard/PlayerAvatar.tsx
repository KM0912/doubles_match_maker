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
        bgcolor: isPlaying ? 'success.main' : player.onBreak ? 'grey.400' : 'primary.main',
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease-in-out',
        ...sx,
      }}
    >
      {player.id}
    </Avatar>
  );
};
