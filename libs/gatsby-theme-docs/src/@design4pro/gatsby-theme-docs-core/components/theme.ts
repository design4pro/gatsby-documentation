declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    primary: string;
    paper: string;
  }

  interface TypeText {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  }

  interface Palette {
    divider: string;
    border: {
      primary: string;
      primaryHover: string;
      secondary: string;
    };
  }
  interface Theme {
    drawerWidth: string;
  }
}

export default (theme: string) => ({
  palette: {
    primary: {
      main: theme === 'light' ? '#3884FE' : '#FFF',
      background: '#FFFFFF',
    },
    divider: theme === 'light' ? '#d4dadf' : 'rgba(255, 255, 255, 0.2)',
    background: {
      default: theme === 'light' ? '#FFF' : '#212121',
      primary: theme === 'light' ? '#F5F7F9' : '#212121',
      paper: theme === 'light' ? '#F5F7F9' : '#212121',
    },
    border: {
      primary: theme === 'light' ? '#d4dadf' : 'rgba(255, 255, 255, 0.2)',
      primaryHover: theme === 'light' ? '#242A31' : '#FFF',
      secondary: theme === 'light' ? '#E6ECF1' : 'rgba(255,255,255,0.2)',
    },
    text: {
      primary: theme === 'light' ? '#242A31' : '#FFF',
      secondary: theme === 'light' ? '#74818D' : 'rgba(255, 255, 255, 0.7)',
      tertiary: theme === 'light' ? '#9DAAB6' : 'rgba(255, 255, 255, 0.7)',
      quaternary: theme === 'light' ? '#5C6975' : 'rgba(255, 255, 255, 0.7)',
    },
    action: {
      active: theme === 'light' ? '#3884FE' : '#FFF',
      hover: theme === 'light' ? '#3884FE' : 'rgba(255, 255, 255, 0.7)',
      background: theme === 'light' ? '#E6ECF1' : 'rgba(255,255,255,0.2)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#333',
          color: theme === 'light' ? '#242A31' : '#FFF',
        },
        root: {
          boxShadow:
            theme === 'light'
              ? '0 3px 8px 0 rgba(116, 129, 141, 0.1)'
              : '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid',
          borderBottomColor:
            theme === 'light' ? '#d4dadf' : 'rgba(255,255,255,0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: theme === 'light' ? '#F5F7F9' : '#212121',
        },
        paperAnchorDockedLeft: {
          borderRight: `1px solid`,
          borderRightColor:
            theme === 'light' ? '#E6ECF1' : 'rgba(255,255,255,0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme === 'light' ? '#FFFFFF' : '#212121',
        },
      },
    },
  },
  // other
  drawerWidth: '299px',
});
