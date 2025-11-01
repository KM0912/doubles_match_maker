import React from "react";
import { AppBar, Toolbar, Typography, useTheme, Container } from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      component="header"
      color="transparent"
      sx={{
        top: 0,
        bgcolor: "rgba(255,255,255,0.85)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <Toolbar disableGutters>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: { xs: 1, sm: 1.5 },
          }}
        >
          <Typography
            variant="h1"
            noWrap
            sx={{
              fontWeight: 700,
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "1.05rem", sm: "1.35rem" },
              color: theme.palette.primary.main,
            }}
          >
            <SportsTennisIcon
              sx={{ mr: 1, fontSize: { xs: "1.3rem", sm: "1.6rem" } }}
            />
            ダブルス組み合わせメーカー
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              fontWeight: 500,
              gap: 1,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: "1rem", color: "secondary.main" }} />
            公平で楽しいマッチメイクをサポート
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
