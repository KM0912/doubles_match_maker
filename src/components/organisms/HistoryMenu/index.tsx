import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PairHistoryTable from "../PairHistoryTable";
import { commonPaperStyles } from "../../../styles/common";
import OpponentHistoryTable from "../OpponentHistoryTable";

const HistoryMenu: React.FC = () => {
  return (
    <>
      <Accordion
        defaultExpanded
        sx={{
          ...commonPaperStyles,
          mb: 3,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pair-history-content"
          id="pair-history-header"
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(56, 96, 240, 0.08)",
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Diversity3Icon color="primary" sx={{ fontSize: "1.35rem" }} />
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
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pair-history-content"
          id="pair-history-header"
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(244, 91, 105, 0.12)",
          }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SportsKabaddiIcon color="secondary" sx={{ fontSize: "1.35rem" }} />
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
