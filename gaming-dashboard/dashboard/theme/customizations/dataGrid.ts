import { paperClasses } from '@mui/material/Paper';
import { alpha, Theme } from '@mui/material/styles';
import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { iconButtonClasses } from '@mui/material/IconButton';
import { checkboxClasses } from '@mui/material/Checkbox';
import { listClasses } from '@mui/material/List';
import { gridClasses } from '@mui/x-data-grid';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { gray } from '../../../shared-theme/themePrimitives';

/* eslint-disable import/prefer-default-export */
export const dataGridCustomizations: DataGridProComponents<Theme> & DataGridProComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: {
        '--DataGrid-overlayHeight': '300px',
        overflow: 'clip',
        borderColor: 'var(--mui-palette-divider)',
        backgroundColor: 'var(--mui-palette-background-default)',
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: 'var(--mui-palette-background-paper)',
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: 'var(--mui-palette-background-paper)',
        },
        [`& .${checkboxClasses.root}`]: {
          padding: '4px',
          '& > svg': {
            fontSize: '1rem',
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: '8px',
          '& .MuiIconButton-root': {
            maxHeight: 32,
            maxWidth: 32,
            '& > svg': {
              fontSize: '1rem',
            },
          },
        },
      },
      cell: {
        borderTopColor: 'var(--mui-palette-divider)',
      },
      menu: {
        borderRadius: 'var(--mui-shape-borderRadius)',
        backgroundImage: 'none',
        [`& .${paperClasses.root}`]: {
          border: '1px solid var(--mui-palette-divider)',
        },
        [`& .${menuItemClasses.root}`]: {
          margin: '0 4px',
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      row: {
        '&:last-of-type': {
          borderBottom: '1px solid var(--mui-palette-divider)',
        },
        '&:hover': {
          backgroundColor: 'var(--mui-palette-action-hover)',
        },
        '&.Mui-selected': {
          background: 'var(--mui-palette-action-selected)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
        },
      },
      iconButtonContainer: {
        [`& .${iconButtonClasses.root}`]: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          '&:active': {
            backgroundColor: gray[200],
          },
          '&[data-mui-color-scheme="dark"]': {
            color: gray[50],
            '&:hover': {
              backgroundColor: gray[800],
            },
            '&:active': {
              backgroundColor: gray[900],
            },
          },
        },
      },
      menuIconButton: {
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: gray[100],
        },
        '&:active': {
          backgroundColor: gray[200],
        },
        '&[data-mui-color-scheme="dark"]': {
          color: gray[50],
          '&:hover': {
            backgroundColor: gray[800],
          },
          '&:active': {
            backgroundColor: gray[900],
          },
        },
      },
      filterForm: {
        gap: '8px',
        alignItems: 'flex-end',
      },
      columnsManagementHeader: {
        paddingRight: '24px',
        paddingLeft: '24px',
      },
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  },
};
