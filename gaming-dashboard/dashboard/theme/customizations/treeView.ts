import { alpha, Theme } from '@mui/material/styles';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';
import { gray, brand } from '../../../shared-theme/themePrimitives';

/* eslint-disable import/prefer-default-export */
export const treeViewCustomizations: TreeViewComponents<Theme> = {
  MuiTreeItem: {
    styleOverrides: {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '0 8px',
        '& .groupTransition': {
          marginLeft: '16px',
          padding: '0',
          borderLeft: '1px solid',
          borderColor: 'var(--mui-palette-divider)',
        },
        '&:focus-visible .focused': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          '&:hover': {
            backgroundColor: alpha(gray[300], 0.2),
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
          },
        },
      },
      content: {
        marginTop: '8px',
        padding: '4px 8px',
        overflow: 'clip',
        '&:hover': {
          backgroundColor: alpha(gray[300], 0.2),
        },
        '&.selected': {
          backgroundColor: alpha(gray[300], 0.4),
          '&:hover': {
            backgroundColor: alpha(gray[300], 0.6),
          },
        },
        '&[data-mui-color-scheme="dark"]': {
          '&:hover': {
            backgroundColor: alpha(gray[500], 0.2),
          },
          '&:focus-visible': {
            '&:hover': {
              backgroundColor: alpha(gray[500], 0.2),
            },
          },
          '&.selected': {
            backgroundColor: alpha(gray[500], 0.4),
            '&:hover': {
              backgroundColor: alpha(gray[500], 0.6),
            },
          },
        },
      },
    },
  },
};
