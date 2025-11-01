import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

type SectionTitleProps = {
  icon?: ReactNode;
  subtitle?: string;
  children: ReactNode;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  icon,
  subtitle,
  children,
}) => {
  return (
    <Stack spacing={0.5} sx={{ mb: subtitle ? 3 : 2.5 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {icon}
        <Typography
          component="h2"
          variant="h6"
          sx={{ fontWeight: 700, letterSpacing: "0.01em" }}
        >
          {children}
        </Typography>
      </Stack>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionTitle;

