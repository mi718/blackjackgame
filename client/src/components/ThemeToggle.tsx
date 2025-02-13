import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "../hooks/use-theme"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    )
}
