import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Mail, Phone, Send, ArrowRight, ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import logo from '../assets/img/logo-white.webp'
import '../styles/Footer.css'

const Footer = () => {
  const [suggestion, setSuggestion] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const currentYear = new Date().getFullYear();

  const submitSuggestion = async (e) => {
    e.preventDefault();
    if (!suggestion.trim() || status === 'sending') return;
    
    setStatus('sending');
    try {
      const { error } = await supabase.from('suggestions').insert([{ content: suggestion }]);
      if (error) throw error;
      
      setStatus('success');
      setSuggestion('');
      
      // Reset back to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) { 
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-main-grid-single-row">
           
           {/* 01. THE UNIT LOGO */}
           <div className="footer-logo-unit flex items-center justify-center lg:justify-start">
              <motion.img 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                src={logo} 
                alt="IEEE ERU" 
                className="footer-logo-compact-row" 
              />
           </div>

           {/* 02. MISSION INTEL & CONTACTS */}
           <div className="footer-intel-unit">
              <div className="flex items-center gap-3 text-primary mb-4 lg:justify-start justify-center">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase">Intelligence 105</span>
              </div>
              <p className="footer-description-compact md:text-sm text-white/30 tracking-wider">
                 The IEEE ERU Branch is a hub for innovation, leadership, and technical excellence. 
                 Building the next generation.
              </p>
              <div className="footer-contacts-compact mt-8">
                 <div className="contact-row-mini md:text-[11px]"><Phone size={14}/>+20 11 58913093</div>
                 <div className="contact-row-mini md:text-[11px] mt-2"><Mail size={14}/>ieee.eru.sb@gmail.com</div>
              </div>
           </div>

           {/* 03. SUGGESTION HUB */}
           <div className="footer-feedback-unit">
              <form onSubmit={submitSuggestion} className="flex flex-col gap-3 relative">
                 <textarea 
                    value={suggestion}
                    onChange={e => setSuggestion(e.target.value)}
                    className={`feedback-input-compact ${status === 'success' ? 'border-green-500/50' : ''}`} 
                    placeholder="Submit message..."
                    disabled={status === 'sending' || status === 'success'}
                 />
                 
                 <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'success'} 
                    className={`feedback-btn-mini group transition-all duration-500 ${
                      status === 'success' ? 'bg-green-500 text-white !border-green-500' : 
                      status === 'error' ? 'bg-red-500 text-white !border-red-500' : ''
                    }`}
                 >
                    <AnimatePresence mode="wait">
                       {status === 'idle' && (
                          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full">
                             <span className="md:text-[10px]">TRANSMIT</span>
                             <Send size={14} className="group-hover:translate-x-1" />
                          </motion.div>
                       )}
                       {status === 'sending' && (
                          <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                             <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                             <span>SENDING...</span>
                          </motion.div>
                       )}
                       {status === 'success' && (
                          <motion.div key="success" initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between w-full">
                             <span>INTEL SENT</span>
                             <CheckCircle size={14} />
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </button>

                 <AnimatePresence>
                    {status === 'success' && (
                       <motion.p 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="absolute -bottom-6 left-0 text-[9px] font-black text-green-500 uppercase tracking-widest"
                       >
                          Mission Intel Transmitted Successfully.
                       </motion.p>
                    )}
                 </AnimatePresence>
              </form>
           </div>

        </div>

        {/* BOTTOM TERMINAL UPGRADED */}
        <div className="footer-bottom-terminal-compact">
           <div className="footer-social-strip-mini">
              <a href="https://facebook.com/IEEE.ERU.SB" target="_blank" className="social-node-micro"><Facebook size={18}/></a>
              <a href="https://instagram.com/ieee_erusb/" target="_blank" className="social-node-micro"><Instagram size={18}/></a>
              <a href="https://linkedin.com/company/ieee-eru-sb/" target="_blank" className="social-node-micro"><Linkedin size={18}/></a>
           </div>

           <div className="footer-identity-credits-compact">
              <div className="footer-id-flex-container">
                 <span className="text-[12px] text-white/40 uppercase font-black tracking-[0.2em]">© {currentYear} IEEE ERU</span>
                 <a href="https://www.linkedin.com/in/ali-abdelnaser-947230295/" target="_blank" className="ali-credit-link-mini group">
                    Created by <span className="text-primary ml-1 group-hover:text-white transition-all text-[12px] md:text-[13px]">Ali Abdelnaser</span>
                    <ArrowRight size={14} className="ml-1 opacity-40 group-hover:translate-x-1" />
                 </a>
              </div>
           </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
