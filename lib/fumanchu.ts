export type FumanchuDish = {
  name: string;
  description?: string;
  price?: number;
  variants?: { name: string; price: number }[];
  featured?: boolean;
  tag?: string;
  image?: string;
  video?: boolean;
};

export type FumanchuSection = {
  id: string;
  title: string;
  hook: string;
  accent: string;
  dishes: FumanchuDish[];
};

export const CARTA_DEMO_PATH = "/carta" as const;

export const FUMANCHU = {
  name: "Fu-Man-Chu",
  subtitle: "Chifita",
  instagram: "https://www.instagram.com/fumanchuchifita/",
  instagramHandle: "@fumanchuchifita",
  slug: "fu-man-chu",
  hours: {
    openLabel: "Hoy abre",
    today: "12:00–23:00",
  },
} as const;

export const FUMANCHU_SECTIONS: FumanchuSection[] = [
  {
    id: "pa-picar",
    title: "Pa' picar",
    hook: "Para abrir la mesa",
    accent: "#ff6a2a",
    dishes: [
      {
        name: "Rollitos primavera x 3",
        description: "De pollo ahumado con verduras y paltita wa yen.",
        price: 18,
        tag: "Crocante",
        image: "/carta/fumanchu/plato-rollitos.webp",
      },
      {
        name: "Wantanes x 6",
        description: "Rellenos de pollo pachikay.",
        price: 18,
        tag: "Clásico",
        image: "/carta/fumanchu/plato-wantanes.webp",
      },
      {
        name: "Piernitas Chun Li x 3",
        description: "De puro pollo al maní y salsa especial hoinsin.",
        price: 20,
        tag: "Maní",
        featured: true,
        image: "/carta/fumanchu/plato-chunli.webp",
      },
      {
        name: "Siu mai x 4",
        description: "De chancho y langostino.",
        price: 20,
        tag: "Mar y tierra",
        image: "/carta/fumanchu/plato-siumai.webp",
      },
    ],
  },
  {
    id: "sopas",
    title: "Sopas",
    hook: "Caldo que pega",
    accent: "#ffc53d",
    dishes: [
      {
        name: "Sopa wantan",
        description: "Bien concentrada con alita flita.",
        price: 30,
        tag: "Alita",
        image: "/carta/fumanchu/plato-sopa-wantan.webp",
      },
      {
        name: "Sopa wantan especial",
        description: "Con pollo, chancho, langostinos y alita flita.",
        price: 35,
        tag: "Completa",
        image: "/carta/fumanchu/plato-sopa-especial.webp",
      },
      {
        name: "Sopa Fumanchu",
        description:
          "Res, cerdo y pollo concentrados en caldo con huevo reventado, fideo fansi y hierbas aromáticas.",
        price: 32,
        tag: "De la casa",
        featured: true,
        image: "/carta/fumanchu/plato-sopa.webp",
        video: true,
      },
    ],
  },
  {
    id: "fondos",
    title: "Fondos",
    hook: "Lo que pide la mesa",
    accent: "#ff2d2d",
    dishes: [
      {
        name: "Chijaukay",
        description: "Jugoso, de pierna acompañado de chaufa bien flito.",
        price: 35,
        tag: "Pierna",
        image: "/carta/fumanchu/plato-chijaukay.webp",
      },
      {
        name: "Tipakay",
        description: "Pollito empanizado con salsa agridulce, chaufita al lado.",
        price: 35,
        tag: "Agridulce",
        image: "/carta/fumanchu/plato-tipakay.webp",
      },
      {
        name: "Kamlu wantan",
        description:
          "Chancho, pollo, langostinos, base de wantanes bien rellenos bañados en salsa de tamarindo a la piña y durazno.",
        price: 38,
        tag: "Tamarindo",
        featured: true,
        image: "/carta/fumanchu/plato-kamlu.webp",
      },
      {
        name: "Lemon kay",
        description: "Peruanazo, con toque de pisco acholado, ajo y kión, bien al limón.",
        price: 35,
        tag: "Pisco",
        image: "/carta/fumanchu/plato-lemonkay.webp",
      },
      {
        name: "Taypa power",
        description: "Mix de proteínas y vegetales al wok, jugoso y contundente.",
        price: 40,
        tag: "Wok",
        image: "/carta/fumanchu/plato-taypa.webp",
      },
      {
        name: "Fucking cholón",
        description:
          "Pollo enrollado, relleno de espárragos, chanchito y langostinos, bañado en salsa de vegetales al wok.",
        price: 42,
        tag: "Firma",
        featured: true,
        image: "/carta/fumanchu/plato-cholon.webp",
        video: true,
      },
      {
        name: "Saltados chiferos",
        description: "Con sus papitas fritas, holantao, champis y huevito de codorniz.",
        tag: "A elegir",
        image: "/carta/fumanchu/plato-saltado.webp",
        variants: [
          { name: "De pollo", price: 32 },
          { name: "De res", price: 35 },
        ],
      },
    ],
  },
  {
    id: "arroces",
    title: "Arroces",
    hook: "Chaufa que suena",
    accent: "#ffb020",
    dishes: [
      {
        name: "Chaufa de pollo",
        price: 32,
        tag: "Base",
        image: "/carta/fumanchu/plato-chaufa-pollo.webp",
      },
      {
        name: "Chaufa de chancho",
        description: "Chaufita bien flito de pernil de chancho ahumado.",
        price: 35,
        tag: "Ahumado",
        image: "/carta/fumanchu/plato-chaufa-chancho.webp",
      },
      {
        name: "Chaufa especial",
        description: "Generoso, de chancho, pollo, carne y langostinos.",
        price: 35,
        tag: "Mix",
        image: "/carta/fumanchu/plato-chaufa-especial.webp",
      },
      {
        name: "Aeropuerto de pollo",
        description: "Chaufa de pollo con frejol chino, fideo frito en dos texturas y huevito tortilla.",
        price: 35,
        tag: "Dos texturas",
        image: "/carta/fumanchu/plato-aero-pollo.webp",
      },
      {
        name: "Aeropuerto especial",
        description:
          "Aeropuerto de pollo, chancho, carne, langostinos con frejol chino, fideo frito en dos texturas, huevito tortilla y palta dragón.",
        price: 40,
        tag: "Palta dragón",
        featured: true,
        image: "/carta/fumanchu/plato-aeropuerto.webp",
        video: true,
      },
      {
        name: "Arroz con mango",
        description: "Langostino y chancho ahumado, notas de coco y curry de camarones.",
        price: 38,
        tag: "Coco · curry",
        image: "/carta/fumanchu/plato-mango.webp",
      },
    ],
  },
  {
    id: "combinados",
    title: "Combinados",
    hook: "Chaufa + tallarín",
    accent: "#7dff6a",
    dishes: [
      {
        name: "Combinado de pollo",
        description: "Chaufita bien flito, acompañado de tallarín de pollito clásico con verduras.",
        price: 35,
        tag: "Clásico",
        image: "/carta/fumanchu/plato-combo-pollo.webp",
      },
      {
        name: "Combinado especial",
        description: "Combinado de chaufa y tallarín con chancho, pollo, carne y langostinos.",
        price: 38,
        tag: "Taypa",
        image: "/carta/fumanchu/plato-combo-especial.webp",
      },
    ],
  },
  {
    id: "tortillas",
    title: "Tortillas",
    hook: "Huevo y wok",
    accent: "#ffe08a",
    dishes: [
      {
        name: "Tortillón de pollo",
        description: "Acompañado de chaufita bien frito.",
        price: 32,
        tag: "Pollo",
        image: "/carta/fumanchu/plato-tortilla-pollo.webp",
      },
      {
        name: "Tortillón de langostinos",
        description: "Acompañado de chaufita bien frito.",
        price: 35,
        tag: "Mar",
        image: "/carta/fumanchu/plato-tortilla-lang.webp",
      },
    ],
  },
  {
    id: "tallarines",
    title: "Tallarines",
    hook: "Jugosos, al wok",
    accent: "#ff4d6a",
    dishes: [
      {
        name: "Tallarín de pollo",
        description: "Clásico y jugoso de pollo con verduras.",
        price: 32,
        tag: "Clásico",
        image: "/carta/fumanchu/plato-tallarin-pollo.webp",
      },
      {
        name: "Tallarín especial",
        description: "Bien taypa de chancho, pollo, carne y langostinos.",
        price: 38,
        tag: "Taypa",
        image: "/carta/fumanchu/plato-tallarin.webp",
      },
    ],
  },
];

export function featuredDishes() {
  return FUMANCHU_SECTIONS.flatMap((section) =>
    section.dishes
      .filter((dish) => dish.featured)
      .map((dish) => ({ ...dish, sectionId: section.id, sectionTitle: section.title, accent: section.accent })),
  );
}

export function formatSoles(value: number) {
  return `s/. ${value}`;
}

export function dishKey(name: string, variant?: string) {
  return variant ? `${name} · ${variant}` : name;
}

export function unitPrice(dish: FumanchuDish, variant?: string) {
  if (variant && dish.variants) {
    return dish.variants.find((item) => item.name === variant)?.price ?? 0;
  }
  return dish.price ?? dish.variants?.[0]?.price ?? 0;
}
