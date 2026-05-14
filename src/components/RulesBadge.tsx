import { useState } from "react";
import { Sparkles, X } from "lucide-react";

export const RULES = [
  { n: 1, title: "Consistência" },
  { n: 2, title: "Otimizar operações" },
  { n: 3, title: "Feedback significativo" },
  { n: 4, title: "Diálogo com início, meio e fim" },
  { n: 5, title: "Prevenção de erros" },
  { n: 6, title: "Permitir desfazer" },
  { n: 7, title: "Controle do usuário" },
  { n: 8, title: "Reduzir carga de memória" },
] as const;

export function RulesBadge({ applied, note }: { applied: number[]; note?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="paper-card w-80 max-w-[92vw] p-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h3 className="font-display font-bold text-base">Regras nesta tela</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-muted text-muted-foreground"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {note && <p className="text-xs text-muted-foreground mb-3">{note}</p>}
          <ul className="space-y-1.5">
            {RULES.map((r) => {
              const on = applied.includes(r.n);
              return (
                <li
                  key={r.n}
                  className={`flex items-center gap-2 text-sm rounded-md px-2 py-1 ${
                    on ? "bg-primary/15 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`inline-grid place-items-center h-5 w-5 rounded-full text-[10px] font-bold ${
                      on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r.n}
                  </span>
                  <span className={on ? "font-medium" : ""}>{r.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2.5 text-sm font-semibold shadow-pop hover:opacity-95"
        >
          <Sparkles className="h-4 w-4" />
          {applied.length} regras aqui
        </button>
      )}
    </div>
  );
}
