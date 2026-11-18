"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MotionConfig,
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_CINEMATIC = [0.65, 0, 0.2, 1] as const;

type IntroContextValue = {
  /** True assim que a foto esticou o suficiente para o coverflow emergir */
  contentVisible: boolean;
  /** True quando toda a coreografia de abertura já concluiu */
  introComplete: boolean;
};

const IntroContext = createContext<IntroContextValue>({
  contentVisible: true,
  introComplete: true,
});

export function useIntro() {
  return useContext(IntroContext);
}

/**
 * Coreografia editorial de abertura:
 * 1. Um quadro quadrado amplo e elegante (até 540×540px) surge no centro da tela
 *    com a fotografia do skyline canadense em `object-cover`, moldura interna fina
 *    e assinatura editorial discreta.
 * 2. Após um breve respiro, a moldura interna dissolve e o próprio quadrado estica
 *    suavemente até preencher 100vw × 100vh enquanto ganha desfoque óptico (blur)
 *    e recebe o véu translúcido da paleta.
 * 3. Em sobreposição contínua (follow-through), os cards do Coverflow desabrocham
 *    do centro para as extremidades.
 */
export function BackgroundIntro({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();
  const [contentVisible, setContentVisible] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const skippedRef = useRef(false);

  const finishImmediately = useCallback(() => {
    if (!scope.current) return;
    skippedRef.current = true;
    animate(
      "[data-intro='box']",
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        opacity: 1,
        scale: 1,
      },
      { duration: 0.25, ease: "easeOut" }
    );
    animate(
      "[data-intro='image']",
      { scale: 1.04, filter: "blur(14px)" },
      { duration: 0.25, ease: "easeOut" }
    );
    animate(
      "[data-intro='card-chrome']",
      { opacity: 0 },
      { duration: 0.15 }
    );
    animate(
      "[data-intro='overlay']",
      { opacity: 1 },
      { duration: 0.25, ease: "easeOut" }
    );
    setContentVisible(true);
    setIntroComplete(true);
  }, [animate, scope]);

  useEffect(() => {
    let cancelled = false;

    async function runChoreography() {
      if (prefersReducedMotion) {
        animate(
          "[data-intro='box']",
          {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            opacity: 1,
            scale: 1,
          },
          { duration: 0 }
        );
        animate(
          "[data-intro='image']",
          { scale: 1.04, filter: "blur(14px)" },
          { duration: 0 }
        );
        animate("[data-intro='card-chrome']", { opacity: 0 }, { duration: 0 });
        animate("[data-intro='overlay']", { opacity: 1 }, { duration: 0 });
        setContentVisible(true);
        setIntroComplete(true);
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      // Quadrado generoso e imponente no centro da tela (até 540×540px no desktop)
      const squareSize = Math.round(Math.min(540, w * 0.82, h * 0.72));
      const startRadius = 24;

      // Configura o estado inicial do quadro quadrado
      await Promise.all([
        animate(
          "[data-intro='box']",
          {
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            borderRadius: startRadius,
            opacity: 0,
            scale: 0.92,
          },
          { duration: 0 }
        ),
        animate(
          "[data-intro='image']",
          {
            scale: 1.12,
            filter: "blur(8px)",
          },
          { duration: 0 }
        ),
        animate(
          "[data-intro='card-chrome']",
          { opacity: 0 },
          { duration: 0 }
        ),
      ]);
      if (cancelled || skippedRef.current) return;

      // ATO 1 — Revelação do Quadrado Editorial no centro da tela
      await Promise.all([
        animate(
          "[data-intro='box']",
          {
            opacity: [0, 1],
            scale: [0.92, 1],
          },
          { duration: 0.8, ease: EASE_OUT_EXPO }
        ),
        animate(
          "[data-intro='image']",
          {
            scale: [1.12, 1.01],
            filter: ["blur(8px)", "blur(0px)"],
          },
          { duration: 0.88, ease: EASE_OUT_EXPO }
        ),
        animate(
          "[data-intro='card-chrome']",
          { opacity: [0, 1] },
          { duration: 0.65, delay: 0.15, ease: "easeOut" }
        ),
        animate(
          "[data-intro='filament']",
          { scaleX: [0, 1] },
          { duration: 0.85, delay: 0.1, ease: [0.4, 0, 0.2, 1] }
        ),
      ]);
      if (cancelled || skippedRef.current) return;

      // Breve pausa de contemplação para valorizar a fotografia enquadrada
      await new Promise((resolve) => setTimeout(resolve, 180));
      if (cancelled || skippedRef.current) return;

      // ATO 2 — O quadrado estica até preencher 100% da tela enquanto ganha desfoque
      // Libera a entrada radial do Coverflow aos ~60% da expansão
      const revealTimer = setTimeout(() => {
        if (!cancelled && !skippedRef.current) {
          setContentVisible(true);
        }
      }, 560);

      await Promise.all([
        // Assinatura interna do quadrado dissolve antes de atingir as bordas
        animate(
          "[data-intro='card-chrome']",
          { opacity: [1, 0] },
          { duration: 0.36, ease: "easeOut" }
        ),
        // O próprio quadrado estica fluidamente para a largura e altura totais da janela
        animate(
          "[data-intro='box']",
          {
            width: [`${squareSize}px`, `${w}px`],
            height: [`${squareSize}px`, `${h}px`],
            borderRadius: [startRadius, 0],
          },
          { duration: 1.08, ease: EASE_CINEMATIC }
        ),
        // A fotografia ganha desfoque óptico progressivo durante o esticamento
        animate(
          "[data-intro='image']",
          {
            scale: [1.01, 1.06],
            filter: ["blur(0px)", "blur(14px)"],
          },
          { duration: 1.1, ease: EASE_CINEMATIC }
        ),
        // O véu da paleta entra suavemente para dar contraste aos cards do coverflow
        animate(
          "[data-intro='overlay']",
          { opacity: [0, 1] },
          { duration: 0.82, delay: 0.26, ease: "easeOut" }
        ),
      ]);

      clearTimeout(revealTimer);
      if (cancelled || skippedRef.current) return;

      // Garante medidas responsivas em viewport (100vw/100vh) caso a janela seja redimensionada depois
      animate(
        "[data-intro='box']",
        { width: "100vw", height: "100vh", borderRadius: 0 },
        { duration: 0 }
      );

      setContentVisible(true);
      setIntroComplete(true);
    }

    runChoreography();
    return () => {
      cancelled = true;
    };
  }, [animate, prefersReducedMotion, scope]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={{ contentVisible, introComplete }}>
        <div
          ref={scope}
          onClick={() => {
            if (!introComplete) finishImmediately();
          }}
          className="relative isolate min-h-screen"
        >
          {/* Palco de fundo com iluminação radial sutil */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-background"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 10%, transparent) 0%, transparent 70%)",
            }}
          >
            {/* O quadro quadrado que nasce grande no centro e estica até ocupar a tela inteira */}
            <div
              data-intro="box"
              className="relative overflow-hidden opacity-0 shadow-[0_35px_90px_-20px_rgba(28,25,23,0.55)] ring-1 ring-black/10 dark:ring-white/15"
              style={{
                width: 540,
                height: 540,
                borderRadius: 24,
                willChange: introComplete
                  ? "auto"
                  : "width, height, border-radius, transform, opacity",
              }}
            >
              <img
                data-intro="image"
                src="/img/Background.png"
                alt=""
                draggable={false}
                className="h-full w-full object-cover object-center select-none"
                style={{
                  willChange: introComplete ? "auto" : "transform, filter",
                }}
              />

              {/* Moldura interna e assinatura editorial DENTRO do quadrado */}
              <div
                data-intro="card-chrome"
                className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 opacity-0"
              >
                {/* Vinheta suave para leitura perfeita sobre a foto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

                {/* Filete interno arquitetônico */}
                <div className="absolute inset-3.5 rounded-[16px] border border-white/25" />

                {/* Topo do quadrado */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 backdrop-blur-md">
                    <img
                      src="/img/Canada.svg"
                      alt=""
                      className="h-3.5 w-auto object-contain"
                    />
                    <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
                      IRCC &bull; Canada
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase">
                    2026
                  </span>
                </div>

                {/* Base do quadrado: Título editorial + filamento dourado */}
                <div className="relative z-10 space-y-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.22em] text-[#F6E4A6] uppercase">
                      Humanitarian &amp; Compassionate
                    </p>
                    <p className="mt-0.5 text-2xl font-semibold tracking-tight text-white">
                      H&amp;C Warranty &mdash; Fast Track
                    </p>
                  </div>

                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      data-intro="filament"
                      className="h-full w-full origin-left bg-[#F6E4A6]"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Véu atmosférico do tema que entra durante o esticamento */}
          <div
            data-intro="overlay"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 bg-background/84 opacity-0"
          />

          {/* Conteúdo principal (Header + Coverflow / Workspace) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contentVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="relative z-10 min-h-screen"
            style={{ pointerEvents: contentVisible ? "auto" : "none" }}
          >
            {children}
          </motion.div>
        </div>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
