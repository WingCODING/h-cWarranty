"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TRIAGE_LEVELS, type TriageLevel } from "@/lib/case-data";

const TONE = {
  success: {
    icon: CheckCircle2,
    accent: "border-t-success",
    iconBox: "bg-success-soft text-success",
    ring: "ring-success",
  },
  warning: {
    icon: Clock,
    accent: "border-t-warning",
    iconBox: "bg-warning-soft text-warning",
    ring: "ring-warning",
  },
  danger: {
    icon: XCircle,
    accent: "border-t-destructive",
    iconBox: "bg-danger-soft text-destructive",
    ring: "ring-destructive",
  },
} as const;

export function LevelCards({ current }: { current: TriageLevel }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {TRIAGE_LEVELS.map(({ level, title, description, tone }, index) => {
        const style = TONE[tone];
        const Icon = style.icon;
        const isCurrent = level === current;

        return (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex"
          >
            <Card
              aria-current={isCurrent ? "true" : undefined}
              className={cn(
                "w-full border-t-4 transition-shadow hover:shadow-md",
                style.accent,
                isCurrent ? cn("ring-2", style.ring) : "opacity-85"
              )}
            >
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg",
                      style.iconBox
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </div>
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    >
                      <Badge variant="outline" className="font-semibold">
                        Caso atual
                      </Badge>
                    </motion.div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Nível {level}
                  </p>
                  <h3 className="font-semibold leading-snug">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
