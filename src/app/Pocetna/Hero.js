'use client';
import { useRef, useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  
  // --- SCROLL ANIMATION HOOKS ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // Pozadina ide sporije
  const y2 = useTransform(scrollY, [0, 500], [0, -150]); // Tekst ide brže gore
  const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Tekst bledi
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]); // Pozadina se blago zumira

  // --- MOUSE MOVE EFFECT (MAGNETIC) ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    setMousePosition({ x: moveX * 0.01, y: moveY * 0.01 });
  };

  return (
    <section 
      ref={containerRef} 
      className={styles.heroSection} 
      onMouseMove={handleMouseMove}
    >
      
      {/* --- LEVEL 1: DYNAMIC BACKGROUND --- */}
      <motion.div style={{ y: y1, scale }} className={styles.videoContainer}>
        <div className={styles.overlayGradient}></div>
        <div className={styles.overlayGrid}></div>
        <div className={styles.noise}></div>
        {/* Placeholder video - zameniti svojim mp4 fajlom */}
        <video autoPlay loop muted playsInline className={styles.bgVideo}>
           <source src="https://www.pexels.com/download/video/4761818/" type="video/mp4" />
        </video>
      </motion.div>

      {/* --- LEVEL 2: DECORATIVE HUD ELEMENTS (Technical feel) --- */}
      <div className={styles.hudLayer}>
        <div className={styles.hudTopLeft}>
            <span>Akcija</span>
            <span>Mentorstvo 50%</span>
        </div>
        
      </div>

      {/* --- LEVEL 3: MAIN CONTENT --- */}
      <div className={styles.contentContainer}>
        
        {/* LEBDEĆE KARTICE (FLOATING STATS) - Samo na desktopu vidljive lepo */}
        <motion.div 
            className={styles.floatingCard} 
            style={{ x: mousePosition.x * -20, y: mousePosition.y * -20 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
        >
            <Zap className={styles.iconNeon} />
            <div>
                <h4>EKSPLOZIVNOST</h4>
                <p>Optimizacija snage</p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.floatingCardRight} 
            style={{ x: mousePosition.x * 30, y: mousePosition.y * 30 }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
        >
            <Activity className={styles.iconNeon} />
            <div>
                <h4>METABOLIZAM</h4>
                <p>Maksimalno sagorevanje</p>
            </div>
        </motion.div>


        {/* GLAVNI TEKST */}
        <motion.div style={{ y: y2, opacity }} className={styles.textWrapper}>
          
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "100px" }} 
            className={styles.separatorLine}
          ></motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.subtitle}
          >
            NEMA KOMPROMISA // SAMO REZULTATI
          </motion.h2>

          <div className={styles.titleContainer}>
            <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={styles.titleOutline}
            >
                TRANSFORMIŠI
            </motion.h1>
            <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                className={styles.titleFilled}
            >
                SVOJU REALNOST
            </motion.h1>
          </div>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Premium coaching sistem dizajniran za elitu. 
            Kombinacija nauke, brutalnog treninga i nutricionizma.
          </motion.p>

          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button className={styles.primaryBtn}>
              <span className={styles.btnContent}>
                ZAPOČNI ODMAH <ArrowRight className={styles.btnIcon} />
              </span>
              <div className={styles.btnGlitch}></div>
            </button>
            
            <button className={styles.secondaryBtn}>
                <ShieldCheck size={18} style={{marginRight: 8}}/> 
                GARANCIJA USPEHA
            </button>
          </motion.div>

        </motion.div>
      </div>

      {/* --- LEVEL 4: INFINITE SCROLL TICKER BOTTOM --- */}
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerContent}>
             <span>SNAGA</span> • <span>IZDRŽLJIVOST</span> • <span>DISCIPLINA</span> • <span>FOKUS</span> • <span>SNAGA</span> • <span>IZDRŽLJIVOST</span> • <span>DISCIPLINA</span> • <span>FOKUS</span> •
        </div>
      </div>
    </section>
  );
}