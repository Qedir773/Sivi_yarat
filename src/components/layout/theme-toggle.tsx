"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createTranslator } from "@/lib/i18n";

const t = createTranslator();

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Theme is only known after client hydration; useSyncExternalStore avoids
  // the setState-in-effect pattern flagged by react-hooks/set-state-in-effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("common.toggleTheme")}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted && isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
        }
      />
      <TooltipContent>
        {isDark ? t("common.lightMode") : t("common.darkMode")}
      </TooltipContent>
    </Tooltip>
  );
}
