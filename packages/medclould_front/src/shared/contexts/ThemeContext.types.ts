import { ReactNode } from "react";

export interface IThemeContextData {
  themeName: TThemeName;
  toggleTheme: () => void;
}

export type TThemeName = "light" | "dark";

export interface IAppThemeProvider {
  children: ReactNode;
}
