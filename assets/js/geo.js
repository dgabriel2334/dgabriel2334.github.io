// Shared, single-flight geo lookup consumed by both the language-detection
// hint (i18n.js) and the visitor notifier (notify.js) — avoids firing the
// same third-party IP-lookup request twice per page load.

const CACHE_KEY = 'dg-geo-v1';
const TIMEOUT_MS = 3000;

const safeFetch = (url) => {
  const opts = { cache: 'force-cache' };
  try { opts.signal = AbortSignal.timeout(TIMEOUT_MS); } catch { /* older browsers */ }
  return fetch(url, opts);
};

// Promise.any treats null/undefined as success — force rejection on no-data
// so a race only resolves when something usable comes back.
const requireData = (p) => p.then((v) => (v ? v : Promise.reject('no-data')));

const fetchIpinfo = () =>
  safeFetch('https://ipinfo.io/json')
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => (d && d.ip ? {
      country: d.country, region: d.region, city: d.city,
      code: d.country, ip: d.ip, org: d.org,
    } : null));

const fetchIpapi = () =>
  safeFetch('https://ipapi.co/json/')
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => (d && d.ip && !d.error ? {
      country: d.country_name, region: d.region, city: d.city,
      code: d.country_code, ip: d.ip, org: d.org,
    } : null));

const fetchIpify = () =>
  safeFetch('https://api.ipify.org?format=json')
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => (d && d.ip ? { ip: d.ip } : null));

const fetchIcanhazip = () =>
  safeFetch('https://ipv4.icanhazip.com')
    .then((r) => (r.ok ? r.text() : null))
    .then((t) => {
      const ip = (t || '').trim();
      return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip) ? { ip } : null;
    });

const raceFullGeo = () => Promise.any([requireData(fetchIpinfo()), requireData(fetchIpapi())]);
const raceIpOnly = () => Promise.any([requireData(fetchIpify()), requireData(fetchIcanhazip())]);

let pending = null;

export function getGeo() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try { return Promise.resolve(JSON.parse(cached)); } catch { /* fall through */ }
  }
  if (pending) return pending;

  pending = raceFullGeo()
    .catch(() => raceIpOnly())
    .catch(() => null)
    .then((geo) => {
      if (geo) sessionStorage.setItem(CACHE_KEY, JSON.stringify(geo));
      return geo;
    });

  return pending;
}
