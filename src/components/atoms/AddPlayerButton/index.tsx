import { Button } from "@mui/material";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const AddPlayerButton: React.FC = () => {
  const { addPlayer, playerCount } = usePlayerContext();
  return (
    <Button onClick={addPlayer} variant="contained" color="primary" fullWidth>
      参加者を追加（現在: {playerCount}人）
    </Button>
  );
};

export default AddPlayerButton;
