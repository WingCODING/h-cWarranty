"use client";

import { useState } from "react";
import { ArrowLeft, Layers, ListOrdered, Inbox, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NOC_OPTIONS, type QueueEntry } from "@/lib/case-data";
import { cn } from "@/lib/utils";

type GeneralQueueProps = {
  entries: QueueEntry[];
  /** Id do processo que acabou de ser negado (animado caindo na pilha). */
  highlightId?: string | null;
  onBack: () => void;
};

const CARD_HEIGHT = 132;
const STACK_OFFSET = 16;
const MAX_VISIBLE_STACK = 4;
const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;

export function GeneralQueue({ entries, highlightId, onBack }: GeneralQueueProps) {
  const [expanded, setExpanded] = useState(false);
  const highlighted = entries.find((e) => e.id === highlightId);

  const visibleInStack = Math.min(entries.length, MAX_VISIBLE_STACK);
  const stackHeight = CARD_HEIGHT + Math.max(0, visibleInStack - 1) * STACK_OFFSET;

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 py-4">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5 font-semibold">
          <ArrowLeft className="size-4" />
          Voltar para Fila (Coverflow)
        </Button>

        {entries.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((v) => !v)}
            className="gap-1.5"
          >
            {expanded ? <Layers className="size-4" /> : <ListOrdered className="size-4" />}
            {expanded ? "Empilhar processos" : "Expandir pilha"}
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Fila Geral de Processos</h1>
        <p className="text-sm text-muted-foreground">
          Processos com amparo preliminar negado seguem para análise completa, em ordem de chegada.
          <span className="ml-2 font-semibold text-foreground">{entries.length} na fila</span>
        </p>
      </div>

      {/* Aviso do processo recém-enviado */}
      <AnimatePresence>
        {highlighted && (
          <motion.div
            key={highlighted.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-danger-soft px-4 py-3 text-sm"
          >
            <X className="size-4 shrink-0 text-destructive" aria-hidden />
            <span>
              <strong>{highlighted.applicantName}</strong> teve o amparo preliminar negado e foi
              adicionado ao topo da Fila Geral. O processo continua em análise.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pilha / lista */}
      {entries.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
          <Inbox className="size-6" />
          <p className="text-sm">Nenhum processo na Fila Geral.</p>
        </div>
      ) : (
        <motion.div
          layout
          transition={SPRING}
          onClick={() => !expanded && entries.length > 1 && setExpanded(true)}
          className={cn(
            "relative",
            expanded ? "flex flex-col gap-3" : "cursor-pointer"
          )}
          style={expanded ? undefined : { height: stackHeight }}
        >
          {entries.map((entry, i) => {
            const hiddenInStack = !expanded && i >= MAX_VISIBLE_STACK;
            const isNew = entry.id === highlightId;

            return (
              <motion.div
                key={entry.id}
                layout
                initial={isNew ? { opacity: 0, y: -140, rotate: -4, scale: 1.04 } : false}
                animate={
                  expanded
                    ? { opacity: 1, y: 0, scale: 1, rotate: 0 }
                    : {
                        opacity: hiddenInStack ? 0 : 1 - i * 0.12,
                        y: i * STACK_OFFSET,
                        scale: 1 - i * 0.04,
                        rotate: 0,
                      }
                }
                transition={{ ...SPRING, delay: isNew ? 0.15 : 0 }}
                className={cn(expanded ? "relative" : "absolute inset-x-0 top-0")}
                style={{
                  zIndex: entries.length - i,
                  transformOrigin: "top center",
                  height: CARD_HEIGHT,
                }}
              >
                <QueueCard entry={entry} position={i + 1} isNew={isNew} />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {!expanded && entries.length > 1 && (
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Clique na pilha para ver todos os processos
        </p>
      )}
    </section>
  );
}

function QueueCard({
  entry,
  position,
  isNew,
}: {
  entry: QueueEntry;
  position: number;
  isNew: boolean;
}) {
  const nocLabel =
    NOC_OPTIONS.find((o) => o.value === entry.noc)?.label ?? `NOC ${entry.noc}`;
  const initials = entry.applicantName
    .split(/\s+/)
    .filter((w) => /^[A-ZÀ-Ý]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      className={cn(
        "flex h-full items-stretch overflow-hidden rounded-2xl border bg-card shadow-lg",
        isNew && "ring-2 ring-destructive/40"
      )}
    >
      <div className="relative w-28 shrink-0 bg-muted">
        {entry.imageUrl ? (
          <img
            src={entry.imageUrl}
            alt={entry.applicantName}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xl font-semibold text-muted-foreground">
            {initials}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{entry.applicantName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {entry.originCountry} &bull; {entry.cityProvince} &bull;{" "}
              <span className="font-mono">{entry.irccNumber}</span>
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs font-semibold text-muted-foreground">
            #{String(position).padStart(2, "0")}
          </span>
        </div>

        <p className="line-clamp-1 text-xs text-muted-foreground">{entry.reason}</p>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="destructive">Fila geral</Badge>
          <Badge variant="outline">{nocLabel}</Badge>
          <span className="ml-auto text-xs text-muted-foreground">{entry.queuedAt}</span>
        </div>
      </div>
    </div>
  );
}
