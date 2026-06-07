export interface StudioPhoto {
  src: string;
  caption: string;
  category: "News & Talk" | "Lounges" | "Sports" | "Heritage Garden";
}

export const STUDIO_CATEGORIES = [
  "All",
  "News & Talk",
  "Lounges",
  "Sports",
  "Heritage Garden",
] as const;

const B = "/Studio%20images";

export const studioGallery: StudioPhoto[] = [
  // News & Talk (2)
  { src: `${B}/studio%20area13.png`,  caption: "Ntcto Cia Newsdesk",       category: "News & Talk" },
  { src: `${B}/studio%20area17.png`,  caption: "Main Broadcast Studio",    category: "News & Talk" },

  // Lounges (6)
  { src: `${B}/studio%20area.png`,    caption: "Multi-Set Hall",            category: "Lounges" },
  { src: `${B}/studio%20area3.png`,   caption: "Heritage Interview Set",    category: "Lounges" },
  { src: `${B}/studio%20area4.png`,   caption: "Prestige Gold Set",         category: "Lounges" },
  { src: `${B}/studio%20area5.png`,   caption: "Diamond Lounge",            category: "Lounges" },
  { src: `${B}/studio%20area6.png`,   caption: "Classic Talk Chair",        category: "Lounges" },
  { src: `${B}/studio%20area14.png`,  caption: "Royal Blue Set",            category: "Lounges" },

  // Sports (4)
  { src: `${B}/studio%20area2.png`,   caption: "Kurukuru Bienine Set",      category: "Sports" },
  { src: `${B}/studio%20area8.png`,   caption: "Sports Bar — Front",        category: "Sports" },
  { src: `${B}/studio%20area9.png`,   caption: "Sports Bar — Side",         category: "Sports" },
  { src: `${B}/studio%20area10.png`,  caption: "Game-Day Mural",            category: "Sports" },

  // Heritage Garden (6)
  { src: `${B}/Garden%20Photo.png`,   caption: "Heritage Village — Night",  category: "Heritage Garden" },
  { src: `${B}/studio%20area7.png`,   caption: "Kikuyu Homestead",          category: "Heritage Garden" },
  { src: `${B}/studio%20area11.png`,  caption: "Village Square",            category: "Heritage Garden" },
  { src: `${B}/studio%20area12.png`,  caption: "Garden Walkway",            category: "Heritage Garden" },
  { src: `${B}/studio%20area15.png`,  caption: "Heritage Huts — Dusk",      category: "Heritage Garden" },
  { src: `${B}/studio%20area16.png`,  caption: "Culture Garden",            category: "Heritage Garden" },
];
