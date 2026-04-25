/**
 * Portfolio visit notifier — pings ntfy.sh so the owner gets a push
 * notification on their phone whenever someone opens the site or
 * triggers a high-intent action.
 *
 * Privacy posture:
 *   - No personal data is collected; only coarse browser/device info,
 *     referrer source, browser language and (optional) IP-derived country
 *   - Reuses the same ipapi.co lookup the i18n hint uses, so no extra
 *     fetch beyond what already happens for language detection
 *   - The owner can mute themselves with `?owner=1` (un-mute with `?owner=0`)
 *
 * Anti-spam:
 *   - Skips known bots (UA + navigator.webdriver)
 *   - Open notification fires once per session
 *   - Each engagement signal fires once per session
 *   - Falls silent on any network error
 */
(() => {
  'use strict';

  // ============================================================
  //  CONFIG — drop your ntfy.sh topic here
  // ============================================================
  const NTFY_TOPIC = 'dgabriel-portfolio-x9k2qf3p';

  if (!NTFY_TOPIC || NTFY_TOPIC === 'REPLACE_WITH_YOUR_TOPIC') return;
  const NTFY_URL = `https://ntfy.sh/${NTFY_TOPIC}`;

  // ============================================================
  //  Owner mute — ?owner=1 silences this device, ?owner=0 re-enables
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
  //  Helpers
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

  const parseReferrer = () => {
    if (!document.referrer) return 'direct';
    try {
      const url = new URL(document.referrer);
      const host = url.hostname.replace(/^www\./, '');
      if (host === location.hostname) return 'internal';
      const map = {
        'linkedin.com':   'LinkedIn',
        'google.com':     'Google',
        'google.co':      'Google',
        'bing.com':       'Bing',
        'duckduckgo.com': 'DuckDuckGo',
        'github.com':     'GitHub',
        't.co':           'X / Twitter',
        'twitter.com':    'X / Twitter',
        'x.com':          'X / Twitter',
        'facebook.com':   'Facebook',
        'instagram.com':  'Instagram',
        'whatsapp.com':   'WhatsApp',
        'wa.me':          'WhatsApp',
        'reddit.com':     'Reddit',
      };
      for (const k of Object.keys(map)) {
        if (host === k || host.endsWith('.' + k)) return map[k];
      }
      return host;
    } catch {
      return 'unknown';
    }
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
    if (/Edg\//.test(ua))     return 'Edge';
    if (/OPR\/|Opera/.test(ua)) return 'Opera';
    if (/Chrome\//.test(ua))  return 'Chrome';
    if (/Firefox\//.test(ua)) return 'Firefox';
    if (/Safari\//.test(ua))  return 'Safari';
    return 'Browser';
  };

  const osName = () => {
    if (/Windows/i.test(ua))           return 'Windows';
    if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
    if (/iPhone|iPad|iPod/i.test(ua))   return 'iOS';
    if (/Android/i.test(ua))           return 'Android';
    if (/Linux/i.test(ua))             return 'Linux';
    return 'OS';
  };

  const timeZone = () => {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; }
    catch { return ''; }
  };

  // ============================================================
  //  Layer 1 — open notification (once per session)
  // ============================================================
  const SESSION_OPEN_KEY = 'dg-notify-open';
  const FIRST_VISIT_KEY  = 'dg-notify-first';

  const fireOpen = (geo) => {
    if (sessionStorage.getItem(SESSION_OPEN_KEY) === '1') return;
    sessionStorage.setItem(SESSION_OPEN_KEY, '1');

    const isFirst = !localStorage.getItem(FIRST_VISIT_KEY);
    if (isFirst) localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());

    const where = geo
      ? [geo.country, geo.city].filter(Boolean).join(' · ')
      : '';

    const lines = [
      where || null,
      `${deviceClass()} · ${browserName()} / ${osName()}`,
      `From: ${parseReferrer()}`,
      `Lang: ${navigator.language}${timeZone() ? ' · ' + timeZone() : ''}`,
      isFirst ? '✦ First visit' : 'Returning visitor',
    ].filter(Boolean);

    send(
      'New visitor on portfolio',
      lines.join('\n'),
      isFirst ? 'sparkles,eyes' : 'eyes',
      'default'
    );
  };

  // Reuse a cached geo lookup if available; never block on the network
  const cachedGeo = sessionStorage.getItem('dg-notify-geo');
  if (cachedGeo) {
    try { fireOpen(JSON.parse(cachedGeo)); }
    catch { fireOpen(null); }
  } else {
    fetch('https://ipapi.co/json/', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const geo = data ? { country: data.country_name, city: data.city, code: data.country_code } : null;
        if (geo) sessionStorage.setItem('dg-notify-geo', JSON.stringify(geo));
        fireOpen(geo);
      })
      .catch(() => fireOpen(null));
  }

  // ============================================================
  //  Layer 2 — engagement signals (each one fires once per session)
  // ============================================================
  const fired = new Set();
  const once = (key, fn) => { if (!fired.has(key)) { fired.add(key); fn(); } };

  // Resume download
  document.getElementById('resume-download')?.addEventListener('click', () => {
    once('resume', () => {
      const lang = (document.documentElement.getAttribute('lang') || 'en').toUpperCase();
      send('Resume downloaded', `Language: ${lang}`, 'page_facing_up,arrow_down', 'high');
    });
  });

  // Mailto links (header CTA + contact)
  document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
    a.addEventListener('click', () => {
      once('email', () => send('Email clicked', 'Visitor opened mail client', 'envelope', 'high'));
    });
  });

  // Copy email button
  document.getElementById('copy-email')?.addEventListener('click', () => {
    once('copy-email', () => send('Email copied', 'Visitor copied email to clipboard', 'clipboard', 'high'));
  });

  // WhatsApp
  document.querySelectorAll('a[href*="wa.me"]').forEach((a) => {
    a.addEventListener('click', () => {
      once('whatsapp', () => send('WhatsApp clicked', '', 'speech_balloon', 'high'));
    });
  });

  // GitHub link in contact section
  document.querySelectorAll('a[href*="github.com/dgabriel2334"]').forEach((a) => {
    a.addEventListener('click', () => {
      once('github', () => send('GitHub link clicked', '', 'octopus', 'default'));
    });
  });

  // Manual language switch
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = (btn.getAttribute('data-lang') || '').toUpperCase();
      once('lang-' + lang, () => send('Language switched', `→ ${lang}`, 'globe_with_meridians', 'low'));
    });
  });

  // Visitor reached the Contact section
  if ('IntersectionObserver' in window) {
    const contact = document.getElementById('contact');
    if (contact) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          once('reached-contact', () => send('Reached Contact section', 'Visitor scrolled to the bottom', 'eyes', 'default'));
          io.disconnect();
        }
      }, { threshold: 0.4 });
      io.observe(contact);
    }
  }
})();
