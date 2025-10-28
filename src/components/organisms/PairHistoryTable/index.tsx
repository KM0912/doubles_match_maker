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

const PairHistoryTable: React.FC = () => {
  const theme = useTheme();
  const { players, pairHistory } = usePlayerContext();

  // 最大ペア回数を取得（メモ化）
  const maxPairCount = useMemo(() => {
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
  }, [players, pairHistory]);

  // 背景色の濃さを計算（テーマカラーを使用）
  const getBackgroundColor = (count: number) => {
    if (maxPairCount === 0) return "transparent";
    const intensity = count / maxPairCount;
    return alpha(theme.palette.primary.main, intensity * 0.5);
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
                      border: "1px solid",
                      borderColor: "divider",
                      p: 1,
                      bgcolor: getBackgroundColor(count),
                    }}
                  >
                    {player.id === partner.id ? "-" : count}
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

export default PairHistoryTable;
