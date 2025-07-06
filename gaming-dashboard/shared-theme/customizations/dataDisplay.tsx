'use client';

import { Theme, alpha, Components } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { gray, red, green } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        [`& .${svgIconClasses.root}`]: {
          width: '1rem',
          height: '1rem',
          color: 'var(--mui-palette-text-secondary)',
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: 'flex',
          gap: 8,
          padding: '2px 8px',
          borderRadius: 'var(--mui-shape-borderRadius)',
          opacity: 0.7,
          '&.Mui-selected': {
            opacity: 1,
            backgroundColor: 'var(--mui-palette-action-selected)',
            [`& .${svgIconClasses.root}`]: {
              color: 'var(--mui-palette-text-primary)',
            },
            '&:focus-visible': {
              backgroundColor: 'var(--mui-palette-action-selected)',
            },
            '&:hover': {
              backgroundColor: 'var(--mui-palette-action-selected)',
            },
          },
          '&:focus-visible': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        fontSize: 'var(--mui-typography-body2-fontSize)',
        fontWeight: 500,
        lineHeight: 'var(--mui-typography-body2-lineHeight)',
      },
      secondary: {
        fontSize: 'var(--mui-typography-caption-fontSize)',
        lineHeight: 'var(--mui-typography-caption-lineHeight)',
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        padding: '4px 8px',
        fontSize: 'var(--mui-typography-caption-fontSize)',
        fontWeight: 500,
        lineHeight: 'var(--mui-typography-caption-lineHeight)',
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        border: '1px solid',
        borderRadius: '999px',
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: 'default',
            },
            style: {
              borderColor: gray[200],
              backgroundColor: gray[100],
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: gray[500],
              },
              '&[data-mui-color-scheme="dark"]': {
                borderColor: gray[700],
                backgroundColor: gray[800],
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: gray[300],
                },
              },
            },
          },
          {
            props: {
              color: 'success',
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              '&[data-mui-color-scheme="dark"]': {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
              },
            },
          },
          {
            props: {
              color: 'error',
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              '&[data-mui-color-scheme="dark"]': {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
              },
            },
          },
          {
            props: { size: 'small' },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: 'var(--mui-typography-caption-fontSize)',
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: 'var(--mui-typography-caption-fontSize)',
              },
            },
          },
          {
            props: { size: 'medium' },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: 'var(--mui-typography-caption-fontSize)',
              },
            },
          },
        ],
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: 'flex',
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: 'small',
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: 'small',
            },
            style: {
              fontSize: '1rem',
            },
          },
        ],
      },
    },
  },
};
