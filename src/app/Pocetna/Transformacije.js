'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Transformacije.module.css';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Flame, Calendar, MoveHorizontal } from 'lucide-react';

// --- PODACI O KLIJENTIMA ---
const clients = [
  {
    id: 1,
    name: "MARKO J.",
    program: "1 ON 1 MENTORSHIP",
    beforeImg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
    stats: {
      weight: "-18kg",
      time: "12 Weeks",
      waist: "-15cm"
    },
    quote: "I thought genetics were the problem. It turned out the problem was the lack of a system."
  },
  {
    id: 2,
    name: "STEFAN R.",
    program: "WORKOUT PLAN",
    beforeImg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    afterImg: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop",
    stats: {
      weight: "-12kg",
      time: "8 Weeks",
      waist: "-10cm"
    },
    quote: "Brutally hard, but worth every drop of sweat. I feel like a new person."
  }
];

// --- KOMPONENTA ZA JEDAN SLIDER (POPRAVLJENA LOGIKA) ---
const ComparisonCard = ({ client, index }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Funkcija koja računa poziciju na osnovu miša/dodira
  const calculatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - left) / width) * 100;
    // Limitiramo od 0 do 100
    return Math.max(0, Math.min(100, pos));
  }, []);

  // Handler za početak prevlačenja (klik ili touch bilo gde na slici)
  const handleStart = (event) => {
    setIsDragging(true);
    // Odmah ažuriramo poziciju na mestu klika
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setSliderPosition(calculatePosition(clientX));
  };

  // Handler za kraj prevlačenja
  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handler za pomeranje (dok je dragging aktivan)
  const handleMove = useCallback((event) => {
    if (!isDragging) return;

    // Sprečavamo selektovanje teksta dok vučemo
    // event.preventDefault(); // Oprezno sa ovim na touch uređajima

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    setSliderPosition(calculatePosition(clientX));
  }, [isDragging, calculatePosition]);

  // Globalni event listeneri
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2 }}
    >
      {/* --- ZAGLAVLJE --- */}
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.clientName}>{client.name}</h3>
          <span className={styles.programName}>{client.program}</span>
        </div>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot}></span> VERIFIED
        </div>
      </div>

      {/* --- SLIDER KONTEJNER --- */}
      <div
        className={styles.imageContainer}
        ref={containerRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* SLIKA PRE */}
        <div className={styles.imageBefore}>
          <img src={client.beforeImg} alt="Before" draggable="false" />
          <span className={styles.labelBefore}>BEFORE</span>
        </div>

        {/* SLIKA POSLE (MASKIRANA) */}
        <div
          className={styles.imageAfter}
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img src={client.afterImg} alt="After" draggable="false" />
          <span className={styles.labelAfter}>AFTER</span>
        </div>

        {/* HANDLE LINIJA */}
        <div
          className={styles.sliderHandle}
          style={{ left: `${sliderPosition}%` }}
        >
          <div className={styles.handleLine}></div>
          <div className={styles.handleButton}>
            <MoveHorizontal size={20} color="#000" />
          </div>
        </div>
      </div>

      {/* --- HUD STATS --- */}
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <Flame className={styles.statIcon} size={18} />
          <span className={styles.statValue}>{client.stats.weight}</span>
          <span className={styles.statLabel}>WEIGHT</span>
        </div>
        <div className={styles.statItem}>
          <Calendar className={styles.statIcon} size={18} />
          <span className={styles.statValue}>{client.stats.time}</span>
          <span className={styles.statLabel}>DURATION</span>
        </div>
        <div className={styles.statItem}>
          <Trophy className={styles.statIcon} size={18} />
          <span className={styles.statValue}>{client.stats.waist}</span>
          <span className={styles.statLabel}>WAIST</span>
        </div>
      </div>

      <div className={styles.quoteBox}>
        <p>"{client.quote}"</p>
      </div>
    </motion.div>
  );
};

export default function Transformacije() {
  return (
    <section className={styles.section} id="transformations">
      <div className={styles.bgGrid}></div>
      <div className={styles.bgGlow}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <motion.p
            className={styles.topTag}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            PROOFS // NOT PROMISES
          </motion.p>
          <motion.h2
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            REDEFINE YOUR <br /> <span className={styles.neonText}>POTENTIAL</span>
          </motion.h2>
        </div>

        <div className={styles.transformationsGrid}>
          {clients.map((client, index) => (
            <ComparisonCard key={client.id} client={client} index={index} />
          ))}
        </div>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.ctaContent}>
            <h3>READY TO BE THE NEXT STORY?</h3>
            <p>Don't wait for Monday. Don't wait for the "right time". Time is running out.</p>
            <button className={styles.ctaButton}>
              SCHEDULE CONSULTATIONS <ArrowRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}