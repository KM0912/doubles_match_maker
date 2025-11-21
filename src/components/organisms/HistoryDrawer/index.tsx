import {
  Drawer,
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PairHistoryTable from '../PairHistoryTable';
import OpponentHistoryTable from '../OpponentHistoryTable';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500, md: 600 },
          height: { xs: '85vh', sm: '100%' },
          borderTopLeftRadius: { xs: 16, sm: 0 },
          borderTopRightRadius: { xs: 16, sm: 0 },
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* ヘッダー */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <HistoryIcon sx={{ mr: 1 }} />
            試合履歴
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* コンテンツ */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='pair-history-content'
              id='pair-history-header'
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                ペア履歴
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PairHistoryTable />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded sx={{ boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='opponent-history-content'
              id='opponent-history-header'
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                対戦履歴
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <OpponentHistoryTable />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Drawer>
  );
};

export default HistoryDrawer;
