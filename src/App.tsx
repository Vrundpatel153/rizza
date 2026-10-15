import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { Activity, ArrowLeft, ArrowRight, Award, Bell, BriefcaseBusiness, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Compass, Crown, FileText, Filter, Home, Layers, Lightbulb, LockKeyhole, LogOut, Mail, MapPin, Menu, MessageCircle, MoreHorizontal, Pencil, Plus, Rocket, Search, Send, Settings, Share2, ShieldCheck, SlidersHorizontal, Target, ThumbsUp, Trash2, User, UsersRound, Verified, X, Bookmark, Building2, Globe2, Eye, Heart, CalendarDays, GraduationCap, Trophy, BookOpen, PenTool, Sparkles, Sliders } from 'lucide-react';
import { DemoUser, Experience, Project, Job, STORE_KEY, loadUser, seedUser } from './model';
import { z } from 'zod';
import { StoryPage } from './pages/story-page';
import { VaultPage } from './pages/vault-page';
import { ArcadePage } from './pages/arcade-page';
import { BenchmarkPage } from './pages/benchmark-page';
import { AtsPage } from './pages/ats-page';
import { PricingPage } from './pages/pricing-page';

const queryClient=new QueryClient();
const routes=[['Overview','/'],['Story','/story'],['Skills','/profile/skills'],['Experience','/profile/experience'],['Projects','/profile/projects'],['Posts','/profile/posts'],['Activity','/profile/activity']] as const;
const steps=['basics','successes','challenges','growth','learnings','summary'];
const stepTitles=['The essentials','Your proudest wins','The hard parts','How you grew','What you learned','Your story, together'];
const stepPrompts=['Tell us about the role you held.','What changed because you were there?','What felt difficult or uncertain?','How did this experience change your approach?','What would you carry into your next role?'];
const choicePrompts=[
 'A product team sees many people leaving a complex onboarding flow. What would you try first?',
 'A stakeholder asks for a dashboard full of metrics. How do you find the useful signal?',
 'Two user groups need different things from the same workflow. What is your best next move?',
 'A new feature is polished but rarely used. Where do you look before redesigning it?',
 'How would you make an unfamiliar financial task feel more trustworthy?'
];
const writtenPrompts=[
 'Describe a time you designed for people with conflicting needs. How did you approach the problem, and what changed?',
 'Tell us about a design decision you changed after hearing from users.',
 'How have you helped a cross-functional team move through uncertainty?',
 'Share a moment when a small interaction made a meaningful difference.',
 'What is one thing you learned from a project that did not go to plan?'
];

