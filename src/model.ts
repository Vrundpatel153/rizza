export type Profile = { name:string; title:string; location:string; experienceYears:string; availability:string; bio:string; email:string; website:string };
export type Skill = { id:string; name:string; level:string; proficiency:number };
export type Experience = { id:string; title:string; company:string; type:string; location:string; start:string; end:string; description:string };
export type Project = { id:string; name:string; category:string; description:string; tools:string[]; image:string; year:string; impactMetric?:string; proofLink?:string };
export type Post = { id:string; body:string; date:string; likes:number; liked:boolean };
export type Notice = { id:string; title:string; body:string; date:string; unread:boolean };
export type Job = {
  id:string;
  title:string;
  company:string;
  location:string;
  mode:string;
  type:string;
  salary:string;
  department:string;
  experienceLevel:string;
  matchScore:number;
  description:string;
  tags:string[];
  dnaScores:{ mustHaves:number; culture:number; autonomy:number; motivation:number };
};

export type StarStory = {
  id:string;
  title:string;
  category:string;
  company:string;
  situation:string;
  task:string;
  action:string;
  result:string;
  reflection:string;
  metrics:string;
  featured:boolean;
};

export type VaultItem = {
  id:string;
  title:string;
  category:'Identity' | 'Education' | 'Employment' | 'Salary' | 'Reference';
  status:'Verified' | 'In Review' | 'Encrypted';
  verifiedDate?:string;
  documentNumber?:string;
  issuer?:string;
};

export type Offer = {
  id:string;
  company:string;
  role:string;
  salary:string;
  equity:string;
  location:string;
  deadline:string;
  status:'Pending Signature' | 'Accepted' | 'Declined';
  signedDate?:string;
  terms:string[];
};

export type Challenge = {
  id:string;
  title:string;
  sponsor:string;
  prize:string;
  daysLeft:number;
  category:string;
  participants:number;
  description:string;
  rewardBadge:string;
  tags:string[];
  userSubmitted?:boolean;
};

export type LeaderboardEntry = {
  rank:number;
  name:string;
  avatar:string;
  role:string;
  score:number;
  tier:'Grandmaster' | 'Diamond' | 'Platinum' | 'Gold';
  badges:number;
};

export type AtsCandidate = {
  id:string;
  name:string;
  role:string;
  experience:string;
  matchScore:number;
  stage:'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired';
  fitSummary:string;
  keyStrengths:string[];
  hasVideoPitch:boolean;
  avatar:string;
};

export type DemoUser = {
  signedIn:boolean;
  profile:Profile;
  skills:Skill[];
  experience:Experience[];
  education:{id:string;degree:string;school:string;years:string}[];
  projects:Project[];
  posts:Post[];
  connections:{id:string;name:string;title:string;company:string;status:'connected'|'incoming'|'suggested'}[];
  notifications:Notice[];
  jobs:Job[];
  savedJobIds:string[];
  appliedJobIds:string[];
  conversations:{id:string;name:string;title:string;messages:{id:string;text:string;mine:boolean;time:string}[]}[];
  settings:{profileVisibility:boolean;showAvailability:boolean;emailUpdates:boolean;jobAlerts:boolean};
  onboarding:{step:number;answers:Record<string,string>;complete:boolean};
  assessment:{answers:Record<string,string>;progress:number;currentQuestion:number;complete:boolean;score:number};
  stories:StarStory[];
  vault:VaultItem[];
  offers:Offer[];
  challenges:Challenge[];
  atsCandidates:AtsCandidate[];
  dnaWeights:{ mustHaves:number; culture:number; autonomy:number; motivation:number };
};

export const STORE_KEY='rizza.demo.profile.v2';

