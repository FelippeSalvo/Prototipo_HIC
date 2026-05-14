import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MENU, type MenuItem } from "./menu-data";

export type CartLine = {
  id: string;
  itemId: string;
  qty: number;
  options: Record<string, string>;
  observation?: string;
};

type Action =
  | { type: "added"; line: CartLine }
  | { type: "removed"; line: CartLine }
  | { type: "cleared" };

type CartCtx = {
  lines: CartLine[];
  recent: string[]; // recent itemIds
  history: Action[];
  add: (line: Omit<CartLine, "id">) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  undo: () => Action | null;
  total: number;
  count: number;
  itemFor: (id: string) => MenuItem | undefined;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE = "barraca-do-milho-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [history, setHistory] = useState<Action[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        setLines(parsed.lines ?? []);
        setRecent(parsed.recent ?? []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE, JSON.stringify({ lines, recent }));
    }
  }, [lines, recent]);

  const add: CartCtx["add"] = useCallback((line) => {
    const newLine: CartLine = { ...line, id: crypto.randomUUID() };
    setLines((p) => [...p, newLine]);
    setRecent((p) => [line.itemId, ...p.filter((x) => x !== line.itemId)].slice(0, 6));
    setHistory((h) => [...h, { type: "added", line: newLine }]);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setLines((p) => p.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l)));
  }, []);

  const remove = useCallback((id: string) => {
    setLines((p) => {
      const found = p.find((l) => l.id === id);
      if (found) setHistory((h) => [...h, { type: "removed", line: found }]);
      return p.filter((l) => l.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setHistory((h) => [...h, { type: "cleared" }]);
  }, []);

  const undo = useCallback((): Action | null => {
    let popped: Action | null = null;
    setHistory((h) => {
      if (h.length === 0) return h;
      popped = h[h.length - 1];
      return h.slice(0, -1);
    });
    setTimeout(() => {
      if (!popped) return;
      if (popped.type === "added") {
        const id = popped.line.id;
        setLines((p) => p.filter((l) => l.id !== id));
      } else if (popped.type === "removed") {
        const line = popped.line;
        setLines((p) => [...p, line]);
      }
    }, 0);
    return popped;
  }, []);

  const total = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const item = MENU.find((m) => m.id === l.itemId);
        return sum + (item ? item.price * l.qty : 0);
      }, 0),
    [lines],
  );

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const itemFor = useCallback((id: string) => MENU.find((m) => m.id === id), []);

  return (
    <Ctx.Provider value={{ lines, recent, history, add, updateQty, remove, clear, undo, total, count, itemFor }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart deve ser usado dentro de CartProvider");
  return c;
}

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
