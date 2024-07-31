import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',  // remove uppercase transformation default for buttons
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: '0.5em',
                    '& .MuiInputBase-input': {
                        color: theme.palette.white.main,  // white input text color
                    },
                    // [theme.breakpoints.down('sm')]: {
                    //   fontSize: '.2rem', // smaller font size for small screens
                    // },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.primary.main,  // primary color
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,  // primary color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,  // primary color on focus
                        },
                    },
                })
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
            fontWeight: 400,
            fontFamily: 'Poppins, serif',
            borderRadius: '0.5em',
        },
    }
})

export const spotifyThemeColor = '#1ED760';
export const youtTubeThemeColor = '#FF0302';

export default customTheme;