import { SxProps, Theme } from '@mui/material';

export const commonPaperStyles: SxProps<Theme> = {
  p: { xs: 2.5, sm: 3.5 },
  mb: 4,
  borderRadius: 4,
  overflow: 'visible',
  boxSizing: 'border-box',
  bgcolor: 'background.paper',
  border: (theme) => `1px solid ${theme.palette.divider}`,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0px 8px 24px rgba(0, 82, 204, 0.12)',
    borderColor: 'primary.main',
  },
};

export const commonTypographyStyles: SxProps<Theme> = {
  mb: 3.5,
  fontWeight: 700,
  fontSize: { xs: '1.125rem', sm: '1.375rem' },
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
  letterSpacing: '-0.01em',
};
