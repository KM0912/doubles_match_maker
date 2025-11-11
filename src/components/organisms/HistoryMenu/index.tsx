import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PairHistoryTable from '../PairHistoryTable';
import { commonPaperStyles } from '../../../styles/common';
import OpponentHistoryTable from '../OpponentHistoryTable';

const HistoryMenu: React.FC = () => {
  return (
    <>
      <Accordion
        defaultExpanded
        sx={{
          ...commonPaperStyles,
          mb: 3,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='pair-history-content'
          id='pair-history-header'
          sx={{ p: 2 }}
        >
          <Typography
            component='h2'
            variant='h6'
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <HistoryIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            ペア履歴
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <PairHistoryTable />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          ...commonPaperStyles,
          mb: 3,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='pair-history-content'
          id='pair-history-header'
          sx={{ p: 2 }}
        >
          <Typography
            component='h2'
            variant='h6'
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <HistoryIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            対戦履歴
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <OpponentHistoryTable />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HistoryMenu;
