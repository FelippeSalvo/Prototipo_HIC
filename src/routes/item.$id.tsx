import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { MENU } from "@/lib/menu-data";
import { formatBRL, useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/item/$id")({
  component: ItemDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-bold">Item não encontrado</h1>
      <Link to="/cardapio" className="mt-4 inline-block text-accent underline">Voltar ao cardápio</Link>
    </main>
  ),
});

function ItemDetail() {
  const { id } = Route.useParams();
  const item = MENU.find((m) => m.id === id);
  const navigate = useNavigate();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [obs, setObs] = useState("");
  const [opts, setOpts] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    item?.options?.forEach((o) => (initial[o.label] = o.choices[0]));
    return initial;
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!item) return null;

  const onAdd = () => {
    add({ itemId: item.id, qty, options: opts, observation: obs.trim() || undefined });
    setFeedback(`${qty}× ${item.name} adicionado ao carrinho.`);
    setTimeout(() => navigate({ to: "/carrinho" }), 700);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 pb-28">
      <button
        onClick={() => navigate({ to: "/cardapio" })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao cardápio
      </button>

      <div className="paper-card overflow-hidden">
        <div className="bg-primary/30 p-10 grid place-items-center text-7xl">{item.emoji}</div>
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-secondary">{item.category}</span>
              <h1 className="font-display text-3xl font-bold mt-1">{item.name}</h1>
            </div>
            <div className="text-2xl font-bold text-accent whitespace-nowrap">{formatBRL(item.price)}</div>
          </div>
          <p className="text-muted-foreground">{item.description}</p>

          {item.options?.map((o) => (
            <fieldset key={o.label} className="space-y-2">
              <legend className="text-sm font-semibold">{o.label}</legend>
              <div className="flex flex-wrap gap-2">
                {o.choices.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setOpts((p) => ({ ...p, [o.label]: c }))}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
                      opts[o.label] === c
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Observação (opcional)</span>
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value.slice(0, 120))}
              rows={2}
              placeholder="Ex.: sem sal, embalar para viagem…"
              className="w-full rounded-xl border border-input bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="text-[11px] text-muted-foreground">{obs.length}/120</span>
          </label>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 grid place-items-center hover:bg-muted rounded-l-full"
                aria-label="Diminuir"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="h-10 w-10 grid place-items-center hover:bg-muted rounded-r-full"
                aria-label="Aumentar"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop hover:opacity-95"
            >
              Adicionar · {formatBRL(item.price * qty)}
            </button>
          </div>

          {feedback && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl bg-success/15 text-success px-3 py-2 text-sm font-medium animate-in fade-in"
            >
              <Check className="h-4 w-4" /> {feedback}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
