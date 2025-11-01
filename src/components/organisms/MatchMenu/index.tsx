import { Paper } from "@mui/material";
import MatchControlPanel from "../MatchControlPanel";
import { commonPaperStyles } from "../../../styles/common";
import SectionTitle from "../../atoms/SectionTitle";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

interface MatchMenuProps {
  courts: number;
}

const MatchMenu: React.FC<MatchMenuProps> = ({ courts }) => {
  return (
    <Paper component="article" elevation={1} sx={commonPaperStyles}>
      <SectionTitle
        icon={<SportsTennisIcon color="primary" sx={{ fontSize: "1.35rem" }} />}
        subtitle="組み合わせの生成から結果入力まで、ここで管理"
      >
        試合管理
      </SectionTitle>
      <MatchControlPanel courts={courts} />
    </Paper>
  );
};

export default MatchMenu;
