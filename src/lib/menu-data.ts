export type MenuItem = {
  id: string;
  name: string;
  category: "Pamonha" | "Mingau" | "Milho" | "Bebida";
  description: string;
  price: number;
  emoji: string;
  options?: { label: string; choices: string[] }[];
};

export const MENU: MenuItem[] = [
  {
    id: "pamonha-doce",
    name: "Pamonha Doce",
    category: "Pamonha",
    description: "Pamonha tradicional doce, envolta em palha de milho fresquinha.",
    price: 12,
    emoji: "🌽",
    options: [{ label: "Recheio", choices: ["Sem recheio", "Queijo", "Goiabada"] }],
  },
  {
    id: "pamonha-salgada",
    name: "Pamonha Salgada com Queijo",
    category: "Pamonha",
    description: "Massa salgada de milho verde com queijo derretido por dentro.",
    price: 14,
    emoji: "🧀",
  },
  {
    id: "mingau",
    name: "Mingau de Milho Verde",
    category: "Mingau",
    description: "Cremoso, servido quentinho em copo. Polvilhe canela à vontade.",
    price: 10,
    emoji: "🥣",
    options: [{ label: "Tamanho", choices: ["300ml", "500ml"] }],
  },
  {
    id: "curau",
    name: "Curau",
    category: "Mingau",
    description: "Doce cremoso de milho verde com leite de coco.",
    price: 11,
    emoji: "🥥",
  },
  {
    id: "milho-verde",
    name: "Milho Verde na Manteiga",
    category: "Milho",
    description: "Espiga cozida no ponto, com manteiga, sal e parmesão opcional.",
    price: 9,
    emoji: "🌽",
    options: [{ label: "Adicional", choices: ["Sem adicional", "Parmesão", "Requeijão"] }],
  },
  {
    id: "suco-milho",
    name: "Suco de Milho Verde",
    category: "Bebida",
    description: "Refrescante, gelado e levemente adocicado.",
    price: 8,
    emoji: "🥤",
  },
];

export const CATEGORIES = ["Todos", "Pamonha", "Mingau", "Milho", "Bebida"] as const;
