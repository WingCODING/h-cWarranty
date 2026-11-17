"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiLimitNotice } from "@/components/triage/api-limit-notice";
import { IntakeForm } from "@/components/triage/intake-form";
import { LevelCards } from "@/components/diagnosis/level-cards";
import { ReviewDesk, type Decision } from "@/components/diagnosis/review-desk";
import { RightsWallet } from "@/components/portal/rights-wallet";

type Screen = "triage" | "diagnosis" | "portal";

const SCREENS: { value: Screen; step: number; label: string }[] = [
  { value: "triage", step: 1, label: "Mesa de Triagem" },
  { value: "diagnosis", step: 2, label: "Diagnóstico da IA" },
  { value: "portal", step: 3, label: "Portal do Imigrante" },
];

export function AmparoWorkspace() {
  const [screen, setScreen] = useState<Screen>("triage");
  const [decision, setDecision] = useState<Decision>("pending");

  return (
    <Tabs
      value={screen}
      onValueChange={(value) => setScreen(value as Screen)}
      className="gap-8"
    >
      <TabsList variant="line" className="h-auto w-full justify-start gap-6 border-b pb-0">
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
                <IntakeForm onSubmitted={() => setScreen("diagnosis")} />
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
              <LevelCards current={2} />
              <ReviewDesk
                decision={decision}
                onApprove={() => {
                  setDecision("approved");
                  setScreen("portal");
                }}
                onDeny={() => setDecision("denied")}
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
              <RightsWallet decision={decision} />
            </motion.div>
          </TabsContent>
        )}
      </AnimatePresence>
    </Tabs>
  );
}

function ScreenHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
