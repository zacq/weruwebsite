export type Podcast = {
  slug: string;
  title: string;
  hosts: string;
};

export const PODCASTS: Podcast[] = [
  { slug: "politics-360",      title: "Politics 360",       hosts: "Morgan Mwiti" },
  { slug: "the-var",           title: "The VAR",            hosts: "Ken Bisaka, Ken Mutuma & Prince Ken" },
  { slug: "gen-z-unfiltered",  title: "Gen Z Unfiltered",   hosts: "The Katiba Gang" },
  { slug: "empress-korner",    title: "Empress Korner",     hosts: "Empress Rita & Empress Natty" },
  { slug: "bounce-and-groove", title: "Bounce and Groove",  hosts: "Afrik Annah" },
];
