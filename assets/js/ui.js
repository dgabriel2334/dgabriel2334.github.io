import { translations, getCurrentLang } from './i18n.js';

const setActive = (el, classNames, isActive) => {
  classNames.forEach((cls) => el?.classList.toggle(cls, isActive));
};

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const burger = menuToggle?.querySelector('[data-icon="burger"]');
const close  = menuToggle?.querySelector('[data-icon="close"]');

const setMenu = (open) => {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  setActive(burger, ['hidden'], open);
  setActive(close, ['hidden'], !open);
  if (open) mobileMenu.querySelector('a')?.focus();
  else menuToggle.focus();
};

menuToggle?.addEventListener('click', () => setMenu(mobileMenu?.hidden ?? true));
mobileMenu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) setMenu(false);
});

// ---------- Hero typewriter ----------
const typewriterPhrases = {
  en: [
    'designing event-driven platforms',
    'shipping APIs with Symfony & Doctrine',
    'modeling domains with DDD',
    'scaling services on AWS & GCP',
    'mentoring international teams',
  ],
  pt: [
    'desenhando plataformas orientadas a eventos',
    'entregando APIs com Symfony & Doctrine',
    'modelando domínios com DDD',
    'escalando serviços na AWS & GCP',
    'mentorando times internacionais',
  ],
  es: [
    'diseñando plataformas orientadas a eventos',
    'entregando APIs con Symfony y Doctrine',
    'modelando dominios con DDD',
    'escalando servicios en AWS y GCP',
    'haciendo mentoring a equipos internacionales',
  ],
};

const typewriterEl = document.getElementById('typewriter');
let twTimer = null;
let twState = { pIndex: 0, cIndex: 0, deleting: false };

const resetTypewriter = () => {
  if (twTimer) clearTimeout(twTimer);
  twState = { pIndex: 0, cIndex: 0, deleting: false };
  if (typewriterEl) typewriterEl.textContent = '';
  startTypewriter();
};

const startTypewriter = () => {
  const phrases = typewriterPhrases[getCurrentLang()];
  if (!typewriterEl || !phrases.length) return;
  const tick = () => {
    const current = phrases[twState.pIndex];
    typewriterEl.textContent = current.slice(0, twState.cIndex);

    if (!twState.deleting && twState.cIndex === current.length) {
      twState.deleting = true;
      twTimer = setTimeout(tick, 1600);
      return;
    }
    if (twState.deleting && twState.cIndex === 0) {
      twState.deleting = false;
      twState.pIndex = (twState.pIndex + 1) % phrases.length;
    }
    twState.cIndex += twState.deleting ? -1 : 1;
    twTimer = setTimeout(tick, twState.deleting ? 30 : 55);
  };
  tick();
};

document.addEventListener('lang:changed', resetTypewriter);
resetTypewriter();

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealTargets.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// ---------- Active section highlight in nav ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('[data-nav]');
const NAV_ACTIVE_CLASSES = ['text-white', 'bg-white/5'];

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          setActive(link, NAV_ACTIVE_CLASSES, link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => activeObserver.observe(s));
}

// ---------- Chip styling ----------
document.querySelectorAll('[data-tags] > li').forEach((li) => {
  li.className = [
    'inline-flex', 'items-center',
    'rounded-full',
    'border', 'border-white/10',
    'bg-white/5',
    'px-2.5', 'py-0.5',
    'font-mono', 'text-[11px]', 'text-ink-100',
    'transition',
    'hover:-translate-y-0.5',
    'hover:border-brand-400/50',
    'hover:bg-brand-500/10',
    'hover:text-white',
  ].join(' ');
});

// ---------- Hero code card tabs ----------
const codeTabs    = document.querySelectorAll('[data-code-tab]');
const codePanels  = document.querySelectorAll('[data-code-panel]');
const runtimeEl      = document.getElementById('code-runtime');
const architectureEl = document.getElementById('code-architecture');

const runtimeByTab = {
  php:     'php 8.3 · symfony',
  node:    'nest 10 · node 20',
  react:   'react 18 · ts',
  vue:     'vue 3 · composition api',
  angular: 'angular 17 · signals',
  java:    'quarkus 3 · java 21',
  go:      'go 1.22 · net/http',
  sql:     'postgres 16',
  docker:  'docker · multi-stage',
  k8s:     'kubernetes 1.30',
  gitlab:  'gitlab ci · eks',
};

