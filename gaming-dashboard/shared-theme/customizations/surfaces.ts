import { alpha, Theme, Components } from '@mui/material/styles';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const surfacesCustomizations: Components<Theme> = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: {
        padding: 4,
        overflow: 'clip',
        backgroundColor: 'var(--mui-palette-background-default)',
        border: '1px solid',
        borderColor: 'var(--mui-palette-divider)',
        ':before': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none',
        },
        '&:first-of-type': {
          borderTopLeftRadius: 'var(--mui-shape-borderRadius)',
          borderTopRightRadius: 'var(--mui-shape-borderRadius)',
        },
        '&:last-of-type': {
          borderBottomLeftRadius: 'var(--mui-shape-borderRadius)',
          borderBottomRightRadius: 'var(--mui-shape-borderRadius)',
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        border: 'none',
        borderRadius: 8,
        '&:hover': { backgroundColor: gray[50] },
        '&:focus-visible': { backgroundColor: 'transparent' },
        '&[data-mui-color-scheme="dark"]': {
          '&:hover': { backgroundColor: gray[800] },
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        padding: 16,
        gap: 16,
        transition: 'all 100ms ease',
        backgroundColor: gray[50],
        borderRadius: 'var(--mui-shape-borderRadius)',
        border: '1px solid var(--mui-palette-divider)',
        boxShadow: 'none',
        '&[data-mui-color-scheme="dark"]': {
          backgroundColor: gray[800],
        },
        variants: [
          {
            props: {
              variant: 'outlined',
            },
            style: {
              border: '1px solid var(--mui-palette-divider)',
              boxShadow: 'none',
              background: 'hsl(0, 0%, 100%)',
              '&[data-mui-color-scheme="dark"]': {
                background: alpha(gray[900], 0.4),
              },
            },
          },
        ],
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:last-child': { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};
