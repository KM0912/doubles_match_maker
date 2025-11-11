import { Paper, Typography } from '@mui/material';
import MatchControlPanel from '../MatchControlPanel';
import { commonPaperStyles, commonTypographyStyles } from '../../../styles/common';

interface MatchMenuProps {
  courts: number;
}

const MatchMenu: React.FC<MatchMenuProps> = ({ courts }) => {
  return (
    <Paper component='article' elevation={1} sx={commonPaperStyles}>
      <Typography component='h2' variant='h6' sx={commonTypographyStyles}>
        <span style={{ fontSize: '1.2em', marginRight: '0.4em' }}>🎮</span>
        試合管理
      </Typography>
      <MatchControlPanel courts={courts} />
    </Paper>
  );
};

export default MatchMenu;
