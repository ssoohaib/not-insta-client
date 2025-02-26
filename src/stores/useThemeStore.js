import { create } from "zustand";
import { LIGHT_THEME, DARK_THEME } from "../utils";

const useThemeStore = create((set, get) => ({
    themeTag: 'dark',
    theme: DARK_THEME,
    toggleTheme: () => {
        const newTheme = get().theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        const newThemeTag = get().themeTag === 'light' ? 'dark' : 'light';
        set({ theme: newTheme, themeTag: newThemeTag });
    },

    setTheme: (isDark) => {
        set({ theme: isDark ? DARK_THEME : LIGHT_THEME, themeTag: isDark ? 'dark' : 'light' });
    },
}));

export default useThemeStore;
