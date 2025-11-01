import { Button, Typography, Box, Chip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography variant="subtitle2" fontWeight={700} color="text.primary">
          参加者
        </Typography>
        <Chip
          label={`${playerCount}人`}
          size="small"
          color="primary"
          sx={{ fontWeight: 600 }}
        />
      </Box>
      <Button
        onClick={addPlayer}
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PersonAddIcon />}
        sx={{
          py: 1.2,
          background: "linear-gradient(135deg, #3860F0, #5f84ff)",
          fontWeight: "bold",
          boxShadow: "0 16px 30px rgba(56, 96, 240, 0.35)",
          borderRadius: 2,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            boxShadow: "0 20px 38px rgba(56, 96, 240, 0.45)",
            transform: "translateY(-2px)",
          },
        }}
      >
        参加者を追加
      </Button>
    </>
  );
};

export default AddPlayerButton;
