export type ProgramTag =
  | "News" | "Morning" | "Health" | "Business" | "Entertainment"
  | "Music" | "Sports" | "Culture" | "Kids" | "Documentary" | "Magazine"
  | "Agriculture" | "Political" | "Culinary" | "Youth";

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
      { id: "mon-1",  time: "5:00 AM",  name: "Morning Devotion",      presenter: "Pastor James Mwangi",                    tag: "Morning",       description: "Begin the week with spiritual reflections and morning prayers." },
      { id: "mon-2",  time: "6:00 AM",  name: "Weru Morning News",     presenter: "Weru Newsroom",                          tag: "News",          description: "Monday morning headlines — local, national, and international." },
      { id: "mon-3",  time: "8:00 AM",  name: "Chanchamuka",           presenter: "Stella Karimi Kaunty & Martin Gichunge", tag: "Morning",       description: "Breakfast show interlinked with Weru FM — current events, regional and national affairs. TV+Radio simultaneous broadcast." },
      { id: "mon-4",  time: "12:00 PM", name: "Midday News Bulletin",  presenter: "Weru Newsroom",                          tag: "News",          description: "Concise summary of the morning's top stories." },
      { id: "mon-5",  time: "1:30 PM",  name: "Katiba Ka Gen Z",       presenter: "Angie, Lynn, Liz, DJ Tush & Afrik Annah",tag: "Youth",         description: "Vibrant show capturing the voice, energy and culture of today's youth — music, trending conversations, lifestyle and interactive audience engagement." },
      { id: "mon-6",  time: "5:00 PM",  name: "Evening Drive",         presenter: "Weru Newsroom",                          tag: "News",          description: "Commute companion — top news, traffic updates, and music." },
      { id: "mon-7",  time: "6:30 PM",  name: "Ugima Ni Utonga",       presenter: "Ntinyari Kinyua",                        tag: "Health",        description: "Flagship health programme delivering critical health insights. Features expert analysis and actionable advice from leading healthcare professionals." },
      { id: "mon-8",  time: "7:20 PM",  name: "Prime Time News",       presenter: "Weru Newsroom",                          tag: "News",          description: "In-depth prime time reporting with expert analysis." },
      { id: "mon-9",  time: "8:15 PM",  name: "Gikaro Na Kaunty",      presenter: "Stella Karimi Kaunty",                   tag: "Magazine",      description: "Prime-time profiles of influential individuals and trendsetters — exclusive insights into personal journeys and previously unseen aspects of their lives." },
      { id: "mon-10", time: "9:00 PM",  name: "Late Night Headlines",  presenter: "Weru Newsroom",                          tag: "News",          description: "Recap of the day's key events and tomorrow's outlook." },
    ],
  },
  {
    day: "Tuesday",
    programs: [
      { id: "tue-1",  time: "5:00 AM",  name: "Morning Devotion",      presenter: "Pastor James Mwangi",                    tag: "Morning",       description: "Spiritual reflections and prayers to start Tuesday with purpose." },
      { id: "tue-2",  time: "6:00 AM",  name: "Weru Morning News",     presenter: "Weru Newsroom",                          tag: "News",          description: "Tuesday's top stories — politics, business, and community." },
      { id: "tue-3",  time: "8:00 AM",  name: "Chanchamuka",           presenter: "Stella Karimi Kaunty & Martin Gichunge", tag: "Morning",       description: "Breakfast show interlinked with Weru FM — in-depth interviews with key stakeholders, political figures and thought leaders. TV+Radio simultaneous broadcast." },
      { id: "tue-4",  time: "12:00 PM", name: "Midday News Bulletin",  presenter: "Weru Newsroom",                          tag: "News",          description: "Tuesday lunchtime briefing — breaking news and developments." },
      { id: "tue-5",  time: "1:30 PM",  name: "Katiba Ka Gen Z",       presenter: "Angie, Lynn, Liz, DJ Tush & Afrik Annah",tag: "Youth",         description: "Bold, culturally relevant content with strong urban appeal — the everyday realities, ambitions and creativity of the Gen Z generation." },
      { id: "tue-6",  time: "5:00 PM",  name: "Evening Drive",         presenter: "Weru Newsroom",                          tag: "News",          description: "End-of-day roundup and traffic updates for the commute." },
      { id: "tue-7",  time: "7:00 PM",  name: "Prime Time News",       presenter: "Weru Newsroom",                          tag: "News",          description: "Tuesday prime — national and international news coverage." },
      { id: "tue-8",  time: "8:15 PM",  name: "Nkatha Cietu",          presenter: "Makena Wa Matiri",                       tag: "Magazine",      description: "Prime-time weekly programme focused on women's empowerment — showcasing the achievements of impactful women and those who have overcome significant obstacles." },
      { id: "tue-9",  time: "9:00 PM",  name: "Late Night Headlines",  presenter: "Weru Newsroom",                          tag: "News",          description: "Final bulletin — catch up on everything you missed today." },
    ],
  },
  {
    day: "Wednesday",
    programs: [
      { id: "wed-1",  time: "5:00 AM",  name: "Morning Devotion",      presenter: "Pastor James Mwangi",                    tag: "Morning",       description: "Midweek spiritual boost — prayers and reflection." },
      { id: "wed-2",  time: "6:00 AM",  name: "Weru Morning News",     presenter: "Weru Newsroom",                          tag: "News",          description: "Wednesday morning headlines covering Kenya and the world." },
      { id: "wed-3",  time: "8:00 AM",  name: "Chanchamuka",           presenter: "Stella Karimi Kaunty & Martin Gichunge", tag: "Morning",       description: "Breakfast show interlinked with Weru FM — midweek community dialogue and current affairs. TV+Radio simultaneous broadcast." },
      { id: "wed-4",  time: "12:00 PM", name: "Midday News Bulletin",  presenter: "Weru Newsroom",                          tag: "News",          description: "Wednesday midday — stories shaping Kenya right now." },
      { id: "wed-5",  time: "1:30 PM",  name: "Katiba Ka Gen Z",       presenter: "Angie, Lynn, Liz, DJ Tush & Afrik Annah",tag: "Youth",         description: "Wednesday Gen Z session — music, trends, lifestyle discussions and interactive engagement." },
      { id: "wed-6",  time: "5:00 PM",  name: "Evening Drive",         presenter: "Weru Newsroom",                          tag: "News",          description: "Wednesday evening — community news and commute music." },
      { id: "wed-7",  time: "6:30 PM",  name: "Tiira Muuru",           presenter: "Munene Wa Kagwi",                        tag: "Business",      description: "Exclusive weekly business programme delivering critical financial insights — empowering audiences navigating the complexities of the commercial landscape." },
      { id: "wed-8",  time: "7:20 PM",  name: "Prime Time News",       presenter: "Weru Newsroom",                          tag: "News",          description: "Deep-dive Wednesday with investigative reports and guests." },
      { id: "wed-9",  time: "8:15 PM",  name: "Murimi Caruruku",       presenter: "Nelly Kithinji",                         tag: "Agriculture",   description: "Agricultural show providing a structured educational forum on modern farming — demonstrations of advanced techniques, key agricultural challenges, and expert-driven solutions." },
      { id: "wed-10", time: "8:45 PM",  name: "Late Night Headlines",  presenter: "Weru Newsroom",                          tag: "News",          description: "Wednesday wrap-up — all the news before you sleep." },
    ],
  },
  {
    day: "Thursday",
    programs: [
      { id: "thu-1",  time: "5:00 AM",  name: "Morning Devotion",      presenter: "Pastor James Mwangi",                    tag: "Morning",       description: "Thursday prayers and encouragement to power through the week." },
      { id: "thu-2",  time: "6:00 AM",  name: "Weru Morning News",     presenter: "Weru Newsroom",                          tag: "News",          description: "Thursday morning roundup — politics, development, breaking news." },
      { id: "thu-3",  time: "8:00 AM",  name: "Chanchamuka",           presenter: "Stella Karimi Kaunty & Martin Gichunge", tag: "Morning",       description: "Breakfast show interlinked with Weru FM — local issues and community voices. TV+Radio simultaneous broadcast." },
      { id: "thu-4",  time: "12:00 PM", name: "Midday News Bulletin",  presenter: "Weru Newsroom",                          tag: "News",          description: "Thursday midday — stay informed with Weru TV." },
      { id: "thu-5",  time: "1:30 PM",  name: "Katiba Ka Gen Z",       presenter: "Angie, Lynn, Liz, DJ Tush & Afrik Annah",tag: "Youth",         description: "Thursday Gen Z session — blending great music, trending conversations and relatable content." },
      { id: "thu-6",  time: "5:00 PM",  name: "Evening Drive",         presenter: "Weru Newsroom",                          tag: "News",          description: "Thursday commute — top stories to end the workday." },
      { id: "thu-7",  time: "6:30 PM",  name: "Riikone",               presenter: "Chef Host",                              tag: "Culinary",      description: "Instructional culinary programme featuring a professional chef — comprehensive demonstrations of dish preparation, ingredients, cooking procedures and culinary techniques." },
      { id: "thu-8",  time: "7:30 PM",  name: "Prime Time News",       presenter: "Weru Newsroom",                          tag: "News",          description: "Thursday prime — comprehensive news with in-studio analysis." },
      { id: "thu-9",  time: "8:15 PM",  name: "Gaaru Ya Ciaca",        presenter: "Edward Mutembei",                        tag: "Political",     description: "Mid-week political show focusing on the week's political developments and trending topics. Features regional and national political leaders, analysts, and key players shaping Kenya's political landscape." },
      { id: "thu-10", time: "9:20 PM",  name: "Late Night Headlines",  presenter: "Weru Newsroom",                          tag: "News",          description: "Thursday night wrap — into the final weekday." },
    ],
  },
  {
    day: "Friday",
    programs: [
      { id: "fri-1",  time: "5:00 AM",  name: "Morning Devotion",          presenter: "Pastor James Mwangi",                    tag: "Morning",       description: "Friday blessings — a spiritual send-off into the weekend." },
      { id: "fri-2",  time: "6:00 AM",  name: "Weru Morning News",         presenter: "Weru Newsroom",                          tag: "News",          description: "TGIF headlines — the week's biggest stories." },
      { id: "fri-3",  time: "8:00 AM",  name: "Chanchamuka",               presenter: "Stella Karimi Kaunty & Martin Gichunge", tag: "Morning",       description: "Breakfast show interlinked with Weru FM — Friday special celebrating the week's community heroes. TV+Radio simultaneous broadcast." },
      { id: "fri-4",  time: "12:00 PM", name: "Midday News Bulletin",      presenter: "Weru Newsroom",                          tag: "News",          description: "Friday lunchtime — closing out the week's news cycle." },
      { id: "fri-5",  time: "1:30 PM",  name: "Katiba Ka Gen Z",           presenter: "Angie, Lynn, Liz, DJ Tush & Afrik Annah",tag: "Youth",         description: "Extended Friday Gen Z afternoon — special features, music and audience engagement." },
      { id: "fri-6",  time: "5:00 PM",  name: "Evening Drive",             presenter: "Weru Newsroom",                          tag: "News",          description: "Friday commute — the best way to kick off your weekend." },
      { id: "fri-7",  time: "7:00 PM",  name: "Prime Time News",           presenter: "Weru Newsroom",                          tag: "News",          description: "Week-in-review edition — the five biggest stories." },
      { id: "fri-8",  time: "8:40 PM",  name: "Njumaa Sacco",              presenter: "Ntinyari Kinyua",                        tag: "Entertainment", description: "Friday night talk show featuring an in-house panel of MC Tash, Ken Mutuma, MC Kiamambe and Nelly Kithinji. Lively debate, current affairs and entertainment." },
      { id: "fri-9",  time: "9:20 PM",  name: "Late Night Headlines",      presenter: "Weru Newsroom",                          tag: "News",          description: "Closing the week's news cycle." },
    ],
  },
  {
    day: "Saturday",
    programs: [
      { id: "sat-1",  time: "7:00 AM",  name: "Weekend Devotion",              presenter: "Pastor Sarah Wambui",  tag: "Morning",       description: "Saturday morning worship — a community service for families." },
      { id: "sat-2",  time: "9:00 AM",  name: "Cultural Showcase",             presenter: "Mwangi Wa Kamau",      tag: "Culture",       description: "Celebrating Meru and Kenyan culture — traditions, stories and heritage." },
      { id: "sat-3",  time: "11:00 AM", name: "Reggaemani",                    presenter: "Empress Rita & Empress Natty", tag: "Music",  description: "Live Saturday reggae and dancehall session with call-ins and requests." },
      { id: "sat-4",  time: "1:00 PM",  name: "Weekend News",                  presenter: "Weru Newsroom",        tag: "News",          description: "Saturday afternoon briefing — overnight and morning stories." },
      { id: "sat-5",  time: "2:30 PM",  name: "Sports Zone",                   presenter: "Weru Sports Desk",     tag: "Sports",        description: "Live sports coverage, analysis, and interviews with athletes." },
      { id: "sat-6",  time: "5:00 PM",  name: "Weekend Magazine",              presenter: "Weru TV Team",         tag: "Magazine",      description: "Weekend lifestyle — fashion, food, travel, and entertainment." },
      { id: "sat-7",  time: "7:00 PM",  name: "Saturday Prime News",           presenter: "Weru Newsroom",        tag: "News",          description: "Weekend edition — day's headlines with community focus." },
      { id: "sat-8",  time: "8:30 PM",  name: "Saturday Night Entertainment",  presenter: "Weru TV Team",         tag: "Entertainment", description: "Live music, drama, comedy, and special guest performances." },
      { id: "sat-9",  time: "10:30 PM", name: "Late Night Vibes",              presenter: "Weru TV Team",         tag: "Music",         description: "Wind down Saturday with smooth music and dedications." },
    ],
  },
  {
    day: "Sunday",
    programs: [
      { id: "sun-1",  time: "7:00 AM",  name: "Sunday Worship Service",  presenter: "Weru TV Team",          tag: "Morning",    description: "Live Sunday service — worship, word, and community prayer." },
      { id: "sun-2",  time: "9:30 AM",  name: "Family Magazine",         presenter: "Makena Wa Matiri",      tag: "Magazine",   description: "Sundays are for family — parenting tips and home stories." },
      { id: "sun-3",  time: "11:00 AM", name: "Community Dialogue",      presenter: "Mwangi Wa Kamau",       tag: "Culture",    description: "Community leaders and viewers discuss issues affecting Kenya." },
      { id: "sun-4",  time: "1:00 PM",  name: "Sunday News",             presenter: "Weru Newsroom",         tag: "News",       description: "Sunday afternoon headlines — the week ahead." },
      { id: "sun-5",  time: "2:30 PM",  name: "Sports Highlights",       presenter: "Weru Sports Desk",      tag: "Sports",     description: "Weekend results, league tables, and sports news." },
      { id: "sun-6",  time: "4:00 PM",  name: "Children's Corner",       presenter: "Weru TV Team",          tag: "Kids",       description: "Educational and entertaining programming for children." },
      { id: "sun-7",  time: "6:00 PM",  name: "Sunday Evening Magazine", presenter: "Weru TV Team",          tag: "Magazine",   description: "Preparing for the week ahead — inspiring community stories." },
      { id: "sun-8",  time: "7:00 PM",  name: "Sunday Prime News",       presenter: "Weru Newsroom",         tag: "News",       description: "Comprehensive Sunday night headlines — national and international." },
      { id: "sun-9",  time: "8:30 PM",  name: "Documentary Hour",        presenter: "Weru TV Team",          tag: "Documentary",description: "Powerful documentaries exploring Kenya's history and culture." },
      { id: "sun-10", time: "9:00 PM",  name: "Gichunki Gia Ciaca",      presenter: "Martin Gichunge Dullah",tag: "Political",  description: "Flagship political talk show featuring politicians, lawyers, political analysts and specialists from local, regional and national levels. Highly interactive with live phone calls, SMS and digital platform engagement." },
      { id: "sun-11", time: "11:30 PM", name: "Late Night Headlines",    presenter: "Weru Newsroom",         tag: "News",       description: "Final headlines of the weekend — prepare for the week ahead." },
    ],
  },
];