function App(){
 const [user,setUser]=useState<DemoUser>(()=>loadUser());
 const [toast,setToast]=useState('');
 const [location,navigate]=useLocation();
 const [menu,setMenu]=useState('');
 const [query,setQuery]=useState('');
 const [searchOpen,setSearchOpen]=useState(false);
 useEffect(()=>{localStorage.setItem(STORE_KEY,JSON.stringify(user));},[user]);
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[location]);
 const notify=(s:string)=>{setToast(s);window.setTimeout(()=>setToast(''),2600);};
 const patch=(fn:(u:DemoUser)=>DemoUser)=>setUser(u=>fn(u));
 const unread=user.notifications.filter(n=>n.unread).length;
 const hasPendingOffer=user.offers.some(o=>o.status==='Pending Signature');
 const signOut=()=>{patch(u=>({...u,signedIn:false}));navigate('/login');setMenu('');};
 return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}>
  {location==='/login'||location==='/register'||location==='/forgot-password'||!user.signedIn
   ? <AuthPage route={location} user={user} patch={patch} navigate={navigate} notify={notify}/>
   : location.startsWith('/onboarding')
    ? <OnboardingPage user={user} patch={patch} notify={notify} navigate={navigate}/>
    : <div className="app-shell">
      <header className="topbar">
       <Link href="/" className="brand" data-testid="link-brand"><img src="/images/rizza-logo.png" alt="Rizza" className="brand-logo-img"/></Link>
       <div className="search-wrap"><label className="searchbox"><Search size={16}/><input value={query} onFocus={()=>setSearchOpen(true)} onChange={e=>setQuery(e.target.value)} placeholder="Search people, jobs, or companies" aria-label="Search people, jobs, or companies" data-testid="input-search"/><kbd>⌘ K</kbd></label>{searchOpen&&query&&<div className="search-results">{[['People','/network'],['Roles','/jobs'],['Stories','/story'],['Projects','/profile/projects']].map(([label,href])=><Link href={href} key={label} onClick={()=>setSearchOpen(false)} data-testid={`search-result-${label.toLowerCase()}`}><Search size={14}/><span>Explore {label.toLowerCase()} for “{query}”</span><ArrowRight size={13}/></Link>)}</div>}</div>
       <div className="top-actions">
        {/* Recruiter / Candidate Workspace Switcher */}
        <Link href={location==='/ats'?'/':'/ats'} className="portal-switcher-btn" data-testid="button-portal-switcher">
         {location==='/ats'?<><User size={13}/><span>Candidate Space</span></>:<><Building2 size={13}/><span>Recruiter ATS</span></>}
        </Link>
        <button className="top-icon mobile-search-toggle" aria-label="Search" onClick={()=>setSearchOpen(v=>!v)} data-testid="button-mobile-search"><Search size={18}/></button>
        <Link className="top-icon desktop-top" href="/network" aria-label="Network" data-testid="link-top-network"><UsersRound size={18}/></Link>
        <Link className="top-icon desktop-top" href="/jobs" aria-label="Jobs" data-testid="link-top-jobs"><BriefcaseBusiness size={18}/></Link>
        <Link className="top-icon" href="/messages" aria-label="Messages" data-testid="link-top-messages"><MessageCircle size={18}/><i className="badge-dot">2</i></Link>
        <button className="top-icon" aria-label="Notifications" onClick={()=>navigate('/notifications')} data-testid="button-top-notifications"><Bell size={18}/>{unread>0&&<i className="badge-dot">{unread}</i>}</button>
        <button className="account-trigger" onClick={()=>setMenu(menu==='account'?'':'account')} data-testid="button-account-menu"><img src="/images/annie-portrait.png" alt=""/><ChevronDown size={13}/></button>
        {menu==='account'&&<div className="popover account-pop"><div className="account-mini"><img src="/images/annie-portrait.png" alt=""/><div><strong>{user.profile.name}</strong><small>{user.profile.title}</small></div></div><Link href="/" onClick={()=>setMenu('')} data-testid="menu-view-profile">View profile</Link><Link href="/story" onClick={()=>setMenu('')} data-testid="menu-story">STAR Storyteller</Link><Link href="/vault" onClick={()=>setMenu('')} data-testid="menu-vault">Digital Vault</Link><Link href="/settings" onClick={()=>setMenu('')} data-testid="menu-settings"><Settings size={15}/> Settings</Link><button onClick={signOut} data-testid="button-sign-out"><LogOut size={15}/> Sign out</button></div>}
       </div>
      </header>
      {searchOpen&&<button className="scrim-clear" aria-label="Close search" onClick={()=>{setSearchOpen(false);setQuery('')}} data-testid="button-close-search"/>}
      <aside className="sidebar">
       <div className="nav-label">YOUR SPACE</div>
       <SideLink href="/" icon={<Home/>} label="Home" active={location==='/'}/>
       <SideLink href="/story" icon={<BookOpen/>} label="STAR Story" active={location==='/story'} badge="AI"/>
       <SideLink href="/jobs" icon={<BriefcaseBusiness/>} label="Jobs & Match DNA" active={location.startsWith('/jobs')}/>
       <SideLink href="/vault" icon={<ShieldCheck/>} label="Digital Vault" active={location==='/vault'} badge={hasPendingOffer?'Offer':undefined}/>
       <SideLink href="/arcade" icon={<Trophy/>} label="Brand Arcade" active={location==='/arcade'} badge="XP"/>
       <SideLink href="/benchmark" icon={<Target/>} label="Benchmarks" active={location==='/benchmark'} badge="92%"/>
       <SideLink href="/ats" icon={<SlidersHorizontal/>} label="Recruiter ATS" active={location==='/ats'}/>
       <SideLink href="/network" icon={<UsersRound/>} label="My network" active={location==='/network'}/>
       <SideLink href="/messages" icon={<MessageCircle/>} label="Messages" active={location==='/messages'} badge="2"/>
       <SideLink href="/notifications" icon={<Bell/>} label="Notifications" active={location==='/notifications'} badge={unread?String(unread):undefined}/>

       <div className="nav-label nav-label-gap">LIVING PROFILE</div>
       {routes.slice(0,6).map(([label,href])=><SideLink key={href} href={href} icon={label==='Overview'?<Eye/>:label==='Story'?<BookOpen/>:label==='Skills'?<Layers/>:label==='Experience'?<BriefcaseBusiness/>:label==='Projects'?<FileText/>:<MessageCircle/>} label={label} active={href===location||href==='/'&&location==='/'} compact/>)}

       <div className="nav-bottom">
        <SideLink href="/assessment" icon={<Award/>} label="Assessments" active={location.startsWith('/assessment')}/>
        <SideLink href="/pricing" icon={<Crown/>} label="Pricing Plans" active={location==='/pricing'}/>
        <SideLink href="/help" icon={<CircleHelp/>} label="Help & support" active={location==='/help'}/>
       </div>
      </aside>
      <main className="main-area"><ErrorBoundary resetKey={location}><div key={location} className="page-transition-wrap"><Switch>
       <Route path="/" component={()=> <OverviewPage user={user} patch={patch} notify={notify} navigate={navigate}/>}/>
       <Route path="/story" component={()=> <StoryPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/vault" component={()=> <VaultPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/arcade" component={()=> <ArcadePage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/benchmark" component={()=> <BenchmarkPage user={user} notify={notify}/>}/>
       <Route path="/ats" component={()=> <AtsPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/pricing" component={()=> <PricingPage notify={notify}/>}/>
       <Route path="/profile/skills" component={()=> <SkillsPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/profile/experience" component={()=> <ExperiencePage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/profile/projects" component={()=> <ProjectsPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/profile/posts" component={()=> <PostsPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/profile/activity" component={()=> <ActivityPage user={user}/>}/>
       <Route path="/network" component={()=> <NetworkPage user={user} patch={patch} notify={notify} query={query}/>}/>
       <Route path="/jobs" component={()=> <JobsPage user={user} patch={patch} notify={notify} query={query} navigate={navigate}/>}/>
       <Route path="/jobs/:jobId" component={(props: any)=><JobDetail user={user} patch={patch} notify={notify} jobId={props?.params?.jobId ?? ''} navigate={navigate}/>}/>
       <Route path="/messages" component={()=> <MessagesPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/notifications" component={()=> <NotificationsPage user={user} patch={patch}/>}/>
       <Route path="/assessment" component={()=> <AssessmentHome user={user} navigate={navigate}/>}/>
       <Route path="/assessment/choice" component={()=> <AssessmentQuestion user={user} patch={patch} notify={notify} kind="choice" navigate={navigate}/>}/>
       <Route path="/assessment/answer" component={()=> <AssessmentQuestion user={user} patch={patch} notify={notify} kind="answer" navigate={navigate}/>}/>
       <Route path="/assessment/results" component={()=> <AssessmentResults user={user}/>}/>
       <Route path="/settings" component={()=> <SettingsPage user={user} patch={patch} notify={notify}/>}/>
       <Route path="/help" component={()=> <HelpPage/>}/>
       <Route component={NotFoundPage}/>
      </Switch></div></ErrorBoundary></main>
      {menu==='more'&&<div className="mobile-more"><Link href="/story">STAR Story</Link><Link href="/vault">Digital Vault</Link><Link href="/arcade">Brand Arcade</Link><Link href="/benchmark">Benchmarks</Link><Link href="/ats">Recruiter ATS</Link><Link href="/pricing">Pricing Plans</Link><Link href="/profile/activity">Activity</Link><Link href="/assessment">Assessment</Link><Link href="/settings">Settings</Link><Link href="/help">Help</Link></div>}
      <nav className="mobile-nav" data-testid="nav-mobile"><Link href="/" data-testid="mobile-home"><Home/><span>Home</span></Link><Link href="/story" data-testid="mobile-story"><BookOpen/><span>Story</span></Link><Link href="/jobs" data-testid="mobile-jobs"><BriefcaseBusiness/><span>Jobs</span></Link><Link href="/vault" data-testid="mobile-vault"><ShieldCheck/><span>Vault</span></Link><Link href="/arcade" data-testid="mobile-arcade"><Trophy/><span>Arcade</span></Link><button onClick={()=>setMenu(menu==='more'?'':'more')} data-testid="button-mobile-more"><Menu/><span>More</span></button></nav>
      {toast&&<div className="toast" role="status" data-testid="status-toast"><CheckCircle2 size={17}/>{toast}</div>}
     </div>}
  <Toaster/>
 </WouterRouter></TooltipProvider></QueryClientProvider>;
}

function SideLink({href,icon,label,active,badge,compact=false}:{href:string;icon:ReactNode;label:string;active:boolean;badge?:string;compact?:boolean}){
 return <Link href={href} className={`side-link ${active?'active':''} ${compact?'compact':''}`} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ','-')}`}>{icon}<span>{label}</span>{badge&&<b className="nav-badge">{badge}</b>}</Link>;
}
function PageHead({eyebrow,title,description,action}:{eyebrow?:string;title:string;description?:string;action?:ReactNode}){
 return <div className="page-head"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>{action}</div>;
}
function ProfileTabs({active}:{active:string}){
 return <nav className="profile-tabs" aria-label="Profile sections">{routes.map(([name,href])=><Link key={name} href={href} className={active===name?'active':''} data-testid={`tab-${name.toLowerCase()}`}>{name}</Link>)}</nav>;
}
function Panel({children,className='',...props}:{children:ReactNode;className?:string;[key:string]:any}){
 return <section className={`panel ${className}`} {...props}>{children}</section>;
}
function ProfileHero({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [editing,setEditing]=useState(false),[draft,setDraft]=useState(user.profile);
 useEffect(()=>setDraft(user.profile),[user.profile]);
 return <Panel className="profile-hero" data-testid="card-profile">
  <div className="portrait-wrap"><img className="portrait-img" src="/images/annie-portrait.png" alt="Annie Stanley"/><span className="availability"><i/>{user.profile.availability}</span></div>
  <div className="hero-copy"><div className="hero-titleline"><h1 data-testid="text-profile-name">{user.profile.name}</h1><Verified size={17}/></div><div className="role" data-testid="text-profile-title">{user.profile.title}</div><div className="meta-line"><span><MapPin/>{user.profile.location}</span><span><BriefcaseBusiness/>{user.profile.experienceYears}</span></div><p className="bio">{user.profile.bio}</p><button className="readmore" onClick={()=>setEditing(v=>!v)} data-testid="button-edit-profile-inline"><Pencil size={13}/> Edit profile</button></div>
  <div className="hero-actions"><button className="icon-btn" onClick={()=>{navigator.clipboard?.writeText(user.profile.website);notify('Profile link copied to clipboard')}} aria-label="Share profile" data-testid="button-share-profile"><Share2 size={16}/></button><button className="primary-btn" onClick={()=>setEditing(true)} data-testid="button-edit-profile">Edit profile <Pencil size={14}/></button></div>
  {editing&&<div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setEditing(false)}}><form className="modal profile-modal" onSubmit={e=>{e.preventDefault();patch(u=>({...u,profile:draft}));setEditing(false);notify('Your profile is up to date')}} data-testid="form-profile-edit"><div className="modal-head"><div><div className="eyebrow">YOUR PROFILE</div><h2>Make it sound like you</h2></div><button type="button" className="icon-btn" onClick={()=>setEditing(false)} aria-label="Close" data-testid="button-close-profile-edit"><X/></button></div><label>Full name<input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} data-testid="input-profile-name"/></label><label>Professional title<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} data-testid="input-profile-title"/></label><label>Location<input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})} data-testid="input-profile-location"/></label><label>About<textarea value={draft.bio} onChange={e=>setDraft({...draft,bio:e.target.value})} rows={4} data-testid="input-profile-bio"/></label><button className="primary-btn" type="submit" data-testid="button-save-profile"><Check size={15}/> Save changes</button></form></div>}
 </Panel>;
}
function OverviewPage({user,patch,notify,navigate}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;navigate:(path:string)=>void}){
 const pendingOffer=user.offers.find(o=>o.status==='Pending Signature');
 return <div className="content-width">
  {pendingOffer&&(
   <div className="panel pending-offer-banner" data-testid="banner-pending-offer">
    <div className="offer-banner-copy">
     <span className="offer-pulse-dot"/>
     <div>
      <span className="eyebrow">OFFICIAL OFFER LETTER READY TO EXECUTE</span>
      <strong>{pendingOffer.company} · {pendingOffer.role} ({pendingOffer.salary})</strong>
      <p>Your verified case studies and technical signals have been approved. Review contract terms & digital e-signature.</p>
     </div>
    </div>
    <Link href="/vault" className="primary-btn glow-btn" data-testid="link-overview-review-offer">
     <PenTool size={14}/> Review & E-Sign <ArrowRight size={14}/>
    </Link>
   </div>
  )}

  <div className="welcome-line">
   <div>
    <span className="eyebrow">MONDAY, MAY 19</span>
    <h1>Good morning, {user.profile.name.split(' ')[0]}<span className="welcome-dot">.</span></h1>
    <p>Your living career space is active. Review opportunities, benchmark signals, and verified proof of work.</p>
   </div>
   <div className="welcome-actions">
    <Link href="/story" className="quiet-btn" data-testid="link-overview-story">
     <BookOpen size={14}/> STAR Studio
    </Link>
    <button className="quiet-btn" onClick={()=>navigate('/profile/activity')} data-testid="button-view-activity">
     <Activity size={15}/> Activity
    </button>
   </div>
  </div>

  <ProfileHero user={user} patch={patch} notify={notify}/>
  <ProfileTabs active="Overview"/>

  <div className="overview-layout">
   <div className="overview-main">
    {/* Quick Feature Studio Tiles */}
    <div className="overview-studios-strip">
     <Link href="/story" className="panel studio-tile">
      <div className="studio-top">
       <span className="studio-icon s-ai"><BookOpen size={17}/></span>
       <span className="badge-pill">AI Assisted</span>
      </div>
      <strong>STAR Storyteller Studio</strong>
      <p>2 verified narrative case studies published to your Life Page.</p>
      <span className="studio-link">Open Storyteller <ArrowRight size={13}/></span>
     </Link>

     <Link href="/benchmark" className="panel studio-tile">
      <div className="studio-top">
       <span className="studio-icon s-bench"><Target size={17}/></span>
       <span className="badge-pill">Top 8%</span>
      </div>
      <strong>Benchmark Studio</strong>
      <p>Composite score 87/100 · 92nd percentile worldwide.</p>
      <span className="studio-link">View diagnostics <ArrowRight size={13}/></span>
     </Link>

     <Link href="/arcade" className="panel studio-tile">
      <div className="studio-top">
       <span className="studio-icon s-xp"><Trophy size={17}/></span>
       <span className="badge-pill">Rank #4</span>
      </div>
      <strong>Brand Arcade Jam</strong>
      <p>Linear $5,000 Interaction Challenge active now.</p>
      <span className="studio-link">Explore challenges <ArrowRight size={13}/></span>
     </Link>
    </div>

    <div className="section-intro">
     <div>
      <div className="eyebrow">YOUR STORY</div>
      <h2>Skills & strengths</h2>
      <p>What you bring to the table, and where you're growing.</p>
     </div>
     <Link className="text-link" href="/profile/skills" data-testid="link-edit-skills">Manage skills <ArrowRight size={14}/></Link>
    </div>

    <div className="overview-skill-grid">
     {user.skills.slice(0,4).map((skill,i)=><div className="skill-tile" key={skill.id} data-testid={`skill-${skill.id}`}>
      <div className="skill-top">
       <span className={`skill-symbol s${i}`}>{i===0?<UsersRound size={16}/>:i===1?<Search size={16}/>:i===2?<SlidersHorizontal size={16}/>:<Layers size={16}/>}</span>
       <span className="skill-level">{skill.level}</span>
      </div>
      <strong>{skill.name}</strong>
      <div className="skill-track"><i style={{width:`${skill.proficiency}%`}}/></div>
      <small>{skill.proficiency}% confidence</small>
     </div>)}
    </div>

    <div className="panel quote">
     <span className="quote-mark">“</span>
     <p>Design is not just what it looks like and feels like.<br/>Design is how it works.<br/><em>— Steve Jobs</em></p>
     <span className="quote-caption">A thought I come back to</span>
    </div>

    <Panel className="work-panel">
     <div className="section-head">
      <div>
       <div className="eyebrow">SELECTED WORK & PROOFS</div>
       <h2>Work that speaks for itself</h2>
      </div>
      <Link className="text-link" href="/profile/projects" data-testid="link-view-projects">View all work <ArrowRight size={14}/></Link>
     </div>
     <div className="featured-projects">
      {user.projects.slice(0,3).map(p=><ProjectTile key={p.id} project={p} onClick={()=>navigate('/profile/projects')}/>)}
     </div>
    </Panel>
   </div>

   <aside className="overview-aside">
    <Panel className="journey-panel">
     <div className="section-head">
      <div>
       <div className="eyebrow">THE JOURNEY</div>
       <h2>Experience</h2>
      </div>
      <Link className="icon-link" href="/profile/experience" aria-label="View experience" data-testid="link-view-experience"><ArrowRight size={16}/></Link>
     </div>
     <div className="timeline-mini">
      {user.experience.slice(0,3).map((x,i)=><div className="journey-item" key={x.id}>
       <i className="timeline-dot"/>
       <div>
        <strong>{x.title}</strong>
        <span>{x.company}</span>
        <small>{x.start} – {x.end} · {x.location}</small>
       </div>
      </div>)}
     </div>
     <Link className="subtle-link" href="/profile/experience" data-testid="link-view-timeline">See full timeline <ArrowRight size={13}/></Link>
    </Panel>

    <Panel className="traits-panel">
     <div className="eyebrow">THE HUMAN SIDE</div>
     <h2>What defines me</h2>
     {[['The Builder','I turn ideas into intuitive, scalable solutions.',<Rocket size={16}/>],['ENFP','Enthusiastic · Creative · Empathetic',<UsersRound/>],['Impact-driven','I care about solving the right problems.',<Target/>]].map(([a,b,ic])=><div className="trait-row" key={String(a)}><span>{ic}</span><div><strong>{String(a)}</strong><small>{String(b)}</small></div></div>)}
    </Panel>

    <Panel className="contact-panel">
     <div className="eyebrow">LET’S CONNECT</div>
     <h2>Good work starts<br/>with a conversation.</h2>
     <p>Open to interesting problems and kind people.</p>
     <div className="contact-email">
      {user.profile.email}
      <button onClick={()=>{navigator.clipboard?.writeText(user.profile.email);notify('Email copied')}} aria-label="Copy email" data-testid="button-copy-email"><Share2 size={15}/></button>
     </div>
    </Panel>

    <Panel className="assessment-teaser">
     <span className="teaser-icon"><Award size={19}/></span>
     <div>
      <strong>Show what you know</strong>
      <p>Take a short skills assessment and add a verified signal to your profile.</p>
      <Link href="/assessment" data-testid="link-start-assessment">Explore assessment <ArrowRight size={13}/></Link>
     </div>
    </Panel>
   </aside>
  </div>
 </div>;
}

function ProjectTile({project,onClick}:{project:Project;onClick:()=>void}){
 return <button className="featured-tile" onClick={onClick} data-testid={`button-featured-${project.id}`}>
  <img src={project.image} alt={`${project.name} project preview`}/>
  <span className="featured-caption">
   <strong>{project.name}</strong>
   <small>{project.description}</small>
  </span>
  <ArrowRight size={16}/>
 </button>;
}

