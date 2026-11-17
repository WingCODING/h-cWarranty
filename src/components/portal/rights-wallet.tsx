"use client";

import { Briefcase, CircleAlert, HeartPulse, Home, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GRANTED_RIGHTS } from "@/lib/case-data";
import type { Decision } from "@/components/diagnosis/review-desk";

const ICONS = {
  work: Briefcase,
  residence: Home,
  services: HeartPulse,
} as const;

export function RightsWallet({ decision }: { decision: Decision }) {
  if (decision !== "approved") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Alert className="bg-card p-5">
          <CircleAlert aria-hidden />
          <AlertTitle>Nenhum amparo provisório ativo</AlertTitle>
          <AlertDescription>
            {decision === "denied"
              ? "O processo foi encaminhado para a fila geral de análise."
              : "Aguardando a decisão do agente na Mesa de Verificação."}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-4 rounded-2xl bg-success p-6 text-success-foreground shadow-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-success-foreground/15"
        >
          <ShieldCheck className="size-6" aria-hidden />
        </motion.div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">Amparo Provisório Ativo</p>
          <p className="text-sm leading-relaxed text-success-foreground/90">
            Você está autorizado a residir e trabalhar no Canadá até a decisão
            final do seu processo H&amp;C.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {GRANTED_RIGHTS.map((right, index) => {
          const Icon = ICONS[right.key];
          return (
            <motion.div
              key={right.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1 + 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex"
            >
              <Card className="w-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        delay: index * 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Badge className="bg-success-soft font-semibold tracking-wide text-success">
                        ATIVO
                      </Badge>
                    </motion.div>
                  </div>
                  <CardTitle className="pt-3 font-semibold">{right.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {right.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
