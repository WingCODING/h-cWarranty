"use client";

import { Briefcase, Calendar, Check, GraduationCap, Sparkles, Users, X } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AI_SUMMARY } from "@/lib/case-data";

export type Decision = "pending" | "approved" | "denied";

const ICONS = {
  community: Users,
  time: Calendar,
  noc: Briefcase,
  school: GraduationCap,
} as const;

type ReviewDeskProps = {
  decision: Decision;
  onApprove: () => void;
  onDeny: () => void;
};

export function ReviewDesk({ decision, onApprove, onDeny }: ReviewDeskProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">
          Mesa de Verificação Rápida do Agente (Foco Nível 2)
        </CardTitle>
        <CardDescription>
          Revise o resumo e decida sobre a 1ª parte do amparo.
        </CardDescription>
        <CardAction>
          <DecisionBadge decision={decision} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-primary" aria-hidden />
          Resumo Executivo Gerado pela IA
        </p>

        <dl className="grid gap-3 sm:grid-cols-2">
          {AI_SUMMARY.map((item, index) => {
            const Icon = ICONS[item.key];
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className="flex gap-3 rounded-xl bg-muted/60 p-4 transition-colors hover:bg-muted/80"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div className="space-y-1">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-semibold">{item.value}</dd>
                  <dd className="text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </dd>
                </div>
              </motion.div>
            );
          })}
        </dl>
      </CardContent>

      <CardFooter className="grid gap-3 bg-transparent sm:grid-cols-2">
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            onClick={onApprove}
            className="h-11 w-full bg-success text-success-foreground hover:bg-success/90"
          >
            <Check aria-hidden />
            Aprovar Amparo Provisório (1ª Parte)
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            variant="outline"
            onClick={onDeny}
            className="h-11 w-full text-destructive hover:bg-danger-soft hover:text-destructive"
          >
            <X aria-hidden />
            Negar Amparo Preliminar e Enviar para Fila Geral
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}

function DecisionBadge({ decision }: { decision: Decision }) {
  if (decision === "approved") {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <Badge className="bg-success-soft text-success">Aprovado</Badge>
      </motion.div>
    );
  }
  if (decision === "denied") {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        <Badge variant="destructive">Enviado à fila geral</Badge>
      </motion.div>
    );
  }
  return <Badge className="bg-warning-soft text-warning">Aguardando decisão</Badge>;
}
