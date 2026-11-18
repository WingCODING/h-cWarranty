"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseCoverflow } from "@/components/coverflow/case-coverflow";
import { GeneralQueue } from "@/components/queue/general-queue";
import { ApiLimitNotice } from "@/components/triage/api-limit-notice";
import { IntakeForm } from "@/components/triage/intake-form";
import { LevelCards } from "@/components/diagnosis/level-cards";
import { ReviewDesk, type Decision } from "@/components/diagnosis/review-desk";
import { RightsWallet } from "@/components/portal/rights-wallet";
import {
  GENERAL_QUEUE_SEED,
  MOCK_CASES,
  type DossierCase,
  type QueueEntry,
} from "@/lib/case-data";

type Screen = "triage" | "diagnosis" | "portal";

const SCREENS: { value: Screen; step: number; label: string }[] = [
  { value: "triage", step: 1, label: "Mesa de Triagem" },
  { value: "diagnosis", step: 2, label: "Diagnóstico da IA" },
  { value: "portal", step: 3, label: "Portal do Imigrante" },
];

export function AmparoWorkspace() {
  // Armazena apenas as decisões alteradas na sessão para que os dados/imagens venham sempre atualizados de MOCK_CASES (ou futuro NoSQL)
  const [decisionsById, setDecisionsById] = useState<Record<string, Decision>>(
    {}
  );
  const [activeCoverflowIndex, setActiveCoverflowIndex] = useState<number>(1);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("triage");
  const [queue, setQueue] = useState<QueueEntry[]>(GENERAL_QUEUE_SEED);
  const [showQueue, setShowQueue] = useState(false);
  const [highlightQueueId, setHighlightQueueId] = useState<string | null>(null);

  const cases = useMemo<DossierCase[]>(() => {
    return MOCK_CASES.map((item) => {
      const override = decisionsById[item.id];
      if (!override) return item;
      return {
        ...item,
        evaluated: override !== "pending",
        initialDecision: override,
        submittedAt:
          override === "approved"
            ? "Avaliado agora (Aprovado)"
            : "Avaliado agora (Fila Geral)",
      };
    });
  }, [decisionsById]);

  const activeCase =
    cases.find((c) => c.id === selectedCaseId) ??
    cases[activeCoverflowIndex] ??
    cases[0];

  function handleOpenCase(dossier: DossierCase) {
    setSelectedCaseId(dossier.id);
    setShowQueue(false);
    setScreen("triage");
  }

  function handleBackToCoverflow() {
    setSelectedCaseId(null);
    setShowQueue(false);
    setHighlightQueueId(null);
  }

  function handleOpenQueue() {
    setHighlightQueueId(null);
    setShowQueue(true);
  }

  function updateCaseDecision(nextDecision: Decision) {
    if (!activeCase) return;
    setDecisionsById((prev) => ({
      ...prev,
      [activeCase.id]: nextDecision,
    }));
  }

  // Negar não encerra o processo: ele segue para o topo da Fila Geral (pilha)
  function handleDenyCase() {
    if (!activeCase) return;
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const entry: QueueEntry = {
      id: activeCase.id,
      applicantName: activeCase.applicantName,
      irccNumber: activeCase.irccNumber,
      originCountry: activeCase.originCountry,
      cityProvince: activeCase.cityProvince,
      noc: activeCase.noc,
      imageUrl: activeCase.imageUrl,
      queuedAt: `Hoje às ${time}`,
      reason: "Amparo preliminar negado pelo agente — aguardando análise completa.",
    };

    updateCaseDecision("denied");
    setQueue((prev) => [entry, ...prev.filter((e) => e.id !== entry.id)]);
    setHighlightQueueId(entry.id);
    setSelectedCaseId(null);
    setShowQueue(true);
  }

  const view = showQueue ? "queue" : selectedCaseId ? "workspace" : "coverflow";

  return (
    <AnimatePresence mode="wait">
      {view === "queue" ? (
        <motion.div
          key="general-queue"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <GeneralQueue
            entries={queue}
            highlightId={highlightQueueId}
            onBack={handleBackToCoverflow}
          />
        </motion.div>
      ) : view === "coverflow" ? (
        <motion.div
          key="coverflow-home"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenQueue}
            className="absolute top-0 right-0 z-20 gap-1.5 font-semibold"
          >
            <Layers className="size-4" />
            Fila Geral ({queue.length})
          </Button>
          <CaseCoverflow
            cases={cases}
            activeIndex={activeCoverflowIndex}
            onSelectIndex={setActiveCoverflowIndex}
            onOpenCase={handleOpenCase}
          />
        </motion.div>
      ) : (
        <motion.div
          key={`workspace-${activeCase.id}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Barra de Contexto do Processo Selecionado + Voltar para o Coverflow */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card px-4 py-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleBackToCoverflow}
                className="gap-1.5 font-semibold"
              >
                <ArrowLeft className="size-4" />
                Voltar para Fila (Coverflow)
              </Button>
              <div className="hidden h-5 w-px bg-border sm:block" />
              <div className="text-sm">
                <span className="font-semibold">{activeCase.applicantName}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {activeCase.irccNumber}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeCase.evaluated ? (
                <Badge className="gap-1.5 bg-[#1E3A8A] text-white">
                  <CheckCircle2 className="size-3.5" />
                  Avaliado
                </Badge>
              ) : (
                <Badge className="gap-1.5 bg-[#6B1F33] text-[#F1EEED]">
                  <Clock className="size-3.5" />
                  Avaliar
                </Badge>
              )}
            </div>
          </div>

          <Tabs
            value={screen}
            onValueChange={(value) => setScreen(value as Screen)}
            className="gap-8"
          >
            <TabsList
              variant="line"
              className="h-auto w-full justify-start gap-6 border-b pb-0"
            >
              {SCREENS.map(({ value, step, label }) => {
                const isActive = screen === value;
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="relative flex-none gap-2 px-0 pb-3 text-sm data-active:text-primary after:bg-primary"
                  >
                    <motion.span
                      animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex size-5 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground in-data-active:bg-primary in-data-active:text-primary-foreground"
                    >
                      {step}
                    </motion.span>
                    <span>{label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <AnimatePresence mode="wait">
              {screen === "triage" && (
                <TabsContent value="triage" className="space-y-6">
                  <motion.div
                    key="triage"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <ScreenHeading
                      title="Mesa de Triagem e Upload de Dossiê"
                      description="Cadastre o processo e envie o dossiê para análise da IA."
                    />
                    <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
                      <IntakeForm
                        dossier={activeCase}
                        onSubmitted={() => setScreen("diagnosis")}
                      />
                      <ApiLimitNotice />
                    </div>
                  </motion.div>
                </TabsContent>
              )}

              {screen === "diagnosis" && (
                <TabsContent value="diagnosis" className="space-y-6">
                  <motion.div
                    key="diagnosis"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <ScreenHeading
                      title="Diagnóstico da IA e Verificação Humana"
                      description="Classificação do caso em 3 níveis e decisão rápida do agente."
                    />
                    <LevelCards current={activeCase.triageLevel} />
                    <ReviewDesk
                      summary={activeCase.summary}
                      decision={activeCase.initialDecision}
                      onApprove={() => {
                        updateCaseDecision("approved");
                        setScreen("portal");
                      }}
                      onDeny={handleDenyCase}
                    />
                  </motion.div>
                </TabsContent>
              )}

              {screen === "portal" && (
                <TabsContent value="portal" className="space-y-6">
                  <motion.div
                    key="portal"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <ScreenHeading
                      title="Carteira de Direitos Provisórios Concedidos"
                      description="Visão do imigrante sobre os direitos liberados."
                    />
                    <RightsWallet decision={activeCase.initialDecision} />
                  </motion.div>
                </TabsContent>
              )}
            </AnimatePresence>
          </Tabs>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScreenHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
