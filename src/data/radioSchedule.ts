export type RadioProgram = {
  id: string;
  name: string;
  host: string;
  time: string;
  description: string;
};

export type RadioDaySchedule = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  programs: RadioProgram[];
};

// Correct weekday lineup from Weru Station Profile
const weekdayPrograms = (prefix: string): RadioProgram[] => [
  {
    id: `${prefix}-1`,
    name: "Tutharimwe",
    host: "Makena Wa Matiri",
    time: "4:00 AM – 6:00 AM",
    description: "Commences by entrusting the day to divine providence — devotional elements including prayer, scriptural study, sermon delivery, worshipful music, and interactive segments to foster spiritual growth.",
  },
  {
    id: `${prefix}-2`,
    name: "Morning News",
    host: "Weru FM Newsroom",
    time: "6:00 AM – 7:00 AM",
    description: "Morning headlines — local, national, and international news to start your day informed.",
  },
  {
    id: `${prefix}-3`,
    name: "Chanchamuka",
    host: "Stella Karimi Kaunty & Martin Gichunge",
    time: "7:00 AM – 10:00 AM",
    description: "Breakfast show designed to engage and inform — comprehensive overview of current events encompassing regional and national affairs. Interlinked with Weru TV (8:00–9:00 AM) for in-depth interviews with clients, political figures and thought leaders.",
  },
  {
    id: `${prefix}-4`,
    name: "Tuthunkume",
    host: "Munene Wa Kagwi",
    time: "10:00 AM – 1:00 PM",
    description: "'Let's hustle' — strategic transition from the morning programme into the business sphere. Actionable financial insights, celebratory birthday segments and practical midday content for listeners in their daily professional pursuits.",
  },
  {
    id: `${prefix}-5`,
    name: "Tuburuke Na Tash",
    host: "MC Tash",
    time: "1:00 PM – 4:00 PM",
    description: "'Let's take off' — new generational music and the latest trends in local and international music. Content spans politics, music, fashion, relationships and trending topics. Upbeat, uptown and modern.",
  },
  {
    id: `${prefix}-6`,
    name: "Nyontoka",
    host: "Mwenda H The Pilot",
    time: "4:00 PM – 7:00 PM",
    description: "'Quench your thirst' — post-work experience delivering information and entertainment. Daily recap of key events, political developments at national and regional levels, social media trends, and diverse musical programming from new to classic.",
  },
  {
    id: `${prefix}-7`,
    name: "Reggaemania",
    host: "Empress Rita & Empress Natty",
    time: "7:00 PM – 10:00 PM",
    description: "Vibrant programme catering to reggae and dancehall enthusiasts — rich blend of sounds and styles. Engaging discussions on current political and social issues, empowering listeners with knowledge, inspiration and positive vibes.",
  },
  {
    id: `${prefix}-8`,
    name: "Mantu Kimenchu",
    host: "Ajelyne George",
    time: "10:00 PM – 1:00 AM",
    description: "Platform for mature discussions focusing on adult-oriented topics including intimate relationships. Targets an adult audience during hours when children are typically asleep.",
  },
];

export const radioSchedule: RadioDaySchedule[] = [
  { day: "Monday",    programs: weekdayPrograms("rmon") },
  { day: "Tuesday",   programs: weekdayPrograms("rtue") },
  { day: "Wednesday", programs: weekdayPrograms("rwed") },
  { day: "Thursday",  programs: weekdayPrograms("rthu") },
  { day: "Friday",    programs: weekdayPrograms("rfri") },
  {
    day: "Saturday",
    programs: [
      {
        id: "rsat-1",
        name: "Saturday Morning Worship",
        host: "Weru FM Team",
        time: "6:00 AM – 8:00 AM",
        description: "Saturday morning service — live worship, scripture, and community prayer.",
      },
      {
        id: "rsat-2",
        name: "Weekend Magazine",
        host: "Weru FM Team",
        time: "8:00 AM – 10:00 AM",
        description: "Your weekend guide — lifestyle, fashion, travel tips, and community events.",
      },
      {
        id: "rsat-3",
        name: "Reggaemania Saturday",
        host: "Empress Rita & Empress Natty",
        time: "10:00 AM – 1:00 PM",
        description: "Saturday reggae marathon — roots, culture, and live listener requests from Empress Rita and Empress Natty.",
      },
      {
        id: "rsat-4",
        name: "Saturday Sports",
        host: "Weru Sports Desk",
        time: "1:00 PM – 3:00 PM",
        description: "Live match commentary, scores, and sports news from Kenya and across Africa.",
      },
      {
        id: "rsat-5",
        name: "Afternoon Vibes",
        host: "Weru FM Team",
        time: "3:00 PM – 7:00 PM",
        description: "Chill Saturday afternoon mixes — the perfect soundtrack for your weekend activities.",
      },
      {
        id: "rsat-6",
        name: "Reggaemania Evening",
        host: "Empress Rita & Empress Natty",
        time: "7:00 PM – 10:00 PM",
        description: "Saturday evening reggae and dancehall session with engaging social discussions and positive vibes.",
      },
      {
        id: "rsat-7",
        name: "Saturday Night Mix",
        host: "Weru FM Team",
        time: "10:00 PM – 1:00 AM",
        description: "Saturday night party on radio — live mixes, dedications, and non-stop entertainment.",
      },
    ],
  },
  {
    day: "Sunday",
    programs: [
      {
        id: "rsun-1",
        name: "Sunday Worship Hour",
        host: "Weru FM Team",
        time: "6:00 AM – 9:00 AM",
        description: "Sunday morning worship — live gospel music, sermons, and community prayer.",
      },
      {
        id: "rsun-2",
        name: "Catholic Programme",
        host: "Munene Wa Kagwi",
        time: "9:00 AM – 11:00 AM",
        description: "Interlinked TV and radio Catholic programme hosted by Munene Wa Kagwi — Sunday worship, reflection and community engagement. Broadcasts simultaneously on Weru TV and Weru FM.",
      },
      {
        id: "rsun-3",
        name: "Family Time",
        host: "Makena Wa Matiri",
        time: "11:00 AM – 1:00 PM",
        description: "Sunday conversations about family, relationships, and raising children in Kenya today.",
      },
      {
        id: "rsun-4",
        name: "Sunday News",
        host: "Weru FM Newsroom",
        time: "1:00 PM – 2:00 PM",
        description: "Sunday afternoon headlines — the week ahead and key stories from the weekend.",
      },
      {
        id: "rsun-5",
        name: "Gospel Sunday",
        host: "Weru FM Team",
        time: "2:00 PM – 5:00 PM",
        description: "Uplifting gospel music — Kikuyu, Swahili, and English praise songs.",
      },
      {
        id: "rsun-6",
        name: "Sunday Evening Talk",
        host: "Weru FM Team",
        time: "5:00 PM – 7:00 PM",
        description: "Preparing for the week ahead — motivation, planning tips, and community encouragement.",
      },
      {
        id: "rsun-7",
        name: "Reggaemania",
        host: "Empress Rita & Empress Natty",
        time: "7:00 PM – 10:00 PM",
        description: "Sunday reggae and dancehall session with Empress Rita and Empress Natty.",
      },
      {
        id: "rsun-8",
        name: "Mantu Kimenchu",
        host: "Ajelyne George",
        time: "10:00 PM – 1:00 AM",
        description: "Late-night mature discussions hosted by Ajelyne George.",
      },
    ],
  },
];
