import { Button, Paper, Typography, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h6">参加者</Typography>
        <Typography variant="body2" color="text.secondary">
          現在: {playerCount}人
        </Typography>
      </Box>
      <Button
        onClick={addPlayer}
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PersonAddIcon />}
        sx={{
          py: 1,
          fontWeight: "bold",
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        参加者を追加
      </Button>
    </Paper>
  );
};

export default AddPlayerButton;
