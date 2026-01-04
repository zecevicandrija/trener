'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zaključava skrolovanje sajta kada je meni otvoren
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.4, ease: "circOut" }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <a href="#" className={styles.logo}>
              DAVID<span className={styles.logoHighlight}>KNEZEVIC</span>
            </a>
          </div>

          <div className={styles.desktopLinks}>
            {['Home', 'Programs', 'Transformations', 'About Me'].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase()}`} className={styles.navLink}>
                <span className={styles.linkText}>{item}</span>
                <span className={styles.linkUnderline}></span>
              </a>
            ))}
          </div>

          <div className={styles.ctaContainer}>
            <button className={styles.navButton}>
              Join Now
            </button>
          </div>

          <div className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X color="#39ff14" size={32} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu color="#fff" size={32} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.noiseOverlay}></div>

            <div className={styles.mobileLinksContainer}>
              {['Home', 'Programs', 'Transformations', 'About Me', 'Contact'].map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  className={styles.mobileLink}
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.mobileLinkNumber}>0{i + 1}.</span>
                  {item}
                </motion.a>
              ))}

              <motion.button
                variants={linkVariants}
                className={styles.mobileCta}
                onClick={() => setIsOpen(false)}
              >
                START NOW <ArrowRight size={24} />
              </motion.button>
            </div>

            <div className={styles.menuBackgroundDeco}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}