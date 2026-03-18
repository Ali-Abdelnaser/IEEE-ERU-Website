import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Zap, Users, Binary, ShieldCheck, ArrowUpRight, Share2, Printer } from 'lucide-react';
import { EVENTS_DB } from './EventsPage';
import '../styles/Events.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const event = EVENTS_DB.find(e => e.id === id);

  if (!event) return <div className="min-h-screen pt-40 text-center text-white uppercase font-black tracking-widest text-4xl">MISSION_NOT_FOUND</div>;

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <div className="event-detail-page">
      {/* 01. NAVIGATION OVERLAY */}
      <div className="max-w-7xl mx-auto mb-16 flex justify-between items-center opacity-60">
         <Link to="/events" className="flex items-center gap-3 text-white/40 hover:text-primary transition-all text-[10px] font-black tracking-[0.4em] uppercase">
            <ArrowLeft size={18} /> CLOSE_LOG_ARCHIVE
         </Link>
         <div className="flex gap-6">
            <Share2 size={16} className="cursor-pointer hover:text-primary transition-colors" />
            <Printer size={16} className="cursor-pointer hover:text-primary transition-colors" />
         </div>
      </div>

      {/* 02. REFINED HEADER */}
      <header className="detail-header-refined">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="refined-badge mb-8"
         >
            MISN_INTEL_DB_{event.id.toUpperCase()}
         </motion.div>
         <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="detail-title-new"
         >
            {event.title}
         </motion.h1>

         <div className="detail-meta-bar">
            <div className="meta-item-refined">
               <span>DATE_LOG</span>
               <span>{event.date}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="meta-item-refined">
               <span>LOC_QUERY</span>
               <span>{event.location}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <div className="meta-item-refined">
               <span>STATUS</span>
               <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  ARCHIVED_LOG
               </span>
            </div>
         </div>
      </header>

      {/* 03. CINEMATIC VISUAL STAGE */}
      <motion.section 
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1 }}
         className="detail-visual-stage group"
      >
         <img src={event.mainImage} alt={event.title} className="detail-main-img" />
         <div className="stage-hud-overlay" />
         <div className="stage-badge">MISSION_RECAP_VISUAL_FEED</div>
         
         {/* HUD Elements */}
         <div className="absolute top-10 right-10 flex flex-col gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-1 bg-primary" />
            <div className="w-8 h-1 bg-primary ml-4" />
         </div>
      </motion.section>

      {/* 04. CONTENT WRAPPER */}
      <div className="detail-content-wrap">
         <motion.p {...fadeUp} className="detail-summary-text">
            {event.fullDesc}
         </motion.p>

         {/* INTEL GRID */}
         <div className="mission-intel-grid">
            {/* SEGMENTS */}
            <motion.div {...fadeUp} className="intel-block">
               <h2 className="intel-block-title"><Binary size={20} className="text-primary" /> MISSION_SEGMENTS</h2>
               <div className="intel-list">
                  {event.tracks.map((track, i) => (
                    <div key={i} className="group border-b border-white/5 pb-6 last:border-0">
                       <h3 className="text-sm font-black text-white group-hover:text-primary transition-colors tracking-widest uppercase mb-2">{track.title}</h3>
                       <p className="text-xs text-white/30 leading-relaxed font-light">{track.desc}</p>
                    </div>
                  ))}
               </div>
            </motion.div>

            {/* PROTOCOLS */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="intel-block">
               <h2 className="intel-block-title"><ShieldCheck size={20} className="text-primary" /> PROTOCOL_LOGS</h2>
               <ul className="intel-list">
                  {event.outcomes.map((outcome, i) => (
                    <li key={i} className="intel-item group">
                       <div className="intel-dot" />
                       <span className="text-white/40 group-hover:text-white/70 transition-colors">
                         {outcome}
                       </span>
                    </li>
                  ))}
               </ul>
            </motion.div>
         </div>

      

         {/* 05. TACTICAL 3D MISSION DECK */}
         <div className="section-header-refined mb-10">
            <div className="refined-badge">VISUAL_INTEL_STREAM</div>
            <h2 className="refined-title text-center">MISSION CAPTURES</h2>
            <div className="refined-underline mx-auto" />
         </div>

         <MissionIntelDeck images={Array.from({ length: 20 }).map((_, i) => new URL(`../assets/img/gallery-${i + 1}.webp`, import.meta.url).href)} />
      </div>
    </div>
  );
};

// TACTICAL 3D MISSION DECK COMPONENT
const MissionIntelDeck = ({ images }) => {
  const [index, setIndex] = React.useState(0);

  // Autoplay Lifecycle
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000); // 5s for cinematic feel
    return () => clearInterval(timer);
  }, [images.length]);

  const getPosition = (i) => {
    if (i === index) return "active";
    if (i === (index - 1 + images.length) % images.length) return "prev";
    if (i === (index + 1) % images.length) return "next";
    return "hidden-state";
  };

  return (
    <div className="deck-viewer-wrap">
       <div className="deck-stage">
          {images.map((img, i) => (
            <div key={i} className={`deck-item ${getPosition(i)}`}>
               <img src={img} alt={`Intel ${i}`} className="w-full h-full object-cover" />
               <div className="scan-line" />
               
               {/* TOP HUD MARKERS */}
               <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">
                    ACTIVE_FEED_{i+1 < 10 ? `0${i+1}` : i+1}
                  </span>
               </div>
            </div>
          ))}
       </div>

       {/* MISSION STATUS DOTS */}
       <div className="deck-hud-nav">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => setIndex(i)}
              className={`hud-dot ${index === i ? 'active' : ''}`}
            >
               <div className="dot-fill" style={{ 
                 transitionDuration: index === i ? '5000ms' : '0ms' 
               }} />
            </button>
          ))}
       </div>
    </div>
  );
};

export default EventDetailPage;
