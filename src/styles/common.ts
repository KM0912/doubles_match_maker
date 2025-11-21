import { SxProps, Theme } from '@mui/material';

export const commonPaperStyles: SxProps<Theme> = {
  p: { xs: 2, sm: 3 },
  mb: 4,
  borderRadius: 3,
  // Avoid clipping child content on narrow screens
  overflow: 'visible',
  boxSizing: 'border-box',
  bgcolor: 'background.paper',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export const commonTypographyStyles: SxProps<Theme> = {
  mb: 3,
  fontWeight: 700,
  fontSize: { xs: '1.1rem', sm: '1.25rem' },
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
};
