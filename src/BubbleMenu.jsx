import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

export default function BubbleMenu({
  logo,
  items = [],
  menuAriaLabel = 'Toggle menu',
  animationEase = 'back.out(1.5)',
  animationDuration = 0.45,
  staggerDelay = 0.1,
  onMenuClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 20, autoAlpha: 0 });
      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(labels[i], { y: 0, autoAlpha: 1, duration: animationDuration, ease: 'power3.out' }, `-=${animationDuration * 0.8}`);
        }
      });
    } else if (showOverlay) {
      gsap.to(labels, { y: 20, autoAlpha: 0, duration: 0.15, ease: 'power3.in' });
      gsap.to(bubbles, {
        scale: 0, duration: 0.2, ease: 'power3.in',
        onComplete: () => { gsap.set(overlay, { display: 'none' }); setShowOverlay(false); }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      <nav className="bm-nav" aria-label="Mobile navigation">
        {/* Logo bubble */}
        <div className="bm-bubble bm-logo">
          {typeof logo === 'string'
            ? <img src={logo} alt="Logo" className="bm-logo-img" />
            : logo}
        </div>

        {/* Hamburger toggle */}
        <button
          type="button"
          className={`bm-bubble bm-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
        >
          <span className="bm-line" />
          <span className="bm-line short" />
        </button>
      </nav>

      {showOverlay && (
        <div ref={overlayRef} className="bm-overlay" aria-hidden={!isMenuOpen}>
          <ul className="bm-list" role="menu">
            {items.map((item, idx) => (
              <li key={idx} role="none" className="bm-col">
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className="bm-pill"
                  onClick={() => setIsMenuOpen(false)}
                  ref={el => { if (el) bubblesRef.current[idx] = el; }}
                >
                  <span
                    className="bm-label"
                    ref={el => { if (el) labelRefs.current[idx] = el; }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
