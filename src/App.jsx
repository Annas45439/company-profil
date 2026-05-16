import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowDown } from 'lucide-react';
import TextScrollReveal from './ScrollReveal';
import PillNav from './PillNav';
import Lightning from './Lightning';
import Shuffle from './Shuffle';
import SpotlightCard from './SpotlightCard';

// ================= SCROLL PROGRESS BAR COMPONENT =================
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-crimson to-magic z-[200] shadow-[0_0_20px_rgba(200,150,42,0.6)]"
    />
  );
};

// ================= FLOATING PARTICLES COMPONENT =================
const FloatingParticles = ({ count = 30, colors = ["gold", "crimson", "magic"] }) => {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.6 + 0.1,
  }));

  const getColorClass = (color) => {
    switch (color) {
      case 'gold': return '#C8962A';
      case 'crimson': return '#C0392B';
      case 'magic': return '#7B3FA0';
      default: return '#C8962A';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: '-10px',
            backgroundColor: getColorClass(particle.color),
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.sin(particle.delay) * 100 - 50],
            opacity: [particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// ================= SHIMMER EFFECT COMPONENT =================
const ShimmerEffect = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
        style={{
          animation: 'shimmer 3s infinite',
          backgroundPosition: '1000% center',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 1000% center; }
          100% { background-position: -1000% center; }
        }
      `}</style>
    </div>
  );
};

// ================= ENHANCED TEXT REVEAL COMPONENT =================
const EnhancedTextReveal = ({ text, className, delay = 0 }) => {
  return (
    <motion.div
      className={`flex flex-wrap justify-center ${className}`}
      initial={false}
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 60, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                ease: [0.19, 1.0, 0.22, 1.0],
              },
            },
          }}
          className="inline-block origin-bottom"
          style={{ perspective: "1200px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ================= GLITCH EFFECT COMPONENT =================
const GlitchText = ({ text, className }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{
          textShadow: [
            "0 0 0px rgba(192, 57, 43, 0), 0 0 0px rgba(123, 63, 160, 0)",
            "-2px 0 5px rgba(192, 57, 43, 0.8), 2px 0 5px rgba(123, 63, 160, 0.8)",
            "0 0 0px rgba(192, 57, 43, 0), 0 0 0px rgba(123, 63, 160, 0)",
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
};

// ================= BRAND DATA =================
const brand = {
  name: "TELAVI",
  fullName: "TELAVI – Telang Vibes",
  tagline: "Color-Changing Premium Drink",
  description: "Minuman bunga telang premium berbasis bahan lokal Indonesia yang berubah warna secara ajaib dari biru menjadi ungu ketika ditambahkan perasan jeruk.",
  email: "rendydwi317@gmail.com",
  phone: "081949716755",
  location: "Kampus UNESA 5 Maospati, Magetan",
  institution: "Fakultas Teknik Informatika – Universitas Negeri Surabaya",
  year: 2026,
  products: [
    { name: "Telavi Latte", desc: "Ekstrak Bunga Telang + Susu Segar + Vanilla", vibe: "Creamy & Lembut", color: "from-[#3B6FA0] to-[#1e3a5f]", shadow: "shadow-[#3B6FA0]/40", price: "Rp 15.000", image: "/TELAVI LATTE.png" },
    { name: "Telavi Coffee", desc: "Kopi dengan Sentuhan Bunga Telang", vibe: "Bold & Unik", color: "from-[#2C1810] to-[#0f0805]", shadow: "shadow-[#2C1810]/40", price: "Rp 15.000", image: "/TELAVI  COFFEE.png" },
    { name: "Telavi Soda", desc: "Bunga Telang + Soda + Citrus Burst", vibe: "Segar & Sparkling", color: "from-[#2A9D8F] to-[#13544c]", shadow: "shadow-[#2A9D8F]/40", price: "Rp 14.000", image: "/TELAVI  SODA.png" },
    { name: "Telavi Milk Tea", desc: "Telang + Teh + Susu Kental Manis", vibe: "Manis & Kekinian", color: "from-[#7B3FA0] to-[#3f1f54]", shadow: "shadow-[#7B3FA0]/40", price: "Rp 17.000", image: "/TELAVI  MILK TEASODA.png" },
  ],
  team: [
    { name: "Rendy Agus D. S.", role: "Ketua / R&D", nim: "25051204348", photo: "R", avatar: "profil kelompok/adventurer-1778953439396.svg" },
    { name: "Annas Ridho Sadila", role: "Anggota 1 / Marketing", nim: "25051204368", photo: "A", avatar: "profil kelompok/adventurer-1778953446499.svg" },
    { name: "Fakhrur Rohman S.", role: "Anggota 2 / Keuangan", nim: "25051204373", photo: "F", avatar: "profil kelompok/adventurer-1778953449502.svg" }
  ]
};

// ================= ANIMATION CONFIG =================
const customEase = [0.19, 1.0, 0.22, 1.0]; // Super smooth cinematic ease

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: customEase } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// ================= REACT BITS COMPONENTS =================

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="hidden md:block">
      <motion.div style={{ x: cursorX, y: cursorY }} className="fixed top-0 left-0 w-2 h-2 bg-crimson rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2" />
      <motion.div style={{ x: smoothX, y: smoothY }} className="fixed top-0 left-0 w-14 h-14 border-[1px] border-crimson/50 bg-crimson/5 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px]" />
    </div>
  );
};

const FadeUp = ({ children, className, delay = 0 }) => {
  return (
    <motion.div variants={fadeUp} initial={false} animate="visible" transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
};

const ScrollReveal = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Cinematic Character-by-Character reveal
const AnimatedCharacters = ({ text, className }) => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className={`flex flex-wrap justify-center ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[2%] whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span key={j} variants={{
              hidden: { opacity: 0, y: 40, rotateX: -40 },
              visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: customEase } }
            }} className="inline-block origin-bottom">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ x: smoothX, y: smoothY }} className={`relative overflow-hidden inline-block cursor-none ${className}`} {...props}>
      {children}
    </motion.a>
  );
};

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      transition={{ ease: customEase }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CountUp = ({ to, suffix = "", title }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    animate(0, to, { duration: 2.5, ease: customEase, onUpdate: (v) => setValue(Math.round(v)) });
  }, [to]);

  return (
    <div className="flex flex-col items-center group">
      <div className="font-serif font-black text-6xl md:text-8xl text-gold drop-shadow-[0_0_15px_rgba(200,150,42,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:text-cream">{value}{suffix}</div>
      <div className="font-sans text-cream/60 uppercase tracking-[0.2em] text-xs mt-4 font-bold">{title}</div>
    </div>
  );
};

