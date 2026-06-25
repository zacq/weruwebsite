export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

export interface Presenter {
  slug: string;
  name: string;
  show: string;
  role: string;
  imageSrc: string;
  socialLinks: SocialLinks;
  tagline: string;
  bio: string[];
  programHistory: string[];
  stats: { label: string; value: string }[];
}

export const presenters: Presenter[] = [
  {
    slug: "nelly-githinji",
    name: "Nelly Githinji",
    show: "Murimi Caruruku",
    role: "Host & Producer",
    imageSrc: "/Presenters/nelly-githinji.png",
    tagline: "The voice that wakes up Central Kenya every morning.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "Nelly Githinji Murimi is one of Weru TV's most recognisable faces, anchoring the flagship morning show Caruruku with a warmth and authority that has made her a household name across Meru County and the wider Central Kenya region. A trained journalist with over a decade of broadcast experience, Nelly brings rigorous preparation and genuine curiosity to every episode.",
    ],
    programHistory: [
      "When Caruruku launched, the brief was deceptively simple: create a morning programme that felt like a conversation at the kitchen table — relevant, grounded, and honest. Nelly shaped that vision into a format that blends breaking news, community interviews, and cultural reflection in a way that consistently pulls some of the highest morning viewership on the channel.",
      "Over the years, Caruruku has become the go-to platform for county government announcements, health campaigns, and agricultural advisories — topics that directly affect the daily lives of Meru residents. Nelly's ability to translate complex policy language into plain Kimeru and Swahili has made the show an indispensable public-service resource.",
      "Audience numbers tell their own story: within two seasons, Caruruku had overtaken several established morning slots to become the most-watched programme in its timeslot, a position it has defended consistently. Viewer call-in segments during the show regularly receive hundreds of contributions per week, reflecting a loyal, engaged community that Nelly has built through consistent, trustworthy broadcasting.",
    ],
    stats: [
      { value: "7+ yrs", label: "On air" },
      { value: "#1", label: "Morning slot" },
      { value: "300+", label: "Weekly call-ins" },
    ],
  },
  {
    slug: "martin-gichunge",
    name: "Martin Gichunge",
    show: "Gichunki gia Ciaca",
    role: "Host",
    imageSrc: "/Presenters/martin-gichunge.png",
    tagline: "Entertainment, community, and the stories that matter.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "Martin Gichunge is the anchor of Gichunki gia Ciaca, Weru TV's prime-time entertainment and current-affairs magazine. Known for his sharp wit, deep community roots, and an encyclopaedic knowledge of Central Kenya culture, Martin has turned what began as a local variety slot into one of the channel's flagship evening programmes.",
    ],
    programHistory: [
      "Gichunki gia Ciaca was conceived as a programme that would sit at the intersection of entertainment and public discourse — giving communities a platform to celebrate their achievements while holding institutions to account. Martin Gichunge was the natural choice to anchor it, bringing years of live-event hosting and radio experience to the television format.",
      "Under Martin's stewardship the show has evolved significantly, moving from a studio-only format to one that regularly features outside broadcasts from county fairs, agricultural shows, cultural festivals, and community development projects. This willingness to take the cameras to where the people are has been a decisive factor in growing the programme's reach beyond Meru town into the wider county.",
      "The show's Facebook livestream routinely attracts tens of thousands of concurrent viewers for major episodes, and guest bookings — once filled weeks in advance — are now scheduled months ahead, reflecting the prestige the programme has earned among politicians, businesspeople, and cultural figures across the region.",
    ],
    stats: [
      { value: "6+ yrs", label: "On air" },
      { value: "50k+", label: "Facebook viewers" },
      { value: "Prime time", label: "Slot" },
    ],
  },
  {
    slug: "mc-tash",
    name: "MC Tash",
    show: "Tuburuke na Tash",
    role: "Host & Entertainer",
    imageSrc: "/Presenters/mc-tash.png",
    tagline: "Afternoon energy, non-stop vibes.",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "MC Tash is Weru TV's afternoon powerhouse, hosting Tuburuke na Tash — a high-energy music and entertainment show that has redefined what the post-midday television slot can be. With a performance background spanning live events, corporate hosting, and radio, Tash brings an infectious energy that keeps viewers glued to their screens every weekday afternoon.",
    ],
    programHistory: [
      "Tuburuke na Tash launched to fill a gap in the schedule that had long been considered difficult to programme: the afternoon slot, when audiences are transitioning from work, school runs, and market days. Tash's solution was to lean into energy and interactivity — fast-paced music countdowns, live viewer shoutouts, and trending entertainment news delivered with a speed and charisma that felt genuinely different from anything else on air.",
      "The show quickly found its core audience among 18–35 year-olds, a demographic historically hard for regional broadcasters to capture and retain. Brand partnerships followed, with local businesses and national advertisers recognising that Tuburuke na Tash was one of the few programmes on Weru TV reaching a younger, digitally active audience.",
      "Three seasons in, the show has expanded its format to include weekly artist interviews, music video premieres, and a popular Friday segment that previews the weekend's biggest events across the region. Viewer engagement — measured by WhatsApp message volumes during the live show — routinely places Tuburuke na Tash among the top three most-interactive programmes on the channel.",
    ],
    stats: [
      { value: "4+ yrs", label: "On air" },
      { value: "18–35", label: "Core audience" },
      { value: "Top 3", label: "Viewer engagement" },
    ],
  },
  {
    slug: "makena-wa-matiri",
    name: "Makena wa Matiri",
    show: "Nkatha Cietu & Tutharimwe",
    role: "Host & Producer",
    imageSrc: "/Presenters/makena-wa-matiri.png",
    tagline: "Celebrating the women who build our communities.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "Makena wa Matiri hosts two of Weru TV's most culturally significant programmes: Nkatha Cietu, a spotlight on the extraordinary contributions of women across Central Kenya, and Tutharimwe, a community development magazine that amplifies grassroots initiatives making a real difference. Makena's background in social work and community organising gives both shows an authenticity that sets them apart.",
    ],
    programHistory: [
      "Nkatha Cietu was born from a simple observation: Kenyan television rarely told the stories of women who were transforming their communities without fanfare — farmers, teachers, business owners, and cultural custodians whose impact was enormous but whose faces never appeared on screen. Makena pitched the concept and became its natural host, bringing genuine admiration and rigorous storytelling to every profile.",
      "The programme has since featured over 200 women from across Meru, Tharaka-Nithi, and Laikipia counties — ranging from women-led cooperatives producing award-winning honey to single mothers founding schools in underserved areas. Several subjects have gone on to receive county and national recognition, with producers and county officials citing the show's coverage as a catalyst.",
      "Tutharimwe, the companion programme, broadens that mandate to community development at large. It has documented road projects, water access campaigns, and reforestation drives — holding implementers to account while giving credit where it is due. Both shows have become reference points for county communication offices and NGOs seeking to publicise development work to a trusted, engaged audience.",
    ],
    stats: [
      { value: "200+", label: "Profiles aired" },
      { value: "2 shows", label: "Hosted" },
      { value: "5+ yrs", label: "On air" },
    ],
  },
  {
    slug: "edward-mutembei",
    name: "Edward Mutembei",
    show: "Gaaru ya Ciaca",
    role: "Host",
    imageSrc: "/Presenters/edward-mutembei.png",
    tagline: "The conversation your family needs to have.",
    socialLinks: {
      facebook: "https://facebook.com",
    },
    bio: [
      "Edward Mutembei is the host of Gaaru ya Ciaca, Weru TV's family and relationships programme that tackles the topics Kenyan families grapple with but rarely discuss openly. With a measured, empathetic presenting style, Edward has created a safe on-screen space that has attracted some of the most candid conversations ever broadcast on the channel.",
    ],
    programHistory: [
      "Gaaru ya Ciaca began as a weekly slot addressing marriage, parenting, and inter-generational relationships within the Kimeru cultural context. Edward Mutembei brought lived experience and a willingness to be vulnerable on camera — qualities that immediately distinguished the show from more formal magazine formats and built rapid audience trust.",
      "Over time the programme evolved to address emerging social issues including mental health, youth unemployment, and gender-based violence — subjects that regional broadcasters had largely avoided. Expert guests from counselling, medicine, and law began appearing regularly, lending authority to episodes that were simultaneously emotionally resonant and practically informative.",
      "Gaaru ya Ciaca now draws consistent prime-time viewership and has been cited by social welfare organisations as a meaningful contributor to community dialogue in Meru County. Several listener interventions — viewers contacting the show after episodes on domestic support services — have led to real family outcomes that the production team documents as part of its impact reporting.",
    ],
    stats: [
      { value: "5+ yrs", label: "On air" },
      { value: "Prime time", label: "Slot" },
      { value: "100+", label: "Expert guests" },
    ],
  },
  {
    slug: "munene-wa-kagwi",
    name: "Munene wa Kagwi",
    show: "Tiira Muuru & Tunthunkume",
    role: "Host & Agricultural Expert",
    imageSrc: "/Presenters/munene-wa-kagwi.png",
    tagline: "Farming knowledge that grows communities.",
    socialLinks: {
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
    },
    bio: [
      "Munene wa Kagwi is the driving force behind two of Weru TV's most practically important programmes: Tiira Muuru, a flagship agricultural advisory show, and Tunthunkume, which focuses on livestock and veterinary guidance. With deep roots in Meru's farming communities, Munene translates technical knowledge into actionable advice that thousands of smallholder farmers apply season after season.",
    ],
    programHistory: [
      "Tiira Muuru launched at a time when Meru County's agricultural sector was grappling with unpredictable rainfall, rising input costs, and limited access to extension services. Munene wa Kagwi positioned the show as a practical alternative — bringing agricultural officers, agrovets, and successful farmers directly into the studio to share what was actually working on the ground.",
      "The response was immediate and sustained. Viewer letters and phone calls poured in from farmers who had adjusted planting schedules, switched crop varieties, or adopted conservation techniques based on advice heard on the programme. County agricultural departments began partnering with the show to disseminate advisories, recognising its reach into remote areas where extension officers rarely travel.",
      "Tunthunkume extended the model to livestock — covering dairy cattle management, poultry rearing, and disease prevention with the same practical, evidence-based approach. Both shows now form the backbone of Weru TV's agricultural content and are frequently cited by farming cooperatives and county government officials as key channels for reaching rural smallholders with timely, trusted information.",
    ],
    stats: [
      { value: "6+ yrs", label: "On air" },
      { value: "2 shows", label: "Hosted" },
      { value: "County partner", label: "Programme" },
    ],
  },
  {
    slug: "mwenda-h-pilot",
    name: "Mwenda H Pilot",
    show: "Nyontoka",
    role: "Host",
    imageSrc: "/Presenters/mwenda-h-pilot.png",
    tagline: "Nyontoka — where culture and performance collide.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "Mwenda H Pilot hosts Nyontoka, Weru TV's premier cultural performance and talent showcase. A performer and cultural enthusiast himself, Mwenda has built the show into an essential platform for emerging and established artists from the Mount Kenya region, combining live performances, artist interviews, and cultural education into an hour that audiences consistently rate among their favourites.",
    ],
    programHistory: [
      "Nyontoka was created to address a real gap: Kimeru-language music, folk performance, and cultural arts were underrepresented on television at a time when the art forms were experiencing a genuine renaissance among younger creators. Mwenda H Pilot championed the show from the start, bringing both personal credibility with the arts community and a production sensibility that made live performances look and sound as good on screen as they did in person.",
      "The show has now featured hundreds of artists — from established Meru musicians with decades of recordings to teenage performers making their first television appearance. Several artists have credited Nyontoka with providing the visibility that led to recording contracts, event bookings, and national exposure. The programme functions as a genuine talent pipeline for the region's creative industry.",
      "Beyond performance, Nyontoka has documented cultural festivals, traditional ceremonies, and craft traditions that might otherwise go unrecorded. This archival dimension has attracted partnerships with cultural heritage bodies and drawn academic researchers to the programme as a primary source for contemporary Kimeru cultural expression.",
    ],
    stats: [
      { value: "4+ yrs", label: "On air" },
      { value: "300+", label: "Artists featured" },
      { value: "Heritage", label: "Partner programme" },
    ],
  },
  {
    slug: "ajelyne-george",
    name: "Ajelyne George",
    show: "Mantu Kimenchu",
    role: "Host & Lifestyle Presenter",
    imageSrc: "/Presenters/ajelyne-george.png",
    tagline: "Style, health, and the good life — Meru's way.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
    bio: [
      "Ajelyne George is the host of Mantu Kimenchu, Weru TV's lifestyle and wellness programme that covers fashion, nutrition, fitness, beauty, and modern home management through a distinctly Central Kenyan lens. Elegant, knowledgeable, and deeply relatable, Ajelyne has made the show a staple for viewers who want practical lifestyle guidance that reflects their own cultural context.",
    ],
    programHistory: [
      "Mantu Kimenchu launched with a clear editorial stance: lifestyle television for Kenyan women should not simply replicate formats designed for Western or Nairobi audiences. Ajelyne George was instrumental in shaping a programme that celebrates local fabrics and fashion designers, features nutritionists who understand what Meru families actually eat, and profiles fitness approaches that work within real household budgets.",
      "The show built a loyal following quickly, particularly among women aged 25–45 who found it the only television programme that consistently spoke to their daily realities. Viewer surveys commissioned by the channel placed Mantu Kimenchu among the top programmes for audience loyalty — the metric that measures how reliably viewers return episode after episode.",
      "Over successive seasons, Mantu Kimenchu has expanded to cover entrepreneurship, financial literacy for women, and mental wellness — subjects Ajelyne handles with a warmth and directness that makes difficult topics accessible. The show has become a trusted brand in its own right, with local businesses and national brands regularly requesting product integrations and sponsorship opportunities.",
    ],
    stats: [
      { value: "5+ yrs", label: "On air" },
      { value: "Top loyalty", label: "Viewer score" },
      { value: "25–45", label: "Core audience" },
    ],
  },
  {
    slug: "stella-karimi",
    name: "Stella Karimi",
    show: "Gikaro na Kaunty",
    role: "Host & Political Analyst",
    imageSrc: "/Presenters/stella-karimi.png",
    tagline: "Holding power to account — one question at a time.",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    bio: [
      "Stella Karimi is the host of Gikaro na Kaunty, Weru TV's political and governance accountability programme. A tenacious interviewer with a meticulous research process, Stella has established the show as the most rigorous political programme on the channel — and one of the most respected accountability platforms in the broader Mount Kenya media landscape.",
    ],
    programHistory: [
      "Gikaro na Kaunty was born from the recognition that county devolution had created a new layer of government — and a new accountability gap. Stella Karimi brought the show to life with a format that combined extended sit-down interviews with elected and appointed officials, investigative reports on public spending, and viewer Q&A segments that gave constituents a direct line to their representatives.",
      "The programme has produced several stories that were subsequently picked up by national media, including investigations into procurement irregularities and housing project delays. Its reputation for thorough preparation and refusal to accept evasive answers has made it both feared and respected in Meru's political circles — a rare combination for a regional broadcaster.",
      "Gikaro na Kaunty now regularly attracts national politicians and cabinet secretaries when matters affecting the region are in play. The programme's reach has made it a critical platform for any public figure seeking to communicate with Meru County voters, giving Stella and her team genuine editorial leverage and the ability to set the regional political agenda.",
    ],
    stats: [
      { value: "6+ yrs", label: "On air" },
      { value: "National", label: "Stories picked up" },
      { value: "County", label: "Accountability platform" },
    ],
  },
  {
    slug: "empress-rita-natty",
    name: "Empress Ritta and Empress Natty",
    show: "ReggaeMania",
    role: "Empress Ritta and Empress Natty",
    imageSrc: "/Presenters/empress-rita-natty.png",
    tagline: "Roots, culture, and the rhythms that unite us.",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
    bio: [
      "Empress Ritta and Empress Natty are the co-hosts of ReggaeMania, Weru TV's weekend reggae and African culture programme. Musicians, cultural activists, and broadcasters in one, the duo have elevated what might have been a simple music show into a celebration of African identity, conscious messaging, and community solidarity that resonates far beyond Meru County.",
    ],
    programHistory: [
      "ReggaeMania launched as a weekend music block but quickly evolved under Empress Ritta and Empress Natty's creative direction into something more significant — a programme that used reggae as a lens through which to examine African history, current events, and community values. Their musical backgrounds gave them credibility with artists and audiences alike, and their combined editorial vision shaped a format that is simultaneously entertaining and educational.",
      "The show has hosted major reggae and afro-fusion artists from across East Africa, providing a platform that few regional television channels were offering. Artists have praised the show's production values and the seriousness with which it treats their music — a respect that has generated goodwill and enabled bookings that would be out of reach for most broadcasters at this scale.",
      "ReggaeMania has also served as a community gathering point during major cultural moments, livestreaming performances and facilitating viewer conversations around music and identity. Its weekend timeslot has become one of the most-watched on the channel, with social media engagement during broadcasts consistently outperforming most other Weru TV programmes on a per-episode basis.",
    ],
    stats: [
      { value: "4+ yrs", label: "On air" },
      { value: "EA-wide", label: "Artist network" },
      { value: "Top social", label: "Engagement" },
    ],
  },
  {
    slug: "betty",
    name: "Betty",
    show: "Ugima Ni Utonga",
    role: "Host",
    imageSrc: "/Presenters/Betty%20-Ugima%20Ni%20Utonga.png",
    tagline: "Bringing health, wellness, and community conversations to Central Kenya.",
    socialLinks: {
      facebook: "https://facebook.com",
    },
    bio: [
      "Betty is the host of Ugima Ni Utonga, Weru TV's flagship health and wellness programme. With a warm and engaging on-screen presence, she guides viewers through conversations on nutrition, mental health, preventive care, and community wellbeing — topics that matter deeply to families across Central Kenya.",
    ],
    programHistory: [
      "Betty joined Weru TV as the face of Ugima Ni Utonga, a programme built around the belief that good health is both a personal and community responsibility. Each episode brings together medical professionals, nutritionists, traditional health practitioners, and everyday Kenyans to explore practical approaches to wellbeing.",
      "Her ability to translate complex health topics into accessible, actionable advice has made the show one of Weru TV's most consistently watched programmes. Betty's interviews balance expert knowledge with lived experience — ensuring the content resonates with viewers from all walks of life.",
    ],
    stats: [
      { value: "Weekly", label: "On air" },
      { value: "Health", label: "Specialism" },
      { value: "Community", label: "Focus" },
    ],
  },
  {
    slug: "ntinyari-kinyua",
    name: "Ntinyari Kinyua",
    show: "Kirira News",
    role: "News Anchor & Reporter",
    imageSrc: "/Presenters/Ntinyari%20Kinyua.jpeg",
    tagline: "The news, straight — every evening.",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
    },
    bio: [
      "Ntinyari Kinyua is one of Weru TV's lead news anchors, delivering the evening bulletin with a composure and precision that has made her one of the most trusted faces in Central Kenya journalism. A trained journalist with newsroom experience across print, radio, and television, Ntinyari brings a multi-platform understanding of storytelling to every bulletin she anchors.",
    ],
    programHistory: [
      "Ntinyari joined Weru TV's news department during a period of significant expansion, when the channel was investing heavily in original journalism and moving beyond agency-fed content. She quickly became a key figure in that shift, developing source networks in county government, security, and civil society that gave the bulletin a distinctive regional edge.",
      "Her on-camera presence — calm, authoritative, and precise — proved ideal for breaking-news situations, where Ntinyari's ability to relay developing information clearly and without sensationalism earned the trust of both viewers and the journalism community. She has anchored several major regional stories, including county elections, natural disasters, and significant public health events.",
      "Beyond the anchor desk, Ntinyari has contributed significantly to Weru TV's reporter development programme, mentoring junior journalists in field reporting, interview technique, and ethical practice. Her dual role as anchor and trainer has made her one of the most influential figures in the channel's newsroom, contributing to a visible improvement in the overall quality and consistency of news output.",
    ],
    stats: [
      { value: "5+ yrs", label: "On air" },
      { value: "Evening", label: "Bulletin anchor" },
      { value: "Mentor", label: "Junior journalists" },
    ],
  },
  {
    slug: "njumaa-sacco-squad",
    name: "Njumaa Sacco Squad",
    show: "Njumaa Sacco",
    role: "Hosts",
    imageSrc: "/Presenters/Njumaa%20sacco.png",
    tagline: "Celebrating the pulse of Central Kenya — every week.",
    socialLinks: {
      facebook: "https://facebook.com/werutv",
      instagram: "https://instagram.com/werutv",
    },
    bio: [
      "The Njumaa Sacco Squad are the lively presenting team behind Njumaa Sacco, Weru TV's flagship weekend entertainment and lifestyle show. Known for their energy, humour, and deep connection with the Central Kenya audience, the squad brings together music, community stories, fashion, and audience participation into one of the most-watched weekend programmes on the channel.",
    ],
    programHistory: [
      "Njumaa Sacco grew from a simple weekend variety slot into one of Weru TV's signature entertainment formats, driven by the chemistry and crowd energy that the squad brings to every episode. The show has evolved to include live performances, audience games, cultural showcases, and community spotlights — content that keeps viewers tuned in from the opening segment to the final sign-off.",
      "The squad's ability to connect with audiences of all ages — from young viewers drawn to the music and energy, to older audiences who appreciate the cultural programming — has given Njumaa Sacco a broad and loyal viewership. Social media clips from the show regularly outperform other Weru TV content, extending the programme's reach well beyond its live broadcast.",
      "The Njumaa Sacco Squad have also represented Weru TV at several community events and roadshows, bringing the show's signature energy to live audiences across the Mount Kenya region and beyond.",
    ],
    stats: [
      { value: "Weekly", label: "On air" },
      { value: "Top rated", label: "Weekend slot" },
      { value: "Live energy", label: "Every episode" },
    ],
  },
];
