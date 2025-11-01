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

const PairHistoryTable: React.FC = () => {
  const { players, pairHistory } = usePlayerContext();

  // 最大ペア回数を取得
  const getMaxPairCount = () => {
    let max = 0;
    players.forEach((player) => {
      players.forEach((partner) => {
        if (player.id !== partner.id) {
          const count = pairHistory[player.id]?.[partner.id] || 0;
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
    // 青系の色を使用
    return `rgba(59, 130, 246, ${intensity * 0.5})`;
  };

  const maxPairCount = getMaxPairCount();

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(56, 96, 240, 0.12)",
        boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)",
        backgroundColor: "rgba(255,255,255,0.96)",
      }}
    >
      <Table size="small" aria-label="ペア履歴">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 700,
                minWidth: 80,
                backgroundColor: "rgba(56,96,240,0.08)",
                color: "primary.main",
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
                  backgroundColor: "rgba(56,96,240,0.08)",
                  color: "primary.main",
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
                  参加者が追加されるとペア履歴が表示されます
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
                      backgroundColor: "rgba(56,96,240,0.05)",
                    }}
                  >
                    #{player.id}
                  </TableCell>
                  {players.map((partner) => {
                    const count =
                      player.id === partner.id
                        ? 0
                        : pairHistory[player.id]?.[partner.id] || 0;
                    return (
                      <TableCell
                        key={partner.id}
                        align="center"
                        sx={{
                          backgroundColor:
                            player.id === partner.id
                              ? "rgba(148, 163, 184, 0.1)"
                              : getBackgroundColor(count, maxPairCount),
                          fontWeight: player.id === partner.id ? 500 : 600,
                          color:
                            player.id === partner.id
                              ? "text.secondary"
                              : count > 0
                              ? "#0f172a"
                              : "text.secondary",
                        }}
                      >
                        {player.id === partner.id ? "-" : count}
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

export default PairHistoryTable;
