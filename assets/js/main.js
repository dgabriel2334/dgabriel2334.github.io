/**
 * Dário Gabriel — portfolio interactions
 * Vanilla JS, no framework. Progressive enhancement:
 * the page is fully functional without any of this.
 */
(() => {
  'use strict';

  // ---------- Mobile menu ---------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const burger = menuToggle?.querySelector('[data-icon="burger"]');
  const close  = menuToggle?.querySelector('[data-icon="close"]');

  const setMenu = (open) => {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger?.classList.toggle('hidden', open);
    close?.classList.toggle('hidden', !open);
  };

  menuToggle?.addEventListener('click', () => setMenu(mobileMenu?.hidden ?? true));
  mobileMenu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  // ---------- Hero typewriter ----------------------------------------------
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = [
      'designing event-driven platforms',
      'shipping APIs with Symfony & Doctrine',
      'modeling domains with DDD',
      'scaling services on AWS & GCP',
      'mentoring international teams',
    ];

    let pIndex = 0, cIndex = 0, deleting = false;

    const tick = () => {
      const current = phrases[pIndex];
      typewriterEl.textContent = current.slice(0, cIndex);

      if (!deleting && cIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
      if (deleting && cIndex === 0) {
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }

      cIndex += deleting ? -1 : 1;
      setTimeout(tick, deleting ? 30 : 55);
    };

    tick();
  }

  // ---------- Scroll reveal (IntersectionObserver) --------------------------
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

  // ---------- Active section highlight in nav -------------------------------
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  const activeClasses = ['text-white', 'bg-white/5'];

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            activeClasses.forEach((cls) => link.classList.toggle(cls, isActive));
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => activeObserver.observe(s));
  }

  // ---------- Chip styling (keeps markup lean) ------------------------------
  // Turns bare `<li>` items inside [data-tags] into styled tech chips.
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

  // ---------- Hero code card tabs ------------------------------------------
  const codeTabs    = document.querySelectorAll('[data-code-tab]');
  const codePanels  = document.querySelectorAll('[data-code-panel]');
  const runtimeEl   = document.getElementById('code-runtime');

  const runtimeByTab = {
    php:   'php 8.3',
    node:  'node 20',
    react: 'react 18 · ts',
    java:  'java 21 · spring',
  };

  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-code-tab');

      codeTabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.classList.toggle('bg-white/10', active);
        t.classList.toggle('text-white', active);
        t.classList.toggle('text-ink-300', !active);
      });

      codePanels.forEach((p) => {
        p.hidden = p.getAttribute('data-code-panel') !== target;
      });

      if (runtimeEl) runtimeEl.textContent = runtimeByTab[target] ?? '';
    });
  });

  // ---------- Copy email to clipboard --------------------------------------
  const copyBtn = document.getElementById('copy-email');
  copyBtn?.addEventListener('click', async () => {
    const value = copyBtn.getAttribute('data-copy') ?? '';
    const label = copyBtn.querySelector('[data-copy-label]');
    try {
      await navigator.clipboard.writeText(value);
      if (label) label.textContent = 'Copied!';
      copyBtn.classList.add('border-brand-400', 'text-white');
      setTimeout(() => {
        if (label) label.textContent = 'Copy email';
        copyBtn.classList.remove('border-brand-400', 'text-white');
      }, 1600);
    } catch {
      if (label) label.textContent = 'Press Ctrl+C';
    }
  });

  // ---------- Back-to-top button --------------------------------------------
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    const toggleVisibility = () => {
      const visible = window.scrollY > 400;
      backToTop.classList.toggle('opacity-0', !visible);
      backToTop.classList.toggle('translate-y-4', !visible);
      backToTop.classList.toggle('opacity-100', visible);
      backToTop.classList.toggle('translate-y-0', visible);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    toggleVisibility();
  }

  // ---------- Footer year ---------------------------------------------------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
