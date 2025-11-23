import { Box } from '@mui/material';
import MatchControlPanel from '../MatchControlPanel';

interface MatchMenuProps {
  courts: number;
}

const MatchMenu: React.FC<MatchMenuProps> = ({ courts }) => {
  return (
    <Box component='article'>
      <MatchControlPanel courts={courts} />
    </Box>
  );
};

export default MatchMenu;
