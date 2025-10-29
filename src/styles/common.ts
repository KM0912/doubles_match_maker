import { SxProps, Theme } from "@mui/material";

export const commonPaperStyles: SxProps<Theme> = {
  p: { xs: 1.5, sm: 2 },
  mb: 5,
  borderRadius: 2,
  // Avoid clipping child content on narrow screens
  overflow: "visible",
  boxSizing: "border-box",
};

export const commonTypographyStyles: SxProps<Theme> = {
  mb: 2,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
};
