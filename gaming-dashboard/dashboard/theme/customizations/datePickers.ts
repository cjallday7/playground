import { alpha, Theme } from '@mui/material/styles';
import type { PickersProComponents } from '@mui/x-date-pickers-pro/themeAugmentation';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { pickersDayClasses, yearCalendarClasses } from '@mui/x-date-pickers';
import { gray, brand } from '../../../shared-theme/themePrimitives';

/* eslint-disable import/prefer-default-export */
export const datePickersCustomizations: PickersProComponents<Theme> & PickerComponents<Theme> = {
  MuiPickerPopper: {
    styleOverrides: {
      paper: {
        marginTop: 4,
        borderRadius: 'var(--mui-shape-borderRadius)',
        border: '1px solid var(--mui-palette-divider)',
        backgroundImage: 'none',
        background: 'hsl(0, 0%, 100%)',
        boxShadow:
          'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        [`& .${menuItemClasses.root}`]: {
          borderRadius: 6,
          margin: '0 6px',
        },
        '&[data-mui-color-scheme="dark"]': {
          background: gray[900],
          boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        },
      },
    },
  },
  MuiPickersArrowSwitcher: {
    styleOverrides: {
      spacer: { width: 16 },
      button: {
        backgroundColor: 'transparent',
        color: 'var(--mui-palette-grey-500)',
        '&[data-mui-color-scheme="dark"]': {
          color: 'var(--mui-palette-grey-400)',
        },
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      switchViewButton: {
        padding: 0,
        border: 'none',
      },
    },
  },
  MuiMonthCalendar: {
    styleOverrides: {
      button: {
        fontSize: 'var(--mui-typography-body1-fontSize)',
        color: 'var(--mui-palette-grey-600)',
        padding: '4px',
        borderRadius: 'var(--mui-shape-borderRadius)',
        '&:hover': {
          backgroundColor: 'var(--mui-palette-action-hover)',
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: 'var(--mui-typography-fontWeightMedium)',
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[700] },
        },
        '&[data-mui-color-scheme="dark"]': {
          color: 'var(--mui-palette-grey-300)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          [`&.${yearCalendarClasses.selected}`]: {
            color: 'var(--mui-palette-common-black)',
            fontWeight: 'var(--mui-typography-fontWeightMedium)',
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[300] },
          },
        },
      },
    },
  },
  MuiYearCalendar: {
    styleOverrides: {
      button: {
        fontSize: 'var(--mui-typography-body1-fontSize)',
        color: 'var(--mui-palette-grey-600)',
        padding: '4px',
        borderRadius: 'var(--mui-shape-borderRadius)',
        height: 'fit-content',
        '&:hover': {
          backgroundColor: 'var(--mui-palette-action-hover)',
        },
        [`&.${yearCalendarClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: 'var(--mui-typography-fontWeightMedium)',
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[700] },
        },
        '&[data-mui-color-scheme="dark"]': {
          color: 'var(--mui-palette-grey-300)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          [`&.${yearCalendarClasses.selected}`]: {
            color: 'var(--mui-palette-common-black)',
            fontWeight: 'var(--mui-typography-fontWeightMedium)',
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${yearCalendarClasses.selected}`]: { backgroundColor: gray[300] },
          },
        },
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: {
        fontSize: 'var(--mui-typography-body1-fontSize)',
        color: 'var(--mui-palette-grey-600)',
        padding: '4px',
        borderRadius: 'var(--mui-shape-borderRadius)',
        '&:hover': {
          backgroundColor: 'var(--mui-palette-action-hover)',
        },
        [`&.${pickersDayClasses.selected}`]: {
          backgroundColor: gray[700],
          fontWeight: 'var(--mui-typography-fontWeightMedium)',
        },
        '&:focus': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '2px',
          backgroundColor: 'transparent',
          [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[700] },
        },
        '&[data-mui-color-scheme="dark"]': {
          color: 'var(--mui-palette-grey-300)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
          [`&.${pickersDayClasses.selected}`]: {
            color: 'var(--mui-palette-common-black)',
            fontWeight: 'var(--mui-typography-fontWeightMedium)',
            backgroundColor: gray[300],
          },
          '&:focus': {
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            [`&.${pickersDayClasses.selected}`]: { backgroundColor: gray[300] },
          },
        },
      },
    },
  },
};
