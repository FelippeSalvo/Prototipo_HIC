import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-milho.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barraca do Milho · Peça pelo celular" },
      { name: "description", content: "Cardápio digital, pagamento por Pix ou cartão e acompanhamento do pedido em tempo real." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 text-secondary px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Feira Hippie · Av. Afonso Pena
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-black leading-[1.05]">
            Pamonha quentinha,<br />
            <span className="text-accent">sem fila.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Veja o cardápio, escolha seus produtos de milho e pague pelo celular.
            Quando estiver pronto, é só retirar na barraca.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cardapio"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop hover:opacity-95 transition"
            >
              Ver cardápio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 max-w-md">
            <Feature icon={<Clock className="h-4 w-4" />} label="Sem fila" />
            <Feature icon={<ShieldCheck className="h-4 w-4" />} label="Pix · Cartão" />
            <Feature icon={<Sparkles className="h-4 w-4" />} label="Feito na hora" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-primary/30 -rotate-3" aria-hidden />
          <img
            src={heroImg}
            alt="Ilustração da Barraca do Milho da Feira Hippie de BH"
            width={1536}
            height={1024}
            className="relative rounded-[2rem] shadow-pop w-full h-auto rotate-1"
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-card border border-border py-3 text-xs font-medium">
      <div className="text-accent">{icon}</div>
      {label}
    </div>
  );
}
