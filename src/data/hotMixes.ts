export type HotMix = {
  title: string;
  dj: string;
  /**
   * Mixcloud feed path, e.g. "/weru-fm/friday-night-bangers-vol-1/".
   * Leave null until the mix has actually been uploaded to Mixcloud —
   * the card then renders a "Coming soon" placeholder instead of a broken embed.
   */
  mixcloudFeed: string | null;
};

export const hotMixes: HotMix[] = [
  { title: "Friday Night Bangers", dj: "Dj Alekkings",                  mixcloudFeed: null },
  { title: "ReggaeMania Selections",  dj: "DjTushUntamed",                 mixcloudFeed: null },
  { title: "Sunday Chill Sessions",   dj: "Weru FM Resident DJs",          mixcloudFeed: null },
  { title: "Throwback Kikuyu Classics", dj: "Weru FM Resident DJs",        mixcloudFeed: null },
];