function SkillModal({onClose,onSave,initial}:{onClose:()=>void;onSave:(name:string,level:string,proficiency:number)=>void;initial?:{name:string;level:string;proficiency:number}}){
 const [name,setName]=useState(initial?.name??''),[level,setLevel]=useState(initial?.level??'Intermediate'),[proficiency,setProficiency]=useState(initial?.proficiency??70);
 return <Modal title={initial?'Refine your skill':'Add a skill'} eyebrow="YOUR TOOLKIT" onClose={onClose} testId="dialog-skill"><label>Skill name<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Service design" data-testid="input-skill-name"/></label><label>Proficiency<select value={level} onChange={e=>setLevel(e.target.value)} data-testid="select-skill-level">{['Beginner','Intermediate','Advanced','Expert'].map(x=><option key={x}>{x}</option>)}</select></label><label className="range-field">Confidence <span>{proficiency}%</span><input type="range" min="10" max="100" value={proficiency} onChange={e=>setProficiency(Number(e.target.value))} data-testid="input-skill-proficiency"/></label><button className="primary-btn full-btn" onClick={()=>{if(name.trim())onSave(name.trim(),level,proficiency)}} data-testid="button-save-skill"><Check size={15}/> Save skill</button></Modal>;
}

function SkillsPage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [modal,setModal]=useState<null|{id?:string}>(null);
 const edit=modal?.id?user.skills.find(s=>s.id===modal.id):undefined;
 return <div className="content-width"><PageHead eyebrow="YOUR PROFILE / SKILLS" title="A living toolkit." description="The skills, instincts and craft you bring to the work." action={<button className="primary-btn" onClick={()=>setModal({})} data-testid="button-add-skill"><Plus size={16}/> Add a skill</button>}/><ProfileTabs active="Skills"/>
 <div className="skills-layout"><div className="skills-list">{user.skills.map((s,i)=><Panel className="skill-manage" key={s.id} data-testid={`card-skill-${s.id}`}><div className="skill-manage-icon">{i+1<10?`0${i+1}`:i+1}</div><div className="skill-manage-main"><div className="skill-manage-top"><div><h3>{s.name}</h3><p>{s.level} · {s.proficiency}% confidence</p></div><div className="row-actions"><button className="icon-btn" onClick={()=>setModal({id:s.id})} aria-label={`Edit ${s.name}`} data-testid={`button-edit-skill-${s.id}`}><Pencil size={15}/></button><button className="icon-btn danger" onClick={()=>{if(window.confirm(`Remove ${s.name} from your profile?`))patch(u=>({...u,skills:u.skills.filter(x=>x.id!==s.id)}))}} aria-label={`Delete ${s.name}`} data-testid={`button-delete-skill-${s.id}`}><Trash2 size={15}/></button></div></div><div className="skill-track large"><i style={{width:`${s.proficiency}%`}}/></div></div></Panel>)}
 {user.skills.length===0&&<EmptyState icon={<Layers size={24}/>} title="A blank canvas" text="Add the skills you want opportunities to find." action={<button className="primary-btn" onClick={()=>setModal({})} data-testid="button-add-first-skill">Add your first skill</button>}/>}</div>
 <div className="stack"><Panel className="note-panel"><div className="eyebrow">A SMALL NOTE</div><h2>Specific beats impressive.</h2><p>Choose the skills you use in real work. A clear level helps people understand where you are today, not where you hope to be someday.</p></Panel><Panel className="profile-score"><span className="score-ring"><strong>{Math.min(99,56+user.skills.length*7)}%</strong></span><div><strong>Profile momentum</strong><p>Your skills make your experience easier to discover.</p></div></Panel></div></div>
 {modal&&<SkillModal initial={edit} onClose={()=>setModal(null)} onSave={(name,level,proficiency)=>{patch(u=>({...u,skills:edit?u.skills.map(x=>x.id===edit.id?{...x,name,level,proficiency}:x):[...u.skills,{id:`skill-${Date.now()}`,name,level,proficiency}]}));setModal(null);notify('Skill saved to your profile')}}/>}</div>;
}

function ExperiencePage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [editing,setEditing]=useState<Experience|null|false>(false);
 return <div className="content-width"><PageHead eyebrow="YOUR PROFILE / EXPERIENCE" title="The work behind the work." description="A career is more than titles. Make room for the choices and impact along the way." action={<button className="primary-btn" onClick={()=>setEditing(null)} data-testid="button-add-experience"><Plus size={16}/> Add experience</button>}/><ProfileTabs active="Experience"/>
 <div className="experience-layout"><div className="experience-timeline">{user.experience.map((x,i)=><article className="experience-card" key={x.id} data-testid={`card-experience-${x.id}`}><div className="timeline-rail"><span>{i===0?<BriefcaseBusiness size={15}/>:<Building2 size={15}/>}</span></div><Panel className="experience-body"><div className="experience-card-head"><div><div className="eyebrow">{x.type} · {x.location}</div><h2>{x.title}</h2><div className="company-line">{x.company}<i/> {x.start} – {x.end}</div></div><button className="icon-btn" onClick={()=>setEditing(x)} aria-label={`Edit ${x.title}`} data-testid={`button-edit-experience-${x.id}`}><Pencil size={15}/></button></div><p>{x.description}</p><div className="impact-chips"><span><Target size={13}/> Product thinking</span><span><UsersRound size={13}/> Cross-functional</span></div></Panel></article>)}<Panel className="education-card"><div className="timeline-rail"><span><GraduationCap size={16}/></span></div><div><div className="eyebrow">EDUCATION</div>{user.education.map(e=><div key={e.id}><h3>{e.degree}</h3><p>{e.school} · {e.years}</p></div>)}</div></Panel></div><Panel className="experience-aside"><div className="eyebrow">YOUR THROUGH-LINE</div><h2>From making things work to making work matter.</h2><p>Each chapter adds a new perspective. Your profile brings them together in one place.</p><div className="stat-pair"><span><strong>{user.experience.length}</strong><small>Career chapters</small></span><span><strong>{user.profile.experienceYears.replace(' Exp.','')}</strong><small>In the making</small></span></div><button className="quiet-btn" onClick={()=>setEditing(null)} data-testid="button-add-another-experience"><Plus size={15}/> Add a chapter</button></Panel></div>
 {editing!==false&&<ExperienceDialog initial={editing||undefined} close={()=>setEditing(false)} save={x=>{patch(u=>({...u,experience:editing?u.experience.map(a=>a.id===x.id?x:a):[x,...u.experience]}));setEditing(false);notify('Career chapter saved')}}/>}</div>;
}

function ExperienceDialog({initial,close,save}:{initial?:Experience;close:()=>void;save:(x:Experience)=>void}){
 const [form,setForm]=useState<Experience>(initial??{id:`exp-${Date.now()}`,title:'',company:'',type:'Full-time',location:'',start:'2024',end:'Present',description:''});
 return <Modal title={initial?'Edit this chapter':'Add a chapter'} eyebrow="YOUR CAREER STORY" onClose={close} testId="dialog-experience"><label>Role title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} data-testid="input-experience-title"/></label><label>Company<input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} data-testid="input-experience-company"/></label><div className="form-two"><label>Started<input value={form.start} onChange={e=>setForm({...form,start:e.target.value})} data-testid="input-experience-start"/></label><label>Ended<input value={form.end} onChange={e=>setForm({...form,end:e.target.value})} data-testid="input-experience-end"/></label></div><label>Location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} data-testid="input-experience-location"/></label><label>What did you work on?<textarea rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} data-testid="input-experience-description"/></label><button className="primary-btn full-btn" disabled={!form.title.trim()||!form.company.trim()} onClick={()=>save(form)} data-testid="button-save-experience">Save career chapter <ArrowRight size={15}/></button></Modal>;
}

function ProjectsPage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [filter,setFilter]=useState('All work'),[modal,setModal]=useState(false),[active,setActive]=useState<Project|null>(null),[edit,setEdit]=useState<Project|null>(null),[term,setTerm]=useState('');
 const filters=['All work','Mobile App','Web App','Design System'];
 const visible=user.projects.filter(p=>(filter==='All work'||p.category===filter)&&p.name.toLowerCase().includes(term.toLowerCase()));
 return <div className="content-width"><PageHead eyebrow="YOUR PROFILE / SELECTED WORK" title="Make the work tangible." description="Give people a closer look at how you think, shape and ship." action={<button className="primary-btn" onClick={()=>{setEdit(null);setModal(true)}} data-testid="button-add-project"><Plus size={16}/> Add a project</button>}/><ProfileTabs active="Projects"/>
 <Panel className="project-toolbar"><div><div className="eyebrow">CASE STUDIES</div><h2>{user.projects.length} projects, each with a point of view.</h2></div><label className="mini-search"><Search size={15}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Find a project" data-testid="input-project-search"/></label></Panel><div className="filter-row">{filters.map(f=><button key={f} className={`filter-chip ${filter===f?'selected':''}`} onClick={()=>setFilter(f)} data-testid={`filter-project-${f.toLowerCase().replaceAll(' ','-')}`}>{f}</button>)}</div>
 <div className="project-grid-page">{visible.map(p=><article className="project-card" key={p.id} data-testid={`card-project-${p.id}`}><button className="project-image" onClick={()=>setActive(p)} aria-label={`Open ${p.name}`} data-testid={`button-open-project-${p.id}`}><img src={p.image} alt={`${p.name} case study`}/><span className="image-overlay">Open case study <ArrowRight size={14}/></span></button><div className="project-card-copy"><div className="project-meta"><span>{p.category}</span><span>{p.year}</span></div><div className="project-titleline"><h3>{p.name}</h3><button className="more-btn" onClick={()=>setEdit(p)} aria-label={`Edit ${p.name}`} data-testid={`button-edit-project-${p.id}`}><Pencil size={15}/></button></div><p>{p.description}</p><div className="pills">{p.tools.map(t=><span className="pill" key={t}>{t}</span>)}</div></div></article>)}</div>
 {visible.length===0&&<EmptyState icon={<FileText/>} title="Nothing here just yet" text="Try another filter or add a new project to your story." action={<button className="primary-btn" onClick={()=>setModal(true)} data-testid="button-add-project-empty">Add a project</button>}/>}
 {active&&<Modal title={active.name} eyebrow={`${active.category} · ${active.year}`} onClose={()=>setActive(null)} testId="dialog-project"><img className="case-image" src={active.image} alt={`${active.name} preview`}/><p className="case-description">{active.description} The work began with listening closely, mapping the moments that mattered, and testing the smallest useful next step.</p><div className="pills">{active.tools.map(t=><span className="pill" key={t}>{t}</span>)}</div><div className="case-actions"><button className="quiet-btn" onClick={()=>{setEdit(active);setActive(null)}} data-testid="button-case-edit"><Pencil size={14}/> Edit details</button><button className="primary-btn" onClick={()=>{navigator.clipboard?.writeText(`${location.origin}/profile/projects#${active.id}`);notify('Project link copied')}} data-testid="button-share-project"><Share2 size={14}/> Share project</button></div></Modal>}
 {(modal||edit)&&<ProjectDialog initial={edit||undefined} close={()=>{setModal(false);setEdit(null)}} save={p=>{patch(u=>({...u,projects:p.id==='__DELETE__'?u.projects.filter(x=>x.id!==edit?.id):edit?u.projects.map(x=>x.id===p.id?p:x):[p,...u.projects]}));setModal(false);setEdit(null);notify(p.id==='__DELETE__'?'Project removed':'Project saved')}}/>}
 </div>;
}

function ProjectDialog({initial,close,save}:{initial?:Project;close:()=>void;save:(p:Project)=>void}){
 const [form,setForm]=useState<Project>(initial??{id:`project-${Date.now()}`,name:'',category:'Mobile App',description:'',tools:['Product design'],image:'/images/finmate.png',year:'2025'});
 return <Modal title={initial?'Edit project':'Add a project'} eyebrow="SELECTED WORK" onClose={close} testId="dialog-project-edit"><label>Project name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} data-testid="input-project-name"/></label><label>Short description<textarea rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} data-testid="input-project-description"/></label><label>Type<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} data-testid="select-project-category">{['Mobile App','Web App','Design System','Branding'].map(x=><option key={x}>{x}</option>)}</select></label><label>Preview image<select value={form.image} onChange={e=>setForm({...form,image:e.target.value})} data-testid="select-project-image">{[['FinMate','/images/finmate.png'],['HealthTrack','/images/healthtrack.png'],['TravelEase','/images/travelease.png'],['TaskFlow','/images/taskflow.png'],['Rizza design system','/images/rizza-design-system.png'],['Shoply','/images/shoply.png']].map(([n,v])=><option key={v} value={v}>{n}</option>)}</select></label><div className="form-actions">{initial&&<button className="quiet-btn danger-text" onClick={()=>{if(window.confirm('Delete this project?'))save({...form,id:'__DELETE__'})}} data-testid="button-delete-project"><Trash2 size={14}/> Delete</button>}<button className="primary-btn" disabled={!form.name.trim()} onClick={()=>save(form)} data-testid="button-save-project"><Check size={15}/> Save project</button></div></Modal>;
}

