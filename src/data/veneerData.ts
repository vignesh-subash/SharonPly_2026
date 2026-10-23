// ─── Sharon Ply Veneer Collections ────────────────────────────────────────────

export interface VeneerShade {
  code: string;
  name: string;
  finish: string;       // Natural / Matte / Satin / High-Gloss / Textured
  gradient: string;     // CSS gradient representing wood tone
  grain: string;        // Straight / Wavy / Interlocked / Figured
  description: string;
}

export interface VeneerSpecies {
  slug: string;
  name: string;
  tileLabel: string;    // Short display name on tile
  origin: string;       // Geographic origin
  description: string;
  gradient: string;     // Tile background gradient
  heroGradient: string; // Richer gradient for hero/header
  shades: VeneerShade[];
}

export interface VeneerCollection {
  id: "natura" | "aura";
  slug: string;         // URL slug (sharon-exoti-natura)
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  species: VeneerSpecies[];
}

// ─── NATURA COLLECTION ────────────────────────────────────────────────────────
// Authentic natural sliced wood veneers

const naturaSpecies: VeneerSpecies[] = [
  {
    slug: "walnut",
    name: "Walnut",
    tileLabel: "Walnut",
    origin: "North America / Europe",
    description:
      "American Black Walnut is one of the world's most prized cabinet woods. Deep chocolate-brown heartwood with naturally varying grain patterns — from straight to dramatically figured. A signature of luxury interiors.",
    gradient: "linear-gradient(160deg, #3d2514 0%, #5c3a20 35%, #4a2c18 65%, #2e1b0e 100%)",
    heroGradient: "linear-gradient(160deg, #2e1b0e 0%, #5c3a20 40%, #4a2c18 70%, #3d2514 100%)",
    shades: [
      { code: "NAT-WL-001", name: "Dark American Walnut", finish: "Natural", gradient: "linear-gradient(160deg, #2e1b0e 0%, #4a2c17 40%, #3d2514 70%, #2a1810 100%)", grain: "Straight", description: "The deepest expression of American Walnut — near-black heartwood with warm brown undertones and subtle grain movement." },
      { code: "NAT-WL-002", name: "Natural Walnut", finish: "Natural", gradient: "linear-gradient(160deg, #5c3d22 0%, #7a5535 40%, #6b4828 70%, #503520 100%)", grain: "Wavy", description: "Classic mid-tone walnut showcasing the full spectrum of chocolate and auburn brown tones with flowing grain patterns." },
      { code: "NAT-WL-003", name: "Light Walnut", finish: "Natural", gradient: "linear-gradient(160deg, #8b6545 0%, #a07558 40%, #8a6042 70%, #755038 100%)", grain: "Straight", description: "Lighter sapwood character — warm tawny browns that work beautifully in bright, Scandinavian-influenced interiors." },
      { code: "NAT-WL-004", name: "Figured Walnut", finish: "Natural", gradient: "linear-gradient(160deg, #3d2518 0%, #6b3f28 40%, #503020 70%, #3a2015 100%)", grain: "Figured", description: "Selected for extraordinary figure — crotch, curl, or burl patterns that make every panel a work of art." },
    ],
  },
  {
    slug: "oak",
    name: "Oak",
    tileLabel: "Oak",
    origin: "North America / Europe",
    description:
      "European and American Oak — the world's most used decorative veneer species. Medium-density with open grain and characteristic medullary rays visible in quarter-cut panels. Warm, versatile, timeless.",
    gradient: "linear-gradient(160deg, #b8963a 0%, #c8a648 35%, #a07830 65%, #c4a030 100%)",
    heroGradient: "linear-gradient(160deg, #8b6a1a 0%, #c8a648 40%, #b08030 70%, #a07020 100%)",
    shades: [
      { code: "NAT-OK-001", name: "White Oak", finish: "Natural", gradient: "linear-gradient(160deg, #c4a882 0%, #d4b896 40%, #c0a07a 70%, #b89060 100%)", grain: "Straight", description: "Cool, pale greys and creams with subtle grain. The definitive choice for minimalist and contemporary design." },
      { code: "NAT-OK-002", name: "Natural Oak", finish: "Natural", gradient: "linear-gradient(160deg, #b8963a 0%, #c8a648 40%, #b08030 70%, #a07020 100%)", grain: "Straight", description: "Classic warm honey tones with characteristic oak grain. The most balanced and universally appealing oak shade." },
      { code: "NAT-OK-003", name: "Golden Oak", finish: "Natural", gradient: "linear-gradient(160deg, #c48c28 0%, #d4a040 40%, #c09030 70%, #a87820 100%)", grain: "Wavy", description: "Rich golden amber with warm reddish undertones. Adds warmth and traditional character to any space." },
      { code: "NAT-OK-004", name: "Smoked Oak", finish: "Natural", gradient: "linear-gradient(160deg, #6b5a42 0%, #8b7058 40%, #705840 70%, #605030 100%)", grain: "Straight", description: "Thermally smoked for a sophisticated dark grey-brown with enhanced grain contrast. A premium contemporary choice." },
    ],
  },
  {
    slug: "teak",
    name: "Teak",
    tileLabel: "Teak",
    origin: "Myanmar / South-East Asia",
    description:
      "Burma Teak — the most iconic wood species in Indian interiors. Golden-brown heartwood with interlocked grain, natural oils, and incomparable durability. The definitive statement of Indian craftsmanship.",
    gradient: "linear-gradient(160deg, #8b5e19 0%, #a07830 35%, #906520 65%, #7a5015 100%)",
    heroGradient: "linear-gradient(160deg, #6a4010 0%, #a07830 40%, #906520 70%, #8b5e19 100%)",
    shades: [
      { code: "NAT-TK-001", name: "Burma Teak", finish: "Natural", gradient: "linear-gradient(160deg, #8b5e19 0%, #a07830 40%, #906520 70%, #7a5015 100%)", grain: "Interlocked", description: "The original — deep golden-brown with characteristic interlocked grain and natural wavy figure. The benchmark teak shade." },
      { code: "NAT-TK-002", name: "Natural Teak", finish: "Natural", gradient: "linear-gradient(160deg, #a07030 0%, #b88040 40%, #a07028 70%, #885820 100%)", grain: "Straight", description: "Bright golden-yellow tones with straight, open grain. A cleaner, more contemporary expression of teak's natural beauty." },
      { code: "NAT-TK-003", name: "Honey Teak", finish: "Natural", gradient: "linear-gradient(160deg, #c4922a 0%, #d4a840 40%, #c09028 70%, #a87820 100%)", grain: "Wavy", description: "The warmest, most luminous teak shade — amber honey tones that glow under interior lighting. A perennial favourite." },
    ],
  },
  {
    slug: "maple",
    name: "Maple",
    tileLabel: "Maple",
    origin: "Canada / Northern USA",
    description:
      "Hard Maple — exceptionally fine, uniform grain with a creamy white to light golden tone. The cleanest, brightest wood species for modern interiors. Also available in celebrated figured forms.",
    gradient: "linear-gradient(160deg, #e0cfa0 0%, #edd8b0 35%, #d8c490 65%, #e8d5b0 100%)",
    heroGradient: "linear-gradient(160deg, #c8b080 0%, #edd8b0 40%, #d8c490 70%, #e0cfa0 100%)",
    shades: [
      { code: "NAT-MP-001", name: "Hard Maple", finish: "Natural", gradient: "linear-gradient(160deg, #e8d5b0 0%, #f0e0c0 40%, #e4cfa8 70%, #d8c098 100%)", grain: "Straight", description: "Fine, uniform grain with a creamy white tone. The purest expression of Maple — ideal for bright, airy interiors." },
      { code: "NAT-MP-002", name: "Bird's Eye Maple", finish: "Natural", gradient: "linear-gradient(160deg, #d8c89a 0%, #e8d8aa 40%, #d4c490 70%, #c8b880 100%)", grain: "Figured", description: "Prized for the distinctive round, 'eye' formations scattered across the face — each panel is unique and striking." },
      { code: "NAT-MP-003", name: "Curly Maple", finish: "Natural", gradient: "linear-gradient(160deg, #c8b890 0%, #d8c8a0 40%, #c4b488 70%, #b8a878 100%)", grain: "Figured", description: "Tiger maple — dramatic ripple figure that shimmers and changes with the viewing angle. A collector's wood." },
    ],
  },
  {
    slug: "cherry",
    name: "Cherry",
    tileLabel: "Cherry",
    origin: "North America / Europe",
    description:
      "American Black Cherry — warm reddish-brown that deepens beautifully with age and light exposure. Fine, uniform grain with a silky, lustrous surface. A wood that genuinely improves over time.",
    gradient: "linear-gradient(160deg, #8b3a2a 0%, #a04838 35%, #8c3828 65%, #782a20 100%)",
    heroGradient: "linear-gradient(160deg, #6a2a1a 0%, #a04838 40%, #8c3828 70%, #8b3a2a 100%)",
    shades: [
      { code: "NAT-CH-001", name: "Natural Cherry", finish: "Natural", gradient: "linear-gradient(160deg, #9b4838 0%, #b05848 40%, #9a4438 70%, #883428 100%)", grain: "Straight", description: "Fresh-cut pale pink-brown tones that will deepen to rich reddish-brown over time. Nature's own patina in progress." },
      { code: "NAT-CH-002", name: "American Cherry", finish: "Natural", gradient: "linear-gradient(160deg, #8b3a2a 0%, #a04838 40%, #8c3828 70%, #782a20 100%)", grain: "Wavy", description: "The classic cherry profile — warm reddish-brown with subtle grain movement and natural gum pockets for character." },
      { code: "NAT-CH-003", name: "Dark Cherry", finish: "Natural", gradient: "linear-gradient(160deg, #5a2018 0%, #7a3028 40%, #603018 70%, #4a2015 100%)", grain: "Straight", description: "Aged cherry expression — deep burgundy-brown tones that create a sophisticated, intimate atmosphere in any space." },
    ],
  },
  {
    slug: "ash",
    name: "Ash",
    tileLabel: "Ash",
    origin: "North America / Europe",
    description:
      "European and American Ash — light, open grain with a distinctive cathedral pattern. Available in natural creamy-white tones, smoky greys, and olive-green characters. Highly versatile.",
    gradient: "linear-gradient(160deg, #c0b8a8 0%, #d0c8b8 35%, #b8b0a0 65%, #d0c8b8 100%)",
    heroGradient: "linear-gradient(160deg, #a0988a 0%, #d0c8b8 40%, #c0b8a8 70%, #c8c0b0 100%)",
    shades: [
      { code: "NAT-AS-001", name: "White Ash", finish: "Natural", gradient: "linear-gradient(160deg, #dcd4c4 0%, #ece4d4 40%, #d8d0c0 70%, #ccc4b4 100%)", grain: "Straight", description: "Pale creamy-white with subtle grain — the brightest of the ash family. Pairs beautifully with white walls and light stone." },
      { code: "NAT-AS-002", name: "Natural Ash", finish: "Natural", gradient: "linear-gradient(160deg, #c8c0b0 0%, #d8d0c0 40%, #c4bcac 70%, #b8b0a0 100%)", grain: "Straight", description: "Classic ash profile with warm beige-grey tone. Versatile, clean, and compatible with virtually any design palette." },
      { code: "NAT-AS-003", name: "Olive Ash", finish: "Natural", gradient: "linear-gradient(160deg, #9a9280 0%, #afa790 40%, #989080 70%, #888070 100%)", grain: "Figured", description: "Selected for olive and grey-green figure throughout the heartwood. Each board uniquely streaked — dramatic and sophisticated." },
    ],
  },
  {
    slug: "mahogany",
    name: "Mahogany",
    tileLabel: "Mahogany",
    origin: "West Africa / Central America",
    description:
      "African and Santos Mahogany — rich reddish-brown with interlocked grain that produces a beautiful ribbon figure in quarter-cut panels. A timeless choice for executive and heritage interiors.",
    gradient: "linear-gradient(160deg, #7b3428 0%, #9b4838 35%, #7c3428 65%, #683020 100%)",
    heroGradient: "linear-gradient(160deg, #5a2418 0%, #9b4838 40%, #7c3428 70%, #7b3428 100%)",
    shades: [
      { code: "NAT-MH-001", name: "African Mahogany", finish: "Natural", gradient: "linear-gradient(160deg, #7b3428 0%, #9b4838 40%, #7c3428 70%, #683020 100%)", grain: "Interlocked", description: "Classic West African mahogany — warm pinkish-red with pronounced interlocked grain producing a lustrous ribbon figure." },
      { code: "NAT-MH-002", name: "Santos Mahogany", finish: "Natural", gradient: "linear-gradient(160deg, #6a3420 0%, #8a4830 40%, #6c3520 70%, #582810 100%)", grain: "Straight", description: "South American Santos mahogany — deeper reddish-brown with fine, straight grain. Denser and more consistent than African varieties." },
      { code: "NAT-MH-003", name: "Dark Mahogany", finish: "Natural", gradient: "linear-gradient(160deg, #4a2018 0%, #6a3028 40%, #4c2218 70%, #3c1a10 100%)", grain: "Wavy", description: "Darkened mahogany expression — deep burgundy-brown that commands presence. For executive boardrooms and statement furniture." },
    ],
  },
];

