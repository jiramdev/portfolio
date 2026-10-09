export const INTRO_KEY = "jiram_intro_seen";

// Runs as the first thing in <body>, before the intro curtain is painted. The
// curtain is display:none by default in globals.css; this reveals it on a first,
// motion-friendly visit so the animation starts on the first paint. A rule is
// injected rather than an attribute set on <html>, which would fight React's
// hydration. Repeat visitors and anyone without JS never see it.
export const INTRO_BOOTSTRAP = `try{if(!sessionStorage.getItem("${INTRO_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var s=document.createElement("style");s.textContent="[data-intro-curtain]{display:flex}";document.head.appendChild(s)}}catch(e){}`;

// Client twins of the bootstrap's guarded reads. sessionStorage throws in some
// privacy modes, and an unguarded read inside useSyncExternalStore's getSnapshot
// throws during render, which unmounts the tree and leaves a blank page.
export function hasSeenIntro() {
  try {
    return Boolean(window.sessionStorage.getItem(INTRO_KEY));
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_KEY, "true");
  } catch {
    // Nothing to do. Worst case the intro plays again on the next load.
  }
}