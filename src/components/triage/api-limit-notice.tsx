"use client";

import { AlertTriangle, Layers } from "lucide-react";
import { motion } from "motion/react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const VOLUMES = [
  { name: "Volume 1", range: "Páginas 1–150" },
  { name: "Volume 2", range: "Páginas 151–300" },
  { name: "Volume 3", range: "Páginas 301+" },
];

export function ApiLimitNotice() {
  return (
    <Card className="border-l-4 border-l-warning bg-warning-soft ring-warning/30 transition-shadow hover:shadow-sm">
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <motion.div
            animate={{ rotate: [0, -4, 4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning"
          >
            <AlertTriangle className="size-5" aria-hidden />
          </motion.div>
          <div className="space-y-2">
            <h3 className="font-semibold leading-snug text-foreground">
              Limite Técnico da API: Máximo de 150 Páginas por PDF
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Processos H&amp;C com mais de 300 páginas devem ser divididos em
              volumes de até 150 páginas por arquivo para leitura completa pelo
              Agente de IA.
            </p>
          </div>
        </div>

        <Separator className="bg-warning/20" />

        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs font-medium text-primary">
            <Layers className="size-4" aria-hidden />
            Como dividir o dossiê
          </p>
          <ul className="space-y-1.5">
            {VOLUMES.map((volume, index) => (
              <motion.li
                key={volume.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ x: 3, transition: { duration: 0.15 } }}
                className="flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm transition-colors hover:shadow-xs"
              >
                <span className="font-medium">{volume.name}</span>
                <span className="text-muted-foreground">{volume.range}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
