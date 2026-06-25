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
    date: "June 2026",
    location: "Central Kenya",
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
];
