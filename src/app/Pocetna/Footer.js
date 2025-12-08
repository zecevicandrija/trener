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
            <h2>JOŠ UVEK ČEKAŠ?</h2>
            <p>Sutra je dan kada gubitnici počinju. Ti počni danas.</p>
          </div>
          <button className={styles.ctaButton}>
            PRIJAVI SE<ArrowUpRight className={styles.btnIcon} />
          </button>
        </div>

        {/* --- MAIN FOOTER CONTENT --- */}
        <div className={styles.mainContent}>
          
          {/* COLUMN 1: BRAND */}
          <div className={styles.colBrand}>
            <a href="#" className={styles.logo}>
              Ime<span className={styles.neon}>Prezime</span>
            </a>
            <p className={styles.missionText}>
              Premium online coaching sistem fokusiran na radikalnu transformaciju tela i uma. 
              Nema prečica. Samo disciplina i nauka.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><Instagram size={24} /></a>
              <a href="#" className={styles.socialIcon}><Mail size={24} /></a>
              <a href="#" className={styles.socialIcon}><Phone size={24} /></a>
            </div>
          </div>

          {/* COLUMN 2: LINKS */}
          <div className={styles.colLinks}>
            <h4 className={styles.colTitle}>NAVIGACIJA</h4>
            <ul className={styles.linkList}>
              <li><a href="#home">Početna</a></li>
              <li><a href="#program">Programi</a></li>
              <li><a href="#transformations">Transformacije</a></li>
              <li><a href="#contact">Kontakt</a></li>
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
                <span>Beograd, Srbija</span>
              </li>
              <li className={styles.trustBadge}>
                <ShieldCheck className={styles.iconSmall} size={18} color="#39FF14"/>
                <span>100% Sertifikovan Trener</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; {currentYear} IME PREZIME. SVA PRAVA ZADRŽANA.
          </div>
          
          {/* <div className={styles.systemStatus}>
            <span className={styles.statusDot}></span>
            SYSTEM: ONLINE
          </div> */}

          <div className={styles.legalLinks}>
            <a href="#">Privatnost</a>
            <span className={styles.divider}>/</span>
            <a href="#">Uslovi</a>
          </div>
        </div>

      </div>
    </footer>
  );
}