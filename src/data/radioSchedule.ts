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

export const radioSchedule: RadioDaySchedule[] = [
  {
    day: "Monday",
    programs: [
      { id: "rmon-1", name: "Tutharimwe", host: "Makena Wa Matiri", time: "4:00 AM – 8:00 AM", description: "Start your Monday with uplifting faith discussions, community stories, and morning prayers." },
      { id: "rmon-2", name: "Morning Business Hour", host: "Munene Wa Kagwi", time: "8:00 AM – 10:00 AM", description: "Weekly market analysis, SME spotlights, and financial advice for Kenyan entrepreneurs." },
      { id: "rmon-3", name: "Mid-Morning Mix", host: "DJ Tush", time: "10:00 AM – 12:00 PM", description: "The smoothest playlist to power through your Monday morning — top Kenyan and international hits." },
      { id: "rmon-4", name: "Midday News & Talk", host: "Weru FM Newsroom", time: "12:00 PM – 1:00 PM", description: "Monday lunchtime headlines, listener call-ins, and reaction to the day's top stories." },
      { id: "rmon-5", name: "Tuburuke Na Tash", host: "MC Tash", time: "1:00 PM – 4:00 PM", description: "Afternoon energy with MC Tash — music, entertainment, shout-outs, and competitions." },
      { id: "rmon-6", name: "Evening Drive", host: "Various Presenters", time: "4:00 PM – 7:00 PM", description: "Your Monday commute companion — traffic, news updates, and the best evening music." },
      { id: "rmon-7", name: "Prime Time Talk", host: "Weru FM Team", time: "7:00 PM – 10:00 PM", description: "In-depth Monday evening discussions on politics, society, and community issues." },
      { id: "rmon-8", name: "Night Vibes", host: "DJ Dennie", time: "10:00 PM – 12:00 AM", description: "Wind down your Monday with smooth jams, reggae, and late-night dedications." },
    ],
  },
  {
    day: "Tuesday",
    programs: [
      { id: "rtue-1", name: "Tutharimwe", host: "Makena Wa Matiri", time: "4:00 AM – 8:00 AM", description: "Tuesday morning inspiration — faith, family, and positive community conversations." },
      { id: "rtue-2", name: "Women in Business", host: "Wanjiru Mwangi", time: "8:00 AM – 10:00 AM", description: "Celebrating and empowering Kenyan businesswomen — success stories and practical advice." },
      { id: "rtue-3", name: "Mid-Morning Mix", host: "DJ Tush", time: "10:00 AM – 12:00 PM", description: "Tuesday's hottest playlist — Kikuyu benga, Afrobeats, and international chart toppers." },
      { id: "rtue-4", name: "Midday News & Talk", host: "Weru FM Newsroom", time: "12:00 PM – 1:00 PM", description: "Tuesday noon briefing — latest news, listener opinions, and live studio guests." },
      { id: "rtue-5", name: "Tuburuke Na Tash", host: "MC Tash", time: "1:00 PM – 4:00 PM", description: "Afternoon takeover with MC Tash — requests, competitions, and non-stop entertainment." },
      { id: "rtue-6", name: "Evening Drive", host: "Various Presenters", time: "4:00 PM – 7:00 PM", description: "Tuesday evening — the latest stories and music for your drive home." },
      { id: "rtue-7", name: "Health Talk Tuesday", host: "Dr. Kamau Waweru", time: "7:00 PM – 9:00 PM", description: "Live call-in health programme — a doctor answers your Tuesday night medical questions." },
      { id: "rtue-8", name: "Night Vibes", host: "DJ Dennie", time: "10:00 PM – 12:00 AM", description: "Tuesday night wind-down — smooth RnB, reggae, and late-night listener dedications." },
    ],
  },
  {
    day: "Wednesday",
    programs: [
      { id: "rwed-1", name: "Tutharimwe", host: "Makena Wa Matiri", time: "4:00 AM – 8:00 AM", description: "Midweek spiritual boost — prayers, worship, and community stories for your Wednesday." },
      { id: "rwed-2", name: "Tuthunkume", host: "Munene Wa Kagwi", time: "8:00 AM – 10:00 AM", description: "Midweek hustle motivation — business insights, career development, and financial tips." },
      { id: "rwed-3", name: "Mid-Morning Mix", host: "DJ Tush", time: "10:00 AM – 12:00 PM", description: "Hump-day hits — the music to keep your Wednesday energy high." },
      { id: "rwed-4", name: "Midday News & Talk", host: "Weru FM Newsroom", time: "12:00 PM – 1:00 PM", description: "Wednesday noon roundup — political analysis, community news, and listener views." },
      { id: "rwed-5", name: "Tuburuke Na Tash", host: "MC Tash", time: "1:00 PM – 4:00 PM", description: "Wednesday afternoon with MC Tash — special midweek features and music marathons." },
      { id: "rwed-6", name: "Agriculture Hour", host: "James Kariuki", time: "4:00 PM – 6:00 PM", description: "Farming tips, weather forecasts, and market prices for Central Kenya's farmers." },
      { id: "rwed-7", name: "Prime Time Talk", host: "Weru FM Team", time: "7:00 PM – 10:00 PM", description: "Wednesday evening debate — hot topics, expert guests, and community call-ins." },
      { id: "rwed-8", name: "Night Vibes", host: "DJ Dennie", time: "10:00 PM – 12:00 AM", description: "Midweek mellow — soft jams and smooth beats to ease you to Thursday." },
    ],
  },
  {
    day: "Thursday",
    programs: [
      { id: "rthu-1", name: "Tutharimwe", host: "Makena Wa Matiri", time: "4:00 AM – 8:00 AM", description: "Thursday morning prayers and community dialogue to power through the last weekday push." },
      { id: "rthu-2", name: "Morning Business Hour", host: "Munene Wa Kagwi", time: "8:00 AM – 10:00 AM", description: "Thursday business analysis — top economic stories and expert financial commentary." },
      { id: "rthu-3", name: "Mid-Morning Mix", host: "DJ Tush", time: "10:00 AM – 12:00 PM", description: "Thursday throwbacks and new releases — building up to the weekend." },
      { id: "rthu-4", name: "Midday News & Talk", host: "Weru FM Newsroom", time: "12:00 PM – 1:00 PM", description: "Thursday noon — breaking news, live updates, and analysis of the week's events." },
      { id: "rthu-5", name: "Youth Focus", host: "Gathoni Njeri", time: "1:00 PM – 3:00 PM", description: "Kenya's young voices — entrepreneurship, university life, and career advice for youth." },
      { id: "rthu-6", name: "Evening Drive", host: "Various Presenters", time: "4:00 PM – 7:00 PM", description: "Thursday evening — building weekend anticipation with great music and news." },
      { id: "rthu-7", name: "Reggae Night Thursday", host: "DJ Tush", time: "7:00 PM – 10:00 PM", description: "Thursday reggae session — roots, dancehall, and Kenyan afrobeats fusion." },
      { id: "rthu-8", name: "Night Vibes", host: "DJ Dennie", time: "10:00 PM – 12:00 AM", description: "Late Thursday chill — smooth tracks and listener dedications into the night." },
    ],
  },
  {
    day: "Friday",
    programs: [
      { id: "rfri-1", name: "Tutharimwe", host: "Makena Wa Matiri", time: "4:00 AM – 8:00 AM", description: "Friday blessings — a spiritual celebration to kick off your weekend." },
      { id: "rfri-2", name: "TGIF Morning Show", host: "Weru FM Team", time: "8:00 AM – 10:00 AM", description: "It's Friday! Special guests, competitions, prizes, and the week's best stories." },
      { id: "rfri-3", name: "Mid-Morning Mix — Friday Edition", host: "DJ Tush", time: "10:00 AM – 12:00 PM", description: "The Friday playlist — start your weekend early with the hottest tracks." },
      { id: "rfri-4", name: "Midday News & Talk", host: "Weru FM Newsroom", time: "12:00 PM – 1:00 PM", description: "End-of-week roundup — the five biggest stories from Kenya this week." },
      { id: "rfri-5", name: "Tuburuke Na Tash — TGIF Edition", host: "MC Tash & DJ Dennie", time: "1:00 PM – 5:00 PM", description: "Extended Friday afternoon party — music marathons, mega prizes, and special guests." },
      { id: "rfri-6", name: "Weekend Kickoff", host: "Various Presenters", time: "5:00 PM – 7:00 PM", description: "What to do this weekend — events, destinations, and entertainment across Kenya." },
      { id: "rfri-7", name: "Friday Night Fiesta", host: "DJ Dennie", time: "7:00 PM – 12:00 AM", description: "The biggest Friday night radio party — non-stop live mixes, call-ins, and dedications." },
    ],
  },
  {
    day: "Saturday",
    programs: [
      { id: "rsat-1", name: "Saturday Morning Worship", host: "Pastor John Mwangi", time: "6:00 AM – 8:00 AM", description: "Saturday morning service — live worship, scripture, and community prayer." },
      { id: "rsat-2", name: "Weekend Magazine", host: "Wanjiru Mwangi", time: "8:00 AM – 10:00 AM", description: "Your weekend guide — lifestyle, fashion, travel tips, and community events." },
      { id: "rsat-3", name: "Reggaemani Saturday", host: "Empress Rita", time: "10:00 AM – 1:00 PM", description: "Empress Rita's Saturday reggae marathon — roots, culture, and live listener requests." },
      { id: "rsat-4", name: "Saturday Sports", host: "Kamau Sports Desk", time: "1:00 PM – 3:00 PM", description: "Live match commentary, scores, and sports news from Kenya and across Africa." },
      { id: "rsat-5", name: "Afternoon Vibes", host: "DJ Tush", time: "3:00 PM – 6:00 PM", description: "Chill Saturday afternoon mixes — the perfect backdrop for your weekend activities." },
      { id: "rsat-6", name: "Community Voices", host: "Various Presenters", time: "6:00 PM – 8:00 PM", description: "Saturday evening — community leaders and listeners share stories from across the region." },
      { id: "rsat-7", name: "Saturday Night Mix", host: "DJ Dennie", time: "8:00 PM – 12:00 AM", description: "The Saturday night party on radio — live mixes, dedications, and non-stop entertainment." },
    ],
  },
  {
    day: "Sunday",
    programs: [
      { id: "rsun-1", name: "Sunday Worship Hour", host: "Pastor Sarah Wambui", time: "6:00 AM – 9:00 AM", description: "Sunday morning worship — live gospel music, sermons, and community prayer." },
      { id: "rsun-2", name: "Family Time", host: "Makena Wa Matiri", time: "9:00 AM – 11:00 AM", description: "Sunday conversations about family, relationships, and raising children in Kenya today." },
      { id: "rsun-3", name: "Cultural Heritage Show", host: "Mwangi Wa Kamau", time: "11:00 AM – 1:00 PM", description: "Celebrating Kikuyu folklore, proverbs, traditional music, and elder wisdom." },
      { id: "rsun-4", name: "Sunday News", host: "Weru FM Newsroom", time: "1:00 PM – 2:00 PM", description: "Sunday afternoon headlines — the week ahead and key stories from the weekend." },
      { id: "rsun-5", name: "Gospel Sunday", host: "Various Artists", time: "2:00 PM – 5:00 PM", description: "Three hours of uplifting gospel music — Kikuyu, Swahili, and English praise songs." },
      { id: "rsun-6", name: "Sunday Evening Talk", host: "Weru FM Team", time: "5:00 PM – 7:00 PM", description: "Preparing for the week ahead — motivation, planning tips, and community encouragement." },
      { id: "rsun-7", name: "Sunday Night Classics", host: "DJ Dennie", time: "7:00 PM – 10:00 PM", description: "Classic Kenyan and African hits — a nostalgic Sunday night journey through music." },
      { id: "rsun-8", name: "Late Night Calm", host: "Various", time: "10:00 PM – 12:00 AM", description: "Gentle Sunday night music to prepare your mind for the week ahead." },
    ],
  },
];