// ================= SECTIONS =================

const NAV_ITEMS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Magic', href: '#magic' },
  { label: 'Products', href: '#products' },
  { label: 'Why', href: '#why' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#footer' }
];

const Navbar = ({ theme, onToggleTheme }) => {
  const items = NAV_ITEMS;
  const [activeHref, setActiveHref] = useState('#top');

  useEffect(() => {
    const sectionHrefs = items.map((item) => item.href);
    const syncActiveByScroll = () => {
      const currentY = window.scrollY + 140;
      let current = sectionHrefs[0];

      sectionHrefs.forEach((href) => {
        const id = href.replace('#', '');
        const section = document.getElementById(id);
        if (section && section.offsetTop <= currentY) {
          current = href;
        }
      });

      setActiveHref(current);
    };

    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash && sectionHrefs.includes(hash)) {
        setActiveHref(hash);
      }
    };

    syncFromHash();
    syncActiveByScroll();
    window.addEventListener('scroll', syncActiveByScroll, { passive: true });
    window.addEventListener('hashchange', syncFromHash);

    return () => {
      window.removeEventListener('scroll', syncActiveByScroll);
      window.removeEventListener('hashchange', syncFromHash);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-3">
      <div className="pointer-events-auto">
        <PillNav
          logo="/telavi-logo.svg"
          logoAlt={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          items={items}
          activeHref={activeHref}
          onLogoClick={onToggleTheme}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor={theme === 'dark' ? 'rgba(10,16,40,0.68)' : 'rgba(255,255,255,0.68)'}
          pillColor={theme === 'dark' ? 'rgba(125,145,255,0.14)' : 'rgba(255,255,255,0.56)'}
          hoveredPillTextColor="#FAF5EE"
          pillTextColor={theme === 'dark' ? '#F5F7FF' : '#18233f'}
          initialLoadAnimation={false}
        />
      </div>
    </div>
  );
};

const Hero = ({ theme }) => {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream pt-20 pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <Lightning hue={theme === 'dark' ? 230 : 265} xOffset={0} speed={0.8} intensity={0.55} size={1.1} />
      </div>
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-0.5 bg-crimson mb-8 mx-auto"></div>

          {/* Iconic TELAVI — massive + scroll reveal + shuffle */}
          <div className="mb-2">
            <Shuffle
              text="TELAVI"
              tag="span"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={2}
              ease="power3.out"
              stagger={0.03}
              threshold={0.4}
              triggerOnce={true}
              triggerOnHover={true}
              className="font-sans font-black text-5xl md:text-[9rem] lg:text-[10rem] text-espresso leading-[0.85] tracking-tight inline-block"
              textAlign="left"
            />
          </div>

          {/* Dot accent */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson/60" />
            <span className="w-2 h-2 rounded-full bg-gold/40" />
            <span className="w-2 h-2 rounded-full bg-crimson/60" />
          </div>

          <p className="font-sans font-light text-base md:text-lg text-espresso/70 max-w-2xl mx-auto mb-2 leading-relaxed tracking-wide">
            Minuman bunga telang premium — <span className="text-crimson font-semibold">color-changing</span> — 100% bahan lokal.
          </p>
          <p className="font-sans font-light text-sm text-espresso/45 max-w-xl mx-auto mb-14 leading-relaxed">
            Berubah warna secara ajaib dari biru menjadi ungu ketika ditambahkan perasan jeruk.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center">
            <MagneticButton href="#products" className="bg-crimson text-cream px-12 py-5 rounded-lg uppercase tracking-[0.15em] text-xs font-bold hover:bg-crimson/90 transition-all duration-300 shadow-[0_4px_20px_rgba(192,57,43,0.3)]">
              Lihat Varian
            </MagneticButton>
            <MagneticButton href="#about" className="border border-espresso/30 text-espresso px-12 py-5 rounded-lg uppercase tracking-[0.15em] text-xs font-bold hover:border-espresso/60 transition-all duration-300">
              Cerita TELAVI
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ================= ABOUT SECTION — CLEAN & CONSISTENT =================
const About = () => {
  return (
    <section id="about" className="py-40 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10 max-w-6xl">
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: customEase }}
            className="font-sans text-[10px] tracking-[0.35em] uppercase font-bold text-crimson/50 mb-6"
          >
            Tentang Kami
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: customEase }}
            className="font-sans font-black text-5xl md:text-7xl lg:text-8xl text-espresso leading-[0.9] tracking-tight"
          >
            Lebih dari
            <br />
            <span className="text-crimson">sekadar</span>
            <br />
            minuman.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
              className="font-sans leading-7 text-espresso/75 tracking-wide"
            >
              <span className="font-bold text-crimson tracking-wider">TELAVI</span> — Telang Vibes — lahir dari inovasi mahasiswa <strong className="text-espresso font-semibold">{brand.institution}</strong>. Kami percaya bahwa minuman premium tidak harus mahal, dan bahan lokal Indonesia menyimpan keajaiban yang belum sepenuhnya terungkap.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.45, ease: customEase }}
              className="font-sans leading-7 text-espresso/65 tracking-wide text-sm"
            >
              Bunga Telang (Butterfly Pea) bukan hanya cantik. Ketika diseduh, ia menghasilkan warna biru alami yang kaya akan antioksidan. Visi kami adalah membawa sensasi visual ala cafe premium ke genggaman mahasiswa dengan harga yang bersahabat.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
              className="flex flex-wrap gap-6 md:gap-12 pt-8"
            >
              <div>
                <p className="font-sans text-3xl font-black text-crimson tracking-tight">100%</p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-espresso/35 mt-1">Natural</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-black text-crimson tracking-tight">4</p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-espresso/35 mt-1">Varian</p>
              </div>
              <div>
                <p className="font-sans text-3xl font-black text-crimson tracking-tight">63%</p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-espresso/35 mt-1">Market Fit</p>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
            className="p-10 rounded-2xl border border-espresso/10 bg-white/40"
          >
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-gold/50 mb-5">Tagline</p>
            <p className="font-sans text-xl md:text-2xl font-bold text-espresso leading-snug mb-5">
              &ldquo;{brand.tagline}&rdquo;
            </p>
            <p className="font-sans text-sm leading-relaxed text-espresso/50">
              {brand.description}
            </p>
            <div className="mt-8 pt-6 border-t border-espresso/5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson/40" />
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-espresso/35">
                  {brand.institution}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, delay: 1, ease: customEase }}
          className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mt-24 origin-center"
        />
      </div>
    </section>
  );
};