const architectureByTab = {
  php:     'DDD · Hexagonal · CQRS-lite',
  node:    'DDD · Hexagonal · Event-driven',
  react:   'Component-driven · Composition',
  vue:     'Component-driven · Composition API',
  angular: 'Component-driven · Dependency Injection',
  java:    'DDD · Hexagonal · CQRS-lite',
  go:      'Clean Architecture · Concurrency',
  sql:     'Data modeling · Query optimization',
  docker:  'Containerization · Multi-stage builds',
  k8s:     'Cloud-native · Declarative infra',
  gitlab:  'CI/CD · Pipeline as code',
};

const selectCodeTab = (tab) => {
  const target = tab.getAttribute('data-code-tab');

  codeTabs.forEach((t) => {
    const active = t === tab;
    t.setAttribute('aria-selected', String(active));
    setActive(t, ['bg-white/10', 'text-white'], active);
    setActive(t, ['text-ink-300'], !active);
  });

  codePanels.forEach((p) => {
    p.hidden = p.getAttribute('data-code-panel') !== target;
  });

  if (runtimeEl) runtimeEl.textContent = runtimeByTab[target] ?? '';
  if (architectureEl) architectureEl.textContent = architectureByTab[target] ?? '';
};

codeTabs.forEach((tab) => tab.addEventListener('click', () => selectCodeTab(tab)));

// ---------- Category filter (Backend / Frontend / Ops) ----------
const categoryTabs = document.querySelectorAll('[data-code-category]');

categoryTabs.forEach((cat) => {
  cat.addEventListener('click', () => {
    const category = cat.getAttribute('data-code-category');

    categoryTabs.forEach((c) => {
      const active = c === cat;
      c.setAttribute('aria-selected', String(active));
      setActive(c, ['bg-brand-500/10', 'text-brand-300'], active);
      setActive(c, ['text-ink-400'], !active);
    });

    let firstVisible = null;
    codeTabs.forEach((t) => {
      const visible = t.getAttribute('data-category') === category;
      t.hidden = !visible;
      if (visible && !firstVisible) firstVisible = t;
    });

    if (firstVisible) selectCodeTab(firstVisible);
  });
});

document.querySelector('[data-code-category][aria-selected="true"]')?.click();

// ---------- Framework file sub-tabs (PHP, React, Node, Java, Go, SQL) ----------
const wireFileTabs = (tabAttr, panelAttr) => {
  const tabs = document.querySelectorAll(`[${tabAttr}]`);
  const panels = document.querySelectorAll(`[${panelAttr}]`);

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute(tabAttr);

      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        setActive(t, ['bg-white/10', 'text-white'], active);
        setActive(t, ['text-ink-300'], !active);
      });

      panels.forEach((p) => {
        p.hidden = p.getAttribute(panelAttr) !== target;
      });
    });
  });
};

['php', 'react', 'node', 'java', 'go', 'sql'].forEach((lang) => {
  wireFileTabs(`data-${lang}-file`, `data-${lang}-file-panel`);
});

// ---------- Copy email to clipboard ----------
const copyBtn = document.getElementById('copy-email');
copyBtn?.addEventListener('click', async () => {
  const value = copyBtn.getAttribute('data-copy') ?? '';
  const label = copyBtn.querySelector('[data-copy-label]');
  try {
    await navigator.clipboard.writeText(value);
    if (label) label.textContent = translations[getCurrentLang()]['contact.copied'];
    setActive(copyBtn, ['border-brand-400', 'text-white'], true);
    setTimeout(() => {
      if (label) label.textContent = translations[getCurrentLang()]['contact.copy'];
      setActive(copyBtn, ['border-brand-400', 'text-white'], false);
    }, 1600);
  } catch {
    if (label) label.textContent = 'Ctrl+C';
  }
});

// ---------- Back-to-top button ----------
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const toggleVisibility = () => {
    const visible = window.scrollY > 400;
    setActive(backToTop, ['opacity-0', 'translate-y-4'], !visible);
    setActive(backToTop, ['opacity-100', 'translate-y-0'], visible);
  };
  window.addEventListener('scroll', toggleVisibility, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  toggleVisibility();
}

// ---------- Footer year ----------
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
