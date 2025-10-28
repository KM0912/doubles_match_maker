import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { usePlayerContext } from "../../../contexts/PlayerContext";

const OpponentHistoryTable: React.FC = () => {
  const theme = useTheme();
  const { players, opponentHistory } = usePlayerContext();

  // 最大対戦回数を取得（メモ化）
  const maxOpponentCount = useMemo(() => {
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
  }, [players, opponentHistory]);

  // 背景色の濃さを計算（テーマの赤系カラーを使用）
  const getBackgroundColor = (count: number) => {
    if (maxOpponentCount === 0) return "transparent";
    const intensity = count / maxOpponentCount;
    return alpha(theme.palette.error.main, intensity * 0.5);
  };

  return (
    <TableContainer sx={{ maxWidth: "100%" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                minWidth: 60,
                bgcolor: "grey.100",
                border: "1px solid",
                borderColor: "divider",
                p: 1,
              }}
            >
              選手
            </TableCell>
            {players.map((player) => (
              <TableCell
                key={player.id}
                align="center"
                sx={{
                  bgcolor: "grey.100",
                  border: "1px solid",
                  borderColor: "divider",
                  p: 1,
                }}
              >
                #{player.id}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontWeight: "bold",
                  bgcolor: "grey.50",
                  border: "1px solid",
                  borderColor: "divider",
                  p: 1,
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
                      border: "1px solid",
                      borderColor: "divider",
                      p: 1,
                      bgcolor: getBackgroundColor(count),
                    }}
                  >
                    {player.id === opponent.id ? "-" : count}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpponentHistoryTable;
