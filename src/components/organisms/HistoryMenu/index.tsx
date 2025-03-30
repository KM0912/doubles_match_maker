import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PairHistoryTable from "../PairHistoryTable";

const HistoryMenu: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        mb: 4,
      }}
    >
      <Accordion
        defaultExpanded
        sx={{
          mb: 3,
          borderRadius: 2,
          "&:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pair-history-content"
          id="pair-history-header"
          sx={{ p: 2 }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HistoryIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
            ペア履歴
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2 }}>
          <PairHistoryTable />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HistoryMenu;