function PostsPage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [editing,setEditing]=useState<string|null|false>(false),[body,setBody]=useState('');
 const selected=editing?user.posts.find(p=>p.id===editing):undefined;
 const submit=()=>{if(!body.trim())return;patch(u=>({...u,posts:editing?u.posts.map(p=>p.id===editing?{...p,body}:p):[{id:`post-${Date.now()}`,body,date:'Just now',likes:0,liked:false},...u.posts]}));setBody('');setEditing(false);notify(editing?'Post updated':'Your post is live');};
 return <div className="content-width"><PageHead eyebrow="YOUR PROFILE / NOTES FROM THE FIELD" title="A voice in the room." description="Ideas, reflections and small discoveries worth sharing." action={<button className="primary-btn" onClick={()=>{setEditing(null);setBody('')}} data-testid="button-create-post"><Plus size={16}/> Write a post</button>}/><ProfileTabs active="Posts"/>
 <div className="posts-layout"><div className="post-feed">{editing!==false&&<Panel className="composer" data-testid="form-post"><div className="composer-head"><img src="/images/annie-portrait.png" alt=""/><div><strong>{user.profile.name}</strong><small>Share something thoughtful</small></div></div><textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="What have you been thinking about lately?" rows={5} data-testid="input-post-body"/><div className="composer-footer"><span>{body.length}/1200</span><button className="primary-btn" disabled={!body.trim()} onClick={submit} data-testid="button-publish-post">{selected?'Save changes':'Publish post'} <Send size={14}/></button></div></Panel>}
 {user.posts.map(p=><Panel className="post-card" key={p.id} data-testid={`card-post-${p.id}`}><div className="post-author"><img src="/images/annie-portrait.png" alt=""/><div><strong>{user.profile.name}<Verified size={13}/></strong><small>{user.profile.title} · {p.date}</small></div><button className="more-btn" aria-label="Post actions" onClick={()=>{setEditing(p.id);setBody(p.body)}} data-testid={`button-edit-post-${p.id}`}><Pencil size={15}/></button></div><p className="post-body">{p.body}</p><div className="post-stats"><span><Heart size={14}/>{p.likes} appreciations</span><span>Share a perspective</span></div><div className="post-actions"><button className={p.liked?'liked':''} onClick={()=>patch(u=>({...u,posts:u.posts.map(x=>x.id===p.id?{...x,liked:!x.liked,likes:x.likes+(x.liked?-1:1)}:x)}))} data-testid={`button-like-post-${p.id}`}><ThumbsUp size={15}/>{p.liked?'Appreciated':'Appreciate'}</button><button onClick={()=>{setEditing(p.id);setBody(p.body)}} data-testid={`button-update-post-${p.id}`}><Pencil size={15}/> Edit</button><button onClick={()=>{if(window.confirm('Delete this post?'))patch(u=>({...u,posts:u.posts.filter(x=>x.id!==p.id)}))}} data-testid={`button-delete-post-${p.id}`}><Trash2 size={15}/> Delete</button></div></Panel>)}
 {user.posts.length===0&&<EmptyState icon={<MessageCircle/>} title="Start the conversation" text="Share a thought from your work or a lesson you learned along the way." action={<button className="primary-btn" onClick={()=>setEditing(null)} data-testid="button-first-post">Write your first post</button>}/>}</div>
 <Panel className="post-aside"><div className="eyebrow">A GOOD PLACE TO START</div><h2>Small moments make good stories.</h2><p>A design decision you changed. A question you keep asking. A lesson from a project that didn't go to plan.</p><div className="prompt-item"><Lightbulb size={16}/> What surprised you this week?</div><div className="prompt-item"><Target size={16}/> What did you make easier?</div><div className="prompt-item"><UsersRound size={16}/> Who changed your perspective?</div></Panel></div></div>;
}

function ActivityPage({user}:{user:DemoUser}){
 const events=[...user.notifications.map(n=>({id:n.id,title:n.title,body:n.body,date:n.date,icon:<Bell/>})),...user.appliedJobIds.map(id=>({id:`applied-${id}`,title:'You applied to a role',body:user.jobs.find(j=>j.id===id)?.title??'A new role',date:'Recently',icon:<BriefcaseBusiness/>})),...user.projects.slice(0,2).map(p=>({id:`project-${p.id}`,title:`${p.name} is part of your story`,body:'Project added to selected work',date:p.year,icon:<FileText/>}))];
 return <div className="content-width"><PageHead eyebrow="YOUR PROFILE / RECENT MOMENTS" title="A little momentum." description="The things you've been building, sharing and moving toward."/><ProfileTabs active="Activity"/><div className="activity-layout"><Panel className="activity-feed"><div className="section-head"><div><div className="eyebrow">RECENT ACTIVITY</div><h2>Your story, in motion</h2></div><span className="live-label"><i/> Updated just now</span></div>{events.map(e=><div className="activity-item" key={e.id}><span className="activity-icon">{e.icon}</span><div><strong>{e.title}</strong><p>{e.body}</p><small>{e.date}</small></div></div>)}</Panel><div className="stack"><Panel className="note-panel"><div className="eyebrow">A GOOD RHYTHM</div><h2>Keep showing the work.</h2><p>Small updates help the right people understand what you're interested in and how you think.</p></Panel><Link className="callout-link" href="/profile/posts" data-testid="link-create-post"><span><MessageCircle/></span><div><strong>Share a thought</strong><small>Write a post for your network</small></div><ArrowRight/></Link></div></div></div>;
}

function NetworkPage({user,patch,notify,query}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;query:string}){
 const [tab,setTab]=useState('Discover'),[term,setTerm]=useState('');
 const incoming=user.connections.filter(c=>c.status==='incoming');
 const found=user.connections.filter(c=>(tab==='Discover'?c.status==='suggested':tab==='Your connections'?c.status==='connected':c.status==='incoming')&&`${c.name} ${c.title} ${c.company}`.toLowerCase().includes((term||query).toLowerCase()));
 const action=(id:string,status:'connected'|'incoming'|'suggested')=>patch(u=>({...u,connections:u.connections.map(c=>c.id===id?{...c,status}:c)}));
 return <div className="content-width"><PageHead eyebrow="YOUR COMMUNITY" title="Good people, good work." description="Find designers who share your curiosity, not just your job title." action={<span className="network-count"><UsersRound size={16}/>{user.connections.filter(c=>c.status==='connected').length} connections</span>}/><div className="network-tabs">{['Discover','Your connections',`Requests${incoming.length?` · ${incoming.length}`:''}`].map(t=><button key={t} className={tab===t||t.startsWith('Requests')&&tab==='Requests'?'active':''} onClick={()=>setTab(t.startsWith('Requests')?'Requests':t)} data-testid={`tab-network-${t.split(' ')[0].toLowerCase()}`}>{t}</button>)}</div><label className="wide-search"><Search size={17}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search by name, role or company" data-testid="input-network-search"/><SlidersHorizontal size={16}/></label>
 <div className="people-grid">{found.map((c,i)=><Panel className="person-card" key={c.id} data-testid={`card-connection-${c.id}`}><div className={`person-color person-color-${i%4}`}>{c.name.split(' ').map(x=>x[0]).join('')}</div><h3>{c.name}</h3><p>{c.title}</p><small>{c.company}</small><div className="mutual-line"><UsersRound size={13}/> {i+3} mutual connections</div>{c.status==='incoming'?<div className="person-actions"><button className="primary-btn" onClick={()=>{action(c.id,'connected');notify(`${c.name} is now in your network`)}} data-testid={`button-accept-${c.id}`}><Check size={14}/> Accept</button><button className="quiet-btn" onClick={()=>action(c.id,'suggested')} data-testid={`button-ignore-${c.id}`}>Ignore</button></div>:c.status==='connected'?<button className="outline-btn full-btn" onClick={()=>notify(`You and ${c.name} are connected`)} data-testid={`button-connected-${c.id}`}><Check size={14}/> Connected</button>:<button className="primary-btn full-btn" onClick={()=>{action(c.id,'incoming');notify(`Connection request sent to ${c.name}`)}} data-testid={`button-connect-${c.id}`}>Connect <Plus size={14}/></button>}</Panel>)}</div>{found.length===0&&<EmptyState icon={<UsersRound/>} title="Your people will find you" text="Try another search, or check back as your network grows."/>}</div>;
}

