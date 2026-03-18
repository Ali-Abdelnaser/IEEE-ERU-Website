import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import flag from '../assets/img/falg-white.webp'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
  ]

  return (
    <div className={`nav-container ${isScrolled ? 'nav-container-scrolled' : ''}`}>
      <motion.div 
        className={`nav-dock ${isScrolled ? 'nav-dock-scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Left: Branding */}
        <div className="nav-logo-area">
          <Link to="/" className="flex items-center">
            <motion.img 
              src={flag} 
              alt="IEEE Flag" 
              className="h-10 sm:h-12 w-auto"
              whileHover={{ scale: 1.05 }}
            />
          </Link>
        </div>

        {/* Center: Welcome Text (Mobile Only) */}
        <div className="nav-welcome-text">
          WELCOME
        </div>

        {/* Center: Tactile Links (Desktop) */}
        <div className="nav-links hidden md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="nav-link-bg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{ left: 0, right: 0 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Right: Actions */}
        <div className="nav-action-area flex items-center gap-4">
          <button className="dock-btn hidden md:flex items-center gap-2">
            JOIN <ArrowUpRight size={14} />
          </button>
          
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <div className="hamburger-staggered">
              <span className="ham-line line-full" />
              <span className="ham-line line-mid" />
              <span className="ham-line line-short" />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Universal Mobile HUD Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background Energy Pulse */}
            <div className="hud-ambient-glow" />

            {/* HUD Header */}
            <div className="hud-header">
              <div className="hud-branding">
                 <img src={flag} alt="IEEE Flag" className="h-20 w-auto" />
                 
              </div>
              <button 
                className="hud-close-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="close-icon-wrap">
                   <span className="close-line line-1" />
                   <span className="close-line line-2" />
                </div>
              </button>
            </div>

            {/* HUD Navigation */}
            <div className="hud-nav-center">
              <div className="hud-links-wrap">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="hud-link-outer"
                  >
                    <Link 
                      to={link.path} 
                      className={`hud-link-item group ${location.pathname === link.path ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="hud-link-index">0{i + 1}</span>
                      <span className="hud-link-text">{link.name}</span>
                      <ArrowUpRight className="hud-link-arrow" size={24} />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="hud-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button className="hud-primary-btn">
                   JOIN us
                </button>
              </motion.div>
            </div>

            {/* HUD Tactical Footer */}
            <div className="hud-footer">
               <div className="hud-coord">IEEE_ERU_SB // PORT:8080</div>
               <div className="hud-social-brief">
                  CONNECTING GLOBAL ENGINEERS
               </div>
            </div>

            {/* Technical Corner Accents */}
            <div className="hud-corner-tl" />
            <div className="hud-corner-br" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
