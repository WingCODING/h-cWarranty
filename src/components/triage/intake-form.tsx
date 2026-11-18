"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Sparkles, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { AnalysisProgress, ANALYSIS_DURATION_MS } from "@/components/triage/analysis-progress";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MAX_PAGES,
  NOC_OPTIONS,
  initialCase,
  type DossierCase,
} from "@/lib/case-data";

type IntakeFormProps = {
  dossier?: DossierCase;
  onSubmitted: () => void;
};

export function IntakeForm({
  dossier = initialCase,
  onSubmitted,
}: IntakeFormProps) {
  const [noc, setNoc] = useState<string>(dossier.noc);
  const [isRunning, setIsRunning] = useState(false);
  const runTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setNoc(dossier.noc);
  }, [dossier]);

  useEffect(() => {
    return () => {
      if (runTimerRef.current) clearTimeout(runTimerRef.current);
    };
  }, []);

  const { file } = dossier;
  const usage = Math.round((file.pages / MAX_PAGES) * 100);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRunning) return;
    setIsRunning(true);
    runTimerRef.current = setTimeout(() => {
      setIsRunning(false);
      onSubmitted();
    }, ANALYSIS_DURATION_MS);
  }

  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Dados do processo</CardTitle>
        <CardDescription>
          Informe os dados do imigrante e anexe o dossiê H&amp;C.
        </CardDescription>
      </CardHeader>

      <form key={dossier.id} onSubmit={handleSubmit} className="contents">
        <CardContent className="space-y-6">
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="ircc">Número da Aplicação IRCC</FieldLabel>
              <Input
                id="ircc"
                defaultValue={dossier.irccNumber}
                className="h-10 transition-colors"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Nome do Imigrante</FieldLabel>
              <Input
                id="name"
                defaultValue={dossier.applicantName}
                className="h-10 transition-colors"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="noc">Ocupação NOC</FieldLabel>
              <Select
                items={NOC_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
                value={noc}
                onValueChange={(value) => value && setNoc(value as string)}
              >
                <SelectTrigger id="noc" className="h-10 w-full transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NOC_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="dependents">Número de Dependentes</FieldLabel>
              <Input
                id="dependents"
                type="number"
                min={0}
                defaultValue={dossier.dependents}
                className="h-10 transition-colors"
              />
            </Field>
          </FieldGroup>

          <div className="space-y-3">
            <p className="text-sm font-medium">Anexar Dossiê H&amp;C em PDF</p>

            <motion.label
              htmlFor="dossier"
              whileHover={{ scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
              transition={{ duration: 0.2 }}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-input bg-muted/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <Upload className="size-6 text-primary" aria-hidden />
              </motion.div>
              <span className="text-sm font-medium">
                Arraste o PDF aqui ou clique para selecionar
              </span>
              <span className="text-xs text-muted-foreground">
                Máximo de {MAX_PAGES} páginas por arquivo
              </span>
              <input id="dossier" type="file" accept="application/pdf" className="sr-only" />
            </motion.label>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="size-5 shrink-0 text-primary" aria-hidden />
                  <p className="truncate text-sm font-medium">
                    {file.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({file.pages}/{MAX_PAGES} páginas - Validado)
                    </span>
                  </p>
                </div>
                <Badge className="bg-success-soft text-success">
                  <CheckCircle2 aria-hidden />
                  Validado
                </Badge>
              </div>
              <Progress
                value={usage}
                aria-label="Páginas utilizadas"
                className="[&_[data-slot=progress-track]]:h-2"
              />
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {isRunning && <AnalysisProgress key="analysis-progress" />}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="justify-end bg-transparent">
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" size="lg" className="h-11 px-5 shadow-xs" disabled={isRunning}>
              {isRunning ? (
                <Spinner aria-hidden />
              ) : (
                <Sparkles aria-hidden />
              )}
              {isRunning ? "Executando triagem..." : "Executar Triagem via OpenAI API"}
            </Button>
          </motion.div>
        </CardFooter>
      </form>
    </Card>
  );
}