export const seedProjects:Project[]=[
  {id:'finmate',name:'FinMate',category:'Mobile App',description:'Making everyday money feel less intimidating with zero-friction autonomous budgeting.',tools:['Product design','Mobile app','Fintech'],image:'/images/finmate.png',year:'2024',impactMetric:'+42% completion rate',proofLink:'figma.com/@rizza/finmate'},
  {id:'healthtrack',name:'HealthTrack',category:'Mobile App',description:'A calmer way to build healthier habits through non-judgmental nudge loops.',tools:['UX research','Mobile app','Design system'],image:'/images/healthtrack.png',year:'2023',impactMetric:'18k daily active makers',proofLink:'healthtrack.app'},
  {id:'travelease',name:'TravelEase',category:'Web App',description:'From saved places to a trip worth remembering with shared collaborative itineraries.',tools:['Product design','Web app'],image:'/images/travelease.png',year:'2023',impactMetric:'94% CSAT score',proofLink:'travelease.io'},
  {id:'taskflow',name:'TaskFlow',category:'Web App',description:'A focused workspace for teams in motion with keyboard-first navigation.',tools:['Design systems','Web app','Linear stack'],image:'/images/taskflow.png',year:'2022',impactMetric:'-35% task switch friction',proofLink:'taskflow.dev'},
  {id:'rizza',name:'Rizza Design System',category:'Design System',description:'A flexible component language for ambitious teams across web and mobile platforms.',tools:['Design system','Figma','Tokens'],image:'/images/rizza-design-system.png',year:'2022',impactMetric:'140+ production components',proofLink:'rizza.life/system'},
  {id:'shoply',name:'Shoply',category:'Mobile App',description:'A more personal path from discovery to checkout with zero dark patterns.',tools:['E-commerce','Mobile app'],image:'/images/shoply.png',year:'2021',impactMetric:'+28% average basket retention',proofLink:'shoply.store'}
];

export const seedStories:StarStory[]=[
  {
    id:'star-1',
    title:'Re-architecting Onboarding for High-Trust Fintech',
    category:'Fintech & High Trust UX',
    company:'FinMate',
    situation:'Users dropped off by 58% during identity verification and bank linkage due to anxiety around data privacy.',
    task:'Redesign the entire onboarding flow to explain data encryption clearly while keeping time-to-first-transaction under 3 minutes.',
    action:'Introduced contextual security guarantees at the exact moment of friction, replaced heavy form fields with micro-step progressively disclosed questions, and added live customer confirmation toast feedback.',
    result:'Verification completion surged from 42% to 84%, customer support tickets regarding KYC dropped by 62%, and day-30 retention reached a company record 68%.',
    reflection:'Specific clarity always beats generic polish. When users are scared of making a mistake, calm micro-explanations create the confidence to proceed.',
    metrics:'+42% completion · -62% KYC support tickets',
    featured:true
  },
  {
    id:'star-2',
    title:'Unifying 5 Legacy Apps into One Shared Design System',
    category:'Design Systems & Scale',
    company:'Figma Team Alum',
    situation:'Engineering velocity crawled as 4 squads reinvented modals, buttons, and tokens with divergent styles across platforms.',
    task:'Lead the cross-functional initiative to build and adopt a single multi-brand token system without halting feature delivery.',
    action:'Conducted a comprehensive UI audit across 120+ screens, established semantic token architecture with engineering leads, and facilitated weekly cross-squad review crits.',
    result:'Reduced time-to-production for new screens by 45%, eliminated 140+ redundant CSS classes, and achieved 96% component library adoption within 4 months.',
    reflection:'Design systems succeed or fail on empathy for the developers using them. The best component is the one that is effortless to compose correctly.',
    metrics:'45% faster shipping · 96% team adoption',
    featured:true
  }
];

