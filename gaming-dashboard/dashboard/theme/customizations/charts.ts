import { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses, chartsGridClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';
import { gray } from '../../../shared-theme/themePrimitives';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: ChartsComponents<Theme> = {
  MuiChartsAxis: {
    styleOverrides: {
      root: {
        [`& .${axisClasses.line}`]: {
          stroke: gray[300],
        },
        [`& .${axisClasses.tick}`]: { stroke: gray[300] },
        [`& .${axisClasses.tickLabel}`]: {
          fill: gray[500],
          fontWeight: 500,
        },
        '&[data-mui-color-scheme="dark"]': {
          [`& .${axisClasses.line}`]: {
            stroke: gray[700],
          },
          [`& .${axisClasses.tick}`]: { stroke: gray[700] },
          [`& .${axisClasses.tickLabel}`]: {
            fill: gray[300],
            fontWeight: 500,
          },
        },
      },
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: {
        ry: 6,
        boxShadow: 'none',
        border: '1px solid var(--mui-palette-divider)',
      },
      table: {
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: 'var(--mui-shape-borderRadius)',
        background: 'hsl(0, 0%, 100%)',
        '&[data-mui-color-scheme="dark"]': {
          background: gray[900],
        },
      },
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          ry: 6,
        },
      },
    },
  },
  MuiChartsGrid: {
    styleOverrides: {
      root: {
        [`& .${chartsGridClasses.line}`]: {
          stroke: gray[200],
          strokeDasharray: '4 2',
          strokeWidth: 0.8,
        },
        '&[data-mui-color-scheme="dark"]': {
          [`& .${chartsGridClasses.line}`]: {
            stroke: gray[700],
            strokeDasharray: '4 2',
            strokeWidth: 0.8,
          },
        },
      },
    },
  },
};
