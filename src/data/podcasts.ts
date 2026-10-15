export type Podcast = {
  slug: string;
  title: string;
  hosts: string;
  youtubeId?: string;
  episodeTitle?: string;
};

export const PODCASTS: Podcast[] = [
  { slug: "politics-360",      title: "Politics 360",       hosts: "Morgan Mwiti", youtubeId: "15unRjCznZY", episodeTitle: "Youth in Politics - Ready to Lead or Still Learning?" },
  { slug: "the-var",           title: "The VAR",            hosts: "Ken Bisaka, Ken Mutuma & Prince Ken" },
  { slug: "gen-z-unfiltered",  title: "Gen Z Unfiltered",   hosts: "The Katiba Gang" },
  { slug: "empress-korner",    title: "Empress Korner",     hosts: "Empress Rita & Empress Natty", youtubeId: "p5cQxjH-0i4", episodeTitle: "Friendships: Real Ones or Just for a Season?" },
  { slug: "bounce-and-groove", title: "Bounce and Groove",  hosts: "Afrik Annah" },
  { slug: "fit-and-fuel",      title: "Fit & Fuel",         hosts: "", youtubeId: "DGX-jdncTzk", episodeTitle: "Episode 1" },
];