// ─── AURA COLLECTION ──────────────────────────────────────────────────────────
// Contemporary, modern-finish veneers

const auraSpecies: VeneerSpecies[] = [
  {
    slug: "walnut",
    name: "Walnut",
    tileLabel: "Walnut",
    origin: "North America / Europe",
    description:
      "The Aura Walnut series brings contemporary finishing to America's most prized cabinet wood. Available in factory-applied Matte, Satin, and High-Gloss lacquer — all from the production line, no site polishing required.",
    gradient: "linear-gradient(160deg, #2a1808 0%, #4a2c17 35%, #3a2210 65%, #261608 100%)",
    heroGradient: "linear-gradient(160deg, #1a1008 0%, #4a2c17 40%, #3a2210 70%, #2a1808 100%)",
    shades: [
      { code: "AUR-WL-001", name: "Matte Walnut Dark", finish: "Matte", gradient: "linear-gradient(160deg, #201408 0%, #3a2210 40%, #2c1a0c 70%, #181008 100%)", grain: "Straight", description: "Near-black walnut with a low-sheen matte finish. Absorbs light for a velvety, understated luxury effect." },
      { code: "AUR-WL-002", name: "Satin Walnut", finish: "Satin", gradient: "linear-gradient(160deg, #5c3d22 0%, #7a5535 40%, #6b4828 70%, #503520 100%)", grain: "Straight", description: "Classic walnut profile with a silky 30% satin finish. The most refined expression of walnut — not too dull, not too shiny." },
      { code: "AUR-WL-003", name: "High-Gloss Walnut", finish: "High-Gloss", gradient: "linear-gradient(160deg, #4a2c17 0%, #6b3f22 40%, #583018 70%, #3d2514 100%)", grain: "Straight", description: "Mirror-finish walnut with an 80%+ gloss level. Creates extraordinary depth and reflective drama in feature applications." },
    ],
  },
  {
    slug: "oak",
    name: "Oak",
    tileLabel: "Oak",
    origin: "North America / Europe / Scandinavia",
    description:
      "The Aura Oak series spans the full tonal spectrum from Nordic white to Smoked. Each shade is factory-finished to precise gloss specifications for consistent results across every panel in a project.",
    gradient: "linear-gradient(160deg, #d8d0c0 0%, #e8e0d0 35%, #d0c8b8 65%, #ddd5c5 100%)",
    heroGradient: "linear-gradient(160deg, #b8a888 0%, #e8e0d0 40%, #d0c8b8 70%, #d8d0c0 100%)",
    shades: [
      { code: "AUR-OK-001", name: "Nordic Oak", finish: "Matte", gradient: "linear-gradient(160deg, #dcd4c4 0%, #ece4d4 40%, #d8d0c0 70%, #ccc4b4 100%)", grain: "Straight", description: "Whitewashed Scandinavian oak with matte finish. The definitive material for Nordic-influenced interiors." },
      { code: "AUR-OK-002", name: "Satin White Oak", finish: "Satin", gradient: "linear-gradient(160deg, #c4a882 0%, #d4b896 40%, #c0a07a 70%, #b89060 100%)", grain: "Straight", description: "Classic white oak with a refined satin finish. Clean, elegant, timeless. The architect's default for contemporary spaces." },
      { code: "AUR-OK-003", name: "Textured Oak", finish: "Textured", gradient: "linear-gradient(160deg, #a08040 0%, #b09050 40%, #9a7838 70%, #8a6828 100%)", grain: "Wavy", description: "Wire-brushed surface texture enhanced by matte finish — tactile depth that mirrors the natural look and feel of reclaimed wood." },
      { code: "AUR-OK-004", name: "Gloss Smoked Oak", finish: "High-Gloss", gradient: "linear-gradient(160deg, #5a4a30 0%, #7a6040 40%, #604c30 70%, #4a3818 100%)", grain: "Straight", description: "Dramatically smoked dark tone with high-gloss mirror finish. Creates stunning contrast in light-coloured contemporary interiors." },
    ],
  },
  {
    slug: "teak",
    name: "Teak",
    tileLabel: "Teak",
    origin: "Myanmar / South-East Asia",
    description:
      "The Aura Teak series brings factory finishing to South-East Asia's most iconic wood. Available in Matte and Lacquered options for interior surfaces that require consistent, site-ready quality.",
    gradient: "linear-gradient(160deg, #7a5015 0%, #9a6828 35%, #806018 65%, #7a5015 100%)",
    heroGradient: "linear-gradient(160deg, #5a3a10 0%, #9a6828 40%, #806018 70%, #7a5015 100%)",
    shades: [
      { code: "AUR-TK-001", name: "Matte Teak", finish: "Matte", gradient: "linear-gradient(160deg, #8b5e19 0%, #a07830 40%, #906520 70%, #7a5015 100%)", grain: "Interlocked", description: "Burma Teak's warm golden-brown in a flat matte finish. Reduces the 'furniture look' for a more architectural application." },
      { code: "AUR-TK-002", name: "Lacquered Teak", finish: "High-Gloss", gradient: "linear-gradient(160deg, #a07030 0%, #c09040 40%, #a87828 70%, #885820 100%)", grain: "Wavy", description: "Honey teak tones under a high-clarity gloss lacquer. Creates luminous, deep-finish panels for premium joinery." },
    ],
  },
  {
    slug: "maple",
    name: "Maple",
    tileLabel: "Maple",
    origin: "Canada / Northern USA",
    description:
      "The Aura Maple series explores contemporary interpretations of North America's cleanest wood species — from bleached bright white to subtle smoke-toned variations.",
    gradient: "linear-gradient(160deg, #f0e8d8 0%, #f8f0e0 35%, #e8e0d0 65%, #f0e8d8 100%)",
    heroGradient: "linear-gradient(160deg, #d0c8b0 0%, #f8f0e0 40%, #e8e0d0 70%, #f0e8d8 100%)",
    shades: [
      { code: "AUR-MP-001", name: "White Maple", finish: "Matte", gradient: "linear-gradient(160deg, #f0ebe0 0%, #f8f3e8 40%, #ece7dc 70%, #e4dfd4 100%)", grain: "Straight", description: "Bleached bright white maple in a matte finish. The purest, most minimal material surface for contemporary interiors." },
      { code: "AUR-MP-002", name: "Smoke Maple", finish: "Satin", gradient: "linear-gradient(160deg, #a09080 0%, #b0a090 40%, #9a8c7c 70%, #8a7c6c 100%)", grain: "Straight", description: "Grey-toned maple with subtle warmth — the bridge between white and walnut for versatile transitional design schemes." },
    ],
  },
  {
    slug: "wenge",
    name: "Wenge",
    tileLabel: "Wenge",
    origin: "Central Africa",
    description:
      "African Wenge — one of the world's darkest natural woods. Nearly black chocolate-brown with fine pale streaks. Exclusively in the Aura collection for contemporary luxury interiors demanding maximum drama.",
    gradient: "linear-gradient(160deg, #1c1008 0%, #2c1c10 35%, #201408 65%, #180e06 100%)",
    heroGradient: "linear-gradient(160deg, #100a04 0%, #2c1c10 40%, #201408 70%, #1c1008 100%)",
    shades: [
      { code: "AUR-WG-001", name: "Natural Wenge", finish: "Matte", gradient: "linear-gradient(160deg, #2c1c0c 0%, #3c2a18 40%, #2a1a0a 70%, #201408 100%)", grain: "Straight", description: "Pure wenge profile — near-black with fine light brown streaks and distinctive coarse grain. Matte finish reveals raw texture." },
      { code: "AUR-WG-002", name: "Dark Wenge", finish: "Satin", gradient: "linear-gradient(160deg, #1a1008 0%, #2c1c10 40%, #181008 70%, #100c06 100%)", grain: "Straight", description: "Deeply darkened wenge approaching pure black with a silky satin sheen. The ultimate statement material for feature walls." },
    ],
  },
  {
    slug: "ebony",
    name: "Ebony",
    tileLabel: "Ebony",
    origin: "Cameroon / Sri Lanka / India",
    description:
      "Macassar and African Ebony — the world's rarest decorative veneer species. Jet black with golden streaks (Macassar) or pure solid black (African). Available exclusively in the Aura collection for signature projects.",
    gradient: "linear-gradient(160deg, #180e08 0%, #281a0e 35%, #1c1008 65%, #120a04 100%)",
    heroGradient: "linear-gradient(160deg, #0c0804 0%, #281a0e 40%, #1c1008 70%, #180e08 100%)",
    shades: [
      { code: "AUR-EB-001", name: "Macassar Ebony", finish: "Satin", gradient: "linear-gradient(140deg, #1c1408 0%, #2c2010 20%, #3a2c16 40%, #1a1208 60%, #2c2010 80%, #1c1408 100%)", grain: "Figured", description: "Macassar Ebony's signature golden-amber streaks against jet black — the most dramatic veneer in the natural world." },
      { code: "AUR-EB-002", name: "African Ebony", finish: "High-Gloss", gradient: "linear-gradient(160deg, #0c0808 0%, #1c1408 40%, #0e0a08 70%, #080606 100%)", grain: "Straight", description: "Pure jet black African Ebony with mirror-gloss finish. Absolute maximum luxury — the apex of the Aura collection." },
    ],
  },
];

