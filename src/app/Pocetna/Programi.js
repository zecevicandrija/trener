'use client';
import { useRef, useState } from 'react';
import styles from './Programi.module.css';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Check, Flame, Zap, Crown, ArrowRight } from 'lucide-react';

// --- KOMPONENTA JEDNE KARTICE (Sa Spotlight efektom) ---
const ProgramCard = ({ title, subtitle, price, features, recommended, delay }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className={`${styles.card} ${recommended ? styles.recommendedCard : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient koji prati miša */}
      <motion.div
        className={styles.spotlight}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(57, 255, 20, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Border Spotlight */}
      <motion.div
        className={styles.spotlightBorder}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(57, 255, 20, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className={styles.cardContent}>
        {recommended && <div className={styles.badge}>NAJTRAŽENIJE</div>}
        
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.currency}>€</span>
          <span className={styles.price}>{price}</span>
        </div>

        <ul className={styles.featuresList}>
          {features.map((feature, i) => (
            <li key={i} className={styles.featureItem}>
              <Check className={styles.checkIcon} size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button className={styles.ctaButton}>
          <span className={styles.btnText}>ODABERI PROTOKOL</span>
          <ArrowRight className={styles.btnIcon} size={20} />
        </button>

        {/* Dekorativni tech detalji */}
        <div className={styles.techLines}></div>
        <div className={styles.techNumber}>0{delay * 10}</div>
      </div>
    </motion.div>
  );
};

export default function Programi() {
  const programs = [
    {
      title: "BASIC",
      subtitle: "Plan Treninga",
      price: "49",
      features: [
        "4-Split Brutalni Trening",
        "Video Demonstracije Vežbi",
        "Progressive Overload Sistem",
        "PDF Vodič za Zagrevanje",
        "Podrška putem Email-a"
      ],
      recommended: false,
      delay: 0.1
    },
    {
      title: "MENTORSTVO",
      subtitle: "1 na 1",
      price: "199",
      features: [
        "Personalizovan Plan Treninga",
        "Keto/Carb-Cycle Plan Ishrane",
        "24/7 WhatsApp Podrška",
        "Nedeljni Check-in Pozivi",
        "Korekcija Forme (Video)",
        "Suplementacija Vodič"
      ],
      recommended: true, // Ovo je onaj koji "prodaješ"
      delay: 0.2
    },
    {
      title: "PREMIUM",
      subtitle: "Plan Ishrane",
      price: "59",
      features: [
        "Makro & Kalorijski Proračun",
        "70+ Recepta za Masu/Definiciju",
        "Lista za Kupovinu",
        "Vodič za Cheat Meals",
        "Meal Prep Strategije"
      ],
      recommended: false,
      delay: 0.3
    }
  ];

  return (
    <section className={styles.section} id="program">
      {/* Background Grid */}
      <div className={styles.gridBg}></div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.p 
            className={styles.topTag}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            SISTEM // IZBOR
          </motion.p>
          <motion.h2 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TVOJE ORUŽJE <br />
            <span className={styles.highlight}>ZA USPEH</span>
          </motion.h2>
        </div>

        <div className={styles.cardsGrid}>
          {programs.map((prog, index) => (
            <ProgramCard key={index} {...prog} />
          ))}
        </div>
      </div>
    </section>
  );
}