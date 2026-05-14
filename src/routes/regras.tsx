import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/regras")({
  head: () => ({
    meta: [
      { title: "8 Regras de Ouro · Barraca do Milho" },
      { name: "description", content: "Como o protótipo aplica as 8 Regras de Ouro de Shneiderman." },
    ],
  }),
  component: Regras,
});

const RULES = [
  {
    n: 1,
    title: "Consistência",
    where: "Todo o app",
    how: "Mesma tipografia, paleta, posição do header e botões primários (Confirmar à direita, Voltar à esquerda) em todas as telas. Categorias usam a mesma pílula em Cardápio, Carrinho e Checkout.",
  },
  {
    n: 2,
    title: "Otimizar as operações do usuário",
    where: "Cardápio · Item · Checkout",
    how: "Busca + filtros por categoria, opções pré-selecionadas no item (ex.: tamanho 300ml), método de pagamento padrão Pix e botão grande de confirmar reduzem cliques.",
  },
  {
    n: 3,
    title: "Feedback significativo",
    where: "Item · Carrinho · Checkout · Pedido",
    how: "Toast “item adicionado”, indicador de carregando ao pagar, stepper visual e tela de status do pedido com etapas (Recebido → Preparo → Pronto).",
  },
  {
    n: 4,
    title: "Diálogo com início, meio e fim",
    where: "Fluxo completo",
    how: "Início (Welcome) → Cardápio → Item → Carrinho → Checkout → Confirmação. O Stepper no Checkout deixa claro onde o usuário está e o que falta.",
  },
  {
    n: 5,
    title: "Prevenção e tratamento de erros",
    where: "Item · Carrinho · Checkout",
    how: "Quantidade limitada (1–20), confirmação antes de remover do carrinho, validação do campo Nome com mensagem amigável e contorno vermelho.",
  },
  {
    n: 6,
    title: "Permitir desfazer ações",
    where: "Carrinho",
    how: "Botão “Desfazer” no header do carrinho e dentro do toast após remoção. O histórico de ações permite reverter adições e remoções.",
  },
  {
    n: 7,
    title: "Controle do usuário",
    where: "Item · Carrinho · Checkout",
    how: "Usuário escolhe quantidade, observação, método de pagamento e pode cancelar a qualquer momento. Nada acontece sem ação explícita dele.",
  },
  {
    n: 8,
    title: "Reduzir carga de memória",
    where: "Cardápio · Pedido",
    how: "Carrinho persistido no dispositivo, lista de “pedidos recentes” no cardápio, código do pedido sempre visível na tela final — o usuário não precisa lembrar nada.",
  },
] as const;

function Regras() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 pb-20">
      <div className="space-y-3 mb-8">
        <span className="inline-block rounded-full bg-secondary/15 text-secondary px-3 py-1 text-xs font-semibold">
          Atividade 2 · IHC
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black">
          As 8 Regras de Ouro de Shneiderman aplicadas
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Sistema de pedidos para a Barraca do Milho da Feira Hippie de BH. Resolve as
          necessidades observadas no Desafio 1: cardápio visível, pagamento ágil e fluxo
          rápido sem fila.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold"
          >
            Ver tela inicial
          </Link>
          <Link
            to="/cardapio"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold"
          >
            Abrir cardápio
          </Link>
        </div>
      </div>

      <ol className="grid sm:grid-cols-2 gap-4">
        {RULES.map((r) => (
          <li key={r.n} className="paper-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-accent text-accent-foreground font-bold">
                {r.n}
              </span>
              <h2 className="font-display text-xl font-bold leading-tight">{r.title}</h2>
            </div>
            <p className="text-[11px] uppercase tracking-wider font-bold text-secondary mb-2">
              Onde: {r.where}
            </p>
            <p className="text-sm text-muted-foreground">{r.how}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 paper-card p-6">
        <h3 className="font-display text-2xl font-bold">Funcionalidades principais</h3>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground list-disc pl-5">
          <li>Cardápio digital com busca e categorias</li>
          <li>Personalização do item (tamanho, recheio, observação)</li>
          <li>Carrinho persistente com desfazer</li>
          <li>Pagamento Pix, cartão ou dinheiro</li>
          <li>Validação amigável dos dados do cliente</li>
          <li>Acompanhamento do pedido em tempo real</li>
        </ul>
      </section>

      <section className="mt-6 paper-card p-6">
        <h3 className="font-display text-2xl font-bold">Como atende ao Desafio 1</h3>
        <p className="text-sm text-muted-foreground mt-2">
          O Desafio 1 mostrou clientes esperando para ver o cardápio e feirantes
          atendendo várias pessoas em paralelo. Este protótipo permite que o cliente
          consulte preços e peça antes mesmo de chegar à barraca, libera o feirante para
          focar no preparo e oferece pagamento ágil — exatamente as necessidades
          identificadas em campo.
        </p>
      </section>
    </main>
  );
}