// ================= PREMIUM MAGIC BOTTLE COMPONENT =================
const PremiumBottle = ({ magic }) => {
  const bottleRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Generate rising bubbles inside liquid
  useEffect(() => {
    if (!magic) {
      setBubbles([]);
      return;
    }
    const interval = setInterval(() => {
      setBubbles(prev => {
        const newBubble = {
          id: Date.now() + Math.random(),
          x: Math.random() * 70 + 15,
          size: Math.random() * 8 + 3,
          delay: 0,
          duration: Math.random() * 3 + 2,
        };
        const filtered = prev.filter(b => b.id > Date.now() - 5000);
        return [...filtered, newBubble];
      });
    }, 300);
    return () => clearInterval(interval);
  }, [magic]);

  // Sparkle particles around bottle
  useEffect(() => {
    if (!magic) {
      setSparkles([]);
      return;
    }
    const interval = setInterval(() => {
      setSparkles(prev => {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 180 - 40,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          duration: Math.random() * 2 + 1.5,
          delay: Math.random() * 0.5,
        };
        const filtered = prev.filter(s => s.id > Date.now() - 4000);
        return [...filtered, newSparkle];
      });
    }, 400);
    return () => clearInterval(interval);
  }, [magic]);

  return (
    <div ref={bottleRef} className="relative w-72 h-[460px] flex items-end justify-center">
      {/* Outer glow ring */}
      <motion.div
        animate={{
          boxShadow: magic
            ? '0 0 80px rgba(123,63,160,0.4), 0 0 150px rgba(123,63,160,0.2), 0 0 250px rgba(123,63,160,0.1)'
            : '0 0 40px rgba(59,111,160,0.2), 0 0 80px rgba(59,111,160,0.1)'
        }}
        transition={{ duration: 2, ease: customEase }}
        className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
      />

      {/* Sparkle particles around bottle */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: s.duration, delay: s.delay, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: `calc(50% + ${s.x}px)`,
            top: `${s.y}%`,
            background: 'radial-gradient(circle, #fff, #C8962A)',
            boxShadow: '0 0 10px rgba(200,150,42,0.8)',
          }}
        />
      ))}

      {/* Floating lemon wedge decoration */}
      <motion.div
        initial={{ y: 0, opacity: 0.3, rotate: -15 }}
        animate={magic ? {
          y: [0, -30, 0],
          opacity: [0.4, 1, 0.4],
          rotate: [-15, 15, -15],
          scale: [1, 1.15, 1],
        } : {
          y: [0, -10, 0],
          opacity: 0.3,
          rotate: [-15, 15, -15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -right-6 text-4xl z-20 drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)] pointer-events-none select-none"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(200,150,42,0.3))' }}
      >🍋</motion.div>

      {/* Premium Bottle SVG */}
      <svg
        viewBox="0 0 200 500"
        className="w-full h-full drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
      >
        <defs>
          {/* Glass gradient reflection */}
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="15%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>

          {/* Liquid gradient */}
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={magic ? "#9B59B6" : "#5DADE2"} />
            <stop offset="100%" stopColor={magic ? "#7B3FA0" : "#3B6FA0"} />
          </linearGradient>

          {/* Liquid surface shimmer */}
          <linearGradient id="surfaceShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bottle body - sleek elegant shape */}
        <motion.path
          d="M 70,80 
             C 70,80 68,85 65,95
             L 55,140
             C 50,155 42,175 38,195
             C 32,225 28,260 28,290
             C 28,320 30,345 35,365
             C 40,385 45,395 50,400
             L 150,400
             C 155,395 160,385 165,365
             C 170,345 172,320 172,290
             C 172,260 168,225 162,195
             C 158,175 150,155 145,140
             L 135,95
             C 132,85 130,80 130,80
             Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* Glass shine overlay */}
        <path
          d="M 70,80 
             C 70,80 68,85 65,95
             L 55,140
             C 50,155 42,175 38,195
             C 32,225 28,260 28,290
             C 28,320 30,345 35,365
             C 40,385 45,395 50,400
             L 150,400
             C 155,395 160,385 165,365
             C 170,345 172,320 172,290
             C 172,260 168,225 162,195
             C 158,175 150,155 145,140
             L 135,95
             C 132,85 130,80 130,80
             Z"
          fill="url(#glassShine)"
        />

        {/* Liquid fill - animated */}
        <motion.path
          animate={{
            d: magic
              ? `M 33,365 
                 C 33,310 32,280 34,250
                 C 36,220 38,200 42,185
                 C 46,170 50,160 55,150
                 L 145,150
                 C 150,160 154,170 158,185
                 C 162,200 164,220 166,250
                 C 168,280 167,310 167,365
                 C 167,380 163,390 158,395
                 L 42,395
                 C 37,390 33,380 33,365 Z`
              : `M 35,390
                 C 35,340 34,305 36,270
                 C 38,240 40,215 45,195
                 C 50,175 55,162 60,150
                 L 140,150
                 C 145,162 150,175 155,195
                 C 160,215 162,240 164,270
                 C 166,305 165,340 165,390
                 C 165,395 160,398 155,398
                 L 45,398
                 C 40,398 35,395 35,390 Z`,
            fill: magic ? "#7B3FA0" : "#3B6FA0",
          }}
          transition={{ duration: 2.5, ease: customEase }}
          filter="url(#glow)"
        />

        {/* Liquid top surface wave */}
        <motion.path
          animate={{
            d: magic
              ? "M 42,185 C 60,180 80,190 100,185 C 120,180 140,190 158,185 C 155,178 140,175 120,178 C 100,181 80,175 56,182 Z"
              : "M 48,195 C 65,192 85,198 100,195 C 115,192 135,198 152,195 C 148,188 135,185 115,188 C 95,191 75,185 52,192 Z",
            fill: "url(#surfaceShimmer)",
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Bottle neck */}
        <rect x="68" y="50" width="64" height="35" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* Bottle neck shine */}
        <rect x="68" y="50" width="64" height="35" rx="6" fill="url(#glassShine)" />

        {/* Cap */}
        <motion.rect
          animate={magic ? {
            fill: ["#7B3FA0", "#9B59B6", "#7B3FA0"],
          } : {
            fill: ["#3B6FA0", "#5DADE2", "#3B6FA0"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          x="72" y="36" width="56" height="18" rx="4"
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        />

        {/* Highlight strip on bottle left */}
        <path
          d="M 38,240 C 36,270 35,300 37,340"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Highlight strip on bottle right */}
        <path
          d="M 162,240 C 164,270 165,300 163,340"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Label area */}
        <motion.ellipse
          animate={{
            cx: magic ? 100 : 100,
            cy: magic ? 260 : 255,
            fill: magic ? "rgba(123,63,160,0.25)" : "rgba(59,111,160,0.25)",
          }}
          transition={{ duration: 2, ease: customEase }}
          rx="42" ry="50"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Label text */}
        <text
          x="100" y="245"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="4"
          fontFamily="sans-serif"
        >TELAVI</text>
        <text
          x="100" y="265"
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize="7"
          letterSpacing="3"
          fontFamily="sans-serif"
        >MAGIC ELIXIR</text>

        {/* Rising bubbles inside liquid */}
        {bubbles.map(b => (
          <motion.circle
            key={b.id}
            r={b.size / 2}
            fill="rgba(255,255,255,0.25)"
            initial={{ cy: 380, cx: 50 + b.x, opacity: 0 }}
            animate={{
              cy: 160,
              cx: 50 + b.x + (Math.random() - 0.5) * 20,
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: b.duration, ease: "easeOut" }}
          />
        ))}

        {/* Bottom reflection */}
        <ellipse cx="100" cy="408" rx="60" ry="6" fill="rgba(255,255,255,0.06)" />
      </svg>

      {/* Platform shadow */}
      <motion.div
        animate={{
          scale: magic ? [1, 1.15, 1] : 1,
          opacity: magic ? [0.2, 0.4, 0.2] : 0.15,
        }}
        transition={{ duration: 3, repeat: magic ? Infinity : 0, ease: "easeInOut" }}
        className="absolute -bottom-4 w-48 h-6 bg-black/30 rounded-full blur-xl pointer-events-none"
      />
    </div>
  );
};