function JobsPage({user,patch,notify,query,navigate}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;query:string;navigate:(p:string)=>void}){
 const [search,setSearch]=useState('');
 const [department,setDepartment]=useState('All Departments');
 const [mode,setMode]=useState('All Styles');
 const [exp,setExp]=useState('All Experience');
 const [minMatch,setMinMatch]=useState(0);
 const [tab,setTab]=useState<'all'|'saved'|'applied'>('all');
 const [sort,setSort]=useState<'match'|'salary'>('match');
 const [applyJob,setApplyJob]=useState<Job|null>(null);
 const [applyNote,setApplyNote]=useState('');
 const [videoPitchAdded,setVideoPitchAdded]=useState(true);

 const jobs=user.jobs.filter(j=>{
  const matchesSearch=`${j.title} ${j.company} ${j.location} ${j.tags.join(' ')}`.toLowerCase().includes((search||query).toLowerCase());
  const matchesDept=department==='All Departments'||j.department===department;
  const matchesMode=mode==='All Styles'||j.mode===mode;
  const matchesExp=exp==='All Experience'||j.experienceLevel.includes(exp);
  const matchesMinMatch=j.matchScore>=minMatch;
  const matchesTab=tab==='all'||(tab==='saved'&&user.savedJobIds.includes(j.id))||(tab==='applied'&&user.appliedJobIds.includes(j.id));
  return matchesSearch&&matchesDept&&matchesMode&&matchesExp&&matchesMinMatch&&matchesTab;
 }).sort((a,b)=>{
  if(sort==='match')return b.matchScore-a.matchScore;
  return b.salary.localeCompare(a.salary);
 });

 const handleApplySubmit=()=>{
  if(!applyJob)return;
  patch(u=>({
   ...u,
   appliedJobIds:[...new Set([...u.appliedJobIds,applyJob.id])],
   notifications:[
    {
     id:`app-${Date.now()}`,
     title:`Application Submitted: ${applyJob.title}`,
     body:`Your profile ${videoPitchAdded?'with 1-min video pitch':''} was dispatched to ${applyJob.company}.`,
     date:'Just now',
     unread:true
    },
    ...u.notifications
   ]
  }));
  notify(`Application submitted to ${applyJob.company}!`);
  setApplyJob(null);
  setApplyNote('');
 };

 return <div className="content-width">
  <div className="jobs-heading">
   <div>
    <div className="eyebrow">AI JOB DNA MATCHING · FLOW 5 (C-44 TO C-55)</div>
    <h1>Find roles aligned with your DNA.</h1>
    <p>Ranked opportunities based on verified skill percentiles, culture fit, and autonomy expectations.</p>
   </div>
   <span className="job-count"><Sparkles size={15}/> {jobs.length} high-confidence matches</span>
  </div>

  {/* Search Bar & Tabs */}
  <Panel className="job-search-panel">
   <label>
    <Search size={17}/>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search role, skills (Figma, Tokens, Systems), or company" data-testid="input-job-search"/>
   </label>
   <div className="job-view-tabs">
    <button className={tab==='all'?'active':''} onClick={()=>setTab('all')}>All ({user.jobs.length})</button>
    <button className={tab==='saved'?'active':''} onClick={()=>setTab('saved')}><Bookmark size={13}/> Saved ({user.savedJobIds.length})</button>
    <button className={tab==='applied'?'active':''} onClick={()=>setTab('applied')}><Check size={13}/> Applied ({user.appliedJobIds.length})</button>
   </div>
  </Panel>

  {/* Multi-Dimensional Filters Bar */}
  <div className="job-filters-master">
   <div className="filter-group">
    <span><Filter size={13}/> Department</span>
    {['All Departments','Product Design','Design Systems'].map(d=><button key={d} className={department===d?'active':''} onClick={()=>setDepartment(d)}>{d}</button>)}
   </div>

   <div className="filter-group">
    <span>Style</span>
    {['All Styles','Remote','Hybrid'].map(m=><button key={m} className={mode===m?'active':''} onClick={()=>setMode(m)}>{m}</button>)}
   </div>

   <div className="filter-group">
    <span>Match Fit</span>
    {[[0,'All Matches'],[90,'90%+ DNA'],[85,'85%+ DNA']].map(([val,lbl])=><button key={String(val)} className={minMatch===val?'active':''} onClick={()=>setMinMatch(Number(val))}>{String(lbl)}</button>)}
   </div>

   <div className="filter-group sort-group">
    <span>Sort:</span>
    <select value={sort} onChange={e=>setSort(e.target.value as any)}>
     <option value="match">Best DNA Match</option>
     <option value="salary">Highest Salary</option>
    </select>
   </div>
  </div>

  <div className="jobs-layout">
   <div className="job-list">
    {jobs.map(j=><Panel className="job-card enhanced-job-card" key={j.id} data-testid={`card-job-${j.id}`}>
     <div className={`company-mark mark-${j.id}`}>{j.company.slice(0,1)}</div>
     
     <div className="job-copy">
      <div className="job-header-row">
       <div className="job-company">{j.company} <span>·</span> {j.mode} <span>·</span> {j.experienceLevel}</div>
       <span className="dna-match-chip"><Sparkles size={12}/> {j.matchScore}% Match</span>
      </div>

      <Link href={`/jobs/${j.id}`} className="job-title" data-testid={`link-job-${j.id}`}>{j.title}</Link>
      <p>{j.location} <span>·</span> {j.type} <span>·</span> <strong>{j.salary}</strong></p>

      {/* DNA Signals Breakdown */}
      <div className="dna-signals-preview">
       <span title="Must-Have Skills Match">Skills: <strong>{j.dnaScores.mustHaves}%</strong></span>
       <span title="Culture & Values Match">Culture: <strong>{j.dnaScores.culture}%</strong></span>
       <span title="Autonomy Match">Autonomy: <strong>{j.dnaScores.autonomy}%</strong></span>
      </div>

      <div className="pills">{j.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
     </div>

     <div className="job-side">
      <button
       className={`bookmark-btn ${user.savedJobIds.includes(j.id)?'saved':''}`}
       aria-label="Save role"
       onClick={()=>patch(u=>({...u,savedJobIds:u.savedJobIds.includes(j.id)?u.savedJobIds.filter(x=>x!==j.id):[...u.savedJobIds,j.id]}))}
       data-testid={`button-save-job-${j.id}`}
      >
       <Bookmark size={17}/>
      </button>

      {user.appliedJobIds.includes(j.id)?(
       <span className="applied-pill"><Check size={13}/> Applied</span>
      ):(
       <button className="primary-btn apply-btn-sm" onClick={()=>setApplyJob(j)} data-testid={`button-apply-modal-${j.id}`}>
        1-Click Apply <ArrowRight size={13}/>
       </button>
      )}

      <Link href={`/jobs/${j.id}`} className="quiet-btn" data-testid={`link-details-${j.id}`}>
       View DNA Details
      </Link>
     </div>
    </Panel>)}

    {jobs.length===0&&<EmptyState icon={<BriefcaseBusiness/>} title="No opportunities match these criteria" text="Try broadening your department or workplace style filters." action={<button className="quiet-btn" onClick={()=>{setSearch('');setDepartment('All Departments');setMode('All Styles');setMinMatch(0);setTab('all')}} data-testid="button-clear-job-filters">Reset filters</button>}/>}
   </div>

   <aside>
    <Panel className="job-side-note">
     <span className="note-graphic"><Target/></span>
     <div className="eyebrow">DNA ENGINE INSIGHT</div>
     <h2>Your STAR stories boost your match score.</h2>
     <p>Employers prioritize verified narrative proof. Annie's FinMate story boosted her Linear match score to 96%.</p>
     <Link href="/story" data-testid="link-improve-profile">Polish STAR stories <ArrowRight size={14}/></Link>
    </Panel>

    <Panel className="job-stats">
     <div className="eyebrow">YOUR PIPELINE</div>
     <div><strong>{user.savedJobIds.length}</strong><span>saved opportunities</span></div>
     <div><strong>{user.appliedJobIds.length}</strong><span>active applications</span></div>
     <div><strong>{user.offers.length}</strong><span>pending offer letters</span></div>
    </Panel>
   </aside>
  </div>

  {/* 1-Click Apply Modal */}
  {applyJob&&(
   <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setApplyJob(null);}}>
    <div className="modal job-apply-modal">
     <div className="modal-head">
      <div>
       <div className="eyebrow">1-CLICK APPLICATION · {applyJob.company.toUpperCase()}</div>
       <h2>Apply for {applyJob.title}</h2>
      </div>
      <button className="icon-btn" onClick={()=>setApplyJob(null)} aria-label="Close"><X size={16}/></button>
     </div>

     <div className="apply-modal-body">
      <div className="match-banner-row">
       <span className="match-percentage-badge">{applyJob.matchScore}% Match</span>
       <div>
        <strong>Your profile matches 4 of 4 core Job DNA criteria</strong>
        <small>Must-haves: {applyJob.dnaScores.mustHaves}% · Culture: {applyJob.dnaScores.culture}% · Autonomy: {applyJob.dnaScores.autonomy}%</small>
       </div>
      </div>

      <label>
       <span>Personal Note to Hiring Manager (Optional)</span>
       <textarea
        rows={4}
        value={applyNote}
        onChange={e=>setApplyNote(e.target.value)}
        placeholder="Why this team's problem space resonates with your design instincts..."
       />
      </label>

      <div className="video-pitch-toggle-card">
       <label className="checkbox-agree-label">
        <input
         type="checkbox"
         checked={videoPitchAdded}
         onChange={e=>setVideoPitchAdded(e.target.checked)}
        />
        <span>Attach my 1-minute video pitch recording from my Life Page (Increases response rate by 3x)</span>
       </label>
      </div>

      <div className="form-actions">
       <button type="button" className="quiet-btn" onClick={()=>setApplyJob(null)}>Cancel</button>
       <button type="button" className="primary-btn glow-btn" onClick={handleApplySubmit} data-testid="button-confirm-job-apply">
        <Check size={16}/> Submit Application With Profile
       </button>
      </div>
     </div>
    </div>
   </div>
  )}
 </div>;
}

