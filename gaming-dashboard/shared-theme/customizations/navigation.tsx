'use client';

import * as React from 'react';
import { Theme, alpha, Components } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { tabClasses } from '@mui/material/Tab';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const navigationCustomizations: Components<Theme> = {
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--mui-shape-borderRadius)',
        padding: '6px 8px',
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: 'var(--mui-palette-action-selected)',
          },
        },
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: {
        marginTop: '4px',
        borderRadius: 'var(--mui-shape-borderRadius)',
        border: '1px solid var(--mui-palette-divider)',
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: 'var(--mui-palette-action-selected)',
          },
        },
        '&[data-mui-color-scheme="dark"]': {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        },
      },
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
      )),
    },
    styleOverrides: {
      root: {
        borderRadius: 'var(--mui-shape-borderRadius)',
        border: '1px solid',
        borderColor: gray[200],
        backgroundColor: 'var(--mui-palette-background-paper)',
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        '&:hover': {
          borderColor: gray[300],
          backgroundColor: 'var(--mui-palette-background-paper)',
          boxShadow: 'none',
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        '&:before, &:after': {
          display: 'none',
        },
        '&[data-mui-color-scheme="dark"]': {
          borderRadius: 'var(--mui-shape-borderRadius)',
          borderColor: gray[700],
          backgroundColor: 'var(--mui-palette-background-paper)',
          boxShadow: `inset 0 1px 0 1px ${alpha(gray[700], 0.15)}, inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)`,
          '&:hover': {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: 'var(--mui-palette-background-paper)',
            boxShadow: 'none',
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[900],
          },
          '&:before, &:after': {
            display: 'none',
          },
        },
      },
      select: {
        display: 'flex',
        alignItems: 'center',
        '&[data-mui-color-scheme="dark"]': {
          display: 'flex',
          alignItems: 'center',
          '&:focus-visible': {
            backgroundColor: gray[900],
          },
        },
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: {
        color: 'var(--mui-palette-text-primary)',
        fontWeight: 500,
        position: 'relative',
        textDecoration: 'none',
        width: 'fit-content',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: 0,
          left: 0,
          backgroundColor: 'var(--mui-palette-text-secondary)',
          opacity: 0.3,
          transition: 'width 0.3s ease, opacity 0.3s ease',
        },
        '&:hover::before': {
          width: 0,
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '4px',
          borderRadius: '2px',
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: 'var(--mui-palette-background-default)',
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: 'var(--mui-palette-grey-900)',
        },
        '&[data-mui-color-scheme="dark"]': {
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: 'var(--mui-palette-grey-50)',
          },
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: {
        backgroundColor: 'var(--mui-palette-grey-800)',
        '&[data-mui-color-scheme="dark"]': {
          backgroundColor: 'var(--mui-palette-grey-200)',
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: '6px 8px',
        marginBottom: '8px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        color: 'var(--mui-palette-text-secondary)',
        borderRadius: 'var(--mui-shape-borderRadius)',
        border: '1px solid',
        borderColor: 'transparent',
        ':hover': {
          color: 'var(--mui-palette-text-primary)',
          backgroundColor: gray[100],
          borderColor: gray[200],
        },
        [`&.${tabClasses.selected}`]: {
          color: gray[900],
        },
        '&[data-mui-color-scheme="dark"]': {
          ':hover': {
            color: 'var(--mui-palette-text-primary)',
            backgroundColor: gray[800],
            borderColor: gray[700],
          },
          [`&.${tabClasses.selected}`]: {
            color: '#fff',
          },
        },
      },
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: {
        borderTop: '1px solid',
        borderColor: 'var(--mui-palette-divider)',
        flex: 1,
        borderRadius: '99px',
      },
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: 'transparent',
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: 'var(--mui-palette-primary-main)',
        },
        '&.Mui-completed': {
          border: 'none',
          color: 'var(--mui-palette-success-main)',
        },
        '&[data-mui-color-scheme="dark"]': {
          border: `1px solid ${gray[700]}`,
          '&.Mui-active': {
            border: 'none',
            color: 'var(--mui-palette-primary-light)',
          },
          '&.Mui-completed': {
            border: 'none',
            color: 'var(--mui-palette-success-light)',
          },
        },
        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      },
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: {
        '&.Mui-completed': {
          opacity: 0.6,
          '&[data-mui-color-scheme="dark"]': { opacity: 0.5 },
        },
      },
    },
  },
};