export const seedVault:VaultItem[]=[
  { id:'v-1', title:'Government Passport & National ID', category:'Identity', status:'Verified', verifiedDate:'Oct 2025', issuer:'Government Authority', documentNumber:'••••••8941' },
  { id:'v-2', title:'B.Des Degree in Interaction Design', category:'Education', status:'Verified', verifiedDate:'Sep 2024', issuer:'IDC School of Design', documentNumber:'DEG-2018-912' },
  { id:'v-3', title:'Senior UX Designer Employment Letter', category:'Employment', status:'Verified', verifiedDate:'Aug 2025', issuer:'Figma HR Verified', documentNumber:'EMP-FG-448' },
  { id:'v-4', title:'Compensation & Form W-2 / Salary Slip', category:'Salary', status:'Encrypted', verifiedDate:'Locked & Private', issuer:'AES-256 Vault', documentNumber:'Available to confirmed offers only' },
  { id:'v-5', title:'Staff Designer Reference Check', category:'Reference', status:'Verified', verifiedDate:'Nov 2025', issuer:'Verified by Staff Designer at Linear', documentNumber:'Endorsed 5/5' }
];

export const seedOffers:Offer[]=[
  {
    id:'offer-linear',
    company:'Linear',
    role:'Staff Product Designer',
    salary:'$185,000 / year',
    equity:'0.18% ISO Options (4-year vest, 1-year cliff)',
    location:'Remote (US / Europe / Asia timezones compatible)',
    deadline:'November 1, 2026',
    status:'Pending Signature',
    terms:[
      'Full health, dental, and vision insurance coverage (100% employer paid)',
      '$4,000 annual home office setup and ergonomics budget',
      'Flexible paid time off with 4 mandatory team recharge weeks',
      'Annual in-person company retreat in Kyoto and Lisbon'
    ]
  }
];

export const seedChallenges:Challenge[]=[
  {
    id:'ch-linear',
    title:'The Focused Workspace: Linear Interaction Jam',
    sponsor:'Linear',
    prize:'$5,000 Prize Pool + Priority Interview',
    daysLeft:6,
    category:'Product Interaction & Speed',
    participants:342,
    description:'Design a sub-second issue triage experience for engineering leads managing 50+ concurrent commits. Emphasize keyboard-first shortcuts and micro-latency.',
    rewardBadge:'Linear Speed Grandmaster',
    tags:['Keyboard-First','SaaS','Micro-UX'],
    userSubmitted:false
  },
  {
    id:'ch-figma',
    title:'AI Co-Pilot Canvas: Next-Gen Creative Workflows',
    sponsor:'Figma Community',
    prize:'$10,000 Prize Pool + Featured Showcase',
    daysLeft:14,
    category:'Generative AI & Tooling',
    participants:618,
    description:'Rethink how designers and generative AI models collaborate inside the infinite canvas without losing creative ownership.',
    rewardBadge:'AI Systems Pioneer',
    tags:['AI Canvas','Generative UI','Collaboration'],
    userSubmitted:true
  },
  {
    id:'ch-notion',
    title:'Zero-Friction Knowledge Capture Challenge',
    sponsor:'Notion',
    prize:'$3,500 Prize Pool',
    daysLeft:22,
    category:'Mobile Ergonomics',
    participants:289,
    description:'Design a mobile-first quick capture system that reduces thought-to-storage friction down to under 2 seconds on iOS and Android.',
    rewardBadge:'Knowledge Architect',
    tags:['Mobile','Ergonomics','Notion API'],
    userSubmitted:false
  }
];

export const seedLeaderboard:LeaderboardEntry[]=[
  { rank:1, name:'Marcus Vance', avatar:'/images/annie-portrait.png', role:'Lead Systems Designer', score:3420, tier:'Grandmaster', badges:14 },
  { rank:2, name:'Elena Rostova', avatar:'/images/annie-portrait.png', role:'Staff Product Designer', score:3180, tier:'Grandmaster', badges:12 },
  { rank:3, name:'Devon Chen', avatar:'/images/annie-portrait.png', role:'Founding Designer', score:2990, tier:'Diamond', badges:11 },
  { rank:4, name:'Annie Stanley (You)', avatar:'/images/annie-portrait.png', role:'Senior UX Designer', score:2840, tier:'Diamond', badges:9 },
  { rank:5, name:'Sophia Al-Mansoor', avatar:'/images/annie-portrait.png', role:'UX Researcher & Systems', score:2620, tier:'Platinum', badges:8 }
];

