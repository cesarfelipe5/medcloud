import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { DarkTheme, LightTheme } from './../themes';
import { IAppThemeProvider, IThemeContextData, TThemeName } from './ThemeContext.types';

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: IAppThemeProvider): JSX.Element => {
    const [themeName, setThemeName] = useState<TThemeName>('light');

    const toggleTheme = useCallback(() =>
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light'), []);

    const theme = useMemo(() =>
        themeName === 'light' ? LightTheme : DarkTheme, [themeName]);


    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}