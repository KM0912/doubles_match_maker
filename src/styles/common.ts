import { SxProps, Theme } from "@mui/material";

export const commonPaperStyles: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  mb: 5,
  borderRadius: 3,
  overflow: "hidden",
  backgroundColor: "rgba(255,255,255,0.96)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.12)",
  border: "1px solid rgba(56, 96, 240, 0.12)",
};

export const commonTypographyStyles: SxProps<Theme> = {
  mb: 2.5,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  gap: 1,
};