function JobDetail({user,patch,notify,jobId,navigate}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;jobId:string;navigate:(p:string)=>void}){
 const job=user.jobs.find(j=>j.id===jobId),[cover,setCover]=useState('');
 if(!job)return <EmptyState icon={<BriefcaseBusiness/>} title="That role has moved on" text="Explore the latest opportunities instead." action={<button className="primary-btn" onClick={()=>navigate('/jobs')} data-testid="button-back-jobs">Browse roles</button>}/>;
 const saved=user.savedJobIds.includes(job.id),applied=user.appliedJobIds.includes(job.id);
 return <div className="content-width">
  <button className="back-link" onClick={()=>navigate('/jobs')} data-testid="button-back-to-jobs"><ArrowLeft size={15}/> All roles</button>
  <div className="job-detail-layout">
   <div>
    <Panel className="job-detail-hero">
     <div className={`company-mark big mark-${job.id}`}>{job.company[0]}</div>
     <div>
      <div className="eyebrow">{job.company} · {job.mode} · {job.department}</div>
      <h1>{job.title}</h1>
      <p>{job.location} · {job.type} · <strong>{job.salary}</strong></p>
     </div>
     <button className={`bookmark-btn ${saved?'saved':''}`} onClick={()=>patch(u=>({...u,savedJobIds:saved?u.savedJobIds.filter(x=>x!==job.id):[...u.savedJobIds,job.id]}))} aria-label="Save role" data-testid="button-save-job-detail"><Bookmark/></button>
    </Panel>

    {/* Job DNA Radar Analysis Panel */}
    <Panel className="job-dna-breakdown-panel">
     <div className="eyebrow">AI JOB DNA MATCH DIAGNOSTIC</div>
     <h2>Why Your Profile Ranks {job.matchScore}%</h2>
     <div className="dna-meters-row">
      <div className="meter-col">
       <div className="meter-head"><span>Must-Have Skills</span><b>{job.dnaScores.mustHaves}%</b></div>
       <div className="dna-bar"><i style={{width:`${job.dnaScores.mustHaves}%`}}/></div>
      </div>
      <div className="meter-col">
       <div className="meter-head"><span>Culture Fit</span><b>{job.dnaScores.culture}%</b></div>
       <div className="dna-bar"><i style={{width:`${job.dnaScores.culture}%`}}/></div>
      </div>
      <div className="meter-col">
       <div className="meter-head"><span>Autonomy</span><b>{job.dnaScores.autonomy}%</b></div>
       <div className="dna-bar"><i style={{width:`${job.dnaScores.autonomy}%`}}/></div>
      </div>
      <div className="meter-col">
       <div className="meter-head"><span>Motivation</span><b>{job.dnaScores.motivation}%</b></div>
       <div className="dna-bar"><i style={{width:`${job.dnaScores.motivation}%`}}/></div>
      </div>
     </div>
    </Panel>

    <Panel className="job-description">
     <div className="eyebrow">THE OPPORTUNITY</div>
     <h2>Bring clarity to the complex.</h2>
     <p>{job.description}</p>
     <h3>What you'll bring</h3>
     <ul>
      <li>A point of view grounded in curiosity and care for the people using the product.</li>
      <li>Comfort moving between strategic questions and details that make an interaction feel right.</li>
      <li>Thoughtful collaboration with product, engineering and research partners.</li>
     </ul>
     <h3>Verified Credentials Checklist</h3>
     <p>Upon offer extension, this role verifies ID, Degree, and References through the encrypted Rizza Digital Vault.</p>
     <div className="pills">{job.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
    </Panel>
   </div>

   <aside>
    <Panel className="apply-card">
     <div className="eyebrow">YOUR NEXT CHAPTER</div>
     <h2>{applied?'Application sent.':'Does this feel like you?'}</h2>
     <p>{applied?'Your application is saved in this local demo. Keep exploring roles while you wait.':'Your Rizza profile will be shared as your application. Add a short note to make it personal.'}</p>
     {!applied&&<>
      <label className="cover-label">
       <span>A short note</span>
       <textarea rows={5} value={cover} onChange={e=>setCover(e.target.value)} placeholder="What about this work caught your attention?" data-testid="input-application-note"/>
      </label>
      <button className="primary-btn full-btn" onClick={()=>{patch(u=>({...u,appliedJobIds:[...new Set([...u.appliedJobIds,job.id])]}));notify('Application submitted. Nice move.')}} data-testid="button-apply-job">
       Apply with my profile <ArrowRight size={15}/>
      </button>
     </>}
     <small className="local-note"><ShieldCheck size={13}/> Your profile details stay in this demo.</small>
    </Panel>
   </aside>
  </div>
 </div>;
}
function MessagesPage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [active,setActive]=useState(user.conversations[0]?.id??''),[text,setText]=useState(''),[filter,setFilter]=useState(''),[newContact,setNewContact]=useState(false);
 const current=user.conversations.find(c=>c.id===active);
 const send=()=>{if(!text.trim()||!current)return;const now=new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});patch(u=>({...u,conversations:u.conversations.map(c=>c.id===active?{...c,messages:[...c.messages,{id:`msg-${Date.now()}`,text:text.trim(),mine:true,time:now}]}:c)}));setText('');notify('Message sent');};
 return <div className="content-width"><PageHead eyebrow="YOUR COMMUNITY" title="Keep the good conversations going." description="A quieter corner for people you want to stay in touch with."/><Panel className="messages-shell"><div className="conversation-list"><div className="conversation-heading"><h2>Messages</h2><button className="icon-btn" aria-label="New message" onClick={()=>setNewContact(true)} data-testid="button-new-message"><Plus size={16}/></button></div><label className="conversation-search"><Search size={15}/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Find a conversation" data-testid="input-message-search"/></label>{user.conversations.filter(c=>c.name.toLowerCase().includes(filter.toLowerCase())).map(c=><button className={`conversation-row ${active===c.id?'active':''}`} key={c.id} onClick={()=>setActive(c.id)} data-testid={`button-conversation-${c.id}`}><span className={`person-color person-color-${c.id.length%4}`}>{c.name.split(' ').map(x=>x[0]).join('')}</span><span><strong>{c.name}</strong><small>{c.messages.at(-1)?.text??c.title}</small></span><time>{c.messages.at(-1)?.time}</time></button>)}</div>
 <div className="chat-pane">{current?<><div className="chat-head"><span className={`person-color person-color-${current.id.length%4}`}>{current.name.split(' ').map(x=>x[0]).join('')}</span><div><strong>{current.name}</strong><small>{current.title}</small></div><button className="icon-btn" aria-label="Conversation options" onClick={()=>notify('Conversation options')} data-testid="button-conversation-options"><MoreHorizontal size={16}/></button></div><div className="chat-thread">{current.messages.map(m=><div className={`message-bubble ${m.mine?'mine':''}`} key={m.id} data-testid={`message-${m.id}`}><p>{m.text}</p><time>{m.time}</time></div>)}</div><form className="chat-compose" onSubmit={e=>{e.preventDefault();send()}}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a thoughtful reply…" aria-label="Write a message" data-testid="input-message"/><button className="primary-btn" type="submit" disabled={!text.trim()} aria-label="Send message" data-testid="button-send-message"><Send size={16}/></button></form></>:<EmptyState icon={<MessageCircle/>} title="Choose a conversation" text="Pick someone from your network to say hello."/>}</div></Panel>{newContact&&<NewMessageDialog connections={user.connections.filter(c=>c.status==='connected'||c.status==='suggested')} onClose={()=>setNewContact(false)} onSend={(contactId,message)=>{const contact=user.connections.find(c=>c.id===contactId);if(!contact)return;const now=new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});patch(u=>({...u,conversations:[{id:contact.id,name:contact.name,title:`${contact.title} at ${contact.company}`,messages:[{id:`msg-${Date.now()}`,text:message,mine:true,time:now}]},...u.conversations.filter(c=>c.id!==contact.id)]}));setActive(contact.id);setNewContact(false);notify('Your conversation is started')}}/>}</div>;
}
function NewMessageDialog({connections,onClose,onSend}:{connections:DemoUser['connections'];onClose:()=>void;onSend:(id:string,text:string)=>void}){
 const [contact,setContact]=useState(connections[0]?.id??''),[text,setText]=useState('');
 return <Modal title="Start a conversation" eyebrow="A GOOD HELLO" onClose={onClose} testId="dialog-new-message"><label>Choose someone<select value={contact} onChange={e=>setContact(e.target.value)} data-testid="select-message-contact">{connections.map(c=><option key={c.id} value={c.id}>{c.name} · {c.title}</option>)}</select></label><label>Your opening message<textarea rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="A specific, kind hello goes a long way." data-testid="input-new-message"/></label><button className="primary-btn full-btn" disabled={!contact||!text.trim()} onClick={()=>onSend(contact,text.trim())} data-testid="button-start-conversation"><Send size={15}/> Send message</button></Modal>;
}
function NotificationsPage({user,patch}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void}){
 const [filter,setFilter]=useState('All');const list=user.notifications.filter(n=>filter==='All'||(filter==='Unread'&&n.unread));
 const mark=(id:string)=>patch(u=>({...u,notifications:u.notifications.map(n=>n.id===id?{...n,unread:false}:n)}));
 return <div className="content-width"><PageHead eyebrow="YOUR SPACE" title="The useful things, in one place." description="A little signal from your community and the opportunities around you." action={<button className="quiet-btn" onClick={()=>patch(u=>({...u,notifications:u.notifications.map(n=>({...n,unread:false}))}))} data-testid="button-mark-all-read"><Check size={15}/> Mark all as read</button>}/><div className="notification-layout"><div className="notification-filters">{['All','Unread'].map(f=><button className={filter===f?'active':''} key={f} onClick={()=>setFilter(f)} data-testid={`filter-notifications-${f.toLowerCase()}`}>{f}{f==='Unread'&&<span>{user.notifications.filter(n=>n.unread).length}</span>}</button>)}</div><Panel className="notification-list">{list.map(n=><button className={`notification-row ${n.unread?'unread':''}`} key={n.id} onClick={()=>mark(n.id)} data-testid={`button-notification-${n.id}`}><span className="notice-icon">{n.title.toLowerCase().includes('connect')?<UsersRound/>:n.title.toLowerCase().includes('role')?<BriefcaseBusiness/>:<Eye/>}</span><span className="notice-copy"><strong>{n.title}</strong><small>{n.body}</small><time>{n.date}</time></span>{n.unread&&<i className="unread-dot"/>}</button>)}{list.length===0&&<EmptyState icon={<Bell/>} title="Nothing needs your attention" text="You're all caught up. Come back when the next good thing happens."/>}</Panel></div></div>;
}
function AssessmentHome({user,navigate}:{user:DemoUser;navigate:(p:string)=>void}){
 const done=user.assessment.complete;
 return <div className="content-width"><PageHead eyebrow="SKILL STUDIO" title="Show your thinking, not just your title." description="A focused assessment can give your skills a little more context."/><div className="assessment-layout"><Panel className="assessment-hero"><div><span className="assessment-kicker"><Award size={15}/> RIZZA SKILL SIGNAL</span><h2>A clearer picture<br/>of your <em>craft.</em></h2><p>A 20-question design assessment, built around real decisions. Pause anytime; your progress stays right here.</p><button className="primary-btn" onClick={()=>navigate(done?'/assessment/results':`/assessment/${user.assessment.progress?user.assessment.currentQuestion%2===0?'answer':'choice':'choice'}`)} data-testid="button-start-assessment">{done?'View your results':user.assessment.progress?'Resume assessment':'Start assessment'} <ArrowRight size={16}/></button></div><div className="assessment-illustration"><div className="illustration-orbit orbit-a"/><div className="illustration-orbit orbit-b"/><div className="illustration-core"><Award size={31}/></div><span className="ill-tag tag-one">Research</span><span className="ill-tag tag-two">Systems</span><span className="ill-tag tag-three">Product sense</span></div></Panel><div className="assessment-detail-grid"><Panel><Clock3/><strong>30–35 minutes</strong><p>One thoughtful sitting, or several short pauses.</p></Panel><Panel><FileText/><strong>Real design scenarios</strong><p>Multiple choice and written prompts rooted in practice.</p></Panel><Panel><ShieldCheck/><strong>Private by default</strong><p>Review your answers before deciding what to share.</p></Panel></div><Panel className="assessment-progress-card"><div><div className="eyebrow">YOUR PROGRESS</div><h2>{done?'Assessment complete':'A good place to begin'}</h2><p>{done?`Your current skill signal is ${user.assessment.score}. You can revisit the result any time.`:`${user.assessment.progress} of 20 questions answered. Your place is saved automatically.`}</p></div><div className="progress-circle"><strong>{done?user.assessment.score:user.assessment.progress*5}%</strong><small>{done?'signal':'complete'}</small></div></Panel></div></div>;
}
const choiceOptions=['Add more tooltips and instructional text on each step.','Break the flow into smaller steps, reduce cognitive load and test with real users.','Remove optional steps to make it shorter for all users.','Make the flow visually engaging with animations and illustrations.'];
function AssessmentQuestion({user,patch,notify,kind,navigate}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;kind:'choice'|'answer';navigate:(p:string)=>void}){
 const initialIndex=kind==='answer'?Math.max(2,user.assessment.currentQuestion||2):Math.max(1,user.assessment.currentQuestion||1);
 const [index,setIndex]=useState(initialIndex),[choice,setChoice]=useState(user.assessment.answers[`q${initialIndex}`]??''),[written,setWritten]=useState(user.assessment.answers[`q${initialIndex}`]??'');
 const total=20,answerQuestion=kind==='answer',progress=Math.round((user.assessment.progress/total)*100);
 const prompt=answerQuestion?writtenPrompts[Math.floor((index-2)/2)%writtenPrompts.length]:choicePrompts[Math.floor((index-1)/2)%choicePrompts.length];
 const save=(value:string)=>patch(u=>({...u,assessment:{...u.assessment,answers:{...u.assessment.answers,[`q${index}`]:value},progress:Math.max(u.assessment.progress,index),currentQuestion:index}}));
 const advance=()=>{const value=answerQuestion?written:choice;if(!value.trim()){notify(answerQuestion?'Write a few lines before continuing.':'Choose an answer before continuing.');return;}save(value);if(index>=total){patch(u=>({...u,assessment:{...u.assessment,complete:true,progress:total,currentQuestion:total,score:87}}));navigate('/assessment/results');return;}const next=index+1;patch(u=>({...u,assessment:{...u.assessment,currentQuestion:next}}));setIndex(next);setChoice(user.assessment.answers[`q${next}`]??'');setWritten(user.assessment.answers[`q${next}`]??'');if(next===2)navigate('/assessment/answer');else if(answerQuestion)navigate('/assessment/choice');};
 const previous=()=>{const prev=Math.max(1,index-1);patch(u=>({...u,assessment:{...u.assessment,currentQuestion:prev}}));setIndex(prev);if(prev%2===0)navigate('/assessment/answer');else navigate('/assessment/choice');};
 return <div className="content-width"><button className="back-link" onClick={()=>navigate('/assessment')} data-testid="button-exit-assessment"><ArrowLeft size={15}/> Assessment overview</button><div className="assessment-question-layout"><div><Panel className="assessment-question-head"><div className="eyebrow">SENIOR UX DESIGNER · PRACTICE</div><h1>Technical <span>assessment</span></h1><div className="question-meter"><i style={{width:`${progress}%`}}/></div><div className="meter-caption"><span>Question {index} of {total}</span><span>{progress}% saved</span></div></Panel><Panel className="question-panel"><span className="question-type"><FileText size={14}/>{answerQuestion?'Written reflection':'Design scenario'}</span><h2>{prompt}</h2><p>{answerQuestion?'Tell us how you think, collaborate and measure what matters.':'Select the most useful first move.'}</p>{answerQuestion?<><textarea className="written-area" value={written} onChange={e=>{setWritten(e.target.value);save(e.target.value)}} placeholder="Start with the user. What did you notice?" rows={8} data-testid="textarea-assessment-answer"/><div className="character-count">{written.length}/800 characters <span><Check size={13}/> Saved as you go</span></div></>:<div className="choice-list">{choiceOptions.map((x,i)=><label key={x} className={`choice-option ${choice===String(i)?'selected':''}`} data-testid={`choice-option-${i}`}><input type="radio" name="design-choice" checked={choice===String(i)} value={i} onChange={()=>{setChoice(String(i));save(String(i))}}/><span className="choice-key">{String.fromCharCode(65+i)}</span><span>{x}</span><i>{choice===String(i)&&<Check size={15}/>}</i></label>)}</div>}<div className="question-actions"><button className="quiet-btn" onClick={previous} disabled={index===1} data-testid="button-previous-question"><ArrowLeft size={15}/> Previous</button><button className="primary-btn" onClick={advance} data-testid="button-next-question">{index===total?'Finish assessment':'Continue'} <ArrowRight size={15}/></button></div></Panel></div><aside className="question-aside"><Panel><div className="eyebrow">A NOTE ON THIS QUESTION</div><h2>There isn't one perfect answer.</h2><p>We’re interested in how you frame a problem, what you prioritize and how you bring people along.</p><span className="tip-icon"><LightbulbIcon/></span></Panel><Panel className="save-note"><ShieldCheck/><div><strong>Safely saved</strong><small>Your progress is stored on this device. You can pick up whenever.</small></div></Panel></aside></div></div>;
}
function LightbulbIcon(){return <Lightbulb size={20}/>}
function AssessmentResults({user}:{user:DemoUser}){
 return <div className="content-width"><PageHead eyebrow="SKILL STUDIO / YOUR RESULT" title="A thoughtful signal." description="Not a score to chase. A snapshot of how you approach the work."/><Panel className="result-hero"><span className="result-medal"><Award size={36}/></span><div className="eyebrow">SENIOR UX DESIGNER · COMPLETED</div><h2>Your design instincts are <em>showing.</em></h2><p>You make space for context before moving to a solution. Your answers point to thoughtful problem framing and a strong instinct for reducing cognitive load.</p><div className="result-score"><strong>{user.assessment.score}</strong><span>/ 100 skill signal</span></div></Panel><div className="result-columns"><Panel><span className="result-symbol"><Award size={18}/></span><div className="eyebrow">A STRENGTH</div><h3>Clarity through complexity</h3><p>You naturally look for ways to make a difficult path feel manageable, without losing what matters.</p></Panel><Panel><span className="result-symbol"><Target/></span><div className="eyebrow">ROOM TO EXPLORE</div><h3>Make the impact visible</h3><p>Keep building the habit of connecting a design decision to what changed for people afterward.</p></Panel><Panel><span className="result-symbol"><UsersRound/></span><div className="eyebrow">YOUR APPROACH</div><h3>Curious, then decisive</h3><p>You listen widely and can bring a team toward a clear next step.</p></Panel></div><div className="result-actions"><Link className="quiet-btn" href="/assessment" data-testid="link-return-assessment">Back to assessment</Link><Link className="primary-btn" href="/profile/skills" data-testid="link-update-skills">Update your skills <ArrowRight size={15}/></Link></div></div>;
}
function SettingsPage({user,patch,notify}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void}){
 const [,navigate]=useLocation();
 const [tab,setTab]=useState('Account');
 const toggle=(key:keyof DemoUser['settings'])=>patch(u=>({...u,settings:{...u.settings,[key]:!u.settings[key]}}));
 const controls:[string,string,keyof DemoUser['settings']][]=[['Profile visibility','Let people find and view your profile.','profileVisibility'],['Show availability','Let recruiters know you are open to the right opportunity.','showAvailability'],['Email updates','Occasional notes about your profile and community.','emailUpdates'],['Job alerts','A note when a role fits your interests.','jobAlerts']];
 return <div className="content-width"><PageHead eyebrow="YOUR SPACE" title="Set things up your way." description="Your profile, your boundaries, your pace."/><div className="settings-layout"><nav className="settings-nav">{['Account','Privacy','Notifications'].map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)} data-testid={`tab-settings-${t.toLowerCase()}`}>{t==='Account'?<Settings/>:t==='Privacy'?<LockKeyhole/>:<Bell/>}{t}<ArrowRight size={14}/></button>)}</nav><Panel className="settings-panel"><div className="eyebrow">SETTINGS / {tab.toUpperCase()}</div><h2>{tab==='Account'?'Your account':tab==='Privacy'?'Your boundaries':'What reaches your inbox'}</h2><p className="settings-intro">{tab==='Account'?'Update the details tied to your Rizza profile.':tab==='Privacy'?'You decide what the community can see.':'Choose which small updates you want to hear about.'}</p>{tab==='Account'?<><label className="settings-field">Name<input value={user.profile.name} onChange={e=>patch(u=>({...u,profile:{...u.profile,name:e.target.value}}))} data-testid="input-settings-name"/></label><label className="settings-field">Email<input value={user.profile.email} onChange={e=>patch(u=>({...u,profile:{...u.profile,email:e.target.value}}))} data-testid="input-settings-email"/></label><label className="settings-field">Location<input value={user.profile.location} onChange={e=>patch(u=>({...u,profile:{...u.profile,location:e.target.value}}))} data-testid="input-settings-location"/></label><button className="primary-btn" onClick={()=>notify('Account settings saved')} data-testid="button-save-settings">Save account details</button></>:controls.filter(([, ,key])=>tab==='Privacy'?key==='profileVisibility'||key==='showAvailability':key==='emailUpdates'||key==='jobAlerts').map(([name,desc,key])=><div className="setting-toggle-row" key={key}><div><strong>{name}</strong><p>{desc}</p></div><button className={`toggle ${user.settings[key]?'on':''}`} role="switch" aria-checked={user.settings[key]} onClick={()=>toggle(key)} data-testid={`toggle-setting-${key}`}><i/></button></div>)}</Panel></div><Panel className="danger-zone"><div><div className="eyebrow">LOCAL DEMO PROFILE</div><strong>Your work stays on this device.</strong><p>Sign out to return to the demo sign-in. Your saved profile will be here when you come back.</p></div><button className="quiet-btn" onClick={()=>{patch(u=>({...u,signedIn:false}));navigate('/login');}} data-testid="button-settings-sign-out"><LogOut size={14}/> Sign out</button></Panel></div>;
}
function HelpPage(){
 const questions=[['How do I make my profile stand out?','Start with a clear point of view and specific examples. A project story is more memorable when it includes the problem, what you tried and what changed.'],['Can I pause an assessment?','Yes. Your answers and current question are saved on this device as you go. Return to Skill Studio whenever you’re ready.'],['Who can see my profile?','Your privacy settings control whether your profile is visible and whether your availability appears. You can change those settings any time.'],['How do I save a role?','Use the bookmark on a role card. Saved roles stay in your Jobs view on this device.'],['Is this a real job application?','This is a local product demo. Applications and messages are stored only in your browser and are not sent to companies.']];
 const [open,setOpen]=useState(0);
 return <div className="content-width"><PageHead eyebrow="A HAND WHEN YOU NEED ONE" title="A few answers, without the runaround." description="Rizza is still growing. Here are the things that help right now."/><div className="help-layout"><div className="faq-list">{questions.map(([q,a],i)=><Panel className={`faq-item ${open===i?'open':''}`} key={q}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i} data-testid={`button-help-question-${i}`}><span>{q}</span>{open===i?<X size={17}/>:<Plus size={17}/>}</button>{open===i&&<p>{a}</p>}</Panel>)}</div><Panel className="help-contact"><span className="help-mark"><CircleHelp size={24}/></span><div className="eyebrow">STILL WONDERING?</div><h2>Start with a human.</h2><p>Reach out to Annie's demo profile and see what a thoughtful conversation can look like.</p><Link className="primary-btn" href="/messages" data-testid="link-help-message">Open messages <ArrowRight size={15}/></Link></Panel></div></div>;
}
function AuthPage({route,user,patch,navigate,notify}:{route:string;user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;navigate:(p:string)=>void;notify:(s:string)=>void}){
 const login=route==='/login',register=route==='/register',forgot=route==='/forgot-password';
 const [name,setName]=useState(user.profile.name),[email,setEmail]=useState(user.profile.email),[message,setMessage]=useState('');
 const handle=(e:React.FormEvent)=>{
  e.preventDefault();
  const valid=z.string().email().safeParse(email);
  if(!valid.success){setMessage('Add a valid email address to continue.');return;}
  if(forgot){setMessage(`A reset link is ready for ${email}. This demo keeps everything on this device.`);return;}
  patch(u=>({...u,signedIn:true,profile:{...u.profile,name:register?name.trim()||u.profile.name:u.profile.name,email}}));
  if(register){patch(u=>({...u,onboarding:{...u.onboarding,step:1}}));navigate('/onboarding/basics');}
  else navigate('/');
  notify(login?'Welcome back to your space.':'Your profile is ready to grow.');
 };

 return <div className="auth-screen">
  <div className="auth-ambient-bg"/>
  <header className="auth-header">
   <Link href="/" className="brand" data-testid="auth-brand"><img src="/images/rizza-logo.png" alt="Rizza" className="brand-logo-img"/></Link>
   <div className="auth-header-nav">
    <span>{login?'New to Rizza?':register?'Already have an account?':'Remembered your password?'}</span>
    <Link href={forgot?'/login':login?'/register':'/login'} className="auth-switch-pill" data-testid="link-auth-switch">
     {forgot?'Sign in':login?'Create your profile':'Sign in'}
    </Link>
   </div>
  </header>

  <div className="auth-layout">
   <div className="auth-story">
    <span className="auth-stamp"><Award size={14}/> CURATED FOR PRODUCT DESIGNERS</span>
    <h1>Your career is<br/>more than a <em>title.</em></h1>
    <p>Build a living story that sounds like you. Showcase verified case studies, share real design thinking, and connect with peers from Figma, Linear, and Notion.</p>

    {/* Authentic Designer Portfolio Showcase */}
    <div className="auth-showcase-stack">
     <div className="auth-showcase-card primary-card">
      <div className="showcase-card-head">
       <img src="/images/annie-portrait.png" alt="Annie Stanley" className="showcase-avatar"/>
       <div className="showcase-info">
        <div className="showcase-name"><strong>Annie Stanley</strong><Verified size={14}/></div>
        <small>Senior UX Designer · Figma Alum</small>
       </div>
       <span className="showcase-status"><i/> Open to roles</span>
      </div>

      <div className="showcase-project-preview">
       <img src="/images/finmate.png" alt="FinMate project" className="showcase-thumb"/>
       <div className="showcase-thumb-copy">
        <strong>FinMate Fintech Platform</strong>
        <p>Autonomous budgeting flow built for high-trust user journeys.</p>
        <span className="metric-chip"><Target size={11}/> +42% onboarding completion</span>
       </div>
      </div>

      <div className="showcase-skills-row">
       <span className="pill">UI/UX Design · 91%</span>
       <span className="pill">Design Systems</span>
       <span className="pill">User Research</span>
      </div>
     </div>

     <div className="auth-floating-badge testimonial-badge">
      <div className="quote-icon">“</div>
      <p>Annie turns dense architectural friction into effortless clarity.</p>
      <small>— Staff Designer at Linear</small>
     </div>
    </div>

    <div className="auth-social-proof">
     <div className="proof-avatars">
      <img src="/images/annie-portrait.png" alt=""/>
      <i>MS</i><i>JL</i><i>NK</i>
     </div>
     <span>Trusted by <strong>14,000+</strong> designers shaping modern product design</span>
    </div>
   </div>

   <Panel className="auth-card">
    <div className="auth-tabs">
     <button type="button" className={login?'active':''} onClick={()=>navigate('/login')}>Sign in</button>
     <button type="button" className={register?'active':''} onClick={()=>navigate('/register')}>Create profile</button>
    </div>

    <div className="auth-card-heading">
     <div className="eyebrow">{forgot?'PASSWORD RECOVERY':register?'JOIN THE COMMUNITY':'WELCOME BACK'}</div>
     <h2>{forgot?'Let’s get you back in.':register?'Start with your story.':'Good to see you again.'}</h2>
     <p>{forgot?'We’ll prepare a local reset confirmation on this device.':register?'Create your profile to begin showcasing your craft. No credit card required.':'Sign in to your local workspace.'}</p>
    </div>

    <form onSubmit={handle} className="auth-form">
     {register&&<label>
      <span>Full name</span>
      <div className="input-with-icon">
       <User size={16}/>
       <input autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Annie Stanley" data-testid="input-auth-name"/>
      </div>
     </label>}

     <label>
      <span>Email address</span>
      <div className="input-with-icon">
       <Mail size={16}/>
       <input autoComplete="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@domain.com" data-testid="input-auth-email"/>
      </div>
     </label>

     {!forgot&&<label>
      <div className="label-row">
       <span>Password</span>
       {login&&<Link href="/forgot-password" className="auth-forgot-link" data-testid="link-forgot-password">Forgot password?</Link>}
      </div>
      <div className="input-with-icon">
       <LockKeyhole size={16}/>
       <input autoComplete={login?'current-password':'new-password'} type="password" placeholder="••••••••••••" data-testid="input-auth-password"/>
      </div>
      <small>Demo environment. Any test password works.</small>
     </label>}

     {message&&<div className="form-message" role="status" data-testid="status-auth">{message}</div>}

     <button className="primary-btn full-btn" type="submit" data-testid="button-auth-submit">
      {forgot?'Send recovery link':register?'Create profile & start onboarding':'Sign in to Rizza'} <ArrowRight size={15}/>
     </button>
    </form>

    <div className="auth-divider"><span/><em>or instant demo access</em><span/></div>

    <button className="demo-profile-glass" onClick={()=>{patch(u=>({...u,signedIn:true}));navigate('/');}} data-testid="button-continue-demo">
     <div className="demo-avatar-wrap">
      <img src="/images/annie-portrait.png" alt="Annie"/>
      <i className="status-online"/>
     </div>
     <div className="demo-copy">
      <strong>Continue as Annie Stanley</strong>
      <small>Senior UX Designer · Pre-loaded demo profile</small>
     </div>
     <ArrowRight size={16}/>
    </button>

    <div className="auth-privacy">
     <ShieldCheck size={14}/> Local browser storage. No third-party data tracking.
    </div>
   </Panel>
  </div>

  <footer className="auth-footer">
   <span>© 2025 Rizza Career Platform · For designers, by designers</span>
   <div className="auth-footer-links">
    <span>Privacy</span><span>Terms</span><span>Security</span>
   </div>
  </footer>
 </div>;
}

