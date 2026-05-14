import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, History } from "lucide-react";
import { CATEGORIES, MENU } from "@/lib/menu-data";
import { formatBRL, useCart } from "@/lib/cart-context";
import { RulesBadge } from "@/components/RulesBadge";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio · Barraca do Milho" },
      { name: "description", content: "Pamonhas, mingau, milho verde e bebidas." },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [q, setQ] = useState("");
  const { recent, itemFor } = useCart();

  const items = useMemo(() => {
    return MENU.filter((m) => (cat === "Todos" ? true : m.category === cat)).filter((m) =>
      q.trim() ? m.name.toLowerCase().includes(q.toLowerCase()) : true,
    );
  }, [cat, q]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 pb-28">
      <div className="space-y-2 mb-6">
        <h1 className="font-display text-4xl font-bold">Cardápio</h1>
        <p className="text-muted-foreground">Toque em um item para personalizar e adicionar ao pedido.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar (ex.: pamonha, mingau...)"
            className="w-full rounded-full border border-input bg-card pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto -mx-1 px-1 py-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium border transition ${
                cat === c
                  ? "bg-secondary text-secondary-foreground border-secondary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <section className="mb-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
            <History className="h-4 w-4" /> Pedidos recentes
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recent.map((id) => {
              const it = itemFor(id);
              if (!it) return null;
              return (
                <Link
                  key={id}
                  to="/item/$id"
                  params={{ id }}
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary/15 hover:bg-primary/25 px-3 py-1.5 text-sm font-medium"
                >
                  <span>{it.emoji}</span>
                  {it.name}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <ul className="grid sm:grid-cols-2 gap-4">
        {items.map((m) => (
          <li key={m.id}>
            <Link
              to="/item/$id"
              params={{ id: m.id }}
              className="paper-card flex gap-4 p-4 hover:-translate-y-0.5 hover:shadow-pop transition"
            >
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/30 grid place-items-center text-3xl">
                {m.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-bold text-lg leading-tight">{m.name}</h3>
                  <span className="font-semibold text-accent whitespace-nowrap">{formatBRL(m.price)}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{m.description}</p>
                <span className="inline-block mt-2 text-[11px] uppercase tracking-wider font-bold text-secondary">
                  {m.category}
                </span>
              </div>
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="col-span-full paper-card p-8 text-center text-muted-foreground">
            Nenhum item encontrado para "<strong>{q}</strong>".
          </li>
        )}
      </ul>

      <RulesBadge
        applied={[1, 2, 7, 8]}
        note="Categorias e busca dão controle ao usuário; pedidos recentes reduzem a carga de memória; layout consistente acelera escolhas."
      />
    </main>
  );
}
