import { createTheme, Theme } from '@mui/material/styles';
import { deepPurple, pink, red, grey } from '@mui/material/colors';

const shadow = 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: deepPurple.A200,
    },

    secondary: {
      main: pink[500],
    },

    error: {
      main: red.A400,
    },
  },

  shadows: ['none', ...Array(24).fill(shadow)] as Theme['shadows'],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${grey[400]} ${grey[300]}`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: grey[300],
            width: 12,
            height: 12,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: grey[400],
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: grey[500],
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: grey[500],
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: grey[500],
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: grey[300],
          },
        },
      },
    },
  },
});
