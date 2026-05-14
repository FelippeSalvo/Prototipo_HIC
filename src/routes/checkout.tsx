import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CreditCard, QrCode, Banknote, Loader2, Check } from "lucide-react";
import { formatBRL, useCart } from "@/lib/cart-context";
import { RulesBadge } from "@/components/RulesBadge";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Pagamento · Barraca do Milho" }] }),
  component: Checkout,
});

type Method = "pix" | "cartao" | "dinheiro";

function Checkout() {
  const { total, lines, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("pix");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "processing" | "done">("form");

  if (lines.length === 0 && step === "form") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Sem itens para pagar</h1>
        <Link to="/cardapio" className="mt-4 inline-block text-accent underline">
          Voltar ao cardápio
        </Link>
      </main>
    );
  }

  const validate = () => {
    if (name.trim().length < 2) {
      setNameError("Digite ao menos 2 letras para chamarmos quando estiver pronto.");
      return false;
    }
    setNameError(null);
    return true;
  };

  const onPay = () => {
    if (!validate()) return;
    setStep("processing");
    setTimeout(() => {
      const orderId = Math.random().toString(36).slice(2, 7).toUpperCase();
      const customerName = name.trim();
      clear();
      navigate({ to: "/pedido", search: { id: orderId, nome: customerName, metodo: method } });
    }, 1600);
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 pb-28">
      <button
        onClick={() => navigate({ to: "/carrinho" })}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao carrinho
      </button>

      <Stepper current={step === "form" ? 2 : 3} />

      <div className="paper-card p-6 mt-6 space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Pagamento</h1>
          <p className="text-muted-foreground text-sm">Escolha como prefere pagar.</p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold">Seu nome</span>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) setNameError(null);
            }}
            placeholder="Como vamos te chamar?"
            className={`w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring ${
              nameError ? "border-destructive" : "border-input"
            }`}
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "name-err" : undefined}
          />
          {nameError && (
            <p id="name-err" className="text-xs text-destructive font-medium">
              {nameError}
            </p>
          )}
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold mb-1">Forma de pagamento</legend>
          <div className="grid sm:grid-cols-3 gap-2">
            <MethodOption
              active={method === "pix"}
              onClick={() => setMethod("pix")}
              icon={<QrCode className="h-5 w-5" />}
              label="Pix"
              hint="Aprovação na hora"
            />
            <MethodOption
              active={method === "cartao"}
              onClick={() => setMethod("cartao")}
              icon={<CreditCard className="h-5 w-5" />}
              label="Cartão"
              hint="Crédito ou débito"
            />
            <MethodOption
              active={method === "dinheiro"}
              onClick={() => setMethod("dinheiro")}
              icon={<Banknote className="h-5 w-5" />}
              label="Dinheiro"
              hint="Pagar na barraca"
            />
          </div>
        </fieldset>

        <div className="rounded-xl bg-muted/60 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total a pagar</span>
            <span className="font-bold text-lg text-accent">{formatBRL(total)}</span>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={() => navigate({ to: "/carrinho" })}
            className="flex-1 inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 font-semibold hover:bg-muted"
            disabled={step === "processing"}
          >
            Cancelar
          </button>
          <button
            onClick={onPay}
            disabled={step === "processing"}
            className="flex-[2] inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-pop hover:opacity-95 disabled:opacity-70"
          >
            {step === "processing" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processando…
              </>
            ) : (
              <>
                <Check className="h-4 w-4" /> Confirmar e pagar
              </>
            )}
          </button>
        </div>
      </div>

      <RulesBadge
        applied={[3, 4, 5, 6, 7]}
        note="Etapas claras (início-meio-fim), validação de campo, opção cancelar, feedback de processamento."
      />
    </main>
  );
}

function MethodOption({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border-2 p-3 transition ${
        active ? "border-accent bg-accent/10" : "border-border bg-card hover:border-muted-foreground/30"
      }`}
      aria-pressed={active}
    >
      <div className="flex items-center gap-2">
        <span className={active ? "text-accent" : "text-muted-foreground"}>{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>
    </button>
  );
}

function Stepper({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["Carrinho", "Pagamento", "Confirmação"];
  return (
    <ol className="flex items-center gap-2 text-xs">
      {steps.map((s, i) => {
        const n = (i + 1) as 1 | 2 | 3;
        const done = n < current;
        const active = n === current;
        return (
          <li key={s} className="flex items-center gap-2 flex-1">
            <span
              className={`grid place-items-center h-7 w-7 rounded-full font-bold text-xs ${
                done
                  ? "bg-success text-success-foreground"
                  : active
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : n}
            </span>
            <span className={active ? "font-semibold" : "text-muted-foreground"}>{s}</span>
            {i < steps.length - 1 && <span className="flex-1 h-px bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}

export { Checkout };
