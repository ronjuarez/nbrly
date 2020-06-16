import { createMuiTheme } from '@material-ui/core/styles'



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#83c3f7',
      main: '#64b5f6',
      dark: '#467eac',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd453',
      main: '#ffca28',
      dark: '#b28d1c',
      contrastText: '#000',
    },
  },
});

export default theme; 