'use client';
import { useRef, useState } from 'react';
import styles from './Programi.module.css';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Gradient - Desktop Only Effect via CSS handling */}
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
        {recommended && <div className={styles.badge}>MOST POPULAR</div>}

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
          <span className={styles.btnText}>CHOOSE PROTOCOL</span>
          <ArrowRight className={styles.btnIcon} size={20} />
        </button>

        <div className={styles.techLines}></div>
        <div className={styles.techNumber}>0{Math.floor(delay * 10)}</div>
      </div>
    </motion.div>
  );
};

export default function Programi() {
  const programs = [
    {
      title: "BASIC",
      subtitle: "Workout Plan",
      price: "49",
      features: [
        "4-Split Brutal Workout",
        "Exercise Video Demonstrations",
        "Progressive Overload System",
        "PDF Warm-up Guide",
        "Email Support"
      ],
      recommended: false,
      delay: 0.1
    },
    {
      title: "MENTORSHIP",
      subtitle: "1 on 1",
      price: "199",
      features: [
        "Personalized Workout Plan",
        "Keto/Carb-Cycle Nutrition Plan",
        "24/7 WhatsApp Support",
        "Weekly Check-in Calls",
        "Form Correction (Video)",
        "Supplementation Guide"
      ],
      recommended: true,
      delay: 0.2
    },
    {
      title: "PREMIUM",
      subtitle: "Nutrition Plan",
      price: "59",
      features: [
        "Macro & Calorie Calculation",
        "70+ Recipes for Bulk/Cut",
        "Shopping List",
        "Cheat Meals Guide",
        "Meal Prep Strategies"
      ],
      recommended: false,
      delay: 0.3
    }
  ];

  return (
    <section className={styles.section} id="program">
      {/* Dynamic Background */}
      <div className={styles.gridBg}></div>
      <div className={styles.motionBgContainer}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <motion.p
            className={styles.topTag}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            SYSTEM // CHOICE
          </motion.p>
          <motion.h2
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            YOUR WEAPON <br />
            <span className={styles.highlight}>FOR SUCCESS</span>
          </motion.h2>

          {/* Mobile Hint text */}
          <p className={styles.mobileSwipeHint}>&larr; SWIPE FOR MORE &rarr;</p>
        </div>

        <div className={styles.cardsGrid}>
          {programs.map((prog, index) => (
            <ProgramCard key={index} {...prog} />
          ))}
          {/* Spacer for mobile scroll padding */}
          <div className={styles.spacer}></div>
        </div>
      </div>
    </section>
  );
}