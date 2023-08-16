import React, { createContext, useState, useContext } from 'react';
const ThemeContext = createContext();
export function useTheme() {
    return useContext(ThemeContext);
}
export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
