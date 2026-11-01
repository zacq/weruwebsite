export type Podcast = {
  slug: string;
  title: string;
  hosts: string;
  youtubeId?: string;
  episodeTitle?: string;
};

export const PODCASTS: Podcast[] = [
  { slug: "politics-360",      title: "Politics 360",       hosts: "Morgan Mwiti", youtubeId: "15unRjCznZY", episodeTitle: "Youth in Politics - Ready to Lead or Still Learning?" },
  { slug: "the-var",           title: "The VAR",            hosts: "Ken Bisaka, Ken Mutuma & Prince Ken", youtubeId: "1dsIaAbV87k", episodeTitle: "Has VAR Changed Football?" },
  { slug: "gen-z-unfiltered",  title: "Gen Z Unfiltered",   hosts: "The Katiba Gang", youtubeId: "5VXn9Ybpt5U", episodeTitle: "Adulting Is a Scam!" },
  { slug: "empress-korner",    title: "Empress Korner",     hosts: "Empress Rita & Empress Natty", youtubeId: "eNYMjQ5pPiE", episodeTitle: "The Talking Stage" },
  { slug: "bounce-and-groove", title: "Bounce and Groove",  hosts: "Afrik Annah", youtubeId: "N3ZqCMYCCCE", episodeTitle: "Instagram Dancers" },
  { slug: "fit-and-fuel",      title: "Fit & Fuel",         hosts: "", youtubeId: "vsaK3XBUZls", episodeTitle: "Full Body Workout" },
];
