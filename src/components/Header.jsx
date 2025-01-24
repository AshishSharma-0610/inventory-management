import React from "react"
import { Sun, Moon } from "lucide-react"

export default function Header({ darkMode, setDarkMode }) {
    return (
        <header className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400 transition-colors duration-300">
                    Inventory Management
                </h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-secondary-200 dark:bg-secondary-700 text-primary-600 dark:text-primary-400 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
            </div>
        </header>
    )
}

