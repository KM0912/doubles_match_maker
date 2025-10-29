import React from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

type Props = {
  courts: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CourtCounter: React.FC<Props> = ({
  courts,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{ p: 2, borderRadius: 2, width: "100%", overflow: "visible" }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          justifySelf: "start",
          mb: 2,
        }}
      >
        <SportsBaseballIcon sx={{ mr: 1 }} />
        コート数
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton
          onClick={onDecrement}
          color="primary"
          size="small"
          disabled={courts <= 1}
          sx={{
            justifySelf: "center",
            bgcolor: "rgba(25, 118, 210, 0.1)",
            "&:hover": { bgcolor: "rgba(25, 118, 210, 0.2)" },
          }}
        >
          <RemoveIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            justifySelf: "center",
            // minWidth: { xs: 56, sm: 60 },
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {courts}
        </Typography>

        <IconButton
          onClick={onIncrement}
          color="primary"
          size="small"
          disabled={courts >= 10}
          sx={{
            justifySelf: "center",
            bgcolor: "rgba(25, 118, 210, 0.1)",
            "&:hover": { bgcolor: "rgba(25, 118, 210, 0.2)" },
            "&.Mui-disabled": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CourtCounter;
