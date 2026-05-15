export type ProgramTag =
  | "News" | "Morning" | "Health" | "Business" | "Entertainment"
  | "Music" | "Sports" | "Culture" | "Kids" | "Documentary" | "Magazine";

export type Program = {
  id: string;
  time: string;
  name: string;
  description: string;
  presenter: string;
  tag: ProgramTag;
};

export type DaySchedule = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  programs: Program[];
};

export const tvSchedule: DaySchedule[] = [
  {
    day: "Monday",
    programs: [
      { id: "mon-1",  time: "5:00 AM",  name: "Morning Devotion",         presenter: "Pastor James Mwangi",  tag: "Morning",       description: "Begin the week with spiritual reflections and morning prayers." },
      { id: "mon-2",  time: "6:00 AM",  name: "Weru Morning News",        presenter: "Weru Newsroom",        tag: "News",          description: "Monday morning headlines — local, national, and international." },
      { id: "mon-3",  time: "8:00 AM",  name: "Tutharimwe",               presenter: "Makena Wa Matiri",     tag: "Morning",       description: "Inspiring conversations about faith, community, and family life." },
      { id: "mon-4",  time: "10:00 AM", name: "Uria Ndagitari",           presenter: "Nkatha Cietu",         tag: "Health",        description: "Health insights and expert medical advice for Kenyan families." },
      { id: "mon-5",  time: "12:00 PM", name: "Midday News Bulletin",     presenter: "Weru Newsroom",        tag: "News",          description: "Concise summary of the morning's top stories." },
      { id: "mon-6",  time: "1:00 PM",  name: "Midday Magazine",          presenter: "Wanjiru Mwangi",       tag: "Magazine",      description: "Lifestyle, culture, and community stories for the afternoon." },
      { id: "mon-7",  time: "3:00 PM",  name: "Tuburuke Na Tash",         presenter: "MC Tash & DJ Dennie",  tag: "Entertainment", description: "Afternoon energy with music, entertainment, and live call-ins." },
      { id: "mon-8",  time: "5:00 PM",  name: "Evening Drive",            presenter: "James Kariuki",        tag: "News",          description: "Commute companion — top news, traffic updates, and music." },
      { id: "mon-9",  time: "7:00 PM",  name: "Prime Time News",          presenter: "Weru Newsroom",        tag: "News",          description: "In-depth prime time reporting with expert analysis." },
      { id: "mon-10", time: "8:00 PM",  name: "Gichunki",                 presenter: "Martin Gichunge",      tag: "Entertainment", description: "Entertainment, community stories, and trending topics." },
      { id: "mon-11", time: "9:30 PM",  name: "Late Night Headlines",     presenter: "Weru Newsroom",        tag: "News",          description: "Recap of the day's key events and tomorrow's outlook." },
    ],
  },
  {
    day: "Tuesday",
    programs: [
      { id: "tue-1",  time: "5:00 AM",  name: "Morning Devotion",         presenter: "Pastor James Mwangi",  tag: "Morning",       description: "Spiritual reflections and prayers to start Tuesday with purpose." },
      { id: "tue-2",  time: "6:00 AM",  name: "Weru Morning News",        presenter: "Weru Newsroom",        tag: "News",          description: "Tuesday's top stories — politics, business, and community." },
      { id: "tue-3",  time: "8:00 AM",  name: "Tutharimwe",               presenter: "Makena Wa Matiri",     tag: "Morning",       description: "Tuesday edition: faith, family, and community dialogues." },
      { id: "tue-4",  time: "10:00 AM", name: "Business Corner",          presenter: "Munene Wa Kagwi",      tag: "Business",      description: "Market updates, investment tips, and SME success stories." },
      { id: "tue-5",  time: "12:00 PM", name: "Midday News Bulletin",     presenter: "Weru Newsroom",        tag: "News",          description: "Tuesday lunchtime briefing — breaking news and developments." },
      { id: "tue-6",  time: "1:00 PM",  name: "Women in Focus",           presenter: "Wanjiru Mwangi",       tag: "Magazine",      description: "Celebrating the achievements and stories of Kenyan women." },
      { id: "tue-7",  time: "3:00 PM",  name: "Tuburuke Na Tash",         presenter: "MC Tash & DJ Dennie",  tag: "Entertainment", description: "Afternoon vibes — music, entertainment, and listener shout-outs." },
      { id: "tue-8",  time: "5:00 PM",  name: "Evening Drive",            presenter: "James Kariuki",        tag: "News",          description: "End-of-day roundup and traffic updates for the commute." },
      { id: "tue-9",  time: "7:00 PM",  name: "Prime Time News",          presenter: "Weru Newsroom",        tag: "News",          description: "Tuesday prime — national and international news coverage." },
      { id: "tue-10", time: "8:00 PM",  name: "Reggaemani",               presenter: "Empress Rita",         tag: "Music",         description: "Weekly dose of roots reggae and African culture." },
      { id: "tue-11", time: "9:30 PM",  name: "Late Night Headlines",     presenter: "Weru Newsroom",        tag: "News",          description: "Final bulletin — catch up on everything you missed today." },
    ],
  },
  {
    day: "Wednesday",
    programs: [
      { id: "wed-1",  time: "5:00 AM",  name: "Morning Devotion",         presenter: "Pastor James Mwangi",  tag: "Morning",       description: "Midweek spiritual boost — prayers and reflection." },
      { id: "wed-2",  time: "6:00 AM",  name: "Weru Morning News",        presenter: "Weru Newsroom",        tag: "News",          description: "Wednesday morning headlines covering Kenya and the world." },
      { id: "wed-3",  time: "8:00 AM",  name: "Tutharimwe",               presenter: "Makena Wa Matiri",     tag: "Morning",       description: "Wednesday — community dialogue and positive stories." },
      { id: "wed-4",  time: "10:00 AM", name: "Health & Wellness",        presenter: "Dr. Kamau Waweru",     tag: "Health",        description: "Expert doctors and nutritionists share tips for healthy living." },
      { id: "wed-5",  time: "12:00 PM", name: "Midday News Bulletin",     presenter: "Weru Newsroom",        tag: "News",          description: "Wednesday midday — stories shaping Kenya right now." },
      { id: "wed-6",  time: "1:00 PM",  name: "Agriculture Today",        presenter: "James Kariuki",        tag: "Culture",       description: "Farming innovations, weather alerts, and market prices." },
      { id: "wed-7",  time: "3:00 PM",  name: "Tuburuke Na Tash",         presenter: "MC Tash & DJ Dennie",  tag: "Entertainment", description: "Hump-day special — extra energy from MC Tash and DJ Dennie." },
      { id: "wed-8",  time: "5:00 PM",  name: "Evening Drive",            presenter: "James Kariuki",        tag: "News",          description: "Wednesday evening — community news and commute music." },
      { id: "wed-9",  time: "7:00 PM",  name: "Prime Time News",          presenter: "Weru Newsroom",        tag: "News",          description: "Deep-dive Wednesday with investigative reports and guests." },
      { id: "wed-10", time: "8:00 PM",  name: "Gichunki",                 presenter: "Martin Gichunge",      tag: "Entertainment", description: "Midweek entertainment — laughs, culture, and community." },
      { id: "wed-11", time: "9:30 PM",  name: "Late Night Headlines",     presenter: "Weru Newsroom",        tag: "News",          description: "Wednesday wrap-up — all the news before you sleep." },
    ],
  },
  {
    day: "Thursday",
    programs: [
      { id: "thu-1",  time: "5:00 AM",  name: "Morning Devotion",         presenter: "Pastor James Mwangi",  tag: "Morning",       description: "Thursday prayers and encouragement to power through the week." },
      { id: "thu-2",  time: "6:00 AM",  name: "Weru Morning News",        presenter: "Weru Newsroom",        tag: "News",          description: "Thursday morning roundup — politics, development, breaking news." },
      { id: "thu-3",  time: "8:00 AM",  name: "Tutharimwe",               presenter: "Makena Wa Matiri",     tag: "Morning",       description: "Thursday with Makena — local issues and community voices." },
      { id: "thu-4",  time: "10:00 AM", name: "Youth Connect",            presenter: "Gathoni Njeri",        tag: "Magazine",      description: "Kenyan youth — entrepreneurship, education, and opportunities." },
      { id: "thu-5",  time: "12:00 PM", name: "Midday News Bulletin",     presenter: "Weru Newsroom",        tag: "News",          description: "Thursday midday — stay informed with Weru TV." },
      { id: "thu-6",  time: "1:00 PM",  name: "Legal Matters",            presenter: "Advocate Susan Kamau", tag: "Business",      description: "Understanding your rights — legal experts answer viewer questions." },
      { id: "thu-7",  time: "3:00 PM",  name: "Tuburuke Na Tash",         presenter: "MC Tash & DJ Dennie",  tag: "Entertainment", description: "Thursday afternoon countdown — music and entertainment." },
      { id: "thu-8",  time: "5:00 PM",  name: "Evening Drive",            presenter: "James Kariuki",        tag: "News",          description: "Thursday commute — top stories to end the workday." },
      { id: "thu-9",  time: "7:00 PM",  name: "Prime Time News",          presenter: "Weru Newsroom",        tag: "News",          description: "Thursday prime — comprehensive news with in-studio analysis." },
      { id: "thu-10", time: "8:00 PM",  name: "Untamed Reggaemani",       presenter: "DJ Tush",              tag: "Music",         description: "Reggae, dancehall, and afrobeats fusion with DJ Tush." },
      { id: "thu-11", time: "9:30 PM",  name: "Late Night Headlines",     presenter: "Weru Newsroom",        tag: "News",          description: "Thursday night wrap — into the final weekday." },
    ],
  },
  {
    day: "Friday",
    programs: [
      { id: "fri-1",  time: "5:00 AM",  name: "Morning Devotion",         presenter: "Pastor James Mwangi",  tag: "Morning",       description: "Friday blessings — a spiritual send-off into the weekend." },
      { id: "fri-2",  time: "6:00 AM",  name: "Weru Morning News",        presenter: "Weru Newsroom",        tag: "News",          description: "TGIF headlines — the week's biggest stories." },
      { id: "fri-3",  time: "8:00 AM",  name: "Tutharimwe",               presenter: "Makena Wa Matiri",     tag: "Morning",       description: "Friday special — celebrating the week's community heroes." },
      { id: "fri-4",  time: "10:00 AM", name: "Weekend Preview",          presenter: "Wanjiru Mwangi",       tag: "Magazine",      description: "What's on this weekend — events, shows, and entertainment." },
      { id: "fri-5",  time: "12:00 PM", name: "Midday News Bulletin",     presenter: "Weru Newsroom",        tag: "News",          description: "Friday lunchtime — closing out the week's news cycle." },
      { id: "fri-6",  time: "1:00 PM",  name: "Friday Magazine",          presenter: "Wanjiru Mwangi",       tag: "Magazine",      description: "Weekend lifestyle — fashion, food, travel, and entertainment." },
      { id: "fri-7",  time: "3:00 PM",  name: "Tuburuke Na Tash — TGIF", presenter: "MC Tash & DJ Dennie",  tag: "Entertainment", description: "Extended Friday show — special guests, prizes, and music." },
      { id: "fri-8",  time: "5:00 PM",  name: "Evening Drive",            presenter: "James Kariuki",        tag: "News",          description: "Friday commute — the best way to kick off your weekend." },
      { id: "fri-9",  time: "7:00 PM",  name: "Prime Time News",          presenter: "Weru Newsroom",        tag: "News",          description: "Week-in-review edition — the five biggest stories." },
      { id: "fri-10", time: "8:30 PM",  name: "Gichunki — Friday Special",presenter: "Martin Gichunge",      tag: "Entertainment", description: "Extended Friday show with special guests and highlights." },
      { id: "fri-11", time: "10:00 PM", name: "Friday Night Mix",         presenter: "DJ Dennie",            tag: "Music",         description: "DJ Dennie closes the week with an electrifying live mix." },
    ],
  },
  {
    day: "Saturday",
    programs: [
      { id: "sat-1",  time: "7:00 AM",  name: "Weekend Devotion",         presenter: "Pastor Sarah Wambui",  tag: "Morning",       description: "Saturday morning worship — a community service for families." },
      { id: "sat-2",  time: "9:00 AM",  name: "Cultural Showcase",        presenter: "Mwangi Wa Kamau",      tag: "Culture",       description: "Celebrating Kikuyu and Kenyan culture — traditions and stories." },
      { id: "sat-3",  time: "11:00 AM", name: "Reggaemani Live",          presenter: "Empress Rita",         tag: "Music",         description: "Live Saturday reggae session with call-ins and requests." },
      { id: "sat-4",  time: "1:00 PM",  name: "Weekend News",             presenter: "Weru Newsroom",        tag: "News",          description: "Saturday afternoon briefing — overnight and morning stories." },
      { id: "sat-5",  time: "2:30 PM",  name: "Sports Zone",              presenter: "Kamau Sports Desk",    tag: "Sports",        description: "Live sports coverage, analysis, and interviews with athletes." },
      { id: "sat-6",  time: "5:00 PM",  name: "Untamed Reggaemani",       presenter: "DJ Tush",              tag: "Music",         description: "Extended Saturday afternoon reggae and afrobeats session." },
      { id: "sat-7",  time: "7:00 PM",  name: "Saturday Prime News",      presenter: "Weru Newsroom",        tag: "News",          description: "Weekend edition — day's headlines with community focus." },
      { id: "sat-8",  time: "8:30 PM",  name: "Saturday Night Entertainment", presenter: "MC Tash",         tag: "Entertainment", description: "Live music, drama, comedy, and special guest performances." },
      { id: "sat-9",  time: "10:30 PM", name: "Late Night Vibes",         presenter: "DJ Dennie",            tag: "Music",         description: "Wind down Saturday with smooth music and dedications." },
    ],
  },
  {
    day: "Sunday",
    programs: [
      { id: "sun-1",  time: "7:00 AM",  name: "Sunday Worship Service",   presenter: "Pastor Sarah Wambui",  tag: "Morning",       description: "Live Sunday service — worship, word, and community prayer." },
      { id: "sun-2",  time: "9:30 AM",  name: "Family Magazine",          presenter: "Makena Wa Matiri",     tag: "Magazine",      description: "Sundays are for family — parenting tips and home stories." },
      { id: "sun-3",  time: "11:00 AM", name: "Community Dialogue",       presenter: "Mwangi Wa Kamau",      tag: "Culture",       description: "Community leaders and viewers discuss issues affecting Kenya." },
      { id: "sun-4",  time: "1:00 PM",  name: "Sunday News",              presenter: "Weru Newsroom",        tag: "News",          description: "Sunday afternoon headlines — the week ahead." },
      { id: "sun-5",  time: "2:30 PM",  name: "Sports Highlights",        presenter: "Kamau Sports Desk",    tag: "Sports",        description: "Weekend results, league tables, and sports news." },
      { id: "sun-6",  time: "4:00 PM",  name: "Children's Corner",        presenter: "Wanjiru Mwangi",       tag: "Kids",          description: "Educational and entertaining programming for children." },
      { id: "sun-7",  time: "6:00 PM",  name: "Sunday Evening Magazine",  presenter: "Gathoni Njeri",        tag: "Magazine",      description: "Preparing for the week ahead — inspiring community stories." },
      { id: "sun-8",  time: "7:00 PM",  name: "Sunday Prime News",        presenter: "Weru Newsroom",        tag: "News",          description: "Comprehensive Sunday night headlines — national and international." },
      { id: "sun-9",  time: "8:30 PM",  name: "Documentary Hour",         presenter: "Weru TV Team",         tag: "Documentary",   description: "Powerful documentaries exploring Kenya's history and culture." },
      { id: "sun-10", time: "10:00 PM", name: "Late Night Headlines",     presenter: "Weru Newsroom",        tag: "News",          description: "Final headlines of the weekend — prepare for the week ahead." },
    ],
  },
];
