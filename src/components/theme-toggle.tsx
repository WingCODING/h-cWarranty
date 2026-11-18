"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      aria-label="Alternar modo claro/escuro"
      title="Alternar modo claro/escuro"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="dark"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="inline-flex items-center justify-center"
          >
            <Moon className="size-4" aria-hidden />
          </motion.span>
        ) : (
          <motion.span
            key="light"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="inline-flex items-center justify-center"
          >
            <Sun className="size-4" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
