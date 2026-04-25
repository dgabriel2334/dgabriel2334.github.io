/**
 * Portfolio visit notifier — pings ntfy.sh so the owner gets a push
 * notification on their phone whenever someone opens the site, triggers
 * a high-intent action, or finishes a session.
 *
 * Three layers:
 *   1) Open  — fires immediately, every page load
 *   2) Engagement — fires per high-intent click/scroll (deduped per load)
 *   3) Session summary — fires on pagehide with aggregated metrics
 *
 * Privacy posture:
 *   - No PII collected; only browser/device/network signals visible to any site
 *   - Uses ipapi.co for country/city (cached in sessionStorage)
 *   - Owner can mute themselves via ?owner=1 (un-mute with ?owner=0)
 */
(() => {
  'use strict';

  // ============================================================
  //  CONFIG
  // ============================================================
  const NTFY_TOPIC = 'dgabriel-portfolio-x9k2qf3p';
  if (!NTFY_TOPIC || NTFY_TOPIC === 'REPLACE_WITH_YOUR_TOPIC') return;
  const NTFY_URL = `https://ntfy.sh/${NTFY_TOPIC}`;

  // ============================================================
  //  Owner mute
  // ============================================================
  const OWNER_KEY = 'dg-notify-owner';
  const params = new URLSearchParams(location.search);
  if (params.has('owner')) {
    if (params.get('owner') === '1') localStorage.setItem(OWNER_KEY, '1');
    else localStorage.removeItem(OWNER_KEY);
  }
  if (localStorage.getItem(OWNER_KEY) === '1') return;

  // ============================================================
  //  Bot filter
  // ============================================================
  const ua = navigator.userAgent || '';
  if (navigator.webdriver) return;
  if (/bot|crawl|spider|slurp|headless|preview|fetch|wget|curl|monitor|lighthouse/i.test(ua)) return;

  // ============================================================
  //  Network helper
  // ============================================================
  const send = (title, body, tags = '', priority = 'default') => {
    try {
      fetch(NTFY_URL, {
        method: 'POST',
        body,
        headers: {
          'Title':    title,
          'Tags':     tags,
          'Priority': priority,
          'Click':    location.href,
        },
        keepalive: true,
      }).catch(() => {});
    } catch { /* noop */ }
  };

  // ============================================================
  //  Browser/device probes
  // ============================================================
  const parseReferrer = () => {
    if (!document.referrer) return 'direct';
    try {
      const url = new URL(document.referrer);
      const host = url.hostname.replace(/^www\./, '');
      if (host === location.hostname) return 'internal';
      const map = {
        'linkedin.com': 'LinkedIn', 'google.com': 'Google', 'google.co': 'Google',
        'bing.com': 'Bing', 'duckduckgo.com': 'DuckDuckGo', 'github.com': 'GitHub',
        't.co': 'X / Twitter', 'twitter.com': 'X / Twitter', 'x.com': 'X / Twitter',
        'facebook.com': 'Facebook', 'instagram.com': 'Instagram',
        'whatsapp.com': 'WhatsApp', 'wa.me': 'WhatsApp', 'reddit.com': 'Reddit',
      };
      for (const k of Object.keys(map)) {
        if (host === k || host.endsWith('.' + k)) return map[k];
      }
      return host;
    } catch { return 'unknown'; }
  };

  const deviceClass = () => {
    if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'Mobile';
    if (/iPad|Tablet/i.test(ua)) return 'Tablet';
    const w = window.innerWidth;
    if (w < 600) return 'Mobile';
    if (w < 1024) return 'Tablet';
    return 'Desktop';
  };

  const browserName = () => {
    if (/Edg\//.test(ua))       return 'Edge';
    if (/OPR\/|Opera/.test(ua)) return 'Opera';
    if (/Chrome\//.test(ua))    return 'Chrome';
    if (/Firefox\//.test(ua))   return 'Firefox';
    if (/Safari\//.test(ua))    return 'Safari';
    return 'Browser';
  };

  const osName = () => {
    if (/Windows/i.test(ua))            return 'Windows';
    if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
    if (/iPhone|iPad|iPod/i.test(ua))   return 'iOS';
    if (/Android/i.test(ua))            return 'Android';
    if (/Linux/i.test(ua))              return 'Linux';
    return 'OS';
  };

  const timeZone = () => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; }
    catch { return ''; }
  };

  const localTime = () => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        weekday: 'short', hour: '2-digit', minute: '2-digit',
      }).format(new Date());
    } catch { return ''; }
  };

  const network = () => {
    const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return '';
    const parts = [];
    if (c.effectiveType) parts.push(c.effectiveType);
    if (c.downlink)      parts.push(`${c.downlink} Mb/s`);
    if (c.saveData)      parts.push('save-data');
    return parts.join(' · ');
  };

  const viewport = () => `${window.innerWidth}×${window.innerHeight}@${window.devicePixelRatio || 1}x`;
  const isTouch = () => navigator.maxTouchPoints > 0 || ('ontouchstart' in window);

  const formatDuration = (sec) => {
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m${s.toString().padStart(2, '0')}s`;
  };

  // ============================================================
  //  Session metrics — fed by listeners, sent on pagehide
  // ============================================================
  const session = {
    start:            performance.now(),
    activeStart:      performance.now(),
    totalActiveMs:    0,
    scrollMax:        0,
    sectionsViewed:   new Set(),
    codeTabsViewed:   new Set(),
    langSwitches:     0,
    downloadedResume: false,
    emailEngaged:     false,
    whatsappClicked:  false,
    githubClicked:    false,
    reachedContact:   false,
  };

  // Active-time tracker (focus + visibility)
  const accumulateActive = () => {
    session.totalActiveMs += performance.now() - session.activeStart;
    session.activeStart = performance.now();
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) accumulateActive();
    else session.activeStart = performance.now();
  });
  window.addEventListener('blur',  accumulateActive);
  window.addEventListener('focus', () => { session.activeStart = performance.now(); });

  // Scroll depth
  const updateScroll = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = Math.round(((window.scrollY) / total) * 100);
    session.scrollMax = Math.max(session.scrollMax, Math.min(pct, 100));
  };
  window.addEventListener('scroll', updateScroll, { passive: true });

  // Sections viewed
  if ('IntersectionObserver' in window) {
    const sectionIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target.id) session.sectionsViewed.add(e.target.id);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('main section[id]').forEach((s) => sectionIO.observe(s));
  }

  // ============================================================
  //  Layer 1 — open notification (every page load)
  // ============================================================
  const FIRST_VISIT_KEY = 'dg-notify-first';

  const fireOpen = (geo) => {
    const isFirst = !localStorage.getItem(FIRST_VISIT_KEY);
    if (isFirst) localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());

    const where = geo ? [geo.country, geo.region, geo.city].filter(Boolean).join(' · ') : '';
    const hw = [
      navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} cores` : null,
      navigator.deviceMemory        ? `${navigator.deviceMemory} GB`           : null,
    ].filter(Boolean).join(' · ');

    const lines = [
      where || null,
      geo && geo.ip ? `IP: ${geo.ip}${geo.org ? ' · ' + geo.org : ''}` : null,
      `${deviceClass()} · ${browserName()} / ${osName()}${isTouch() ? ' · touch' : ''}`,
      `Viewport: ${viewport()}`,
      hw || null,
      network() ? `Net: ${network()}` : null,
      `From: ${parseReferrer()}`,
      `Lang: ${navigator.language}${timeZone() ? ' · ' + timeZone() : ''}`,
      `Local time: ${localTime()}`,
      isFirst ? '✦ First visit' : 'Returning visitor',
    ].filter(Boolean);

    send(
      'New visitor on portfolio',
      lines.join('\n'),
      isFirst ? 'sparkles,eyes' : 'eyes',
      'default'
    );
  };

  const cachedGeo = sessionStorage.getItem('dg-notify-geo');
  if (cachedGeo) {
    try { fireOpen(JSON.parse(cachedGeo)); }
    catch { fireOpen(null); }
  } else {
    fetch('https://ipapi.co/json/', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const geo = data ? {
          country: data.country_name,
          region:  data.region,
          city:    data.city,
          code:    data.country_code,
          ip:      data.ip,
          org:     data.org,
        } : null;
        if (geo) sessionStorage.setItem('dg-notify-geo', JSON.stringify(geo));
        fireOpen(geo);
      })
      .catch(() => fireOpen(null));
  }

  // ============================================================
  //  Layer 2 — engagement signals (each fires once per page load)
  // ============================================================
  const fired = new Set();
  const once = (key, fn) => { if (!fired.has(key)) { fired.add(key); fn(); } };

  document.getElementById('resume-download')?.addEventListener('click', () => {
    session.downloadedResume = true;
    once('resume', () => {
      const lang = (document.documentElement.getAttribute('lang') || 'en').toUpperCase();
      send('Resume downloaded', `Language: ${lang}`, 'page_facing_up,arrow_down', 'high');
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', () => {
      session.emailEngaged = true;
      once('email', () => send('Email clicked', 'Visitor opened mail client', 'envelope', 'high'));
    });
  });

  document.getElementById('copy-email')?.addEventListener('click', () => {
    session.emailEngaged = true;
    once('copy-email', () => send('Email copied', 'Visitor copied email to clipboard', 'clipboard', 'high'));
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach((a) => {
    a.addEventListener('click', () => {
      session.whatsappClicked = true;
      once('whatsapp', () => send('WhatsApp clicked', '', 'speech_balloon', 'high'));
    });
  });

  document.querySelectorAll('a[href*="github.com/dgabriel2334"]').forEach((a) => {
    a.addEventListener('click', () => {
      session.githubClicked = true;
      once('github', () => send('GitHub link clicked', '', 'octopus', 'default'));
    });
  });

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      session.langSwitches++;
      const lang = (btn.getAttribute('data-lang') || '').toUpperCase();
      once('lang-' + lang, () => send('Language switched', `→ ${lang}`, 'globe_with_meridians', 'low'));
    });
  });

  document.querySelectorAll('[data-code-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const t = btn.getAttribute('data-code-tab');
      if (t) session.codeTabsViewed.add(t);
    });
  });

  if ('IntersectionObserver' in window) {
    const contact = document.getElementById('contact');
    if (contact) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          session.reachedContact = true;
          once('reached-contact', () => send('Reached Contact section', 'Visitor scrolled to the bottom', 'eyes', 'default'));
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(contact);
    }
  }

  // ============================================================
  //  Layer 3 — session summary (on pagehide)
  // ============================================================
  // Capture LCP via PerformanceObserver — overwritten until the user
  // navigates away or the page is hidden.
  let lcp = 0;
  if ('PerformanceObserver' in window) {
    try {
      const po = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        if (last) lcp = Math.round(last.startTime);
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch { /* noop */ }
  }

  const ttfb = (() => {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? Math.round(nav.responseStart) : 0;
    } catch { return 0; }
  });

  let summarySent = false;
  const sendSummary = () => {
    if (summarySent) return;

    if (!document.hidden) accumulateActive();
    const totalSec  = Math.max(1, Math.round((performance.now() - session.start) / 1000));
    const activeSec = Math.max(0, Math.round(session.totalActiveMs / 1000));

    // Don't notify on bounces unless something interesting happened
    const hadEngagement =
      session.downloadedResume || session.emailEngaged ||
      session.whatsappClicked  || session.githubClicked ||
      session.reachedContact   || session.langSwitches > 0 ||
      session.codeTabsViewed.size > 0;
    if (totalSec < 8 && !hadEngagement) return;
    summarySent = true;

    const sections = [...session.sectionsViewed];
    const tabs     = [...session.codeTabsViewed];

    const lines = [
      `Time: ${formatDuration(totalSec)}${activeSec && activeSec !== totalSec ? ` (active ${formatDuration(activeSec)})` : ''}`,
      `Scroll: ${session.scrollMax}%`,
      sections.length ? `Sections: ${sections.join(', ')}` : null,
      tabs.length     ? `Code tabs: ${tabs.join(', ')}`    : null,
      session.langSwitches  ? `Lang switches: ${session.langSwitches}` : null,
      session.downloadedResume ? '✓ Downloaded CV'     : null,
      session.emailEngaged     ? '✓ Engaged with email' : null,
      session.whatsappClicked  ? '✓ Clicked WhatsApp'   : null,
      session.githubClicked    ? '✓ Clicked GitHub'     : null,
      session.reachedContact   ? '✓ Reached Contact'    : null,
      lcp || ttfb() ? `Perf: TTFB ${ttfb()}ms${lcp ? ` · LCP ${lcp}ms` : ''}` : null,
    ].filter(Boolean);

    send('Session ended', lines.join('\n'), 'bar_chart', 'low');
  };

  // pagehide is the modern, reliable signal across desktop and mobile;
  // visibilitychange→hidden is a backup for browsers that miss pagehide.
  window.addEventListener('pagehide', sendSummary);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sendSummary();
  });
})();
