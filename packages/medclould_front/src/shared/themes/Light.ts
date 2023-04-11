import { createTheme } from '@mui/material'


export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#13a8c2',
            dark: '#0B84D9',
            light: '#0BD9C0',
            contrastText: '#dceff2'
        },
        secondary: {
            main: '#7e8286',
            dark: '#8D919E',
            light: '#8D9A9E',
            contrastText: '#cbccce'
        },
        background: {
            default: '#f2f2f3',
            paper: '#f9f9f9'
        }

    }
});
