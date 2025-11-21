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
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 24px 0',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='pair-history-content'
          id='pair-history-header'
          sx={{
            p: { xs: 2, sm: 2.5 },
            '& .MuiAccordionSummary-expandIconWrapper': {
              color: 'primary.main',
            },
            '&.Mui-expanded': {
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Typography
            component='h2'
            variant='h6'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            <HistoryIcon sx={{ mr: 1.5, fontSize: '1.5rem', color: 'primary.main' }} />
            ペア履歴
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, sm: 2.5 }, pt: { xs: 2.5, sm: 3 } }}>
          <PairHistoryTable />
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          ...commonPaperStyles,
          mb: 3,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 0 24px 0',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='opponent-history-content'
          id='opponent-history-header'
          sx={{
            p: { xs: 2, sm: 2.5 },
            '& .MuiAccordionSummary-expandIconWrapper': {
              color: 'primary.main',
            },
            '&.Mui-expanded': {
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Typography
            component='h2'
            variant='h6'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
            }}
          >
            <HistoryIcon sx={{ mr: 1.5, fontSize: '1.5rem', color: 'primary.main' }} />
            対戦履歴
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: { xs: 2, sm: 2.5 }, pt: { xs: 2.5, sm: 3 } }}>
          <OpponentHistoryTable />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HistoryMenu;
