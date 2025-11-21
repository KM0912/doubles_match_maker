import { Avatar, SxProps, Theme, useTheme } from '@mui/material';
import { Player } from '../../../types';

type PlayerAvatarProps = {
  player: Player;
  isPlaying?: boolean;
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
};

export const PlayerAvatar = ({ player, isPlaying, size, sx }: PlayerAvatarProps) => {
  const theme = useTheme();
  const avatarSize = size === 'small' ? 36 : size === 'large' ? 56 : 48;

  const getBgColor = () => {
    if (isPlaying) return theme.palette.success.main;
    if (player.onBreak) return theme.palette.grey[400];
    return theme.palette.primary.main;
  };

  return (
    <Avatar
      sx={{
        width: avatarSize,
        height: avatarSize,
        bgcolor: getBgColor(),
        fontSize: size === 'small' ? '0.875rem' : size === 'large' ? '1.25rem' : '1rem',
        fontWeight: 700,
        boxShadow: `0px 4px 12px ${getBgColor()}40`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `3px solid ${theme.palette.background.paper}`,
        ...sx,
        '&:hover': {
          transform: 'scale(1.1) rotate(5deg)',
          boxShadow: `0px 6px 16px ${getBgColor()}60`,
        },
      }}
    >
      {player.id}
    </Avatar>
  );
};
