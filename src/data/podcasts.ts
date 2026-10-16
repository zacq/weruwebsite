export type Podcast = {
  slug: string;
  title: string;
  hosts: string;
  youtubeId?: string;
  episodeTitle?: string;
};

export const PODCASTS: Podcast[] = [
  { slug: "politics-360",      title: "Politics 360",       hosts: "Morgan Mwiti", youtubeId: "15unRjCznZY", episodeTitle: "Youth in Politics - Ready to Lead or Still Learning?" },
  { slug: "the-var",           title: "The VAR",            hosts: "Ken Bisaka, Ken Mutuma & Prince Ken", youtubeId: "726o9OZQv9U", episodeTitle: "Should Managers Be Given Time?" },
  { slug: "gen-z-unfiltered",  title: "Gen Z Unfiltered",   hosts: "The Katiba Gang", youtubeId: "5VXn9Ybpt5U", episodeTitle: "Adulting Is a Scam!" },
  { slug: "empress-korner",    title: "Empress Korner",     hosts: "Empress Rita & Empress Natty", youtubeId: "p5cQxjH-0i4", episodeTitle: "Friendships: Real Ones or Just for a Season?" },
  { slug: "bounce-and-groove", title: "Bounce and Groove",  hosts: "Afrik Annah", youtubeId: "8852mwVCuhc", episodeTitle: "Pulse Dancers" },
  { slug: "fit-and-fuel",      title: "Fit & Fuel",         hosts: "", youtubeId: "DGX-jdncTzk", episodeTitle: "Episode 1" },
];
