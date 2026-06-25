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
    id: "kra-roadshow",
    title: "KRA Roadshow",
    category: "roadshow",
    badge: "ROADSHOW",
    date: "19 – 24 June 2026",
    location: "Meru, Tharaka Nithi & Isiolo County",
    images: [
      { src: "/KRA%20Roadshow/WhatsApp%20Image%202026-06-24%20at%2011.30.19%20PM.jpeg", alt: "KRA roadshow with Weru TV — community event" },
      { src: "/KRA%20Roadshow/WhatsApp%20Image%202026-06-24%20at%2011.30.20%20PM.jpeg", alt: "KRA roadshow — Weru TV on-ground activation" },
      { src: "/KRA%20Roadshow/WhatsApp%20Image%202026-06-24%20at%2011.30.20%20PM%20(1).jpeg", alt: "KRA roadshow — audience and presenters" },
      { src: "/KRA%20Roadshow/WhatsApp%20Image%202026-06-24%20at%2011.30.21%20PM.jpeg", alt: "KRA roadshow — field coverage highlights" },
    ],
  },
  {
    id: "10-years-roadshow",
    title: "10 Years of Media Excellence",
    category: "roadshow",
    badge: "ROADSHOW",
    date: "June 2026",
    location: "Mount Kenya Region",
    images: [
      { src: `${RS}Screenshot_1.png`,  alt: "Weru TV 10-year roadshow — crowd at the event" },
      { src: `${RS}Screenshot_2.png`,  alt: "Weru TV 10-year roadshow — live coverage setup" },
      { src: `${RS}Screenshot_6.png`,  alt: "Weru TV 10-year roadshow — community celebrations" },
      { src: `${RS}Screenshot_8.png`,  alt: "Weru TV 10-year roadshow — stage and presenters" },
      { src: `${RS}Screenshot_9.png`,  alt: "Weru TV 10-year roadshow — broadcast highlights" },
      { src: `${RS}Screenshot_11.png`, alt: "Weru TV 10-year roadshow — roadshow activation" },
    ],
  },
  {
    id: "greenlife-roadshow",
    title: "Greenlife Crop Protection Roadshow",
    category: "roadshow",
    badge: "ROADSHOW",
    date: "June 2026",
    location: "8 Counties, Kenya",
    images: [
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.05%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — farmers and field activation" },
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.07%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — agricultural knowledge sharing" },
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.09%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — farm inputs on display" },
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.12%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — community farmers engagement" },
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.13%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — county activation highlights" },
      { src: "/Greenlife%20Crop%20Protection%20Africa%20Ltd%20Roadshow/WhatsApp%20Image%202026-06-25%20at%2010.02.14%20AM.jpeg", alt: "Greenlife Crop Protection roadshow — Weru TV field coverage" },
    ],
  },
];
