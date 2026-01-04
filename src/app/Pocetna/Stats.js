'use client';
import { useEffect, useRef } from 'react';
import styles from './Stats.module.css';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Trophy, Users, Timer, Dumbbell } from 'lucide-react';

// --- KOMPONENTA ZA ANIMIRANI BROJ ---
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Formatiranje broja bez decimala
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={styles.statNumber}>0{suffix}</span>;
};

// --- PODACI ---
const statsData = [
  {
    id: 1,
    value: 500,
    suffix: "+",
    label: "TRANSFORMATIONS",
    desc: "Successfully completed protocols",
    icon: Users
  },
  {
    id: 2,
    value: 98,
    suffix: "%",
    label: "SUCCESS RATE",
    desc: "Clients who achieved their goal",
    icon: Trophy
  },
  {
    id: 3,
    value: 12,
    suffix: "",
    label: "YEARS OF EXPERIENCE",
    desc: "Brutal field work",
    icon: Timer
  },
  {
    id: 4,
    value: 1000,
    suffix: "+",
    label: "CUSTOM PLANS",
    desc: "Tailored to your unique goals",
    icon: Dumbbell
  },
];

export default function Stats() {
  return (
    <section className={styles.statsSection}>
      {/* Pozadinski dekorativni tekst */}
      <div className={styles.bgText}>DOMINATION</div>

      {/* Mreža u pozadini */}
      <div className={styles.gridBackground}></div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.subHeader}>NUMBERS DON'T LIE</h3>
          <div className={styles.line}></div>
        </div>

        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={styles.statCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Ukrasni uglovi */}
              <div className={styles.cornerTL}></div>
              <div className={styles.cornerBR}></div>

              <div className={styles.iconWrapper}>
                <stat.icon size={32} />
              </div>

              <div className={styles.numberWrapper}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              <h4 className={styles.label}>{stat.label}</h4>
              <p className={styles.desc}>{stat.desc}</p>

              {/* Hover efekat skenera */}
              <div className={styles.scannerLine}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}