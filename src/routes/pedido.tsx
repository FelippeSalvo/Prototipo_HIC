import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Clock, ChefHat, Bell, PartyPopper } from "lucide-react";
import { z } from "zod";
import { RulesBadge } from "@/components/RulesBadge";

const search = z.object({
  id: z.string().default("ABCDE"),
  nome: z.string().default("Cliente"),
  metodo: z.enum(["pix", "cartao", "dinheiro"]).default("pix"),
});

export const Route = createFileRoute("/pedido")({
  head: () => ({ meta: [{ title: "Pedido confirmado · Barraca do Milho" }] }),
  validateSearch: (s) => search.parse(s),
  component: Pedido,
});

const STAGES = [
  { key: "recebido", label: "Pedido recebido", icon: Check },
  { key: "preparo", label: "Em preparo", icon: ChefHat },
  { key: "pronto", label: "Pronto para retirar", icon: Bell },
] as const;

function Pedido() {
  const { id, nome, metodo } = Route.useSearch();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= STAGES.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), 3500);
    return () => clearTimeout(t);
  }, [stage]);

  const labels: Record<string, string> = { pix: "Pix", cartao: "Cartão", dinheiro: "Dinheiro" };
  const metodoLabel = labels[metodo] ?? "Pix";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 pb-28">
      <div className="paper-card p-8 text-center space-y-3">
        <div className="inline-grid place-items-center h-16 w-16 rounded-full bg-success/20 mx-auto">
          <PartyPopper className="h-8 w-8 text-success" />
        </div>
        <h1 className="font-display text-4xl font-bold">Pedido confirmado!</h1>
        <p className="text-muted-foreground">
          {nome}, seu pedido <strong className="text-foreground">#{id}</strong> foi recebido.
          Pagamento via <strong className="text-foreground">{metodoLabel}</strong>.
        </p>
      </div>

      <ol className="mt-8 space-y-3">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const active = i === stage;
          const Icon = s.icon;
          return (
            <li
              key={s.key}
              className={`paper-card p-4 flex items-center gap-4 transition ${
                active ? "ring-2 ring-accent" : ""
              }`}
            >
              <div
                className={`h-10 w-10 grid place-items-center rounded-full ${
                  done
                    ? "bg-success text-success-foreground"
                    : active
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{s.label}</div>
                <div className="text-xs text-muted-foreground">
                  {done ? "Concluído" : active ? "Acontecendo agora…" : "Aguardando"}
                </div>
              </div>
              {active && <Clock className="h-4 w-4 text-accent animate-pulse" />}
            </li>
          );
        })}
      </ol>

      {stage === STAGES.length - 1 && (
        <div className="mt-6 paper-card p-5 text-center bg-success/10 border-success/30">
          <Bell className="h-6 w-6 mx-auto text-success" />
          <p className="mt-2 font-semibold">Tudo pronto, {nome}! Retire na barraca mostrando o código #{id}.</p>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/cardapio"
          className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop hover:opacity-95"
        >
          Fazer novo pedido
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 font-semibold hover:bg-muted"
        >
          Voltar ao início
        </Link>
      </div>

      <RulesBadge
        applied={[3, 4, 8]}
        note="Tela final do diálogo: mensagem clara de sucesso, progresso visível e código do pedido salvo (sem precisar memorizar)."
      />
    </main>
  );
}
