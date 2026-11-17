import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center overflow-hidden rounded-lg bg-[#f1eeed] p-1 shadow-2xs ring-1 ring-border">
            <img
              src="/img/Canada.jpg"
              alt="Canadá"
              className="h-7 w-auto rounded-xs object-contain"
            />
          </div>
          <p className="text-base font-semibold tracking-tight">
            H&amp;C Warranty
            <span className="mx-2 font-normal text-muted-foreground">|</span>
            <span className="font-medium text-primary">IRCC Fast Track</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                ML
              </AvatarFallback>
            </Avatar>
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-medium">Marc-André Lavoie</p>
              <p className="text-xs text-muted-foreground">
                Agente de Imigração
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
