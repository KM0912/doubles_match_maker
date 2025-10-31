import React from "react";
import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={1}
      component="header"
      sx={{
        top: 0,
        bgcolor: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h1"
          align="center"
          noWrap
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.05em",
            py: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { xs: "1rem", sm: "1.25rem" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          <SportsTennisIcon
            sx={{ mr: 1, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
          ダブルス組み合わせメーカー
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
