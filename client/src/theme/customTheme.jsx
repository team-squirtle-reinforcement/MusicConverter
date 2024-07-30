import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',  // remove uppercase transformation default for buttons
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#1551ED'  // primary color
        },
        secondary: {
            main: '#A0F42C'  // secondary color
        },
        white: {
            main: '#F8F9FB'  // white
        },
        black: {
            main: '#01030B'  // black
        }
    },
    typography: {
        h1: {
            fontSize: '6rem',
            fontWeight: 900,
            fontFamily: 'Merriweather Sans, sans-serif',
            textAlign: 'center',
        },
        h2: {
            fontSize: '4rem',
            fontWeight: 500,
            fontFamily: 'Merriweather Sans, sans-serif',
        },
        h3: {
            fontSize: '2.5rem',
            fontWeight: 500,
            fontFamily: 'Merriweather Sans, sans-serif',
        },
        body1: {
            fontSize: '1.5rem',
            fontWeight: 400,
            fontFamily: 'Poppins, serif',
        },
        body1: {
            fontSize: '1.5rem',
            fontWeight: 400,
            fontFamily: 'Poppins, serif',
        },
        button: {
            fontSize: '1.5rem',
            fontWeight: 400,
            fontFamily: 'Poppins, serif',
            borderRadius: '0.5em',
        },

    }
})

export const spotifyThemeColor = '#1ED760';

export default customTheme;