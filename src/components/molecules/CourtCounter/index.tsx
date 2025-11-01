import React from "react";
import { Box, Typography, IconButton, Paper, Chip } from "@mui/material";
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
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        width: "100%",
        background: "linear-gradient(135deg, rgba(56,96,240,0.08), rgba(255,255,255,0.95))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 700,
              gap: 1,
            }}
          >
            <SportsBaseballIcon color="primary" sx={{ fontSize: "1.4rem" }} />
            コート数
          </Typography>
          <Chip
            label="1〜10面まで設定可能"
            size="small"
            sx={{ mt: 1, fontWeight: 500, bgcolor: "rgba(56,96,240,0.12)" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={onDecrement}
            color="primary"
            size="small"
            disabled={courts <= 1}
            sx={{
              bgcolor: "rgba(56, 96, 240, 0.12)",
              boxShadow: "0 6px 16px rgba(56, 96, 240, 0.15)",
              "&:hover": { bgcolor: "rgba(56, 96, 240, 0.2)" },
              "&.Mui-disabled": {
                boxShadow: "none",
                bgcolor: "rgba(15, 23, 42, 0.05)",
              },
            }}
          >
            <RemoveIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              minWidth: "60px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: { xs: "1.6rem", sm: "1.8rem" },
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
              bgcolor: "rgba(56, 96, 240, 0.12)",
              boxShadow: "0 6px 16px rgba(56, 96, 240, 0.15)",
              "&:hover": { bgcolor: "rgba(56, 96, 240, 0.2)" },
              "&.Mui-disabled": {
                boxShadow: "none",
                bgcolor: "rgba(15, 23, 42, 0.05)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourtCounter;