export const seedAtsCandidates:AtsCandidate[]=[
  {
    id:'cand-1',
    name:'Annie Stanley',
    role:'Senior UX Designer',
    experience:'5+ years',
    matchScore:96,
    stage:'Interview',
    fitSummary:'Strong systems thinker with verified Fintech and collaboration software achievements. Excellent STAR storytelling.',
    keyStrengths:['Design Systems','Fintech Onboarding','User Research'],
    hasVideoPitch:true,
    avatar:'/images/annie-portrait.png'
  },
  {
    id:'cand-2',
    name:'Jordan Miller',
    role:'Product Designer, Growth',
    experience:'4 years',
    matchScore:91,
    stage:'Screening',
    fitSummary:'Data-fluent designer with proven experimentation track record at high-growth SaaS startups.',
    keyStrengths:['A/B Testing','Funnels','Rapid Prototyping'],
    hasVideoPitch:true,
    avatar:'/images/annie-portrait.png'
  },
  {
    id:'cand-3',
    name:'Kai Takahashi',
    role:'Staff Design Engineer',
    experience:'7 years',
    matchScore:88,
    stage:'Offer',
    fitSummary:'Exceptional hybrid designer-developer capable of prototyping complex reactive systems in React & WebGL.',
    keyStrengths:['React/TypeScript','Motion Craft','Design Tokens'],
    hasVideoPitch:false,
    avatar:'/images/annie-portrait.png'
  },
  {
    id:'cand-4',
    name:'Zoe Kravitz',
    role:'Lead UX Researcher',
    experience:'6 years',
    matchScore:84,
    stage:'Applied',
    fitSummary:'Mixed-methods researcher specializing in enterprise workflows and complex data visualizations.',
    keyStrengths:['Qualitative Testing','Usability Benchmarking','Synthesizing'],
    hasVideoPitch:false,
    avatar:'/images/annie-portrait.png'
  }
];

export const seedJobs:Job[]=[
  {
    id:'linear',
    title:'Senior Product Designer',
    company:'Linear',
    location:'Remote · US / Europe',
    mode:'Remote',
    type:'Full-time',
    salary:'$145k – $185k',
    department:'Product Design',
    experienceLevel:'Senior (5-8 yrs)',
    matchScore:96,
    description:'Help shape the tools that make software teams feel focused. You will own product problems end to end, from discovery and prototypes to polished releases.',
    tags:['Product design','SaaS','Systems','Figma'],
    dnaScores:{ mustHaves:98, culture:94, autonomy:96, motivation:95 }
  },
  {
    id:'figma-role',
    title:'Staff UX Designer',
    company:'Figma',
    location:'New York, NY',
    mode:'Hybrid',
    type:'Full-time',
    salary:'$168k – $218k',
    department:'Design Systems',
    experienceLevel:'Lead / Staff (8+ yrs)',
    matchScore:92,
    description:'Build expressive, collaborative workflows for a growing community of makers. Partner closely with product, engineering, research and brand.',
    tags:['UX','Collaboration','Figma','Design Tokens'],
    dnaScores:{ mustHaves:95, culture:90, autonomy:92, motivation:91 }
  },
  {
    id:'notion',
    title:'Product Designer, Growth',
    company:'Notion',
    location:'Remote · North America',
    mode:'Remote',
    type:'Full-time',
    salary:'$132k – $176k',
    department:'Product Design',
    experienceLevel:'Mid (3-5 yrs)',
    matchScore:89,
    description:'Make it easier for new teams to find their way into Notion. Explore onboarding, activation and the moments that turn curiosity into habit.',
    tags:['Growth','Onboarding','Research','Activation'],
    dnaScores:{ mustHaves:88, culture:92, autonomy:86, motivation:90 }
  },
  {
    id:'airbnb',
    title:'Senior Experience Designer',
    company:'Airbnb',
    location:'San Francisco, CA',
    mode:'Hybrid',
    type:'Full-time',
    salary:'$150k – $195k',
    department:'Product Design',
    experienceLevel:'Senior (5-8 yrs)',
    matchScore:86,
    description:'Create thoughtful experiences that help people feel at home anywhere in the world with empathetic, cross-cultural storytelling.',
    tags:['Travel','Mobile','Service design','Storytelling'],
    dnaScores:{ mustHaves:85, culture:94, autonomy:84, motivation:88 }
  },
  {
    id:'stripe-role',
    title:'Design Systems Lead',
    company:'Stripe',
    location:'Remote / Seattle',
    mode:'Remote',
    type:'Full-time',
    salary:'$175k – $225k',
    department:'Design Systems',
    experienceLevel:'Lead / Staff (8+ yrs)',
    matchScore:94,
    description:'Scale the global financial design system powering millions of developer and checkout interfaces across 130+ currencies.',
    tags:['Design Systems','Accessibility','Fintech','Tokens'],
    dnaScores:{ mustHaves:96, culture:92, autonomy:95, motivation:93 }
  }
];