function OnboardingPage({user,patch,notify,navigate}:{user:DemoUser;patch:(fn:(u:DemoUser)=>DemoUser)=>void;notify:(s:string)=>void;navigate:(p:string)=>void}){
 const path=window.location.pathname.split('/').pop()??'basics';
 let step=steps.indexOf(path);if(step<0)step=Math.max(0,Math.min(5,user.onboarding.step-1));
 const answerKey=steps[step],answer=user.onboarding.answers[answerKey]??'';
 const [text,setText]=useState(answer),[role,setRole]=useState(user.onboarding.answers.role??user.experience[0]?.title??''),[company,setCompany]=useState(user.onboarding.answers.company??user.experience[0]?.company??'');

 useEffect(()=>setText(user.onboarding.answers[steps[step]]??''),[step,user.onboarding.answers]);
 useEffect(()=>{patch(u=>({...u,onboarding:{...u.onboarding,answers:{...u.onboarding.answers,[steps[step]]:text,role,company}}}));},[text,role,company,step]);

 const saveAnswer=()=>patch(u=>({...u,onboarding:{...u.onboarding,step:step+1,answers:{...u.onboarding.answers,[answerKey]:text,...(step===0?{role,company}:{})}}}));
 const go=(n:number)=>{
  if(n<0)return;
  if(step===0&&(!role.trim()||!company.trim())){notify('Add a role title and company to continue.');return;}
  if(step>0&&step<5&&!text.trim()){notify('Add a few words before moving on.');return;}
  saveAnswer();
  const target=steps[n];
  navigate(`/onboarding/${target}`);
 };
 const finish=()=>{
  if(!text.trim()){notify('Write a closing thought before finishing.');return;}
  patch(u=>({...u,onboarding:{...u.onboarding,complete:true,step:6,answers:{...u.onboarding.answers,summary:text}}}));
  notify('Your career story is ready to shape.');
  navigate('/');
 };

 const roleSuggestions=['Senior Product Designer','Design Systems Lead','Staff UX Designer','Founding Designer','UX Researcher'];
 const companySuggestions=['Figma','Linear','Notion','Stripe','Airbnb','Studio'];
 const locationSuggestions=['Remote','San Francisco','New York','London','Mumbai'];

 const stepPromptsDetail=[
  'Tell us about the role you held.',
  'What changed because you were there? (Metrics, systems, user flow)',
  'What felt difficult or uncertain? (Constraints, trade-offs, politics)',
  'How did this experience change your approach to design?',
  'What key insight would you carry into your next team?'
 ];

 const thoughtStarters=[
  [],
  ['Architected cross-platform design tokens','Reduced onboarding drop-off by 32%','Redesigned core mobile workspace from 0-to-1'],
  ['Navigated legacy code constraints with engineers','Aligned conflicting executive stakeholder opinions','Balanced aggressive shipping deadlines with user rigor'],
  ['Transitioned from visual craft to systems leadership','Learned to validate hypothesis with rapid unmoderated prototypes','Discovered the power of collaborative design crits'],
  ['Specific clarity always beats generic polish','Trust is built through quiet, thoughtful micro-moments','Great products come from healthy cross-functional trust']
 ];

 return <div className="onboarding-screen">
  <div className="onboard-ambient-bg"/>
  <header className="onboard-header">
   <Link href="/" className="brand" data-testid="onboard-brand"><img src="/images/rizza-logo.png" alt="Rizza" className="brand-logo-img"/></Link>
   <div className="onboard-header-center">
    <span className="onboard-save"><CheckCircle2 size={14}/> Autosaved to profile</span>
   </div>
   <button className="quiet-btn" onClick={()=>navigate('/')} data-testid="button-skip-onboarding">
    Save & view profile <ArrowRight size={14}/>
   </button>
  </header>

  <div className="onboard-layout">
   <aside className="onboard-aside">
    {/* 3D Glass Hero Banner */}
    <div className="onboard-art-banner">
     <img src="/images/onboard-hero-art.jpg" alt="Career Portfolio Illustration" className="onboard-art-img"/>
     <div className="onboard-art-overlay">
      <span className="art-badge"><Award size={14}/> Step {step+1} of 6</span>
      <h3>Make your work mean something.</h3>
     </div>
    </div>

    {/* Real-time Profile Preview Card */}
    <div className="onboard-live-preview">
     <div className="preview-label">LIVE PROFILE PREVIEW</div>
     <div className="preview-card">
      <div className="preview-top">
       <img src="/images/annie-portrait.png" alt=""/>
       <div>
        <strong>{user.profile.name}</strong>
        <small>{role||'UX Designer'} · {company||'Figma'}</small>
       </div>
      </div>
      <p className="preview-snippet">
       “{text?(text.length>90?text.slice(0,90)+'…':text):'Your story, proudest wins and design perspective will appear here.'}”
      </p>
      <div className="preview-chips">
       <span>{stepTitles[step]}</span>
       <span className="live-dot"><i/> Live</span>
      </div>
     </div>
    </div>

    {/* Stepper Navigation */}
    <div className="onboard-steps">
     {steps.map((s,i)=><button
      key={s}
      className={i===step?'current':i<step?'done':''}
      onClick={()=>i<=step&&navigate(`/onboarding/${s}`)}
      disabled={i>step}
      data-testid={`button-onboarding-step-${s}`}
     >
      <span>{i<step?<Check size={14}/>:`0${i+1}`}</span>
      <div>
       <strong>{stepTitles[i]}</strong>
       <small>{i===step?'Current focus':i<step?'Saved':'Upcoming'}</small>
      </div>
     </button>)}
    </div>
   </aside>

   <main className="onboard-main">
    <div className="onboard-progress">
     <div className="onboard-progress-labels">
      <span className="step-tag">STEP {String(step+1).padStart(2,'0')} · {stepTitles[step].toUpperCase()}</span>
      <span className="progress-percent">{Math.round(((step+1)/6)*100)}% completed</span>
     </div>
     <div className="meter"><i style={{width:`${((step+1)/6)*100}%`}}/></div>
    </div>

    <div className="onboard-form">
     <div className="eyebrow">YOUR DIGITAL STORY</div>
     <h2>{stepTitles[step]}</h2>
     <p className="onboard-description">
      {step===0
       ?'Start with a pivotal role that shaped your instincts and craft.'
       :step===5
       ?'Review the highlights of your story before publishing to your profile.'
       :'Specific details make your work memorable. Mention what you shipped, what changed, and what you learned.'}
     </p>

     {step===0?(
      <div className="onboard-fields">
       <label>
        <span>Role title</span>
        <input
         value={role}
         onChange={e=>setRole(e.target.value)}
         placeholder="e.g. Senior UX Designer"
         data-testid="input-onboarding-role"
        />
        <div className="suggestion-chips">
         {roleSuggestions.map(s=><button type="button" key={s} onClick={()=>setRole(s)} className="suggestion-pill">+ {s}</button>)}
        </div>
       </label>

       <label>
        <span>Company or team</span>
        <input
         value={company}
         onChange={e=>setCompany(e.target.value)}
         placeholder="e.g. Figma, Stripe, or Studio"
         data-testid="input-onboarding-company"
        />
        <div className="suggestion-chips">
         {companySuggestions.map(c=><button type="button" key={c} onClick={()=>setCompany(c)} className="suggestion-pill">{c}</button>)}
        </div>
       </label>

       <label>
        <span>Where was this based?</span>
        <input
         value={text}
         onChange={e=>setText(e.target.value)}
         placeholder="e.g. Remote, San Francisco, Mumbai"
         data-testid="input-onboarding-answer"
        />
        <div className="suggestion-chips">
         {locationSuggestions.map(loc=><button type="button" key={loc} onClick={()=>setText(loc)} className="suggestion-pill">{loc}</button>)}
        </div>
       </label>
      </div>
     ):step===5?(
      <>
       <div className="onboard-review">
        {steps.slice(0,5).map((s,i)=><div key={s} className="review-card">
         <div className="review-head">
          <span>0{i+1} · {stepTitles[i]}</span>
          <button type="button" className="text-link" onClick={()=>navigate(`/onboarding/${s}`)}>
           <Pencil size={12}/> Edit
          </button>
         </div>
         <p>{user.onboarding.answers[s]||'A thought still taking shape.'}</p>
        </div>)}
       </div>
       <label className="onboard-answer-label">
        <span>Closing career philosophy</span>
        <textarea
         value={text}
         onChange={e=>setText(e.target.value)}
         placeholder="What connects your journey? What are you curious to design next?"
         rows={4}
         data-testid="input-onboarding-answer"
        />
       </label>
      </>
     ):(
      <>
       <div className="prompt-card">
        <span className="prompt-symbol">
         {step===1?<Award size={18}/>:step===2?<Target size={18}/>:step===3?<Compass size={18}/>:<ShieldCheck size={18}/>}
        </span>
        <div>
         <strong>{stepPrompts[step]}</strong>
         <p>{stepPromptsDetail[step]}</p>
        </div>
       </div>

       {thoughtStarters[step]?.length>0&&(
        <div className="thought-starters-section">
         <small>THOUGHT STARTERS — CLICK TO ADD OR INSPIRE</small>
         <div className="suggestion-chips">
          {thoughtStarters[step].map((idea,idx)=><button
           type="button"
           key={idx}
           className="suggestion-pill"
           onClick={()=>setText(prev=>(prev?prev+' '+idea:idea))}
          >
           + {idea}
          </button>)}
         </div>
        </div>
       )}

       <textarea
        value={text}
        onChange={e=>setText(e.target.value)}
        placeholder={
         step===1
          ?'Describe a key project, flow or feature you influenced. What was the outcome?'
          :step===2
          ?'What unexpected challenges did you hit, and how did you resolve them?'
          :'How did this role expand your problem-solving range?'
        }
        rows={6}
        data-testid="input-onboarding-answer"
       />

       <div className="writing-meta">
        <span className="writing-hint"><Lightbulb size={14}/> Start with one moment. You can always refine this on your profile.</span>
        <span className="char-count">{text.length} characters</span>
       </div>
      </>
     )}

     <div className="onboard-controls">
      {step>0?(
       <button className="quiet-btn" onClick={()=>go(step-1)} data-testid="button-onboarding-back">
        <ArrowLeft size={15}/> Previous step
       </button>
      ):<span/>}

      {step<5?(
       <button
        className="primary-btn"
        disabled={step===0&&(!role.trim()||!company.trim())}
        onClick={()=>go(step+1)}
        data-testid="button-onboarding-continue"
       >
        Continue to {stepTitles[step+1]} <ArrowRight size={15}/>
       </button>
      ):(
       <button className="primary-btn" onClick={finish} data-testid="button-onboarding-finish">
        Publish to My Profile <Check size={15}/>
       </button>
      )}
     </div>
    </div>
   </main>
  </div>

  <footer className="onboard-footer">
   <span>Rizza Career Platform</span> · <span>Thoughtful work. In your own words.</span>
  </footer>
 </div>;
}
function Modal({title,eyebrow,onClose,children,testId}:{title:string;eyebrow?:string;onClose:()=>void;children:ReactNode;testId:string}){
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><section className="modal" role="dialog" aria-modal="true" aria-label={title} data-testid={testId}><div className="modal-head"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div><button className="icon-btn" onClick={onClose} aria-label="Close dialog" data-testid={`button-close-${testId.replace('dialog-','')}`}><X size={17}/></button></div>{children}</section></div>;
}
function EmptyState({icon,title,text,action}:{icon:ReactNode;title:string;text:string;action?:ReactNode}){
 return <div className="empty-state"><span className="empty-icon">{icon}</span><h2>{title}</h2><p>{text}</p>{action}</div>;
}
function NotFoundPage(){
 return <div className="content-width"><div className="not-found"><span>404</span><h1>This page took another path.</h1><p>Let's get you back to the work and people you came for.</p><Link className="primary-btn" href="/" data-testid="link-not-found-home"><ArrowLeft size={15}/> Back to your profile</Link></div></div>;
}
export default App;