// ─── Collections Export ────────────────────────────────────────────────────────

export const veneerCollections: Record<string, VeneerCollection> = {
  "sharon-exoti-natura": {
    id: "natura",
    slug: "sharon-exoti-natura",
    name: "Sharon Exoti Natura",
    tagline: "Authentic Natural Wood Veneers",
    description:
      "The Natura collection presents authentic sliced wood veneers in their most pure form — natural grain, genuine texture, and the full character of each species preserved from log to panel. Seven species, 24 individual shades sourced from sustainably managed forests.",
    accentColor: "#c4922a",
    species: naturaSpecies,
  },
  "sharon-exoti-aura": {
    id: "aura",
    slug: "sharon-exoti-aura",
    name: "Sharon Exoti Aura",
    tagline: "Contemporary Factory-Finished Veneers",
    description:
      "The Aura collection pairs nature's finest wood species with precision factory finishing — UV-cured lacquer, Matte, Satin, and High-Gloss options applied under controlled conditions. Zero site polishing. Perfect consistency. Six species, 19 individual shades for the most demanding modern interiors.",
    accentColor: "#7c6aba",
    species: auraSpecies,
  },
};

export function getCollection(slug: string): VeneerCollection | undefined {
  return veneerCollections[slug];
}

export function getSpecies(collectionSlug: string, speciesSlug: string): VeneerSpecies | undefined {
  return veneerCollections[collectionSlug]?.species.find((s) => s.slug === speciesSlug);
}
