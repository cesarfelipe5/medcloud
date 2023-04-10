import { ReactNode } from "react";

export interface ILayoutBase {
    children: ReactNode;
    title: string;
    toolbar?: JSX.Element;
} 