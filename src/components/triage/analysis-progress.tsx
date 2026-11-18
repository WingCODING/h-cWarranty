"use client";

import * as React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * Etapas da análise do dossiê pela API de IA.
 * Segue o padrão do ProgressDemo: começa em 13%, avança para 66% após 500ms
 * e então completa as etapas restantes até 100%.
 */
const STEPS = [
  { at: 0, value: 13, label: "Enviando dossiê para a API de IA..." },
  { at: 500, value: 66, label: "Lendo documentos e extraindo evidências..." },
  { at: 1500, value: 88, label: "Classificando nível de triagem H&C..." },
  { at: 2200, value: 100, label: "Diagnóstico concluído" },
] as const;

export const ANALYSIS_DURATION_MS = 2700;

export function AnalysisProgress({ className }: { className?: string }) {
  const [stepIndex, setStepIndex] = React.useState(0);

  React.useEffect(() => {
    const timers = STEPS.slice(1).map((step, i) =>
      setTimeout(() => setStepIndex(i + 1), step.at)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const step = STEPS[stepIndex];
  const done = step.value === 100;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("overflow-hidden", className)}
      role="status"
      aria-live="polite"
    >
      <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <motion.span
            key={step.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 font-medium"
          >
            {done ? (
              <CheckCircle2 className="size-4 text-success" aria-hidden />
            ) : (
              <Sparkles className="size-4 animate-pulse text-primary" aria-hidden />
            )}
            {step.label}
          </motion.span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {step.value}%
          </span>
        </div>

        <Progress
          value={step.value}
          aria-label="Progresso da análise via IA"
          className="w-full [&_[data-slot=progress-indicator]]:duration-700 [&_[data-slot=progress-indicator]]:ease-out [&_[data-slot=progress-track]]:h-2"
        />
      </div>
    </motion.div>
  );
}
