import { AppHeader } from "@/components/app-header";
import { AmparoWorkspace } from "@/components/amparo-workspace";

export default function Page() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <AmparoWorkspace />
      </main>
    </>
  );
}
