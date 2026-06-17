import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Undo2, ArrowRight, ShoppingBasket } from "lucide-react";
import { formatBRL, useCart } from "@/lib/cart-context";
export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho · Barraca do Milho" }] }),
  component: Carrinho,
});

function Carrinho() {
  const { lines, updateQty, remove, total, undo, history, itemFor } = useCart();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    remove(id);
    setConfirmId(null);
    setToast("Item removido. Você pode desfazer.");
    setTimeout(() => setToast(null), 4000);
  };

  const handleUndo = () => {
    const action = undo();
    if (action) setToast("Última ação desfeita.");
    setTimeout(() => setToast(null), 2500);
  };

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="inline-grid place-items-center h-20 w-20 rounded-full bg-primary/30 mb-4">
          <ShoppingBasket className="h-9 w-9 text-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mt-2">Que tal começar por uma pamonha quentinha?</p>
        <Link
          to="/cardapio"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop"
        >
          Ver cardápio <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 pb-32">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl font-bold">Seu pedido</h1>
          <p className="text-muted-foreground">Revise antes de seguir para o pagamento.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleUndo}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            <Undo2 className="h-4 w-4" /> Desfazer
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {lines.map((l) => {
          const it = itemFor(l.itemId);
          if (!it) return null;
          const sub = it.price * l.qty;
          return (
            <li key={l.id} className="paper-card p-4 flex gap-4">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/30 grid place-items-center text-2xl">
                {it.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-tight">{it.name}</h3>
                  <span className="font-bold whitespace-nowrap">{formatBRL(sub)}</span>
                </div>
                {Object.entries(l.options).length > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {Object.entries(l.options).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                  </p>
                )}
                {l.observation && (
                  <p className="text-xs italic text-muted-foreground mt-0.5">"{l.observation}"</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center rounded-full border border-border bg-card">
                    <button
                      onClick={() => updateQty(l.id, l.qty - 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-muted rounded-l-full"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                    <button
                      onClick={() => updateQty(l.id, l.qty + 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-muted rounded-r-full"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {confirmId === l.id ? (
                    <div className="inline-flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Remover?</span>
                      <button
                        onClick={() => handleRemove(l.id)}
                        className="rounded-full bg-destructive text-destructive-foreground px-3 py-1 font-semibold"
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="rounded-full bg-muted px-3 py-1 font-semibold"
                      >
                        Não
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(l.id)}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remover
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="paper-card p-5 mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatBRL(total)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Taxa de retirada</span>
          <span className="text-success font-medium">Grátis</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-border pt-3">
          <span>Total</span>
          <span className="text-accent">{formatBRL(total)}</span>
        </div>
        <button
          onClick={() => navigate({ to: "/checkout" })}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop hover:opacity-95"
        >
          Ir para pagamento <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          to="/cardapio"
          className="block text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Adicionar mais itens
        </Link>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-4 py-2 text-sm shadow-pop"
        >
          {toast}
          <button onClick={handleUndo} className="font-semibold underline">
            Desfazer
          </button>
        </div>
      )}
    </main>
  );
}
