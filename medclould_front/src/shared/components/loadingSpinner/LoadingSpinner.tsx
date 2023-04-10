import React, { ReactNode } from "react";
import "./loadingSpinner.css";

export const LoadingSpinner = ({ children, loading }: { children: ReactNode, loading: boolean }): JSX.Element => {
    return (
        loading ?
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
            : <> {children}</>
    );
}