export const seedUser:DemoUser={
  signedIn:true,
  profile:{
    name:'Annie Stanley',
    title:'Senior UX Designer',
    location:'Mumbai, India',
    experienceYears:'5+ Years Exp.',
    availability:'Available for opportunities',
    bio:'I design user-centered digital experiences that solve real problems and create meaningful impact. I believe great design should feel effortless and grounded in human trust.',
    email:'annie.stanley@gmail.com',
    website:'rizza.life/annie-stanley'
  },
  skills:[
    {id:'ux',name:'User Experience Design',level:'Expert',proficiency:91},
    {id:'research',name:'User Research',level:'Expert',proficiency:89},
    {id:'wireframes',name:'Wireframing & Prototyping',level:'Advanced',proficiency:76},
    {id:'systems',name:'Design Systems',level:'Advanced',proficiency:86},
    {id:'interaction',name:'Interaction Design',level:'Advanced',proficiency:82},
    {id:'visual',name:'Visual Craft & Polish',level:'Advanced',proficiency:78}
  ],
  experience:[
    {id:'figma',title:'Senior UX Designer',company:'Figma',type:'Full-time',location:'Mumbai, India',start:'2022',end:'Present',description:'Leading product experiences across collaboration and community. Partnering with research, product and engineering to turn complex workflows into clear, human tools.'},
    {id:'invision',title:'UX Designer',company:'InVision',type:'Full-time',location:'San Francisco, USA',start:'2020',end:'2022',description:'Designed collaborative workflows and conducted research with distributed product teams.'},
    {id:'behance',title:'Junior Designer',company:'Behance',type:'Full-time',location:'Bangalore, India',start:'2018',end:'2020',description:'Built visual systems and responsive product patterns for a global creative community.'}
  ],
  education:[{id:'idc',degree:'B.Des in Interaction Design',school:'IDC School of Design',years:'2014 – 2018'}],
  projects:seedProjects,
  posts:[
    {id:'post1',body:'A small reminder from this week: the best design critique starts with curiosity, not a verdict. Ask what the work is trying to make easier before suggesting solutions.',date:'2 days ago',likes:28,liked:false},
    {id:'post2',body:'FinMate taught me that trust is built in the tiny moments: a clear label, a quiet confirmation, a number that makes sense without mental math.',date:'1 week ago',likes:42,liked:true}
  ],
  connections:[
    {id:'maya',name:'Maya Desai',title:'Product Designer',company:'Notion',status:'connected'},
    {id:'leo',name:'Leo Martin',title:'Design Lead',company:'Linear',status:'connected'},
    {id:'sana',name:'Sana Kapoor',title:'UX Researcher',company:'Airbnb',status:'incoming'},
    {id:'jules',name:'Jules Park',title:'Design Systems',company:'Shopify',status:'suggested'},
    {id:'priya',name:'Priya Shah',title:'Product Designer',company:'Atlassian',status:'suggested'},
    {id:'noah',name:'Noah Williams',title:'Creative Director',company:'Canva',status:'suggested'}
  ],
  notifications:[
    {id:'n1',title:'Offer Letter Ready to Review',body:'Linear has sent you an offer for Staff Product Designer.',date:'Just now',unread:true},
    {id:'n2',title:'Sana Kapoor wants to connect',body:'UX Researcher · Airbnb',date:'12 min ago',unread:true},
    {id:'n3',title:'Your profile is in the 92nd percentile',body:'8 recruiters viewed your STAR stories this week.',date:'Yesterday',unread:true},
    {id:'n4',title:'Linear Interaction Jam is live',body:'$5,000 challenge open in the Brand Arcade',date:'2 days ago',unread:false}
  ],
  jobs:seedJobs,
  savedJobIds:['linear','notion'],
  appliedJobIds:['linear'],
  conversations:[
    {
      id:'maya',
      name:'Maya Desai',
      title:'Product Designer at Notion',
      messages:[
        {id:'m1',text:'Hey Annie, loved your FinMate case study. The trust cues are so thoughtful.',mine:false,time:'10:24 AM'},
        {id:'m2',text:'Thank you, Maya! We spent a lot of time testing the friction in the banking step.',mine:true,time:'10:31 AM'},
        {id:'m3',text:'Would you be up for a quick chat about research methods next week?',mine:false,time:'10:35 AM'}
      ]
    },
    {
      id:'leo',
      name:'Leo Martin',
      title:'Design Lead at Linear',
      messages:[
        {id:'m4',text:'Annie, our team reviewed your design portfolio and STAR reflections. We were blown away!',mine:false,time:'Yesterday'},
        {id:'m5',text:'We just dispatched an official offer letter to your Rizza Digital Vault.',mine:false,time:'10:00 AM'}
      ]
    }
  ],
  settings:{profileVisibility:true,showAvailability:true,emailUpdates:true,jobAlerts:true},
  onboarding:{step:6,answers:{},complete:true},
  assessment:{answers:{},progress:20,currentQuestion:20,complete:true,score:87},
  stories:seedStories,
  vault:seedVault,
  offers:seedOffers,
  challenges:seedChallenges,
  atsCandidates:seedAtsCandidates,
  dnaWeights:{ mustHaves:40, culture:25, autonomy:20, motivation:15 }
};

export function loadUser():DemoUser {
  try {
    const raw=localStorage.getItem(STORE_KEY);
    if(raw){
      const parsed=JSON.parse(raw) as Partial<DemoUser>;
      if(parsed?.profile?.name && parsed?.projects){
        return {
          ...seedUser,
          ...parsed,
          assessment:{...seedUser.assessment,...parsed.assessment},
          onboarding:{...seedUser.onboarding,...parsed.onboarding},
          stories:parsed.stories?.length?parsed.stories:seedUser.stories,
          vault:parsed.vault?.length?parsed.vault:seedUser.vault,
          offers:parsed.offers?.length?parsed.offers:seedUser.offers,
          challenges:parsed.challenges?.length?parsed.challenges:seedUser.challenges,
          atsCandidates:parsed.atsCandidates?.length?parsed.atsCandidates:seedUser.atsCandidates,
          dnaWeights:parsed.dnaWeights??seedUser.dnaWeights,
          jobs:parsed.jobs?.length?parsed.jobs:seedUser.jobs
        };
      }
    }
  } catch {
    /* restore clean demo state */
  }
  return seedUser;
}
