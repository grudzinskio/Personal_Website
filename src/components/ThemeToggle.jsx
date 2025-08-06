import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "light") {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        } else {
            // Default to dark mode if not set or set to dark
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }, []);
    
    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    }
    
    return (
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
                <Moon className="h-5 w-5 text-blue-900" />
            )}
        </button>
    );
};