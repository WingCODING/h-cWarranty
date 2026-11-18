"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

import { useIntro } from "@/components/background-intro";
import { Button } from "@/components/ui/button";
import { NOC_OPTIONS, type DossierCase } from "@/lib/case-data";
import { cn } from "@/lib/utils";

type CaseCoverflowProps = {
  cases: DossierCase[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenCase: (dossier: DossierCase) => void;
};

const CARD_WIDTH = 275;
const EXPANDED_PHOTO_WIDTH = 430;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const INFO_PANEL_WIDTH = 520;

export function CaseCoverflow({
  cases,
  onSelectIndex,
  onOpenCase,
}: CaseCoverflowProps) {
  const { contentVisible } = useIntro();
  const [hasEntered, setHasEntered] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [centeringId, setCenteringId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;
    const timer = setTimeout(() => setHasEntered(true), 750);
    return () => clearTimeout(timer);
  }, [contentVisible]);

  // Calcula dinamicamente a partir da quantidade de documentos (pronto para banco NoSQL)
  const middleIndex = (cases.length - 1) / 2;
  const maxPan = Math.max(0, middleIndex * CARD_STEP);

  const rawX = useMotionValue(0);
  const smoothX = useSpring(rawX, {
    stiffness: 180,
    damping: 26,
    mass: 0.75,
  });

  const dragStartClientX = useRef<number | null>(null);
  const dragStartTrackX = useRef<number>(0);
  const dragMovedDistance = useRef<number>(0);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Deslocamento exato que posiciona o card `idx` no centro da tela
  function getCenterOffsetForIndex(idx: number) {
    return (middleIndex - idx) * CARD_STEP;
  }

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && expandedId) {
        handleCloseExpanded();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    if (!isDragging) return;

    function handleWindowPointerMove(event: PointerEvent) {
      if (dragStartClientX.current === null) return;
      const rawDelta = event.clientX - dragStartClientX.current;
      dragMovedDistance.current = Math.max(
        dragMovedDistance.current,
        Math.abs(rawDelta)
      );

      if (dragMovedDistance.current > 10 && expandedId) {
        setExpandedId(null);
      }

      const dampedDelta = rawDelta * 0.55;
      const nextX = Math.max(
        -maxPan,
        Math.min(maxPan, dragStartTrackX.current + dampedDelta)
      );
      rawX.set(nextX);
    }

    function handleWindowPointerUp() {
      dragStartClientX.current = null;
      setIsDragging(false);
    }

    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
    window.addEventListener("pointercancel", handleWindowPointerUp);
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
      window.removeEventListener("pointercancel", handleWindowPointerUp);
    };
  }, [expandedId, isDragging, maxPan, rawX]);

  function handleStripPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    dragStartClientX.current = event.clientX;
    dragStartTrackX.current = rawX.get();
    dragMovedDistance.current = 0;
    setIsDragging(true);
  }

  function handleCardClick(dossier: DossierCase, idx: number) {
    if (dragMovedDistance.current > 7) return;

    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    if (expandedId === dossier.id) return;

    onSelectIndex(idx);

    const targetCenterX = getCenterOffsetForIndex(idx);
    const distanceToCenter = Math.abs(rawX.get() - targetCenterX);

    if (expandedId) {
      setExpandedId(null);
    }

    // Etapa 1: Centraliza o card no meio da tela
    setCenteringId(dossier.id);
    rawX.set(targetCenterX);

    // Etapa 2: Aumenta o card no meio da tela e estica as informações da esquerda para a direita
    const delayMs = distanceToCenter > 24 ? 260 : 40;
    openTimerRef.current = setTimeout(() => {
      setCenteringId(null);
      setExpandedId(dossier.id);
    }, delayMs);
  }

  function handleCloseExpanded() {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    setCenteringId(null);
    setExpandedId(null);
  }

  function getNocLabel(nocCode: string) {
    return (
      NOC_OPTIONS.find((item) => item.value === nocCode)?.label ??
      `NOC ${nocCode}`
    );
  }

  function getTimeInCanada(dossier: DossierCase) {
    return (
      dossier.summary.find((item) => item.key === "time")?.value ??
      "4+ anos no Canadá"
    );
  }

  function getCommunityBond(dossier: DossierCase) {
    return (
      dossier.summary.find((item) => item.key === "community")?.value ??
      "Vínculo comunitário comprovado"
    );
  }

  return (
    <section
      onClick={(e) => {
        if (e.target === e.currentTarget && expandedId) {
          handleCloseExpanded();
        }
      }}
      className="relative flex min-h-[calc(100vh-6rem)] w-full flex-col items-center justify-center overflow-hidden py-4"
    >
      {/* Cabeçalho discreto e indicadores */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: !contentVisible ? 0 : expandedId ? 0.25 : 1,
          y: !contentVisible ? 18 : expandedId ? -8 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 flex flex-col items-center gap-2.5 text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Processos H&amp;C Recebidos
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>
            Arraste para os lados ou clique em uma foto para centralizar e expandir o processo
          </span>
          <span className="hidden h-3.5 w-px bg-border sm:inline" />
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <span className="size-2.5 rounded-full bg-[#6B1F33]" />
            Avaliar ({cases.filter((c) => !c.evaluated).length})
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <span className="size-2.5 rounded-full bg-[#1E3A8A]" />
            Avaliado ({cases.filter((c) => c.evaluated).length})
          </span>
        </div>
      </motion.div>

      {/* Faixa Horizontal Centralizada — A imagem vem ao centro, cresce e abre da esquerda para a direita */}
      <div
        onPointerDown={handleStripPointerDown}
        className={cn(
          "relative flex w-full items-center justify-center overflow-visible py-2 select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
      >
        <motion.div
          initial={false}
          style={{ x: smoothX }}
          className="flex items-center gap-5 px-6"
        >
          {cases.map((dossier, idx) => {
            const isExpanded = expandedId === dossier.id;
            const isCentering = centeringId === dossier.id;
            const isDimmed = Boolean(expandedId && !isExpanded);
            // Distância em relação ao centro para escalonar a entrada do meio para as bordas
            const radialDistance = Math.abs(idx - middleIndex);
            const staggerDelay = hasEntered ? 0 : 0.08 + radialDistance * 0.075;

            return (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 42, scale: 0.88 }}
                animate={{
                  height: isExpanded ? 570 : 410,
                  y: contentVisible ? 0 : 42,
                  scale: !contentVisible
                    ? 0.88
                    : isDimmed
                      ? 0.88
                      : isCentering
                        ? 1.03
                        : 1,
                  opacity: !contentVisible ? 0 : isDimmed ? 0.2 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 26,
                  delay: staggerDelay,
                }}
                className={cn(
                  "relative flex shrink-0 flex-row items-stretch overflow-hidden bg-card shadow-xl",
                  isExpanded
                    ? "z-30 border border-border/80 shadow-2xl"
                    : "z-10"
                )}
              >
                {/* LADO ESQUERDO: FOTO REAL DO PROCESSO (CRESCE NO MEIO DA TELA) */}
                <motion.button
                  type="button"
                  aria-label={`Selecionar perfil de ${dossier.applicantName}`}
                  onClick={() => {
                    if (isExpanded) {
                      handleCloseExpanded();
                    } else {
                      handleCardClick(dossier, idx);
                    }
                  }}
                  animate={{
                    width: isExpanded ? EXPANDED_PHOTO_WIDTH : CARD_WIDTH,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 230,
                    damping: 28,
                  }}
                  className="group relative h-full shrink-0 cursor-pointer overflow-hidden text-left focus-visible:outline-none"
                >
                  <CasePhoto
                    dossier={dossier}
                    index={idx}
                    showOverlayInfo={!isExpanded}
                  />
                </motion.button>

                {/* LADO DIREITO: PAINEL DE INFORMAÇÕES (ESTICA DA ESQUERDA PARA A DIREITA) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="info-panel"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: INFO_PANEL_WIDTH, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 230,
                        damping: 28,
                        mass: 0.8,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative flex h-full shrink-0 flex-col justify-between overflow-hidden border-l border-border bg-card text-card-foreground"
                      style={{ transformOrigin: "left center" }}
                    >
                      <div
                        style={{ width: INFO_PANEL_WIDTH }}
                        className="flex h-full flex-col justify-between p-8 sm:p-10"
                      >
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                                PROCESSO &bull; {String(idx + 1).padStart(2, "0")} &bull;{" "}
                                {dossier.irccNumber}
                              </p>

                              {dossier.evaluated ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#1E3A8A] px-2.5 py-0.5 text-[11px] font-bold text-white">
                                  <CheckCircle2 className="size-3" />
                                  Avaliado
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#6B1F33] px-2.5 py-0.5 text-[11px] font-bold text-[#F1EEED]">
                                  <Clock className="size-3" />
                                  Avaliar
                                </span>
                              )}
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                              {dossier.applicantName}
                            </h2>
                          </div>

                          {/* Tabela de Atributos: Quem é e o que faz a pessoa */}
                          <dl className="divide-y divide-border border-t border-b border-border text-sm">
                            <div className="flex items-center justify-between gap-4 py-3.5">
                              <dt className="text-muted-foreground">
                                Ocupação (O que faz)
                              </dt>
                              <dd className="text-right font-semibold">
                                {getNocLabel(dossier.noc)}
                              </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 py-3.5">
                              <dt className="text-muted-foreground">
                                Origem &amp; Cidade
                              </dt>
                              <dd className="text-right font-semibold">
                                {dossier.originCountry} &bull; {dossier.cityProvince}
                              </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 py-3.5">
                              <dt className="text-muted-foreground">
                                Tempo no Canadá
                              </dt>
                              <dd className="text-right font-semibold">
                                {getTimeInCanada(dossier)}
                              </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 py-3.5">
                              <dt className="text-muted-foreground">
                                Vínculo Comunitário
                              </dt>
                              <dd className="text-right font-semibold">
                                {getCommunityBond(dossier)}
                              </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 py-3.5">
                              <dt className="text-muted-foreground">
                                Dependentes &amp; Dossiê
                              </dt>
                              <dd className="text-right font-semibold">
                                {dossier.dependents} dep. &bull; {dossier.file.pages}/150 págs
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Rodapé: FECHAR e AVALIAR CASO */}
                        <div className="flex items-center justify-between gap-4 pt-4">
                          <button
                            type="button"
                            onClick={handleCloseExpanded}
                            className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                          >
                            <X className="size-3.5" />
                            FECHAR
                          </button>

                          <Button
                            size="lg"
                            onClick={() => {
                              handleCloseExpanded();
                              onOpenCase(dossier);
                            }}
                            className="h-11 gap-2 px-6 font-semibold shadow-sm"
                          >
                            {dossier.evaluated
                              ? "Revisar Caso Avaliado"
                              : "Avaliar Caso"}
                            <ArrowRight className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Componente de Foto Real do Processo (usando as imagens de /img/MockupsImigrations)
 */
function CasePhoto({
  dossier,
  index,
  showOverlayInfo,
}: {
  dossier: DossierCase;
  index: number;
  showOverlayInfo: boolean;
}) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-stone-950 select-none">
      {/* Fotografia real do caso ocupando 100% do quadro */}
      <img
        src={
          dossier.imageUrl ?? `/img/MockupsImigrations/case-${index + 1}.jpg`
        }
        alt={dossier.applicantName}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />

      {/* Vinheta sutil no topo para leitura do número e do selo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent"
      />

      {/* Topo da Foto: Número + Indicador Sólido Avaliado / Avaliar */}
      <div className="relative z-20 flex items-center justify-between p-4">
        <span className="font-mono text-xs font-semibold tracking-wider text-white">
          {String(index + 1).padStart(2, "0")}
        </span>

        {dossier.evaluated ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1E3A8A] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
            <CheckCircle2 className="size-3" />
            Avaliado
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#6B1F33] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#F1EEED] shadow-sm">
            <Clock className="size-3" />
            Avaliar
          </span>
        )}
      </div>

      {/* Rodapé da Foto */}
      {showOverlayInfo ? (
        <div className="relative z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 text-white">
          <p className="truncate text-base font-bold tracking-tight">
            {dossier.applicantName}
          </p>
          <p className="truncate text-xs text-white/80">
            {dossier.originCountry} &bull; {dossier.cityProvince}
          </p>
        </div>
      ) : (
        <div className="relative z-20 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 text-white">
          <p className="font-mono text-xs tracking-wider text-white/85 uppercase">
            Dossiê H&amp;C &bull; {dossier.file.name}
          </p>
        </div>
      )}
    </div>
  );
}
