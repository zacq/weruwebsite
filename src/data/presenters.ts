export type PresenterCategory = "News Anchors" | "Program Presenters" | "Reporters";

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
  category: PresenterCategory;
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    category: "Program Presenters",
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
    show: "Njumaa Sacco",
    role: "Host",
    category: "Program Presenters",
    imageSrc: "/placeholder-presenter.svg",
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
    category: "Program Presenters",
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

  // ── NEWS ANCHORS ──────────────────────────────────────────────────────────

  {
    slug: "betty-ntinyari",
    name: "Betty Ntinyari",
    show: "Weru Njumaa",
    role: "News Anchor",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Betty%20Ntinyari%20-Weru%20Njumaa.jpeg",
    tagline: "Delivering the week's closing news with clarity and authority.",
    socialLinks: {},
    bio: [
      "Betty Ntinyari anchors Weru Njumaa, the station's flagship Friday night bulletin. With a composed on-screen presence and meticulous preparation, she closes out the week's news cycle for Central Kenya audiences — covering politics, community developments, and breaking stories with the precision that prime-time viewers expect.",
    ],
    programHistory: [
      "Betty joined Weru TV's news team as the anchor of the Friday bulletin, a timeslot that demands both breadth and depth — viewers expect a comprehensive wrap of the week's biggest stories alongside fresh developments. She has consistently delivered, building a loyal Friday-night audience that trusts her to put the week's events in clear perspective.",
      "Her anchoring style balances authority with accessibility, making complex stories digestible without losing their weight. She has covered county elections, regional security developments, and major public health events from the desk, coordinating seamlessly with field reporters across the Mount Kenya region.",
    ],
    stats: [
      { value: "Friday", label: "Prime bulletin" },
      { value: "News", label: "Specialisation" },
      { value: "Weru Njumaa", label: "Show" },
    ],
  },
  {
    slug: "dorcas-wa-kaaria",
    name: "Dorcas wa Kaaria",
    show: "Nteto cia Weru",
    role: "News Anchor",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Dorcas%20wa%20Kaaria%20-%20Nteto%20cia%20Weru%20Wednesday.jpeg",
    tagline: "Midweek news — clear, accurate, and on time.",
    socialLinks: {},
    bio: [
      "Dorcas wa Kaaria anchors the Wednesday edition of Nteto cia Weru, Weru TV's weekday evening bulletin. Her sharp delivery and thorough understanding of the Central Kenya news landscape make her one of the newsroom's most dependable anchors, trusted by viewers to bring them the day's events with accuracy and calm authority.",
    ],
    programHistory: [
      "Dorcas established herself as a reliable presence on the Wednesday bulletin, a day that often carries significant policy, governance, and county council news. Her ability to navigate complex stories — from budget announcements to community disputes — and present them clearly in both Kimeru and Swahili has earned her strong audience trust.",
      "Beyond anchoring, Dorcas contributes to the newsroom's story selection and script review process, helping ensure that Wednesday's bulletin consistently reflects the full breadth of the day's events across Meru, Tharaka-Nithi, and Isiolo counties.",
    ],
    stats: [
      { value: "Wednesday", label: "Bulletin" },
      { value: "Bilingual", label: "Kimeru & Swahili" },
      { value: "News", label: "Specialisation" },
    ],
  },
  {
    slug: "maureen-kinya",
    name: "Maureen Kinya",
    show: "Weru Wikendi",
    role: "News Anchor",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Maureen%20Kinya%20-%20Weru%20Wikendi(Sat).jpeg",
    tagline: "Keeping Central Kenya informed through the weekend.",
    socialLinks: {},
    bio: [
      "Maureen Kinya anchors the Saturday edition of Weru Wikendi, the station's weekend news bulletin. Bringing energy and precision to the start of the weekend bulletin, Maureen ensures that audiences who have been away from the news during the day catch up on all major stories — from county governance to community events — in a format that is informative without being heavy.",
    ],
    programHistory: [
      "The Saturday bulletin presents a unique editorial challenge — viewers are in a different mindset than during the working week, yet important stories continue to break. Maureen has mastered the balance, delivering substantive news coverage while keeping the tone accessible and the pacing brisk.",
      "Her weekend anchoring has made her a recognisable face for viewers who rely on Saturday evening as their primary news checkpoint. She has anchored several significant weekend breaking stories, including county government announcements, regional sporting events, and community milestones.",
    ],
    stats: [
      { value: "Saturday", label: "Bulletin" },
      { value: "Weekend", label: "Edition" },
      { value: "Weru Wikendi", label: "Show" },
    ],
  },
  {
    slug: "nelly-wa-githinji",
    name: "Nelly wa Githinji",
    show: "Weru Wikendi",
    role: "News Anchor",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Nelly%20wa%20Githinji%20-%20Weru%20Wikendi%20(Sunday).jpeg",
    tagline: "Closing the weekend with the news that matters.",
    socialLinks: {},
    bio: [
      "Nelly wa Githinji anchors the Sunday edition of Weru Wikendi, rounding out the weekend news cycle for Central Kenya audiences. Her calm, measured delivery is well suited to Sunday's viewing rhythm, providing a thoughtful and thorough wrap of the weekend's events before the working week begins.",
    ],
    programHistory: [
      "Nelly took on the Sunday bulletin at a time when the station was investing in strengthening its weekend news presence. She has since built a loyal Sunday-evening audience that trusts her to deliver a comprehensive and balanced account of developments across the region and beyond.",
      "Her Sunday bulletin frequently includes in-depth county features and community spotlights that go beyond the headlines — giving the weekend edition a distinctive character that differentiates it from the weekday bulletins.",
    ],
    stats: [
      { value: "Sunday", label: "Bulletin" },
      { value: "Weekend", label: "Edition" },
      { value: "Weru Wikendi", label: "Show" },
    ],
  },
  {
    slug: "phineas-imaana",
    name: "Phineas Imaana",
    show: "Nteto cia Weru",
    role: "News Anchor & Presenter",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Phineas%20Imaana%20-%20Nteto%20cia%20Weru%20Monday.jpeg",
    tagline: "Setting the week's news tone — every Monday.",
    socialLinks: {},
    bio: [
      "Phineas Imaana anchors the Monday edition of Nteto cia Weru and also co-hosts Woi Wene on Saturday evenings, making him one of the most versatile members of Weru TV's on-screen team. His confident delivery and broad editorial knowledge make Monday's bulletin — which must capture the week's opening energy — one of the most watched of the weekday editions.",
    ],
    programHistory: [
      "The Monday bulletin sets the tone for the week's news coverage, and Phineas brings the discipline and editorial judgement that the slot demands. His preparation is thorough, and his ability to handle late-breaking stories without losing composure has made him a trusted anchor for viewers starting their week with Weru TV.",
      "His dual role as a news anchor and evening entertainment show host reflects the breadth of his broadcasting skills. On Woi Wene, he demonstrates a warmer, more conversational presenting style — a versatility that has made him one of the channel's most recognisable and respected on-screen personalities.",
    ],
    stats: [
      { value: "Monday", label: "Bulletin" },
      { value: "2 shows", label: "Hosted" },
      { value: "Versatile", label: "Anchor & Host" },
    ],
  },
  {
    slug: "win-shiro-kingeru",
    name: "Win Shiro King'eru",
    show: "Nteto Cia Weru",
    role: "News Anchor",
    category: "News Anchors",
    imageSrc: "/Presenters/News%20Anchors/Win%20Shiro%20King%27eru%20%20-%20Nteto%20Cia%20Weru%20(Tues%20).jpeg",
    tagline: "Tuesday's news — delivered with confidence and precision.",
    socialLinks: {},
    bio: [
      "Win Shiro King'eru anchors the Tuesday edition of Nteto Cia Weru, bringing poise and editorial sharpness to the mid-week bulletin. A trusted voice in Weru TV's newsroom, she ensures viewers receive accurate, well-contextualised coverage of the day's most important stories across Central Kenya and beyond.",
    ],
    programHistory: [
      "Win Shiro joined the news team as the anchor of Tuesday's bulletin, quickly establishing a reputation for thorough preparation and a delivery style that balances authority with warmth. Her ability to handle both hard news and community stories within a single bulletin has made Tuesday one of the more consistent editions in the weekly news lineup.",
      "Her newsroom contributions extend beyond anchoring — she is actively involved in story development and script review, helping to shape the editorial direction of the Tuesday edition and maintain the high standards Weru TV's audiences have come to expect.",
    ],
    stats: [
      { value: "Tuesday", label: "Bulletin" },
      { value: "News", label: "Specialisation" },
      { value: "Editorial", label: "Contributor" },
    ],
  },

  // ── REPORTERS ────────────────────────────────────────────────────────────

  {
    slug: "anthony-kathenya",
    name: "Anthony Kathenya",
    show: "Nairobi County Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Anthony%20Kathenya%20%20Nairobi%20County.png",
    tagline: "Weru TV's eyes and ears in the capital.",
    socialLinks: {},
    bio: [
      "Anthony Kathenya is Weru TV's Nairobi County correspondent, providing the channel with on-the-ground coverage from Kenya's capital. From national assembly proceedings to diaspora community stories, Anthony bridges the gap between Central Kenya and the country's political and economic nerve centre.",
    ],
    programHistory: [
      "Based in Nairobi, Anthony covers stories with direct relevance to Central Kenya audiences — parliamentary debates, national government policy, and the lives of Meru and Tharaka-Nithi residents living and working in the city. His access to national institutions gives Weru TV a Nairobi dateline on the stories that matter most to the region.",
    ],
    stats: [
      { value: "Nairobi", label: "Beat" },
      { value: "National", label: "Coverage" },
      { value: "Parliament", label: "Accredited" },
    ],
  },
  {
    slug: "bantam-murangiri",
    name: "Bantam Murangiri",
    show: "Isiolo County Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Bantam%20Murangiri-%20Isiolo%20County.png",
    tagline: "Reporting from the gateway to Northern Kenya.",
    socialLinks: {},
    bio: [
      "Bantam Murangiri covers Isiolo County for Weru TV, reporting on the county's unique intersection of pastoralist communities, wildlife conservation, and infrastructure development. His local knowledge and community connections give Weru TV's Isiolo coverage the depth and authenticity that the region deserves.",
    ],
    programHistory: [
      "Isiolo County's diverse communities — spanning Borana, Meru, Somali, and Turkana populations — present rich and complex stories that require careful, respectful reporting. Bantam navigates this landscape with experience, delivering stories on devolution, land rights, security, and community development that keep Central Kenya audiences informed about their northern neighbour.",
    ],
    stats: [
      { value: "Isiolo", label: "Beat" },
      { value: "Pastoralist", label: "Community focus" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "brian-kimathi",
    name: "Brian Kimathi",
    show: "Tigania Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Brian%20Kimathi%20%20Tigania%20Central%20%26East.png",
    tagline: "Ground-level reporting from Tigania Central and East.",
    socialLinks: {},
    bio: [
      "Brian Kimathi is Weru TV's correspondent for Tigania Central and East subcounties, covering community news, development projects, and local governance from one of Meru County's most active agricultural and commercial zones. His reporting gives these subcounties a consistent and credible voice on the channel.",
    ],
    programHistory: [
      "Brian's beat spans Tigania Central and East — areas known for their tea farming, dairy cooperatives, and active local politics. He covers ward and subcounty administration, infrastructure development, and the everyday stories that affect residents, delivering reports that connect the community to the broader Weru TV audience.",
    ],
    stats: [
      { value: "Tigania C&E", label: "Beat" },
      { value: "Agriculture", label: "Focus area" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "dancan-mwathi",
    name: "Dancan Mwathi",
    show: "Igembe Central Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Dancan%20Mwathi%20%20Igembe%20Central%20Subcounty.png",
    tagline: "Telling the stories of Igembe Central with accuracy.",
    socialLinks: {},
    bio: [
      "Dancan Mwathi covers Igembe Central Subcounty for Weru TV, providing consistent coverage of the area's community affairs, development news, and local governance. His reporting ensures that Igembe Central — a region with significant miraa farming, trade, and cross-border activity — has a credible broadcast voice.",
    ],
    programHistory: [
      "Dancan's coverage area sits at the heart of Kenya's miraa (khat) trade, making his beat economically significant and often politically charged. He covers the full spectrum of community life — from cooperative society meetings to security matters along the Isiolo border — keeping Weru TV's audience informed about this strategically important region.",
    ],
    stats: [
      { value: "Igembe Central", label: "Beat" },
      { value: "Trade & Economy", label: "Focus area" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "dennis-mugendi",
    name: "Dennis Mugendi",
    show: "Igembe South Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Dennis%20Mugendi%20_%20Igembe%20South%20subcounty.png",
    tagline: "Reporting from the heart of Igembe South.",
    socialLinks: {},
    bio: [
      "Dennis Mugendi is Weru TV's correspondent for Igembe South Subcounty, delivering field reports on community development, local governance, agriculture, and social affairs from an area that is central to Meru County's economic and cultural life.",
    ],
    programHistory: [
      "Dennis covers the full breadth of Igembe South's community life — from ward development fund projects and school construction to local market dynamics and county health initiatives. His on-the-ground presence ensures that subcounty stories that might otherwise go unreported reach the broader Weru TV audience.",
    ],
    stats: [
      { value: "Igembe South", label: "Beat" },
      { value: "Community", label: "Focus area" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "edwin-gatobu",
    name: "Edwin Gatobu",
    show: "Igembe North Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Edwin%20Gatobu%20%20Igembe%20North%20Subcounty.png",
    tagline: "On the ground in Igembe North — every story counts.",
    socialLinks: {},
    bio: [
      "Edwin Gatobu covers Igembe North Subcounty for Weru TV, reporting on an area that borders Isiolo and Marsabit counties and carries significant stories about cross-border trade, pastoralist-farmer relations, security, and infrastructure. His field reporting keeps viewers informed about this frontier region.",
    ],
    programHistory: [
      "Igembe North's unique geography and demographics make it one of the more challenging and rewarding beats in Weru TV's correspondent network. Edwin navigates the area's complexities with experience and community trust, delivering reports that inform Meru County audiences about developments that directly affect livelihoods and security in the north.",
    ],
    stats: [
      { value: "Igembe North", label: "Beat" },
      { value: "Border region", label: "Coverage" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "elsie-gakii",
    name: "Elsie Gakii",
    show: "Buuri Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Elsie%20Gakii%20-%20Buuri%20Subcounty.png",
    tagline: "Giving Buuri Subcounty a strong broadcast voice.",
    socialLinks: {},
    bio: [
      "Elsie Gakii is Weru TV's Buuri Subcounty correspondent, covering a region that includes the slopes of Mount Kenya and communities involved in tea farming, horticulture, and tourism. Her reporting highlights both the opportunities and challenges facing one of Meru County's most scenic and productive subcounties.",
    ],
    programHistory: [
      "Buuri Subcounty's stories range from small-scale farmer cooperatives to county conservation partnerships along the Mount Kenya forest boundary. Elsie covers this range with diligence and a genuine connection to the community, producing field reports that give Buuri residents reliable representation on Weru TV's bulletins.",
    ],
    stats: [
      { value: "Buuri", label: "Beat" },
      { value: "Agriculture", label: "Focus area" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "john-nthiga",
    name: "John Nthiga",
    show: "Tigania West & East Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/John%20Nthiga%20Tigania%20West%20%26Tigania%20East%20%20Subcounties.png",
    tagline: "Comprehensive coverage across Tigania West and East.",
    socialLinks: {},
    bio: [
      "John Nthiga covers both Tigania West and Tigania East subcounties for Weru TV, making him responsible for one of the widest geographic beats in the correspondent network. His reporting spans agriculture, local governance, education, and community affairs across two subcounties with distinct but interrelated stories.",
    ],
    programHistory: [
      "John's dual-subcounty beat demands efficient newsgathering and strong community relationships across a broad area. He has developed a reliable network of sources in both Tigania West and East, enabling him to break local stories quickly and provide the contextual depth that distinguishes strong field reporting from routine coverage.",
    ],
    stats: [
      { value: "Tigania W&E", label: "Beat" },
      { value: "Dual subcounty", label: "Coverage" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "makena-mbaabu",
    name: "Makena Mbaabu",
    show: "Tharaka Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Makena%20Mbaabu%20%20Tharaka%20Subcounty.png",
    tagline: "Amplifying the voices of Tharaka Subcounty.",
    socialLinks: {},
    bio: [
      "Makena Mbaabu is Weru TV's Tharaka Subcounty correspondent, reporting from one of the most culturally rich and agriculturally important areas of Tharaka-Nithi County. Her coverage brings the stories of Tharaka's farming communities, conservation areas, and local governance to a wider audience.",
    ],
    programHistory: [
      "Tharaka Subcounty sits in a transitional zone between the highlands and the lowland savannah, giving it a unique ecological and agricultural profile. Makena covers the full spectrum of community life here — from irrigation projects and honey cooperative societies to ward governance and cultural events — providing consistent and credible field reporting from the region.",
    ],
    stats: [
      { value: "Tharaka", label: "Beat" },
      { value: "Tharaka-Nithi", label: "County" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "martin-mugambi",
    name: "Martin Mugambi",
    show: "Maara Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Martin%20Mugambi-%20Maara%20Subcounty.png",
    tagline: "On the ground in Maara — news from the tea belt.",
    socialLinks: {},
    bio: [
      "Martin Mugambi covers Maara Subcounty for Weru TV, reporting from an area known for its thriving tea sector, vibrant market towns, and active local politics. His field reports connect Maara's communities to Weru TV's broader audience, ensuring the subcounty's stories receive the prominence they deserve.",
    ],
    programHistory: [
      "Maara's tea and coffee belt generates some of the most economically significant stories in the region, and Martin covers them alongside governance, social development, and community news. His access to farmers, cooperative officials, and ward representatives gives Weru TV's Maara coverage both depth and credibility.",
    ],
    stats: [
      { value: "Maara", label: "Beat" },
      { value: "Tea belt", label: "Coverage area" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "mutugi-karee",
    name: "Mutugi Karee",
    show: "South & Central Imenti Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Mutugi%20Karee%20%20South%20Imenti%20%26%20Central%20Imenti%20subcounties.png",
    tagline: "Covering the commercial heartland of Meru County.",
    socialLinks: {},
    bio: [
      "Mutugi Karee covers South Imenti and Central Imenti subcounties for Weru TV — a dual beat that includes Meru town, the county's commercial and administrative hub. His reporting spans county government, urban development, business, and community affairs at the centre of the region's economic life.",
    ],
    programHistory: [
      "South Imenti and Central Imenti are home to Meru town and its surrounding commercial zones, making Mutugi's beat one of the busiest in the correspondent network. He covers county assembly proceedings, business developments, social affairs, and urban infrastructure with a pace and depth that reflects the dynamism of the area he reports from.",
    ],
    stats: [
      { value: "S&C Imenti", label: "Beat" },
      { value: "Meru Town", label: "Hub coverage" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "nicholas-chabari",
    name: "Nicholas Chabari",
    show: "Chuka / Igambang'ombe Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Nicholas%20Chabari%20%20Chuka%20%20Igambang%27ombe%20Subcounty.png",
    tagline: "Reporting from Chuka and Igambang'ombe for Weru TV.",
    socialLinks: {},
    bio: [
      "Nicholas Chabari covers Chuka and Igambang'ombe Subcounty for Weru TV, reporting from a region that includes Chuka town — one of Tharaka-Nithi County's major commercial centres. His field reports cover local governance, agriculture, trade, and community development across both areas.",
    ],
    programHistory: [
      "Chuka and Igambang'ombe have a rich mix of stories — from university town dynamics and youth employment to agricultural co-ops and county devolution implementation. Nicholas covers this range with thoroughness, ensuring the area's communities have consistent and reliable representation on Weru TV's bulletins.",
    ],
    stats: [
      { value: "Chuka/Igambang'ombe", label: "Beat" },
      { value: "Tharaka-Nithi", label: "County" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "muthuri-muriuki",
    name: "Muthuri Muriuki",
    show: "Imenti North Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Reporters%20%20Muthuri%20Muriuki%20-Imenti%20North.png",
    tagline: "Keeping Imenti North on the Weru TV map.",
    socialLinks: {},
    bio: [
      "Muthuri Muriuki is Weru TV's Imenti North Subcounty correspondent, covering a region that runs from Meru's northern highlands down toward the Nyambene Hills. His reporting spans agriculture, community development, local governance, and the area's distinctive cultural and ecological stories.",
    ],
    programHistory: [
      "Imenti North's stories range from miraa farming dynamics and highland tea zones to subcounty development fund projects and local political affairs. Muthuri covers this range with consistency and community trust, giving Imenti North a regular and credible broadcast presence on Weru TV.",
    ],
    stats: [
      { value: "Imenti North", label: "Beat" },
      { value: "Nyambene", label: "Region" },
      { value: "Field", label: "Reporter" },
    ],
  },
  {
    slug: "rita-mwaniki",
    name: "Rita Mwaniki",
    show: "Embu County Correspondent",
    role: "Reporter",
    category: "Reporters",
    imageSrc: "/Presenters/Reporters/Rita%20Mwaniki%20%20Embu%20County.png",
    tagline: "Weru TV's link to Embu and the lower Mount Kenya region.",
    socialLinks: {},
    bio: [
      "Rita Mwaniki is Weru TV's Embu County correspondent, covering a neighbouring county with deep historical, cultural, and economic ties to the Meru region. Her reporting keeps Weru TV's Central Kenya audience informed about governance, agriculture, business, and community affairs in Embu.",
    ],
    programHistory: [
      "Embu County shares strong community and commercial bonds with Meru, and Rita's reporting reflects those connections — covering stories on cross-county infrastructure, shared agricultural markets, and the area's growing urban economy. Her presence in Embu gives Weru TV broader regional reach and a credible voice beyond its core Meru catchment.",
    ],
    stats: [
      { value: "Embu", label: "Beat" },
      { value: "Regional", label: "Coverage" },
      { value: "Field", label: "Reporter" },
    ],
  },
];
