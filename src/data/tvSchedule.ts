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

const KATIBA_PANEL = "Ajelyne George, Dj Tush, Lynn Mwende, Liz Nunga & Afrik Annah";
const KUGUUKEA_PRESENTER = "Edward Mutembei & Dorcas wa Kaaria";
const KUGUUKEA_DESC =
  "Kuguukea is Weru TV's flagship morning breakfast programme. The show keeps viewers informed and engaged with the latest news, newspaper reviews, current affairs, sports updates, and insightful interviews with business leaders, public figures, and political leaders discussing key issues and development initiatives. Kuguukea is your trusted source for information, analysis, and meaningful conversations to start the day.";
const AFROSINEMA_DESC =
  "Afrosinema is Weru TV's home of captivating Nigerian drama. The programme features a selection of entertaining Nollywood movies and series, bringing viewers compelling stories filled with love, family, culture, suspense, and unforgettable performances.";

export const tvSchedule: DaySchedule[] = [
  {
    day: "Monday",
    programs: [
      { id: "mon-1",  time: "5:00 AM",   name: "Tukumie",                     presenter: "Weru TV",           tag: "Morning",       description: "Tukumie is a gospel music programme on Weru TV that features an uplifting compilation of praise and worship songs, inspiring viewers to begin each day with faith, hope, and spiritual encouragement." },
      { id: "mon-2",  time: "6:00 AM",   name: "Turombe",                     presenter: "Weru TV",           tag: "Morning",       description: "Turombe (meaning \"Let's Pray\") is a daily devotional programme featuring recorded sermons. The programme shares the Word of God, offers biblical teachings, and leads viewers in prayer, providing spiritual guidance and encouragement to begin each day with faith and hope." },
      { id: "mon-3",  time: "6:30 AM",   name: "Kuguukea",                    presenter: KUGUUKEA_PRESENTER,  tag: "News",          description: KUGUUKEA_DESC },
      { id: "mon-4",  time: "10:00 AM",  name: "Gichunki Gia Ciaca RPT",      presenter: "Martin Gichunge",   tag: "Political",     description: "Repeat of Weru TV's flagship political talk show." },
      { id: "mon-5",  time: "1:00 PM",   name: "News",                        presenter: "Dorcas wa Kaaria",  tag: "News",          description: "Midday news bulletin." },
      { id: "mon-6",  time: "1:30 PM",   name: "Katiba Ka Gen Z",             presenter: KATIBA_PANEL,        tag: "Youth",         description: "Vibrant youth show capturing the voice, energy and culture of today's generation — music, trends, lifestyle and interactive engagement." },
      { id: "mon-7",  time: "5:00 PM",   name: "Kuthethea",                   presenter: "Weru TV",           tag: "Magazine",      description: "Evening community magazine — conversations and local stories." },
      { id: "mon-8",  time: "6:40 PM",   name: "Ugima Ni Utonga",             presenter: "Ntinyari Kinyua",   tag: "Health",        description: "Flagship health programme — expert health insights, nutrition, wellness and preventive care for Central Kenya families." },
      { id: "mon-9",  time: "7:30 PM",   name: "Nteto Cia Weru",              presenter: "Maureen Kinya",     tag: "News",          description: "Prime time evening news bulletin." },
      { id: "mon-10", time: "8:15 PM",   name: "Gikaro Na Kaunty",            presenter: "Stella Karimi",     tag: "Magazine",      description: "Prime-time profiles of influential individuals — exclusive insights into personal journeys and impact stories." },
      { id: "mon-11", time: "8:50 PM",   name: "Client Interview",            presenter: "Weru TV",           tag: "Magazine",      description: "In-depth client and business interview segment." },
      { id: "mon-12", time: "9:30 PM",   name: "Nteto Cia Weru",              presenter: "Phineas Imaana",    tag: "News",          description: "Late night news bulletin." },
      { id: "mon-13", time: "10:30 PM",  name: "Turombe RPT",                 presenter: "Weru TV",           tag: "Morning",       description: "Repeat of the morning Turombe programme." },
      { id: "mon-14", time: "11:30 PM",  name: "Movie",                       presenter: "Weru TV",           tag: "Entertainment", description: "Late night movie feature." },
      { id: "mon-15", time: "1:00 AM",   name: "News RPT",                    presenter: "Weru Newsroom",     tag: "News",          description: "Overnight news repeat." },
      { id: "mon-16", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",         presenter: "Weru TV",           tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Tuesday",
    programs: [
      { id: "tue-1",  time: "5:00 AM",   name: "Tukumie",                     presenter: "Weru TV",           tag: "Morning",       description: "Tuesday morning devotion and spiritual reflections." },
      { id: "tue-2",  time: "6:00 AM",   name: "Turombe",                     presenter: "Weru TV",           tag: "Morning",       description: "Tuesday morning music and community warm-up." },
      { id: "tue-3",  time: "6:30 AM",   name: "Kuguukea",                    presenter: KUGUUKEA_PRESENTER,  tag: "News",          description: KUGUUKEA_DESC },
      { id: "tue-4",  time: "10:00 AM",  name: "Ugima RPT",                   presenter: "Ntinyari Kinyua",   tag: "Health",        description: "Repeat of Ugima Ni Utonga health programme." },
      { id: "tue-5",  time: "10:35 AM",  name: "Afrosinema",                  presenter: "Weru TV",           tag: "Entertainment", description: AFROSINEMA_DESC },
      { id: "tue-6",  time: "1:00 PM",   name: "News",                        presenter: "Edward Mutembei",   tag: "News",          description: "Midday news bulletin." },
      { id: "tue-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",             presenter: KATIBA_PANEL,        tag: "Youth",         description: "Youth show — bold, culturally relevant content with music, trends and interactive engagement." },
      { id: "tue-8",  time: "5:00 PM",   name: "Kuthethea",                   presenter: "Weru TV",           tag: "Magazine",      description: "Evening community magazine." },
      { id: "tue-9",  time: "6:40 PM",   name: "Twarie Uuma",                 presenter: "Purity Nguta",      tag: "Magazine",      description: "Twarie Uuma is a lifestyle and relationship programme on Weru TV that provides expert advice on relationships, marriage, family life, and everyday challenges. Through engaging discussions and practical guidance, the programme empowers viewers to build healthy relationships, strengthen families, and navigate life's challenges with confidence." },
      { id: "tue-10", time: "7:30 PM",   name: "Nteto Cia Weru",              presenter: "Dorcas wa Kaaria",   tag: "News",          description: "Prime time evening news bulletin." },
      { id: "tue-11", time: "8:15 PM",   name: "Nkatha Cietu",                presenter: "Makena wa Matiri",   tag: "Magazine",      description: "Women's empowerment magazine — showcasing the achievements of impactful women and those who have overcome significant obstacles." },
      { id: "tue-12", time: "8:50 PM",   name: "Nkatha Mashinani",            presenter: "Weru TV",           tag: "Health",        description: "Nkatha Mashinani is a women's empowerment programme produced by Weru TV in partnership with Joy Millers Ltd, producers of Raha Premium Kavagara, and Yetu SACCO. The programme equips women with practical knowledge on financial literacy, entrepreneurship, nutrition, and healthy living through expert insights, inspiring stories, and community engagement, empowering them to build healthier families and stronger financial futures." },
      { id: "tue-13", time: "9:30 PM",   name: "Nteto Cia Weru",              presenter: "Win Shiro King'eru", tag: "News",          description: "Late night news bulletin." },
      { id: "tue-14", time: "10:30 PM",  name: "Turombe RPT",                 presenter: "Weru TV",           tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "tue-15", time: "11:00 PM",  name: "Twarie Uuma RPT",             presenter: "Weru TV",           tag: "Magazine",      description: "Repeat of Twarie Uuma." },
      { id: "tue-16", time: "11:30 PM",  name: "Movie",                       presenter: "Weru TV",           tag: "Entertainment", description: "Late night movie feature." },
      { id: "tue-17", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",         presenter: "Weru TV",           tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Wednesday",
    programs: [
      { id: "wed-1",  time: "5:00 AM",   name: "Tukumie",                     presenter: "Weru TV",           tag: "Morning",       description: "Midweek morning devotion and spiritual reflections." },
      { id: "wed-2",  time: "6:00 AM",   name: "Turombe",                     presenter: "Weru TV",           tag: "Morning",       description: "Wednesday morning music and community warm-up." },
      { id: "wed-3",  time: "6:30 AM",   name: "Kuguukea",                    presenter: KUGUUKEA_PRESENTER,  tag: "News",          description: KUGUUKEA_DESC },
      { id: "wed-4",  time: "10:00 AM",  name: "Njota Cia Miiru RPT",         presenter: "Weru TV",           tag: "Music",         description: "Repeat of Njota Cia Miiru music programme." },
      { id: "wed-5",  time: "10:35 AM",  name: "Afrosinema",                  presenter: "Weru TV",           tag: "Entertainment", description: AFROSINEMA_DESC },
      { id: "wed-6",  time: "1:00 PM",   name: "Nteto Cia Weru Thaa Mugwanja", presenter: "Nelly Githinji",   tag: "News",          description: "Midday news bulletin." },
      { id: "wed-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",             presenter: KATIBA_PANEL,        tag: "Youth",         description: "Midweek youth session — music, trending conversations and relatable content." },
      { id: "wed-8",  time: "5:00 PM",   name: "Kuthethea",                   presenter: "Weru TV",           tag: "Magazine",      description: "Evening community magazine." },
      { id: "wed-9",  time: "6:40 PM",   name: "Tiira Muuru",                 presenter: "Munene wa Kagwi",   tag: "Business",      description: "Weekly business programme delivering critical financial insights — empowering audiences navigating the complexities of the commercial landscape." },
      { id: "wed-10", time: "7:30 PM",   name: "Nteto Cia Weru",              presenter: "Edward Mutembei",   tag: "News",          description: "Prime time evening news bulletin." },
      { id: "wed-11", time: "8:15 PM",   name: "Murimi Caruruku",             presenter: "Nelly Githinji",    tag: "Agriculture",   description: "Agricultural show — modern farming techniques, key challenges, expert-driven solutions and demonstrations for Kenyan farmers." },
      { id: "wed-12", time: "8:50 PM",   name: "Client Interview",            presenter: "Weru TV",           tag: "Magazine",      description: "In-depth client and business interview segment." },
      { id: "wed-13", time: "9:30 PM",   name: "Nteto Cia Weru",              presenter: "Dorcas wa Kaaria",  tag: "News",          description: "Late night news bulletin." },
      { id: "wed-14", time: "10:30 PM",  name: "Turombe RPT",                 presenter: "Weru TV",           tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "wed-15", time: "11:00 PM",  name: "Tiira Muuru RPT",             presenter: "Weru TV",           tag: "Business",      description: "Repeat of Tiira Muuru business programme." },
      { id: "wed-16", time: "11:30 PM",  name: "Movie",                       presenter: "Weru TV",           tag: "Entertainment", description: "Late night movie feature." },
      { id: "wed-17", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",         presenter: "Weru TV",           tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Thursday",
    programs: [
      { id: "thu-1",  time: "5:00 AM",   name: "Tukumie",                     presenter: "Weru TV",           tag: "Morning",       description: "Thursday morning devotion and spiritual reflections." },
      { id: "thu-2",  time: "6:00 AM",   name: "Turombe",                     presenter: "Weru TV",           tag: "Morning",       description: "Thursday morning music and community warm-up." },
      { id: "thu-3",  time: "6:30 AM",   name: "Kuguukea",                    presenter: KUGUUKEA_PRESENTER,  tag: "News",          description: KUGUUKEA_DESC },
      { id: "thu-4",  time: "10:00 AM",  name: "Woi Tene RPT",                presenter: "Phineas Imaana",    tag: "Culture",       description: "Repeat of Woi Tene cultural programme." },
      { id: "thu-5",  time: "11:00 AM",  name: "Afrosinema",                  presenter: "Weru TV",           tag: "Entertainment", description: AFROSINEMA_DESC },
      { id: "thu-6",  time: "1:00 PM",   name: "News",                        presenter: "Win Shiro King'eru", tag: "News",         description: "Midday news bulletin." },
      { id: "thu-7",  time: "1:30 PM",   name: "Katiba Ka Gen Z",             presenter: KATIBA_PANEL,        tag: "Youth",         description: "Thursday youth session — music, trending conversations and relatable content." },
      { id: "thu-8",  time: "5:00 PM",   name: "Kuthethea",                   presenter: "Weru TV",           tag: "Magazine",      description: "Evening community magazine." },
      { id: "thu-9",  time: "6:40 PM",   name: "Rikone",                      presenter: "Kendi Joy",         tag: "Culinary",      description: "Culinary show featuring recipes, cooking techniques and food culture from Central Kenya and beyond." },
      { id: "thu-10", time: "7:30 PM",   name: "Nteto Cia Weru",              presenter: "Edward Mutembei",   tag: "News",          description: "Prime time evening news bulletin." },
      { id: "thu-11", time: "9:30 PM",   name: "Gaaru E Ciaca",               presenter: "Edward Mutembei",   tag: "Political",     description: "Political show focusing on the week's political developments — regional and national leaders, analysts and key players shaping Kenya's landscape." },
      { id: "thu-12", time: "10:30 PM",  name: "Turombe RPT",                 presenter: "Weru TV",           tag: "Morning",       description: "Overnight Turombe music repeat." },
      { id: "thu-13", time: "11:00 PM",  name: "Gikaro Na Kaunty RPT",        presenter: "Weru TV",           tag: "Magazine",      description: "Repeat of Gikaro Na Kaunty." },
      { id: "thu-14", time: "11:30 PM",  name: "Movie",                       presenter: "Weru TV",           tag: "Entertainment", description: "Late night movie feature." },
      { id: "thu-15", time: "2:00 AM",   name: "Katiba Ka Gen Z RPT",         presenter: "Weru TV",           tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Friday",
    programs: [
      { id: "fri-1",  time: "5:00 AM",   name: "Tukumie",                     presenter: "Weru TV",                  tag: "Morning",       description: "Friday morning devotion — a spiritual send-off into the weekend." },
      { id: "fri-2",  time: "6:00 AM",   name: "Turombe",                     presenter: "Weru TV",                  tag: "Morning",       description: "Friday morning music and community warm-up." },
      { id: "fri-3",  time: "6:30 AM",   name: "Kuguukea",                    presenter: KUGUUKEA_PRESENTER,         tag: "News",          description: KUGUUKEA_DESC },
      { id: "fri-4",  time: "8:00 AM",   name: "Friday Vibes",                presenter: "Empress Natty & Dj Vikings", tag: "Music",       description: "High-energy Friday morning music show to kick-start the weekend." },
      { id: "fri-5",  time: "10:00 AM",  name: "Murimi Caruruku RPT",         presenter: "Nelly Githinji",           tag: "Agriculture",   description: "Repeat of the agricultural farming programme." },
      { id: "fri-6",  time: "10:35 AM",  name: "Afrosinema",                  presenter: "Weru TV",                  tag: "Entertainment", description: AFROSINEMA_DESC },
      { id: "fri-7",  time: "1:00 PM",   name: "News",                        presenter: "Edward Mutembei",          tag: "News",          description: "Midday news bulletin." },
      { id: "fri-8",  time: "1:30 PM",   name: "Katiba Ka Gen Z",             presenter: KATIBA_PANEL,               tag: "Youth",         description: "Extended Friday Gen Z afternoon — special features, music and audience engagement." },
      { id: "fri-9",  time: "5:00 PM",   name: "Kuthethea",                   presenter: "Weru TV",                  tag: "Magazine",      description: "Friday evening community magazine." },
      { id: "fri-10", time: "7:00 PM",   name: "Weru Mtaani",                 presenter: "Ajelyne George",           tag: "Entertainment", description: "Weru Mtaani is an interactive street quiz segment on Weru TV that brings fun and excitement to communities. Our presenters engage members of the public through vox pops, asking a variety of questions on current affairs, general knowledge, and everyday topics. Participants who answer correctly win Lea Premium Flour, courtesy of our sponsor, making learning both rewarding and entertaining." },
      { id: "fri-11", time: "7:30 PM",   name: "Weru Njumaa",                 presenter: "Ntinyari Kinyua",          tag: "News",          description: "Friday night news bulletin — Weru Njumaa edition." },
      { id: "fri-12", time: "8:20 PM",   name: "ReggaeMania Extra",           presenter: "Tush & Godie",             tag: "Music",         description: "Friday night reggae and afro-fusion music block." },
      { id: "fri-13", time: "8:40 PM",   name: "Njumaa Sacco",                presenter: "Ntinyari Kinyua",          tag: "Entertainment", description: "Friday night entertainment show — lively panel, current affairs, music and community engagement." },
      { id: "fri-14", time: "9:30 PM",   name: "Weru Njumaa",                 presenter: "Ntinyari Kinyua",          tag: "News",          description: "Late Friday news bulletin." },
      { id: "fri-15", time: "10:30 PM",  name: "The Plug",                    presenter: "DJ Alekkings",             tag: "Entertainment", description: "Late night entertainment and music show to close out the week." },
      { id: "fri-16", time: "12:00 AM",  name: "Movie",                       presenter: "Weru TV",                  tag: "Entertainment", description: "Late night movie feature." },
      { id: "fri-17", time: "1:30 AM",   name: "Katiba Ka Gen Z RPT",         presenter: "Weru TV",                  tag: "Youth",         description: "Overnight repeat of Katiba Ka Gen Z." },
    ],
  },
  {
    day: "Saturday",
    programs: [
      { id: "sat-1",  time: "5:00 AM",  name: "Tukumie",                       presenter: "Weru TV",                         tag: "Morning",       description: "Weekend morning devotion and spiritual reflections." },
      { id: "sat-2",  time: "8:00 AM",  name: "Jesus Winner Ministries",       presenter: "Client",                          tag: "Culture",       description: "Saturday morning gospel and faith programme." },
      { id: "sat-3",  time: "9:10 AM",  name: "Cartoon",                       presenter: "Weru TV",                         tag: "Kids",          description: "Saturday morning cartoons for the children." },
      { id: "sat-4",  time: "11:05 AM", name: "Rhumba Kumata",                 presenter: "Mwenda H Pilot",                  tag: "Music",         description: "Rhumba Kumata is Weru TV's dedicated rhumba music programme, featuring a rich compilation of the finest rhumba hits from across Africa." },
      { id: "sat-5",  time: "1:00 PM",  name: "Nteto Cia Weru Thaa Mugwanja",  presenter: "Ntinyari Kinyua",                 tag: "News",          description: "Saturday afternoon news bulletin." },
      { id: "sat-6",  time: "1:30 PM",  name: "ReggaeMania",                   presenter: "Empress Ritta and Empress Natty", tag: "Music",         description: "Reggae Mania is Weru TV's ultimate reggae music programme, featuring a vibrant compilation of the finest roots reggae and Caribbean music. From timeless classics to contemporary hits, the show delivers authentic rhythms, positive vibes, and unforgettable tunes for reggae lovers." },
      { id: "sat-7",  time: "4:20 PM",  name: "Rikone RPT",                    presenter: "Weru TV",                         tag: "Culinary",      description: "Repeat of the Rikone culinary programme." },
      { id: "sat-8",  time: "5:00 PM",  name: "Tiira Muuru RPT",               presenter: "Weru TV",                         tag: "Business",      description: "Repeat of Tiira Muuru business programme." },
      { id: "sat-9",  time: "5:30 PM",  name: "Ningwitikiria (Wedding Show)",  presenter: "Weru TV",                         tag: "Magazine",      description: "Wedding planning, celebrations and love stories from Central Kenya." },
      { id: "sat-10", time: "6:00 PM",  name: "Ireo Bia Mugendi",              presenter: "Weru TV",                         tag: "Culture",       description: "Community church programme and worship." },
      { id: "sat-11", time: "6:35 PM",  name: "Woi Tene",                      presenter: "Phineas Imaana",                  tag: "Culture",       description: "Woi Tene is a cultural heritage programme on Weru TV that preserves and celebrates our rich traditions. The programme features engaging conversations with elders, who share stories, customs, and experiences from the past, offering viewers a deeper understanding of our cultural roots, traditional way of life, and the values passed down through generations." },
      { id: "sat-12", time: "7:30 PM",  name: "Weru Wikendi",                  presenter: "Maureen Kinya",                   tag: "News",          description: "Saturday evening news bulletin — Weru Wikendi edition." },
      { id: "sat-13", time: "8:20 PM",  name: "Kambakia Christian Centre",     presenter: "Weru TV",                         tag: "Entertainment", description: "Saturday night client entertainment programme." },
      { id: "sat-14", time: "8:55 PM",  name: "Njota Cia Miiru",               presenter: "Weru TV",                         tag: "Music",         description: "Saturday night music programme." },
      { id: "sat-15", time: "9:30 PM",  name: "Weru Wikendi",                  presenter: "Maureen Kinya",                   tag: "News",          description: "Late Saturday news bulletin." },
      { id: "sat-16", time: "10:20 PM", name: "Gwatukanga",                    presenter: "MC Tash",                         tag: "Entertainment", description: "Late night Saturday entertainment and community show hosted by MC Tash." },
      { id: "sat-17", time: "11:00 PM", name: "Movie",                        presenter: "Weru TV",                         tag: "Entertainment", description: "Late night movie feature." },
      { id: "sat-18", time: "1:00 AM",  name: "ReggaeMania RPT",               presenter: "Weru TV",                         tag: "Music",         description: "Overnight repeat of ReggaeMania." },
      { id: "sat-19", time: "3:00 AM",  name: "Tukumie",                       presenter: "Weru TV",                         tag: "Morning",       description: "Early morning devotion." },
    ],
  },
  {
    day: "Sunday",
    programs: [
      { id: "sun-1",  time: "5:00 AM",  name: "Tukumie",                      presenter: "Weru TV",           tag: "Morning",       description: "Sunday morning devotion and spiritual reflections to begin the day of worship." },
      { id: "sun-2",  time: "7:00 AM",  name: "Tutharimwe",                   presenter: "Purity Nguta",      tag: "Morning",       description: "Sunday morning community show — running through to afternoon with music, community stories and engagement." },
      { id: "sun-3",  time: "1:00 PM",  name: "Nteto Cia Weru Thaa Mugwanja", presenter: "Ntinyari Kinyua",   tag: "News",          description: "Sunday afternoon news bulletin." },
      { id: "sun-4",  time: "1:30 PM",  name: "Choir Kanisene",               presenter: "Munene wa Kagwi",   tag: "Culture",       description: "Choir Kanisene is a Catholic faith programme hosted by Munene wa Kagwi. The show features a blend of Catholic choir music, psalms, Gospel reflections, and spiritual teachings, offering viewers an inspiring and reflective experience that nurtures faith and encourages Christian living." },
      { id: "sun-5",  time: "5:00 PM",  name: "Tuborerie",                    presenter: "Weru TV",           tag: "Music",         description: "Tuborerie is Weru TV's country music programme, featuring a carefully curated compilation of the best country music hits. The show offers viewers a blend of timeless classics and contemporary favorites, delivering quality entertainment for lovers of country music." },
      { id: "sun-6",  time: "6:00 PM",  name: "Nkatha Cietu RPT",             presenter: "Makena wa Matiri",  tag: "Magazine",      description: "Repeat of Nkatha Cietu women's empowerment programme." },
      { id: "sun-7",  time: "6:40 PM",  name: "Nkombo Cia Mithega",           presenter: "Win Shiro King'eru", tag: "Culture",      description: "Nkombo Cia Mithega is a powerful talk show highlighting stories of hope, recovery, and transformation. The programme features candid conversations with individuals who have overcome drug and substance abuse, those currently undergoing rehabilitation, as well as caregivers and rehabilitation professionals. Through these inspiring testimonies and expert insights, the show raises awareness, encourages recovery, and promotes support for individuals and families affected by addiction." },
      { id: "sun-8",  time: "7:30 PM",  name: "Weru Wikendi",                 presenter: "Nelly wa Githinji", tag: "News",          description: "Sunday evening news bulletin — Weru Wikendi edition." },
      { id: "sun-9",  time: "8:20 PM",  name: "Chibu Nkobotia",               presenter: "Kiambambe O Hajji & Nadiah Mukiri Mungania", tag: "Entertainment", description: "Chibu Nkobotia is a comedy-drama series broadcast on Weru TV, featuring well-known local entertainers Kiambambe O Hajji and Nadiah Mukiri Mungania." },
      { id: "sun-10", time: "9:30 PM",  name: "Gichunki Gia Ciaca",           presenter: "Martin Gichunge",   tag: "Political",     description: "This is our flagship political talk show, hosted by Martin Gichunge Dullah. The show airs every Sunday from 9:00 PM to 11:30 PM and features politicians, lawyers, political analysts, and specialists from local, regional, and national levels within Kenya's political landscape. The program is highly interactive, with strong audience engagement through our digital platforms, live phone calls, and SMS participation." },
      { id: "sun-11", time: "11:30 PM", name: "Tutharimwe RPT",               presenter: "Weru TV",           tag: "Morning",       description: "Overnight repeat of Tutharimwe." },
    ],
  },
];
