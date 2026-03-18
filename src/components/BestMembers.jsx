import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, Zap, Code, Users, Star } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import '../styles/BestMembers.css'

const BestMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('best_members')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (data) setMembers(data);
      setLoading(false);
      if (error) console.error("Elite Fetch Error:", error);
    };

    fetchMembers();
  }, []);

  if (loading) return null; // Or a subtle loader

  return (
    <section className="best-members-section">
      <div className="best-container">
        
        {/* Section Header - Aligned with Committees Style */}
        <div className="best-header">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="best-sys-badge"
          >
            <span className="badge-status-dot" />
            ELITE_OPERATIVES_REGISTRY_V2.0
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="best-title"
          >
            BEST <span className="text-primary ">MEMBERS</span>
            <div className="best-underline" />
          </motion.h2>
        </div>

        {/* Member Grid */}
        <div className="best-grid">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="member-card-wrapper group"
            >
              <div className="member-card">
                {/* Tactical Markers */}
                <div className="card-marker marker-top-left">
                    <span className="status-indicator" />
                    {member.unit}
                </div>
                <div className="card-marker marker-top-right">
                  RANK:{member.rank}
                </div>
                
                {/* Avatar Visual Area */}
                <div className="member-visual-area">
                  <div className="member-energy-ring" />
                  <div className="member-avatar-frame">
                    <img 
                      src={member.image_url} 
                      alt={member.name} 
                      className="member-img" 
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=0D1117&color=007ACC"
                      }}
                    />
                  </div>
                </div>

                {/* Member Details */}
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <div className="member-role">
                      <span className="flex items-center gap-2">
                        <Star size={12} /> {member.role}
                      </span>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="excellence-badge">
                   EXCELLENCE ACHIEVED
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BestMembers
