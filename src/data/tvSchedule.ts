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
      { id: "mon-1",  time: "5:00 AM",   name: "Tukumie",            presenter: "Weru TV",          tag: "Morning",       description: "Start the week with morning devotion and spiritual reflections." },
      { id: "mon-2",  time: "6:00 AM",   name: "Turombe",            presenter: "Weru TV",          tag: "Morning",       description: "Monday morning music and community warm-up." },
      { id: "mon-3",  time: "6:30 AM",   name: "Kuugukea",           presenter: "Weru Newsroom",    tag: "News",          description: "Morning news block — headlines, newspapers review, radio, and talk show covering sports and current affairs." },
      { id: "mon-4",  time: "10:00 AM",  name: "Gichunki RPT",       presenter: "Martin Gichunge",  tag: "Entertainment", description: "Repeat of Weru TV's flagship entertainment programme." },
      { id: "mon-5",  time: "1:00 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Midday news bulletin." },
      { id: "mon-6",  time: "1:30 PM",   name: "Katiba Ka Gen Z",    presenter: "Sam Maunda",       tag: "Youth",         description: "Vibrant youth show capturing the voice, energy and culture of today's generation — music, trends, lifestyle and interactive engagement." },
      { id: "mon-7",  time: "5:00 PM",   name: "Kuthethea",          presenter: "Weru TV",          tag: "Magazine",      description: "Evening community magazine — conversations and local stories." },
      { id: "mon-8",  time: "6:40 PM",   name: "Ugima Ni Utonga",   presenter: "Betty",            tag: "Health",        description: "Flagship health programme — expert health insights, nutrition, wellness and preventive care for Central Kenya families." },
      { id: "mon-9",  time: "7:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Prime time evening news bulletin." },
      { id: "mon-10", time: "8:15 PM",   name: "Gikaro Na Kaunty",  presenter: "Karimi Kaunty",    tag: "Magazine",      description: "Prime-time profiles of influential individuals — exclusive insights into personal journeys and impact stories." },
      { id: "mon-11", time: "8:50 PM",   name: "Client Interview",   presenter: "Weru TV",          tag: "Magazine",      description: "In-depth client and business interview segment." },
      { id: "mon-12", time: "9:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Late night news bulletin." },
      { id: "mon-13", time: "10:30 PM",  name: "Turombe RPT",        presenter: "Weru TV",          tag: "Morning",       description: "Repeat of the morning Turombe programme." },
      { id: "mon-14", time: "11:30 PM",  name: "Movie",              presenter: "Weru TV",          tag: "Entertainment", description: "Late night movie feature." },
      { id: "mon-15", time: "1:00 AM",   name: "News RPT",           presenter: "Weru Newsroom",    tag: "News",          description: "Overnight news repeat." },
      { id: "mon-16", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",presenter: "Weru TV",          tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Tuesday",
    programs: [
      { id: "tue-1",  time: "5:00 AM",   name: "Tukumie",            presenter: "Weru TV",          tag: "Morning",       description: "Tuesday morning devotion and spiritual reflections." },
      { id: "tue-2",  time: "6:00 AM",   name: "Turombe",            presenter: "Weru TV",          tag: "Morning",       description: "Tuesday morning music and community warm-up." },
      { id: "tue-3",  time: "6:30 AM",   name: "Kuugukea",           presenter: "Weru Newsroom",    tag: "News",          description: "Morning news block — headlines, newspaper review, radio, and politics talk show." },
      { id: "tue-4",  time: "10:00 AM",  name: "Ugima RPT",          presenter: "Betty",            tag: "Health",        description: "Repeat of Ugima Ni Utonga health programme." },
      { id: "tue-5",  time: "10:35 AM",  name: "Afro Cinema",        presenter: "Weru TV",          tag: "Entertainment", description: "Afternoon African cinema block." },
      { id: "tue-6",  time: "1:00 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Midday news bulletin." },
      { id: "tue-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",    presenter: "Weru TV",          tag: "Youth",         description: "Youth show — bold, culturally relevant content with music, trends and interactive engagement." },
      { id: "tue-8",  time: "5:00 PM",   name: "Kuthethea",          presenter: "Weru TV",          tag: "Magazine",      description: "Evening community magazine." },
      { id: "tue-9",  time: "6:40 PM",   name: "Twarie Uma",         presenter: "Purity Nguta",     tag: "Magazine",      description: "Evening lifestyle and community show celebrating everyday stories from Central Kenya." },
      { id: "tue-10", time: "7:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Prime time evening news bulletin." },
      { id: "tue-11", time: "8:15 PM",   name: "Nkatha Cietu",       presenter: "Makena Wa Matiri", tag: "Magazine",      description: "Women's empowerment magazine — showcasing the achievements of impactful women and those who have overcome significant obstacles." },
      { id: "tue-12", time: "8:50 PM",   name: "Mtaa Kaawa",         presenter: "Weru TV",          tag: "Entertainment", description: "Community street show and entertainment." },
      { id: "tue-13", time: "9:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Late night news bulletin." },
      { id: "tue-14", time: "10:30 PM",  name: "Turombe RPT",        presenter: "Weru TV",          tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "tue-15", time: "11:00 PM",  name: "Twarie Uma RPT",     presenter: "Weru TV",          tag: "Magazine",      description: "Repeat of Twarie Uma." },
      { id: "tue-16", time: "11:30 PM",  name: "Movie",              presenter: "Weru TV",          tag: "Entertainment", description: "Late night movie feature." },
      { id: "tue-17", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",presenter: "Weru TV",          tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Wednesday",
    programs: [
      { id: "wed-1",  time: "5:00 AM",   name: "Tukumie",            presenter: "Weru TV",          tag: "Morning",       description: "Midweek morning devotion and spiritual reflections." },
      { id: "wed-2",  time: "6:00 AM",   name: "Turombe",            presenter: "Weru TV",          tag: "Morning",       description: "Wednesday morning music and community warm-up." },
      { id: "wed-3",  time: "6:30 AM",   name: "Kuugukea",           presenter: "Weru Newsroom",    tag: "News",          description: "Morning news block — news, newspapers review, and Uria Kuri community dialogue." },
      { id: "wed-4",  time: "10:00 AM",  name: "Njota Cia Miiru RPT",presenter: "Weru TV",          tag: "Music",         description: "Repeat of Njota Cia Miiru music programme." },
      { id: "wed-5",  time: "10:35 AM",  name: "Afro Cinema",        presenter: "Weru TV",          tag: "Entertainment", description: "Afternoon African cinema block." },
      { id: "wed-6",  time: "1:00 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Midday news bulletin." },
      { id: "wed-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",    presenter: "Weru TV",          tag: "Youth",         description: "Midweek youth session — music, trending conversations and relatable content." },
      { id: "wed-8",  time: "5:00 PM",   name: "Kuthethea",          presenter: "Weru TV",          tag: "Magazine",      description: "Evening community magazine." },
      { id: "wed-9",  time: "6:40 PM",   name: "Tiira Muuru",        presenter: "Munene Wa Kagwi",  tag: "Business",      description: "Weekly business programme delivering critical financial insights — empowering audiences navigating the complexities of the commercial landscape." },
      { id: "wed-10", time: "7:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Prime time evening news bulletin." },
      { id: "wed-11", time: "8:15 PM",   name: "Murimi Caruruku",    presenter: "Koome Kinyua",     tag: "Agriculture",   description: "Agricultural show — modern farming techniques, key challenges, expert-driven solutions and demonstrations for Kenyan farmers." },
      { id: "wed-12", time: "8:50 PM",   name: "Client Interview",   presenter: "Weru TV",          tag: "Magazine",      description: "In-depth client and business interview segment." },
      { id: "wed-13", time: "9:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Late night news bulletin." },
      { id: "wed-14", time: "10:30 PM",  name: "Turombe RPT",        presenter: "Weru TV",          tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "wed-15", time: "11:00 PM",  name: "Tiira Muuru RPT",    presenter: "Weru TV",          tag: "Business",      description: "Repeat of Tiira Muuru business programme." },
      { id: "wed-16", time: "11:30 PM",  name: "Movie",              presenter: "Weru TV",          tag: "Entertainment", description: "Late night movie feature." },
      { id: "wed-17", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",presenter: "Weru TV",          tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Thursday",
    programs: [
      { id: "thu-1",  time: "5:00 AM",   name: "Tukumie",            presenter: "Weru TV",          tag: "Morning",       description: "Thursday morning devotion and spiritual reflections." },
      { id: "thu-2",  time: "6:00 AM",   name: "Turombe",            presenter: "Weru TV",          tag: "Morning",       description: "Thursday morning music and community warm-up." },
      { id: "thu-3",  time: "6:30 AM",   name: "Kuugukea",           presenter: "Weru Newsroom",    tag: "News",          description: "Morning news block — news, newspapers, radio, and Rugendo Rwa Guukiria Nkoro community segment." },
      { id: "thu-4",  time: "10:00 AM",  name: "Woi Tene RPT",       presenter: "Weru TV",          tag: "Culture",       description: "Repeat of Woi Tene cultural programme." },
      { id: "thu-5",  time: "11:00 AM",  name: "Afro Cinema",        presenter: "Weru TV",          tag: "Entertainment", description: "Afternoon African cinema block." },
      { id: "thu-6",  time: "1:00 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Midday news bulletin." },
      { id: "thu-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",    presenter: "Weru TV",          tag: "Youth",         description: "Thursday youth session — music, trending conversations and relatable content." },
      { id: "thu-8",  time: "5:00 PM",   name: "Kuthethea",          presenter: "Weru TV",          tag: "Magazine",      description: "Evening community magazine." },
      { id: "thu-9",  time: "6:40 PM",   name: "Rikone",             presenter: "Kendi Joy",        tag: "Culinary",      description: "Culinary show featuring recipes, cooking techniques and food culture from Central Kenya and beyond." },
      { id: "thu-10", time: "7:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Prime time evening news bulletin." },
      { id: "thu-11", time: "8:20 PM",   name: "Gaaru E Ciaca",      presenter: "Edward Mutembei",  tag: "Political",     description: "Political show focusing on the week's political developments — regional and national leaders, analysts and key players shaping Kenya's landscape." },
      { id: "thu-12", time: "9:30 PM",   name: "News",               presenter: "Weru Newsroom",    tag: "News",          description: "Late night news bulletin." },
      { id: "thu-13", time: "10:30 PM",  name: "Turombe RPT",        presenter: "Weru TV",          tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "thu-14", time: "11:00 PM",  name: "Gikaro Na Kaunty RPT",presenter: "Weru TV",         tag: "Magazine",      description: "Repeat of Gikaro Na Kaunty." },
      { id: "thu-15", time: "11:30 PM",  name: "Movie",              presenter: "Weru TV",          tag: "Entertainment", description: "Late night movie feature." },
      { id: "thu-16", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",presenter: "Weru TV",          tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Friday",
    programs: [
      { id: "fri-1",  time: "5:00 AM",   name: "Tukumie",              presenter: "Weru TV",                    tag: "Morning",       description: "Friday morning devotion — a spiritual send-off into the weekend." },
      { id: "fri-2",  time: "6:00 AM",   name: "Turombe",              presenter: "Weru TV",                    tag: "Morning",       description: "Friday morning music and community warm-up." },
      { id: "fri-3",  time: "6:30 AM",   name: "Kuugukea",             presenter: "Weru Newsroom",              tag: "News",          description: "Morning news block — news and newspaper review." },
      { id: "fri-4",  time: "8:00 AM",   name: "Friday Vibes",         presenter: "Captain Godie & DJ Denie",   tag: "Music",         description: "High-energy Friday morning music show to kick-start the weekend." },
      { id: "fri-5",  time: "10:00 AM",  name: "Murimi RPT",           presenter: "Weru TV",                    tag: "Agriculture",   description: "Repeat of the agricultural farming programme." },
      { id: "fri-6",  time: "10:35 AM",  name: "Afro Cinema",          presenter: "Weru TV",                    tag: "Entertainment", description: "Afternoon African cinema block." },
      { id: "fri-7",  time: "12:00 PM",  name: "Tuthunkume Radio",     presenter: "Munene Wa Kagwi",            tag: "Magazine",      description: "Radio crossover lifestyle and community show." },
      { id: "fri-8",  time: "1:00 PM",   name: "News",                 presenter: "Weru Newsroom",              tag: "News",          description: "Midday news bulletin." },
      { id: "fri-9",  time: "1:30 PM",   name: "Katiba Ka Gen Z",      presenter: "Weru TV",                    tag: "Youth",         description: "Extended Friday Gen Z afternoon — special features, music and audience engagement." },
      { id: "fri-10", time: "5:00 PM",   name: "Kuthethea",            presenter: "Weru TV",                    tag: "Magazine",      description: "Friday evening community magazine." },
      { id: "fri-11", time: "7:00 PM",   name: "Weru Mtaani",          presenter: "Agelyne George",             tag: "Entertainment", description: "Street show celebrating the pulse of Weru TV's community — real people, real stories from the streets of Central Kenya." },
      { id: "fri-12", time: "7:30 PM",   name: "News — Weru Njumaa",   presenter: "Weru Newsroom",              tag: "News",          description: "Friday night news bulletin — Weru Njumaa edition." },
      { id: "fri-13", time: "8:20 PM",   name: "Reggae Extra",         presenter: "Tush & Godie",               tag: "Music",         description: "Friday night reggae and afro-fusion music block." },
      { id: "fri-14", time: "8:40 PM",   name: "Njumaa Sacco",         presenter: "Ntinyari Kinyua",            tag: "Entertainment", description: "Friday night entertainment show — lively panel, current affairs, music and community engagement." },
      { id: "fri-15", time: "9:30 PM",   name: "News — Weru Njumaa",   presenter: "Weru Newsroom",              tag: "News",          description: "Late Friday news bulletin." },
      { id: "fri-16", time: "10:30 PM",  name: "The Plug",             presenter: "DJ Alekkings",               tag: "Entertainment", description: "Late night entertainment and music show to close out the week." },
      { id: "fri-17", time: "12:00 AM",  name: "Movie",                presenter: "Weru TV",                    tag: "Entertainment", description: "Late night movie feature." },
      { id: "fri-18", time: "1:30 AM",   name: "Katiba Ka Gen Z RPT",  presenter: "Weru TV",                    tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Saturday",
    programs: [
      { id: "sat-1",  time: "5:30 AM",  name: "Tukumie",              presenter: "Weru TV",            tag: "Morning",       description: "Weekend morning devotion and spiritual reflections." },
      { id: "sat-2",  time: "8:00 AM",  name: "Jesus Winner",         presenter: "Client",             tag: "Culture",       description: "Saturday morning gospel and faith programme." },
      { id: "sat-3",  time: "9:10 AM",  name: "Cartoon",              presenter: "Weru TV",            tag: "Kids",          description: "Saturday morning cartoons for the children." },
      { id: "sat-4",  time: "11:05 AM", name: "Rhumba Kumata",        presenter: "Mwenda H The Pilot", tag: "Music",         description: "Rhumba and Congolese music show — a celebration of East African music culture." },
      { id: "sat-5",  time: "1:00 PM",  name: "News",                 presenter: "Weru Newsroom",      tag: "News",          description: "Saturday afternoon news bulletin." },
      { id: "sat-6",  time: "1:30 PM",  name: "ReggaeMania",          presenter: "Empress Ritta and Empress Natty", tag: "Music", description: "Live Saturday reggae and African culture programme — music, performances, culture and community." },
      { id: "sat-7",  time: "4:20 PM",  name: "Rikone RPT",           presenter: "Weru TV",            tag: "Culinary",      description: "Repeat of the Rikone culinary programme." },
      { id: "sat-8",  time: "5:00 PM",  name: "Tiira Muru RPT",       presenter: "Weru TV",            tag: "Business",      description: "Repeat of Tiira Muru business programme." },
      { id: "sat-9",  time: "5:30 PM",  name: "Wedding Show",         presenter: "Weru TV",            tag: "Magazine",      description: "Wedding planning, celebrations and love stories from Central Kenya." },
      { id: "sat-10", time: "6:00 PM",  name: "Methodist",            presenter: "Weru TV",            tag: "Culture",       description: "Methodist church programme and community worship." },
      { id: "sat-11", time: "6:35 PM",  name: "Woi Wene",             presenter: "Phineas Imaana",     tag: "Entertainment", description: "Saturday evening entertainment show — music, audience interaction and community celebration." },
      { id: "sat-12", time: "7:30 PM",  name: "News — Weru Wikendi",  presenter: "Weru Newsroom",      tag: "News",          description: "Saturday evening news bulletin — Weru Wikendi edition." },
      { id: "sat-13", time: "8:20 PM",  name: "Kambakia",             presenter: "Weru TV",            tag: "Entertainment", description: "Saturday night client entertainment programme." },
      { id: "sat-14", time: "8:55 PM",  name: "Njota Cia Miiru",      presenter: "Weru TV",            tag: "Music",         description: "Saturday night music programme." },
      { id: "sat-15", time: "9:30 PM",  name: "News — Weru Wikendi",  presenter: "Weru Newsroom",      tag: "News",          description: "Late Saturday news bulletin." },
      { id: "sat-16", time: "10:20 PM", name: "Gwatukanga",           presenter: "MC Tash",            tag: "Entertainment", description: "Late night Saturday entertainment and community show hosted by MC Tash." },
      { id: "sat-17", time: "11:00 PM", name: "Movie",                presenter: "Weru TV",            tag: "Entertainment", description: "Late night movie feature." },
      { id: "sat-18", time: "1:00 AM",  name: "ReggaeMania RPT",      presenter: "Weru TV",            tag: "Music",         description: "Overnight repeat of ReggaeMania." },
      { id: "sat-19", time: "3:00 AM",  name: "Tukumie",              presenter: "Weru TV",            tag: "Morning",       description: "Early morning devotion." },
    ],
  },
  {
    day: "Sunday",
    programs: [
      { id: "sun-1",  time: "7:00 AM",  name: "Tutharimwe",           presenter: "Purity Nguta",           tag: "Morning",       description: "Sunday morning community show — running through to afternoon with music, community stories and engagement." },
      { id: "sun-2",  time: "1:00 PM",  name: "News",                 presenter: "Weru Newsroom",          tag: "News",          description: "Sunday afternoon news bulletin." },
      { id: "sun-3",  time: "1:30 PM",  name: "Choir Kanisene",       presenter: "Wa Kagwi",               tag: "Culture",       description: "Sunday gospel choir programme — celebrating church choirs and Kenyan gospel music." },
      { id: "sun-4",  time: "5:00 PM",  name: "Tubororie",            presenter: "Weru TV",                tag: "Culture",       description: "Sunday community and culture programme." },
      { id: "sun-5",  time: "6:00 PM",  name: "Nkatha Cietu RPT",     presenter: "Weru TV",                tag: "Magazine",      description: "Repeat of Nkatha Cietu women's empowerment programme." },
      { id: "sun-6",  time: "6:45 PM",  name: "Nkombo Cia Mithega",   presenter: "Winnie Wa King'eru",     tag: "Culture",       description: "Cultural programme celebrating Meru and Kikuyu traditions, heritage and community values." },
      { id: "sun-7",  time: "7:30 PM",  name: "News — Weru Wikendi",  presenter: "Weru Newsroom",          tag: "News",          description: "Sunday evening news bulletin — Weru Wikendi edition." },
      { id: "sun-8",  time: "8:30 PM",  name: "Chibu Nkobotia",       presenter: "Weru TV",                tag: "Entertainment", description: "Sunday night entertainment programme." },
      { id: "sun-9",  time: "9:00 PM",  name: "Gichunki Gia Ciaca",   presenter: "Martin Gichunge",        tag: "Political",     description: "Flagship political talk show — politicians, analysts and key players discussing Kenya's political landscape. Highly interactive with live phone-ins." },
      { id: "sun-10", time: "11:20 PM", name: "Tutharimwe RPT",       presenter: "Weru TV",                tag: "Morning",       description: "Overnight repeat of Tutharimwe." },
    ],
  },
];
