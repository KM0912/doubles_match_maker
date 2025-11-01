import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const OpponentHistoryTable: React.FC = () => {
  const { players, opponentHistory } = usePlayerContext();

  // 最大対戦回数を取得
  const getMaxOpponentCount = () => {
    let max = 0;
    players.forEach((player) => {
      players.forEach((opponent) => {
        if (player.id !== opponent.id) {
          const count = opponentHistory[player.id]?.[opponent.id] || 0;
          max = Math.max(max, count);
        }
      });
    });
    return max;
  };

  // 背景色の濃さを計算
  const getBackgroundColor = (count: number, maxCount: number) => {
    if (maxCount === 0) return "rgb(255, 255, 255)";
    const intensity = count / maxCount;
    // 赤系の色を使用（対戦履歴は赤系で区別）
    return `rgba(239, 68, 68, ${intensity * 0.5})`;
  };

  const maxOpponentCount = getMaxOpponentCount();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(244, 91, 105, 0.12)",
        boxShadow: "0 12px 28px rgba(244, 91, 105, 0.1)",
        backgroundColor: "rgba(255,255,255,0.96)",
      }}
    >
      <Table size="small" aria-label="対戦履歴">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                minWidth: 80,
                backgroundColor: "rgba(244,91,105,0.08)",
                color: "secondary.main",
              }}
            >
              選手
            </TableCell>
            {players.map((player) => (
              <TableCell
                key={player.id}
                align="center"
                sx={{
                  fontWeight: 600,
                  backgroundColor: "rgba(244,91,105,0.08)",
                  color: "secondary.main",
                }}
              >
                #{player.id}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={players.length + 1} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  参加者が追加されると対戦履歴が表示されます
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            players.map((player) => {
              return (
                <TableRow key={player.id} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "rgba(244,91,105,0.05)",
                    }}
                  >
                    #{player.id}
                  </TableCell>
                  {players.map((opponent) => {
                    const count =
                      player.id === opponent.id
                        ? 0
                        : opponentHistory[player.id]?.[opponent.id] || 0;
                    return (
                      <TableCell
                        key={opponent.id}
                        align="center"
                        sx={{
                          backgroundColor:
                            player.id === opponent.id
                              ? "rgba(148, 163, 184, 0.1)"
                              : getBackgroundColor(count, maxOpponentCount),
                          fontWeight: player.id === opponent.id ? 500 : 600,
                          color:
                            player.id === opponent.id
                              ? "text.secondary"
                              : count > 0
                              ? "#0f172a"
                              : "text.secondary",
                        }}
                      >
                        {player.id === opponent.id ? "-" : count}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpponentHistoryTable;