const ColorMagic = () => {
  const [magic, setMagic] = useState(false);

  return (
    <section id="magic" className="py-40 bg-espresso text-cream relative overflow-hidden">
      {/* Decorative Glow */}
      <motion.div
        animate={{
          background: magic
            ? 'radial-gradient(ellipse at center, rgba(123,63,160,0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(59,111,160,0.12) 0%, transparent 70%)'
        }}
        transition={{ duration: 2, ease: customEase }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        <div>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-gold"></span>
              <p className="font-sans uppercase tracking-[0.2em] text-gold text-xs font-bold">The Science Behind It</p>
            </div>
            <h2 className="font-sans text-5xl md:text-[7rem] lg:text-[6rem] font-black mb-10 leading-[0.9]">
              Blue becomes<br />Purple.<br />
              <motion.span
                animate={magic ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-magic via-[#c786e6] to-magic bg-[length:200%]"
              >MAGIC</motion.span>
            </h2>
            <p className="font-sans font-light text-cream/60 text-xl mb-12 leading-relaxed max-w-lg">
              Warna TELAVI berasal dari <em>antosianin</em> alami. Ketika pH berubah karena sentuhan asam sitrat (jeruk), struktur molekulnya bereaksi dan warnanya bertransformasi seketika.
            </p>
            <MagneticButton onClick={() => setMagic(true)} className="border border-gold text-gold px-10 py-5 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-espresso transition-all duration-700 shadow-[0_0_20px_rgba(200,150,42,0.2)]">
              {magic ? "✨ Keajaiban Terjadi" : "Trigger The Magic"}
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Premium Interactive Bottle */}
        <ScrollReveal className="relative h-[450px] md:h-[600px] flex justify-center items-center mt-10 md:mt-0">
          <PremiumBottle magic={magic} />
        </ScrollReveal>
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-40 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <ScrollReveal className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="flex-1">
            <div className="w-12 h-0.5 bg-gold mb-8"></div>
            <h2 className="font-sans font-black text-5xl md:text-7xl text-espresso leading-[0.9] mb-4">Choose Your Vibe.</h2>
            <p className="text-xs tracking-[0.25em] text-espresso/50 uppercase">4 Signature Flavors</p>
          </div>
          <motion.p
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-espresso/60 max-w-sm text-base leading-relaxed font-light"
          >
            Empat varian rasa dengan signature bunga telang. Premium ingredients, aesthetic look, affordable price.
          </motion.p>
        </ScrollReveal>

        <motion.div variants={stagger} initial={false} animate="visible" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {brand.products.map((product, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <TiltCard className={`h-[480px] rounded-2xl bg-white shadow-lg ${product.shadow} flex flex-col group overflow-hidden border border-espresso/5 hover:shadow-xl transition-all duration-300`}>
                {/* Product Image Area */}
                <div className={`bg-gradient-to-br ${product.color} h-[65%] relative overflow-hidden`}>
                  {/* Product Photo with enhanced effects */}
                  {product.image && (
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-4 z-10 transition-transform duration-300 group-hover:scale-105"
                      style={{ objectPosition: "center" }}
                    />
                  )}

                  {/* Simple Vibe badge */}
                  <span
                    className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/50 text-white text-[9px] uppercase tracking-[0.1em] font-bold rounded-full"
                  >
                    {product.vibe}
                  </span>
                </div>

                {/* Info Area */}
                <div className="h-[35%] p-7 flex flex-col justify-between bg-gradient-to-b from-white to-espresso/2 relative z-20 group-hover:from-espresso/5 group-hover:to-espresso/10 transition-all duration-700">
                  <div>
                    <motion.h3
                      whileHover={{ color: "#C0392B" }}
                      className="font-serif text-2xl text-espresso font-black leading-tight mb-1 transition-colors duration-500"
                    >
                      {product.name}
                    </motion.h3>
                    <p className="font-sans font-light text-espresso/60 text-sm leading-loose group-hover:text-espresso/80 transition-colors duration-500">{product.desc}</p>
                  </div>
                  <motion.p
                    whileHover={{ scale: 1.1 }}
                    className="font-sans font-black text-crimson text-2xl tracking-wide transition-transform duration-500 origin-left"
                  >
                    {product.price}
                  </motion.p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section className="py-32 bg-espresso border-y border-gold/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
    <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center relative z-10">
      <CountUp to={4} title="Varian Produk" />
      <CountUp to={20} suffix="+" title="Responden Validasi" />
      <CountUp to={63} suffix="%" title="Pasti Beli (Market Fit)" />
    </div>
  </section>
);

// ================= WHY TELAVI — PREMIUM ICONS =================
const WhyIcon = ({ type, index }) => {
  const icons = {
    color: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C0392B" />
            <stop offset="50%" stopColor="#7B3FA0" />
            <stop offset="100%" stopColor="#3B6FA0" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" stroke="url(#cg)" strokeWidth="1.5" fill="none" />
        <path d="M 24,12 C 28,18 30,22 30,26 C 30,30 27,34 24,36 C 21,34 18,30 18,26 C 18,22 20,18 24,12 Z" fill="url(#cg)" />
        <circle cx="24" cy="26" r="4" fill="white" fillOpacity="0.3" />
      </svg>
    ),
    leaf: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A9D8F" />
            <stop offset="100%" stopColor="#13544c" />
          </linearGradient>
        </defs>
        <path d="M 24,8 C 24,8 16,18 14,26 C 12,34 18,40 24,40 C 30,40 36,34 34,26 C 32,18 24,8 24,8 Z" fill="url(#lg)" opacity="0.9" />
        <path d="M 24,40 L 24,28" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M 18,20 Q 24,16 30,20" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.3" />
        <path d="M 16,26 Q 24,22 32,26" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.3" />
      </svg>
    ),
    diamond: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8962A" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
        <polygon points="24,6 38,20 24,42 10,20" fill="url(#dg)" opacity="0.85" />
        <polygon points="24,10 34,20 24,38 14,20" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="24" y1="10" x2="24" y2="38" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8962A" />
            <stop offset="50%" stopColor="#f0c75e" />
            <stop offset="100%" stopColor="#C8962A" />
          </linearGradient>
        </defs>
        <path d="M 24,6 L 26,18 L 38,20 L 26,22 L 24,34 L 22,22 L 10,20 L 22,18 Z" fill="url(#sg)" opacity="0.9" />
        <circle cx="16" cy="12" r="1.5" fill="url(#sg)" opacity="0.5" />
        <circle cx="34" cy="14" r="1" fill="url(#sg)" opacity="0.4" />
        <circle cx="32" cy="34" r="1.5" fill="url(#sg)" opacity="0.5" />
        <circle cx="14" cy="32" r="1" fill="url(#sg)" opacity="0.4" />
      </svg>
    ),
  };
  const iconTypes = ['color', 'leaf', 'diamond', 'sparkle'];
  const selected = iconTypes[index % iconTypes.length];
  return icons[selected];
};

const WhyTelavi = () => {
  const reasons = [
    { num: "01", title: "Color-Changing Effect", desc: "Sensasi visual ajaib tanpa pewarna sintetis. Science meets aesthetic." },
    { num: "02", title: "Lokal & Natural", desc: "Bunga telang pilihan dari petani lokal Magetan, mendukung ekonomi daerah." },
    { num: "03", title: "Premium & Terjangkau", desc: "Kualitas cafe dengan harga yang bersahabat untuk kantong mahasiswa." },
    { num: "04", title: "Kemasan Elegant", desc: "Botol PET slim 250ml yang sangat aesthetic, siap untuk masuk ke Instagram Story-mu." },
  ];

  return (
    <section id="why" className="py-40 bg-cream overflow-hidden">
      <div className="container mx-auto px-8">
        <ScrollReveal>
          <div className="mb-32 flex flex-col items-center">
            <div className="w-12 h-0.5 bg-gold mb-12 mx-auto"></div>
            <TextScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={8}
              textClassName="font-sans font-black text-5xl md:text-[8rem] text-espresso text-center leading-[0.85]"
            >
              Why TELAVI?
            </TextScrollReveal>
          </div>
        </ScrollReveal>
        <div className="max-w-5xl mx-auto space-y-32">
          {reasons.map((item, i) => (
            <ScrollReveal key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 relative group text-center md:text-left ${i % 2 !== 0 ? "md:flex-row-reverse md:text-right" : ""}`}>
              <div className="absolute top-1/2 -translate-y-1/2 font-sans font-black text-[120px] md:text-[300px] text-gold/5 -z-10 select-none transition-transform duration-700 group-hover:scale-110" style={{ fontFamily: 'sans-serif' }}>
                {item.num}
              </div>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 0 }}
                transition={{ duration: 0.4 }}
                className="drop-shadow-xl bg-white p-8 rounded-2xl border border-espresso/5 shadow-lg shadow-espresso/5 z-10"
              >
                <WhyIcon index={i} />
              </motion.div>
              <div>
                <h3 className="font-sans text-2xl font-bold text-espresso mb-3">{item.title}</h3>
                <p className="font-sans font-light text-espresso/65 text-base leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= PREMIUM TEAM CARD =================
const TeamPhoto = ({ letter, avatar, index }) => {
  const hue = [15, 210, 290]; // warm gold, blue, purple tones
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: customEase }}
        className="w-28 h-28 rounded-full flex items-center justify-center relative overflow-hidden group"
        style={{
          background: `linear-gradient(135deg, rgba(200,150,42,0.3), rgba(${hue[index]},100,160,0.3))`,
          boxShadow: '0 0 40px rgba(200,150,42,0.15)',
        }}
      >
        {/* Glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, rgba(200,150,42,0.2), transparent 60%, rgba(${hue[index]},130,200,0.15))`,
          }}
        />
        {avatar ? (
          <img src={avatar} alt="Team Avatar" className="relative z-10 w-24 h-24 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
        ) : (
          <span className="relative z-10 text-4xl font-serif font-black text-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {letter}
          </span>
        )}
      </motion.div>
    </div>
  );
};

const Team = () => (
  <section id="team" className="py-40 bg-espresso text-cream relative overflow-hidden">
    {/* Decorative subtle grid */}
    <div className="absolute inset-0" style={{
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(200,150,42,0.04) 1px, transparent 0)',
      backgroundSize: '40px 40px',
    }} />

    <div className="container mx-auto px-8 relative z-10">
      <ScrollReveal className="text-center mb-28">
        <div className="w-12 h-0.5 bg-gold mb-8 mx-auto"></div>
        <h2 className="font-sans font-black text-5xl md:text-7xl text-cream mb-6 leading-[0.9] tracking-tight">
          The <span className="text-gold">Visionaries</span>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans font-light text-cream/50 max-w-xl mx-auto text-base leading-relaxed"
        >
          Dibalik setiap tegukan ajaib, ada tiga pemikir yang mewujudkannya.
        </motion.p>
        <div className="flex justify-center gap-3 mt-10">
          <span className="w-2 h-2 rounded-full bg-gold/40" />
          <span className="w-2 h-2 rounded-full bg-gold/20" />
          <span className="w-2 h-2 rounded-full bg-gold/40" />
        </div>
        <div className="mt-12 inline-block border border-gold/20 px-8 py-3 rounded-full backdrop-blur-sm bg-white/[0.03]">
          <p className="font-sans text-xs text-gold/70 tracking-[0.3em] uppercase font-bold">PMW 2026 · UNESA</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {brand.team.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 + idx * 0.2, ease: customEase }}
          >
            <div className="group relative h-full">
              {/* Hover glow backdrop */}
              <motion.div
                whileHover={{ opacity: 1 }}
                className="absolute -inset-4 bg-gradient-to-b from-gold/5 via-transparent to-transparent blur-2xl rounded-3xl opacity-0 transition-opacity duration-500"
              />

              <SpotlightCard
                className="flex flex-col items-center text-center h-full backdrop-blur-sm"
                spotlightColor="rgba(200, 150, 42, 0.2)"
              >
                {/* Top decorative line */}
                <motion.div
                  whileHover={{ scaleX: 1.5 }}
                  className="w-16 h-px bg-gold/30 mb-8 transition-transform duration-500 origin-center"
                />

                <TeamPhoto letter={member.photo} avatar={member.avatar} index={idx} />

                {/* Name with underline animation */}
                <div className="relative mt-8 mb-4">
                  <h3 className="font-serif text-2xl font-bold text-cream tracking-wide">
                    {member.name}
                  </h3>
                  <motion.div
                    whileHover={{ width: '100%' }}
                    className="h-px bg-gold/50 mt-2 mx-auto transition-all duration-500"
                    style={{ width: '40%' }}
                  />
                </div>

                {/* Role badge */}
                <div className="text-[10px] tracking-[0.25em] uppercase font-bold text-gold px-4 py-2 border border-gold/30 rounded-full mb-5 opacity-90">
                  {member.role}
                </div>

                {/* NIM - subtle */}
                <div className="font-mono text-[10px] tracking-[0.15em] opacity-40 text-cream">
                  {member.nim}
                </div>

                {/* Bottom shine line */}
                <motion.div
                  animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-3/4 h-px mt-8"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(200,150,42,0.3) 50%, transparent 100%)',
                    backgroundSize: '200% 100%',
                  }}
                />
              </SpotlightCard>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom decorative separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay: 1, ease: customEase }}
        className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-28 origin-center"
      />
    </div>
  </section>
);

