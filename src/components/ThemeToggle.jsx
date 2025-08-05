import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
        <button onClick={toggleTheme} className={cn(
            "fixed max-sm:hidden top-5 right-5 z-50 rounded-full transition-colors dutation-300",
            "focus: outline-hidden"
        )}>
            {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-300" />
            ) : (
                <Moon className="h-6 w-6 text-blue-900" />
            )}
        </button>
    );

};