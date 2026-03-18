import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowUpRight, ShieldCheck, Zap, Users, Binary, LayoutGrid } from 'lucide-react';
import '../styles/Events.css';

// EVENT DATA ARCHIVE (Placeholder for Supabase Integration)
export const EVENTS_DB = [
  {
    id: "ai-dev-camp-2026",
    title: "AI Developer Camp X IEEE ERU Opening",
    excerpt: "Successfully kicked off the AI Developer Camp in collaboration with DotPy. Moving beyond theory to build a roadmap for the professional market.",
    date: "MARCH 15, 2026",
    location: "ERU MAIN HALL",
    type: "PAST_EVENT",
    img: new URL('../assets/img/gallery-1.webp', import.meta.url).href,
    mainImage: new URL('../assets/img/gallery-1.webp', import.meta.url).href, // Using high-res for internal hero
    tracks: [
      { title: "AI & Data Analysis", desc: "Mastering the 'Engineer Mindset' through problem-solving and data-driven logic." },
      { title: "Business Development", desc: "Learning how to bridge the gap between tech skills and market value." },
      { title: "HR & Career Branding", desc: "Expert guidance on personal branding and taking the first real steps into the job market." }
    ],
    outcomes: [
        "Direct access to DotPy courses via exclusive vouchers.",
        "Internship opportunities and official attendance certificates.",
        "Connecting students with industry mentors and the IEEE community."
    ],
    fullDesc: "IEEE ERU Student Branch successfully kicked off the AI Developer Camp in collaboration with DotPy. We moved beyond theory to provide a roadmap for students to bridge the gap between university and the professional market. It wasn't just an event; it was about building the mindset that builds the future.",
    gallery: Array.from({ length: 20 }) // Array for assets
  }
];

const EventsPage = () => {
  const upcomingEvent = {
    title: "The Next Mission",
    label: "UPCOMING_ANNOUNCEMENT",
    desc: "Initializing the next strategic operation. Stay tuned for authorization.",
    date: "TBA_2026",
    location: "CONFERENCE HALL",
    img: new URL('../assets/img/home.webp', import.meta.url).href
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="events-page">
      {/* 01. HEADER SECTION */}
      <div className="events-header">
         <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="refined-badge"
         >
            LOG_DATABASE_V1.1
         </motion.div>
         <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="events-title"
         >
            OPERATIONS <span className="text-primary italic">& LOGS</span>
         </motion.h1>
         <div className="w-12 h-1 bg-primary/20 rounded-full mt-4" />
      </div>

      {/* 02. UPCOMING HERO (THE PULSE) */}
      <section className="upcoming-hero group">
         <Link to="#">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="upcoming-card"
            >
               {/* VISUAL STAGE */}
               <div className="upcoming-visual-stage">
                  <div className="upcoming-visual-bg" />
                  <img src={upcomingEvent.img} alt={upcomingEvent.title} className="upcoming-img" />
                  <div className="upcoming-badge">LEVEL_CRITICAL</div>
               </div>
               
               {/* DATA CONTENT */}
               <div className="upcoming-content">
                  <span className="upcoming-label">{upcomingEvent.label}</span>
                   <h2 className="upcoming-name">{upcomingEvent.title}</h2>
                   <p className="text-white/30 text-sm mb-10 leading-relaxed font-light">
                     {upcomingEvent.desc}
                   </p>
                   <div className="flex flex-wrap gap-10 pt-8 border-t border-white/5">
                      <div className="flex items-center gap-3 text-white/50 text-[10px] font-black tracking-widest uppercase">
                         <Calendar size={18} className="text-primary opacity-60" /> {upcomingEvent.date}
                      </div>
                      <div className="flex items-center gap-3 text-white/50 text-[10px] font-black tracking-widest uppercase">
                         <MapPin size={18} className="text-primary opacity-60" /> {upcomingEvent.location}
                      </div>
                   </div>
               </div>
               
               <div className="absolute bottom-16 right-16 opacity-5 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700 hidden lg:block">
                   <ArrowUpRight size={140} className="text-primary" />
               </div>
            </motion.div>
         </Link>
      </section>

      {/* 03. MISSION ARCHIVE TITLE */}
      <div className="section-header-refined mb-24">
         <div className="refined-badge">DATA_ARCHIVE_SECTOR</div>
         <h2 className="refined-title">MISSION LOGS</h2>
         <div className="refined-underline mx-auto" />
      </div>

      {/* 04. EVENTS LOG GRID */}
      <section className="events-grid">
         {EVENTS_DB.map((event, i) => (
           <Link to={`/events/${event.id}`} key={event.id} className="event-card group">
              <div className="event-img-wrap">
                 <img 
                    src={new URL('../assets/img/gallery-1.webp', import.meta.url).href} 
                    alt={event.title} 
                    className="event-thumbnail" 
                 />
                 <div className="event-meta-overlay">
                    <span className="meta-tab"><Calendar size={12} /> {event.date}</span>
                    <span className="meta-tab">{event.type}</span>
                 </div>
                 {/* ID TAG */}
                 <div className="absolute top-6 left-6 px-3 py-1 bg-primary/20 backdrop-blur-md rounded border border-primary/40 text-[8px] font-black text-white/60 tracking-widest uppercase">
                   ID: {event.id.toUpperCase()}
                 </div>
              </div>

              <div className="event-info">
                 <h3 className="event-card-title">{event.title}</h3>
                 <p className="event-card-excerpt">
                    {event.excerpt}
                 </p>
                 
                 <div className="event-card-btn">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">AUTH: MISSION_CLEARANCE</span>
                    <div className="flex items-center gap-3 group-hover:translate-x-4 transition-all">
                       OPEN_LOG <ArrowUpRight size={18} className="text-primary" />
                    </div>
                 </div>
              </div>
           </Link>
         ))}
      </section>

      {/* 05. TECH HUD DATA */}
      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 text-[8px] font-mono tracking-[0.5em] text-white uppercase">
         <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            OPERATIONAL_LOGS_STREAMING
         </div>
         <div className="flex items-center gap-10">
            <span>ENTRIES: {EVENTS_DB.length}</span>
            <span>SYSTEM: IEEE_ERU_CENTRAL</span>
            <span>SECURITY: CRYPTO_AUTH</span>
         </div>
      </div>
    </div>
  );
};

export default EventsPage;
