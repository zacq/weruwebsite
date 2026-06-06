// Replace src paths with real studio photos once available.
// Drop images into public/Studios/ and update the src fields below.
// The first entry with featured: true becomes the hero image.

export interface StudioPhoto {
  src: string;
  caption: string;
  category: string;
  featured?: boolean;
}

export const studioGallery: StudioPhoto[] = [
  {
    src: "/Presenters/makena-wa-matiri.png",
    caption: "Main Studio — Morning Show Set",
    category: "Main Studio",
    featured: true,
  },
  {
    src: "/Presenters/martin-gichunge.png",
    caption: "Evening Entertainment Desk",
    category: "Main Studio",
  },
  {
    src: "/Presenters/empress-rita-natty.png",
    caption: "Reggaemani Live Recording",
    category: "Live Stage",
  },
  {
    src: "/Presenters/munene-wa-kagwi.png",
    caption: "News Anchor Booth",
    category: "News Studio",
  },
  {
    src: "/Presenters/stella-karimi.png",
    caption: "County Affairs Set",
    category: "News Studio",
  },
  {
    src: "/Presenters/ajelyne-george.png",
    caption: "Mantu Kimenchu Stage",
    category: "Live Stage",
  },
  {
    src: "/Presenters/nelly-githinji.png",
    caption: "Agricultural Programme Set",
    category: "Outdoor",
  },
  {
    src: "/Presenters/mc-tash.png",
    caption: "Afternoon Entertainment Studio",
    category: "Main Studio",
  },
  {
    src: "/Presenters/mwenda-h-pilot.png",
    caption: "Nyontoka Live Set",
    category: "Live Stage",
  },
  {
    src: "/Presenters/edward-mutembei.png",
    caption: "Gaaru ya Ciaca Recording",
    category: "Radio Booth",
  },
  {
    src: "/Presenters/ReggaeMania.png",
    caption: "Reggae & Culture Stage",
    category: "Live Stage",
  },
];
