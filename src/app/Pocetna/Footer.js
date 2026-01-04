'use client';
import styles from './Footer.module.css';
import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Background Decor */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.bigBgText}>LEGACY</div>

      <div className={styles.container}>

        {/* --- PRE-FOOTER CTA SECTION --- */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaText}>
            <h2>STILL WAITING?</h2>
            <p>Tomorrow is the day when losers start. You start today.</p>
          </div>
          <button className={styles.ctaButton}>
            SIGN UP<ArrowUpRight className={styles.btnIcon} />
          </button>
        </div>

        {/* --- MAIN FOOTER CONTENT --- */}
        <div className={styles.mainContent}>

          {/* COLUMN 1: BRAND */}
          <div className={styles.colBrand}>
            <a href="#" className={styles.logo}>
              David<span className={styles.neon}>Knezevic</span>
            </a>
            <p className={styles.missionText}>
              Premium online coaching system focused on radical transformation of body and mind.
              No shortcuts. Only discipline and science.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><Instagram size={24} /></a>
              <a href="#" className={styles.socialIcon}><Mail size={24} /></a>
              <a href="#" className={styles.socialIcon}><Phone size={24} /></a>
            </div>
          </div>

          {/* COLUMN 2: LINKS */}
          <div className={styles.colLinks}>
            <h4 className={styles.colTitle}>NAVIGATION</h4>
            <ul className={styles.linkList}>
              <li><a href="#home">Home</a></li>
              <li><a href="#program">Programs</a></li>
              <li><a href="#transformations">Transformations</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* COLUMN 3: INFO */}
          <div className={styles.colInfo}>
            <h4 className={styles.colTitle}>KONTAKT INFO</h4>
            <ul className={styles.infoList}>
              <li>
                <Mail className={styles.iconSmall} size={18} />
                <span>info@gmail.com</span>
              </li>
              <li>
                <Phone className={styles.iconSmall} size={18} />
                <span>+381 60 123 4567</span>
              </li>
              <li>
                <MapPin className={styles.iconSmall} size={18} />
                <span>Belgrade, Serbia</span>
              </li>
              <li className={styles.trustBadge}>
                <ShieldCheck className={styles.iconSmall} size={18} color="#39FF14" />
                <span>100% Certified Trainer</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} DAVID KNEZEVIC. ALL RIGHTS RESERVED.
          </div>

          {/* <div className={styles.systemStatus}>
            <span className={styles.statusDot}></span>
            SYSTEM: ONLINE
          </div> */}

          <div className={styles.legalLinks}>
            <a href="#">Privacy</a>
            <span className={styles.divider}>/</span>
            <a href="#">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}