export type GalleryImage = {
  src: string;
  alt: string;
};

export type Album = {
  id: string;
  title: string;
  category: "roadshow" | "launch";
  badge?: string;
  date: string;
  location: string;
  images: GalleryImage[];
  upcoming?: boolean;
};

const RS = "/Roadshow%20Images/";

export const albums: Album[] = [
  {
    id: "10-years-roadshow",
    title: "10 Years of Media Excellence",
    category: "roadshow",
    badge: "ROADSHOW",
    date: "June 2026",
    location: "Mount Kenya Region",
    images: [
      { src: `${RS}Screenshot_1.png`,       alt: "Weru TV roadshow — crowd at the event" },
      { src: `${RS}Screenshot_1%20(1).png`, alt: "Weru TV roadshow — OB truck broadcast" },
      { src: `${RS}Screenshot_2.png`,       alt: "Weru TV roadshow — live coverage setup" },
      { src: `${RS}Screenshot_3.png`,       alt: "Weru TV roadshow — audience gathering" },
      { src: `${RS}Screenshot_4.png`,       alt: "Weru TV roadshow — Weru FM 96.4 on-site" },
      { src: `${RS}Screenshot_5.png`,       alt: "Weru TV roadshow — 10 years of media excellence" },
      { src: `${RS}Screenshot_6.png`,       alt: "Weru TV roadshow — community celebrations" },
      { src: `${RS}Screenshot_7.png`,       alt: "Weru TV roadshow — Mount Kenya crowd" },
      { src: `${RS}Screenshot_8.png`,       alt: "Weru TV roadshow — stage and presenters" },
      { src: `${RS}Screenshot_9.png`,       alt: "Weru TV roadshow — broadcast highlights" },
      { src: `${RS}Screenshot_10.png`,      alt: "Weru TV roadshow — audience engagement" },
      { src: `${RS}Screenshot_11.png`,      alt: "Weru TV roadshow — roadshow activation" },
      { src: `${RS}Screenshot_12.png`,      alt: "Weru TV roadshow — event coverage" },
      { src: `${RS}Screenshot_13.png`,      alt: "Weru TV roadshow — field broadcast team" },
      { src: `${RS}Screenshot_14.png`,      alt: "Weru TV roadshow — celebration moments" },
      { src: `${RS}Screenshot_15.png`,      alt: "Weru TV roadshow — closing highlights" },
    ],
  },
  {
    id: "amerucan-extravaganza",
    title: "Amerucan Extravaganza",
    category: "launch",
    date: "Coming soon",
    location: "Nyeri HQ",
    upcoming: true,
    images: [],
  },
  {
    id: "next-town-roadshow",
    title: "Next Town Roadshow",
    category: "roadshow",
    date: "To be announced",
    location: "Central Kenya",
    upcoming: true,
    images: [],
  },
];
