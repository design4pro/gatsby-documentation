export default theme => ({
    palette: {
        primary: {
            main: theme === 'light' ? '#3884FE' : '#FFF',
            background: '#FFFFFF'
        },
        divider: theme === 'light' ? '#d4dadf' : 'rgba(255,255,255,0.2)',
        background: {
            default: theme === 'light' ? '#FFF' : '#212121'
        }
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#333',
                color: theme === 'light' ? '#242A31' : '#FFF'
            },
            root: {
                boxShadow:
                    theme === 'light'
                        ? '0 3px 8px 0 rgba(116, 129, 141, 0.1)'
                        : '0 3px 8px 0 rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid',
                borderBottomColor:
                    theme === 'light' ? '#d4dadf' : 'rgba(255,255,255,0.2)'
            }
        },
        MuiDrawer: {
            paper: {
                backgroundColor: theme === 'light' ? '#F5F7F9' : '#212121'
            },
            paperAnchorDockedLeft: {
                borderRight: `1px solid`,
                borderRightColor:
                    theme === 'light' ? '#E6ECF1' : 'rgba(255,255,255,0.2)'
            }
        }
    }
});
