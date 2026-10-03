export const SITE_LOGO_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785929674/logo_q0lngr.png";

export const OG_LOGO_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785930241/Werulogo_pnvn2r.jpg";

export const BRAND_LOGOS = {
  weruTv: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785929905/weru-tv-logo_hwwdz8.png",
  weruFm: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785929905/weru-fm-logo_gtewoj.png",
  weruDigital: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785929903/weru-digital-logo_mm8to4.png",
};

export const HERO_BG_DESKTOP_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785930040/Weru_hero_banner_tymdbi.png";

export const HERO_BG_MOBILE_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785930035/phonehero_cr9qq5.jpg";

export const MULTISTREAM_BG_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785931136/bckground_qhj9sa.jpg";

export const TV_LIVE_POSTER_URL =
  "https://res.cloudinary.com/d3m1hdbk/image/upload/v1785931153/TV_page_image_e4upze.jpg";

// Homepage hero carousel — slide 0 is the original "100% Weru" graphic (desktop
// and mobile use different crops of the same artwork); slides 1-4 are the
// generated broadcast-mood photos and currently point at temporary WaveSpeed
// preview URLs pending upload to Cloudinary.
export const HERO_CAROUSEL_SLIDES: { desktop: string; mobile: string }[] = [
  { desktop: HERO_BG_DESKTOP_URL, mobile: HERO_BG_MOBILE_URL },
  {
    desktop: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-1_upwref.png",
    mobile: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-1_upwref.png",
  },
  {
    desktop: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-2-studio_a9xmwu.png",
    mobile: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-2-studio_a9xmwu.png",
  },
  {
    desktop: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003680/hero-test-3-tripod_nuaeqy.png",
    mobile: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003680/hero-test-3-tripod_nuaeqy.png",
  },
  {
    desktop: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-4-dj-v2_fdspwe.png",
    mobile: "https://res.cloudinary.com/d3m1hdbk/image/upload/v1791003681/hero-test-4-dj-v2_fdspwe.png",
  },
];
