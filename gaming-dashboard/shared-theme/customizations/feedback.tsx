'use client';

import { Theme, alpha, Components } from '@mui/material/styles';
import { gray, orange } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        backgroundColor: orange[100],
        color: 'var(--mui-palette-text-primary)',
        border: `1px solid ${alpha(orange[300], 0.5)}`,
        '& .MuiAlert-icon': {
          color: orange[500],
        },
        '&[data-mui-color-scheme="dark"]': {
          backgroundColor: `${alpha(orange[900], 0.5)}`,
          border: `1px solid ${alpha(orange[800], 0.5)}`,
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          border: '1px solid',
          borderColor: 'var(--mui-palette-divider)',
        },
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 8,
        borderRadius: 8,
        backgroundColor: gray[200],
        '&[data-mui-color-scheme="dark"]': {
          backgroundColor: gray[800],
        },
      },
    },
  },
};
