import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "dark" | "light"

interface ThemeStore {
    theme: Theme
    toggleTheme: () => void
}

export const useTheme = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () => set((state) => ({
                theme: state.theme === "light" ? "dark" : "light"
            })),
        }),
        { name: "theme" }
    )
)