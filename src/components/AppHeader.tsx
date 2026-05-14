import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBasket, BookOpenCheck, Home } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function AppHeader() {
  const { count } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const active = path === to;
    return (
      <Link
        to={to}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full bg-primary grid place-items-center text-xl shadow-soft">
            🌽
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold">Barraca do Milho</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5">Feira Hippie · BH</div>
          </div>
        </Link>
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/"><Home className="inline h-4 w-4 mr-1" />Início</NavLink>
          <NavLink to="/cardapio">Cardápio</NavLink>
          <NavLink to="/regras"><BookOpenCheck className="inline h-4 w-4 mr-1" />8 Regras</NavLink>
        </nav>
        <Link
          to="/carrinho"
          className="relative inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3.5 py-2 text-sm font-medium shadow-soft hover:opacity-95"
          aria-label="Abrir carrinho"
        >
          <ShoppingBasket className="h-4 w-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {count > 0 && (
            <span className="ml-0.5 inline-grid place-items-center h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[11px] font-bold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
