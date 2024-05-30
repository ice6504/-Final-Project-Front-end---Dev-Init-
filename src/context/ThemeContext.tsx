"use client";
import { createContext, useEffect, useState, ReactNode, FC } from "react";

interface ThemeContextType {
  theme: string;
  changeTheme: (nextTheme?: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  changeTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme : "light";
    }
    return "light";
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const changeTheme = (nextTheme?: string) => {
    if (nextTheme) {
      setTheme(nextTheme);
    } else {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
  };

  if (!isHydrated) {
    // While hydrating, render nothing to avoid mismatch
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