const Footer = () => (
  <footer id="footer" className="bg-espresso text-cream pt-40 pb-12 text-center relative overflow-hidden">
    <div className="container mx-auto px-8 relative z-10">
      <ScrollReveal>
        <h2 className="font-sans font-black text-5xl md:text-8xl text-cream mb-12 md:mb-20 leading-[0.9]">Let's Talk</h2>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-16 md:mb-24 font-sans font-light text-cream/70 text-sm md:text-base"
        >
          <div className="flex items-center gap-4 hover:text-gold transition-all duration-300 cursor-pointer">
            <Mail className="text-gold" size={24} />
            {brand.email}
          </div>
          <div className="w-px h-8 bg-gold/20 hidden md:block"></div>
          <div className="flex items-center gap-4 hover:text-gold transition-all duration-300 cursor-pointer">
            <Phone className="text-gold" size={24} />
            {brand.phone}
          </div>
          <div className="w-px h-8 bg-gold/20 hidden md:block"></div>
          <div className="flex items-center gap-4 hover:text-gold transition-all duration-300 cursor-pointer">
            <MapPin className="text-gold" size={24} />
            Magetan, Jawa Timur
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-crimson/20 to-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <MagneticButton href={`mailto:${brand.email}`} className="relative bg-gradient-to-r from-gold to-gold/80 text-espresso px-14 py-6 rounded-full font-black uppercase tracking-[0.3em] text-sm hover:shadow-[0_25_60px_rgba(200,150,42,0.8)] transition-all duration-500 hover:scale-110 shadow-[0_15px_40px_rgba(200,150,42,0.4)]">
            Email Kami
          </MagneticButton>
        </motion.div>
      </ScrollReveal>

      <motion.div
        variants={fadeUp}
        initial={false}
        animate="visible"
        className="mt-32 md:mt-40 border-t border-cream/10 pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase text-cream/30 font-bold group hover:border-gold/30 transition-colors duration-500 gap-4 md:gap-0"
      >
        <motion.p whileHover={{ color: "#C8962A" }} className="transition-colors">© {brand.year} {brand.fullName}</motion.p>
        <motion.p whileHover={{ color: "#C8962A" }} className="mt-6 md:mt-0 transition-colors">{brand.institution}</motion.p>
      </motion.div>
    </div>
  </footer>
);

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('telavi-theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('telavi-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={theme === 'dark' ? 'theme-dark' : 'theme-light'}>
      {/* Global UI Enhancements */}
      <ScrollProgressBar />

      <div className="noisy-bg" />
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero theme={theme} />
        {/* Cinematic Marquee Text */}
        <div className="bg-espresso text-gold py-6 overflow-hidden whitespace-nowrap border-y border-gold/10 flex relative z-10">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }} className="flex text-sm md:text-base uppercase tracking-[0.4em] font-black opacity-80">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">✦ COLOR-CHANGING · BUNGA TELANG · PREMIUM LOKAL · TELAVI VIBES</span>
            ))}
          </motion.div>
        </div>
        <About />
        <ColorMagic />
        <Products />
        <Stats />
        <WhyTelavi />
        <Team />
        <Footer />
      </main>
    </div>
  );
}
