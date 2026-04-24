/**
 * Dário Gabriel — portfolio interactions
 * Vanilla JS, no framework. Progressive enhancement:
 * the page is fully functional without any of this.
 */
(() => {
  'use strict';

  // ---------- i18n ----------------------------------------------------------
  // `data-i18n="key"` → replaces textContent
  // `data-i18n-html="key"` → replaces innerHTML (use for rich strings with <strong>, <a>, etc.)
  const translations = {
    en: {
      'nav.about': 'About',
      'nav.stack': 'Stack',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.openToWork': 'Open to work',

      'hero.status': 'Currently open to work',
      'hero.title1': 'Senior Backend Engineer',
      'hero.title2': 'building resilient backends.',
      'hero.p1': 'I design and ship distributed systems, APIs and event-driven platforms with <span class="font-medium text-white">PHP, Symfony and Node.js</span> — grounded in <span class="font-medium text-white">DDD, Hexagonal Architecture</span> and the SOLID principles. Seven years shipping production software with international teams.',
      'hero.p2': 'Currently engineering event-driven platforms that move <span class="font-semibold text-white">millions of daily transactions</span> with predictable latency, clean domain boundaries and zero-downtime deploys.',
      'hero.cta': 'Start a conversation',
      'hero.download': 'Download resume',
      'hero.stats.exp': 'Experience',
      'hero.stats.yrs': 'yrs',
      'hero.stats.current': 'Current',
      'hero.stats.based': 'Based in',

      'about.label': '01 — About',
      'about.title': 'A backend engineer who cares about clarity.',
      'about.p1': 'I\'m Dário, a Senior Backend Engineer from the Amazon, now shipping backend systems for <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(via <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> in Barcelona. Over the past seven years I\'ve led teams, modernized legacy monoliths and delivered event-driven platforms for companies across Brazil, Spain and Latin America.',
      'about.p2': 'My focus is building software that survives real traffic and real teams — clean boundaries, explicit domain models, message-driven integration and observability baked in. I believe simple code wins, tests are a design tool, and the best systems are boring by intent.',
      'about.skill.1': 'Designing systems with <strong class="text-white">DDD &amp; Hexagonal Architecture</strong>',
      'about.skill.2': 'Async pipelines with <strong class="text-white">RabbitMQ &amp; Kafka</strong>',
      'about.skill.3': 'PostgreSQL modeling, query & transaction design',
      'about.skill.4': 'CI/CD with Jenkins + Docker on AWS & GCP',
      'about.skill.5': 'Leading & mentoring cross-functional teams',
      'about.skill.6': 'Fluent in PT (native) · EN (B2) · ES (C1)',

      'stack.label': '02 — Stack',
      'stack.title': 'Tools I reach for every day.',
      'stack.subtitle': 'A pragmatic toolkit built around backend engineering, distributed systems and delivery.',
      'stack.backend': 'Backend',
      'stack.architecture': 'Architecture',
      'stack.data': 'Messaging & Data',
      'stack.cloud': 'Cloud & DevOps',
      'stack.frontend': 'Frontend',
      'stack.exploring': 'Currently exploring',

      'exp.label': '03 — Experience',
      'exp.title': 'Seven years shipping production software.',
      'exp.current': 'Current',
      'exp.role.senior': 'Senior Backend Engineer',
      'exp.role.mid': 'Mid-Level Backend Engineer',
      'exp.1.desc': 'Building robust backend services and APIs with PHP + Symfony + Doctrine, backed by message-driven architectures on RabbitMQ and a PostgreSQL core designed for schema clarity, query performance and transactional integrity. Systems shaped around SOLID, DDD and Hexagonal Architecture — maintainable, testable and decoupled.',
      'exp.2.desc': 'APIs and backend services in PHP (Symfony, Laravel, Lumen). Built and maintained CI/CD pipelines on Jenkins with Dockerized environments, integrated messaging via RabbitMQ and Kafka, and delivered cloud services on AWS and GCP following SOLID, DDD and Hexagonal principles.',
      'exp.3.desc': 'APIs and backend features across Symfony, Laravel and Node.js. Worked on messaging systems (RabbitMQ, Kafka), logs and caching strategies. Applied Clean Architecture and design patterns across legacy and microservices-based systems — daily collaboration with multidisciplinary teams on Scrum & Kanban.',
      'exp.4.desc': 'Led the team in modernizing legacy PHP systems. Built internal tools in Node.js, Vue.js and React, and shipped features like SAT fiscal invoice issuance, a WhatsApp messaging API and a distributed P2P server for offline-capable POS. Owned CI/CD pipelines and drove scalability and performance initiatives.',

      'proj.label': '04 — Projects',
      'proj.title': 'Selected work.',
      'proj.subtitle': 'Representative initiatives — distilled from real-world delivery across my career.',
      'proj.1.desc': 'Event-driven platform ingesting and scoring millions of daily leads. Domain modeling in DDD, async consumers with RabbitMQ, and Doctrine ORM with optimized query plans — designed for horizontal scaling and clean service boundaries.',
      'proj.2.desc': 'Real-time fiscal invoice issuance integrated with the Brazilian SAT protocol, handling thousands of daily transactions for restaurant chains. Built for reliability under flaky network conditions with idempotent retries and audit trails.',
      'proj.3.desc': 'Unified messaging layer bridging WhatsApp Business API and internal CRM workflows. Throttled outbound pipelines, webhook fan-out and delivery guarantees with queue-based backpressure, logging and observability built in from day one.',
      'proj.4.desc': 'Self-healing synchronization server for POS terminals in offline-capable environments. Conflict-resilient state merging, heartbeat-based peer discovery and automatic reconciliation when connectivity returns — built for the real world.',

      'contact.label': '05 — Contact',
      'contact.title1': 'Have a project in mind?',
      'contact.title2': "Let's build it together.",
      'contact.body': 'Open to senior backend and staff-level roles — remote-first, international teams. The best way to reach me is by email.',
      'contact.copy': 'Copy email',
      'contact.copied': 'Copied!',
      'contact.location': 'Location',
      'contact.location.value': 'Manaus — Brazil',
      'contact.languages': 'Languages',

      'footer.crafted': 'Crafted with HTML, Tailwind CSS and vanilla JS.',
      'footer.tagline': 'from the Amazon to the world',
    },

    pt: {
      'nav.about': 'Sobre',
      'nav.stack': 'Stack',
      'nav.experience': 'Experiência',
      'nav.projects': 'Projetos',
      'nav.contact': 'Contato',
      'nav.openToWork': 'Aberto a oportunidades',

      'hero.status': 'Aberto a oportunidades',
      'hero.title1': 'Engenheiro Backend Sênior',
      'hero.title2': 'construindo backends resilientes.',
      'hero.p1': 'Projeto e entrego sistemas distribuídos, APIs e plataformas orientadas a eventos com <span class="font-medium text-white">PHP, Symfony e Node.js</span> — fundamentado em <span class="font-medium text-white">DDD, Arquitetura Hexagonal</span> e nos princípios SOLID. Sete anos entregando software em produção com times internacionais.',
      'hero.p2': 'Atualmente engenheirando plataformas orientadas a eventos que movimentam <span class="font-semibold text-white">milhões de transações diárias</span> com latência previsível, fronteiras de domínio limpas e deploys sem downtime.',
      'hero.cta': 'Vamos conversar',
      'hero.download': 'Baixar currículo',
      'hero.stats.exp': 'Experiência',
      'hero.stats.yrs': 'anos',
      'hero.stats.current': 'Atual',
      'hero.stats.based': 'Localização',

      'about.label': '01 — Sobre',
      'about.title': 'Um engenheiro backend que preza por clareza.',
      'about.p1': 'Sou Dário, Engenheiro Backend Sênior da Amazônia, atualmente entregando sistemas backend para a <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(via <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> em Barcelona. Nos últimos sete anos liderei times, modernizei monólitos legados e entreguei plataformas orientadas a eventos para empresas no Brasil, Espanha e América Latina.',
      'about.p2': 'Meu foco é construir software que sobrevive ao tráfego real e aos times reais — fronteiras claras, modelos de domínio explícitos, integração orientada a mensagens e observabilidade desde o dia zero. Código simples vence, testes são ferramenta de design e os melhores sistemas são entediantes por design.',
      'about.skill.1': 'Desenho de sistemas com <strong class="text-white">DDD &amp; Arquitetura Hexagonal</strong>',
      'about.skill.2': 'Pipelines assíncronos com <strong class="text-white">RabbitMQ &amp; Kafka</strong>',
      'about.skill.3': 'Modelagem PostgreSQL, queries e transações',
      'about.skill.4': 'CI/CD com Jenkins + Docker na AWS & GCP',
      'about.skill.5': 'Liderança e mentoria de times multidisciplinares',
      'about.skill.6': 'Fluente em PT (nativo) · EN (B2) · ES (C1)',

      'stack.label': '02 — Stack',
      'stack.title': 'Ferramentas que uso todos os dias.',
      'stack.subtitle': 'Um toolkit pragmático para backend, sistemas distribuídos e entrega contínua.',
      'stack.backend': 'Backend',
      'stack.architecture': 'Arquitetura',
      'stack.data': 'Mensageria & Dados',
      'stack.cloud': 'Cloud & DevOps',
      'stack.frontend': 'Frontend',
      'stack.exploring': 'Explorando agora',

      'exp.label': '03 — Experiência',
      'exp.title': 'Sete anos entregando software em produção.',
      'exp.current': 'Atual',
      'exp.role.senior': 'Engenheiro Backend Sênior',
      'exp.role.mid': 'Engenheiro Backend Pleno',
      'exp.1.desc': 'Construindo serviços backend e APIs robustas com PHP + Symfony + Doctrine, apoiadas por arquiteturas orientadas a mensagens no RabbitMQ e um core PostgreSQL desenhado para clareza de schema, performance de queries e integridade transacional. Sistemas pautados por SOLID, DDD e Arquitetura Hexagonal — manuteníveis, testáveis e desacoplados.',
      'exp.2.desc': 'APIs e serviços backend em PHP (Symfony, Laravel, Lumen). Construí e mantive pipelines CI/CD no Jenkins com ambientes Dockerizados, integrei mensageria via RabbitMQ e Kafka, e entreguei serviços cloud na AWS e GCP seguindo princípios SOLID, DDD e Hexagonal.',
      'exp.3.desc': 'APIs e features backend em Symfony, Laravel e Node.js. Atuei em sistemas de mensageria (RabbitMQ, Kafka), logs e estratégias de cache. Apliquei Clean Architecture e design patterns em sistemas legados e baseados em microsserviços — colaboração diária com times multidisciplinares em Scrum & Kanban.',
      'exp.4.desc': 'Liderei o time na modernização de sistemas PHP legados. Construí ferramentas internas em Node.js, Vue.js e React, e entreguei features como emissão de notas fiscais SAT, API de mensageria WhatsApp e um servidor P2P distribuído para PDVs offline-first. Responsável pelos pipelines CI/CD e iniciativas de escalabilidade e performance.',

      'proj.label': '04 — Projetos',
      'proj.title': 'Trabalhos selecionados.',
      'proj.subtitle': 'Iniciativas representativas — extraídas da entrega real ao longo da minha carreira.',
      'proj.1.desc': 'Plataforma orientada a eventos que ingere e pontua milhões de leads por dia. Modelagem de domínio em DDD, consumidores assíncronos com RabbitMQ e Doctrine ORM com planos de query otimizados — desenhada para escalar horizontalmente com fronteiras de serviço claras.',
      'proj.2.desc': 'Emissão de notas fiscais em tempo real integrada ao protocolo SAT brasileiro, processando milhares de transações diárias para redes de restaurantes. Construída para resiliência em redes instáveis, com retries idempotentes e trilhas de auditoria.',
      'proj.3.desc': 'Camada unificada de mensageria conectando WhatsApp Business API aos fluxos de CRM internos. Pipelines de envio com throttling, fan-out de webhooks e garantias de entrega via backpressure em filas, logs e observabilidade desde o início.',
      'proj.4.desc': 'Servidor de sincronização self-healing para PDVs em ambientes offline-first. Merge de estado resiliente a conflitos, descoberta de peers por heartbeat e reconciliação automática ao retornar a conectividade — pensado para o mundo real.',

      'contact.label': '05 — Contato',
      'contact.title1': 'Tem um projeto em mente?',
      'contact.title2': 'Vamos construir juntos.',
      'contact.body': 'Aberto a vagas sênior e staff — remote-first, times internacionais. A melhor forma de falar comigo é por e-mail.',
      'contact.copy': 'Copiar e-mail',
      'contact.copied': 'Copiado!',
      'contact.location': 'Localização',
      'contact.location.value': 'Manaus — Brasil',
      'contact.languages': 'Idiomas',

      'footer.crafted': 'Feito com HTML, Tailwind CSS e JS puro.',
      'footer.tagline': 'da Amazônia para o mundo',
    },

    es: {
      'nav.about': 'Sobre mí',
      'nav.stack': 'Stack',
      'nav.experience': 'Experiencia',
      'nav.projects': 'Proyectos',
      'nav.contact': 'Contacto',
      'nav.openToWork': 'Abierto a oportunidades',

      'hero.status': 'Abierto a oportunidades',
      'hero.title1': 'Ingeniero Backend Senior',
      'hero.title2': 'construyendo backends resilientes.',
      'hero.p1': 'Diseño y entrego sistemas distribuidos, APIs y plataformas orientadas a eventos con <span class="font-medium text-white">PHP, Symfony y Node.js</span> — apoyado en <span class="font-medium text-white">DDD, Arquitectura Hexagonal</span> y los principios SOLID. Siete años entregando software en producción con equipos internacionales.',
      'hero.p2': 'Actualmente desarrollando plataformas orientadas a eventos que mueven <span class="font-semibold text-white">millones de transacciones diarias</span> con latencia predecible, fronteras de dominio limpias y despliegues sin caídas.',
      'hero.cta': 'Hablemos',
      'hero.download': 'Descargar CV',
      'hero.stats.exp': 'Experiencia',
      'hero.stats.yrs': 'años',
      'hero.stats.current': 'Actual',
      'hero.stats.based': 'Ubicación',

      'about.label': '01 — Sobre mí',
      'about.title': 'Un ingeniero backend que cuida la claridad.',
      'about.p1': 'Soy Dário, Ingeniero Backend Senior de la Amazonía, actualmente entregando sistemas backend para <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(vía <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> en Barcelona. En los últimos siete años he liderado equipos, modernizado monolitos legados y entregado plataformas orientadas a eventos para empresas en Brasil, España y Latinoamérica.',
      'about.p2': 'Mi enfoque es construir software que sobreviva al tráfico real y a los equipos reales — fronteras claras, modelos de dominio explícitos, integración por mensajes y observabilidad desde el inicio. El código simple gana, las pruebas son herramienta de diseño y los mejores sistemas son aburridos por diseño.',
      'about.skill.1': 'Diseño de sistemas con <strong class="text-white">DDD y Arquitectura Hexagonal</strong>',
      'about.skill.2': 'Pipelines asíncronos con <strong class="text-white">RabbitMQ y Kafka</strong>',
      'about.skill.3': 'Modelado PostgreSQL, consultas y transacciones',
      'about.skill.4': 'CI/CD con Jenkins + Docker en AWS y GCP',
      'about.skill.5': 'Liderazgo y mentoring de equipos multidisciplinarios',
      'about.skill.6': 'Fluidez en PT (nativo) · EN (B2) · ES (C1)',

      'stack.label': '02 — Stack',
      'stack.title': 'Herramientas que uso cada día.',
      'stack.subtitle': 'Un toolkit pragmático pensado para backend, sistemas distribuidos y entrega continua.',
      'stack.backend': 'Backend',
      'stack.architecture': 'Arquitectura',
      'stack.data': 'Mensajería y Datos',
      'stack.cloud': 'Cloud y DevOps',
      'stack.frontend': 'Frontend',
      'stack.exploring': 'Explorando ahora',

      'exp.label': '03 — Experiencia',
      'exp.title': 'Siete años entregando software en producción.',
      'exp.current': 'Actual',
      'exp.role.senior': 'Ingeniero Backend Senior',
      'exp.role.mid': 'Ingeniero Backend Semi Senior',
      'exp.1.desc': 'Construyendo servicios backend y APIs robustas con PHP + Symfony + Doctrine, respaldados por arquitecturas orientadas a mensajes sobre RabbitMQ y un núcleo PostgreSQL diseñado para claridad de esquema, rendimiento de consultas e integridad transaccional. Sistemas guiados por SOLID, DDD y Arquitectura Hexagonal — mantenibles, testeables y desacoplados.',
      'exp.2.desc': 'APIs y servicios backend en PHP (Symfony, Laravel, Lumen). Construí y mantuve pipelines CI/CD en Jenkins con entornos Dockerizados, integré mensajería vía RabbitMQ y Kafka, y entregué servicios cloud en AWS y GCP siguiendo principios SOLID, DDD y Hexagonal.',
      'exp.3.desc': 'APIs y funcionalidades backend en Symfony, Laravel y Node.js. Trabajé en sistemas de mensajería (RabbitMQ, Kafka), logs y estrategias de caché. Apliqué Clean Architecture y patrones de diseño en sistemas legados y basados en microservicios — colaboración diaria con equipos multidisciplinarios en Scrum y Kanban.',
      'exp.4.desc': 'Lideré al equipo en la modernización de sistemas PHP legados. Construí herramientas internas en Node.js, Vue.js y React, y entregué funcionalidades como emisión de facturas fiscales SAT, una API de mensajería de WhatsApp y un servidor P2P distribuido para POS offline-first. Responsable de los pipelines CI/CD e iniciativas de escalabilidad y rendimiento.',

      'proj.label': '04 — Proyectos',
      'proj.title': 'Trabajos seleccionados.',
      'proj.subtitle': 'Iniciativas representativas — destiladas de la entrega real a lo largo de mi carrera.',
      'proj.1.desc': 'Plataforma orientada a eventos que ingesta y puntúa millones de leads diarios. Modelado de dominio en DDD, consumidores asíncronos con RabbitMQ y Doctrine ORM con planes de consulta optimizados — diseñada para escalar horizontalmente con fronteras de servicio claras.',
      'proj.2.desc': 'Emisión de facturas fiscales en tiempo real integrada al protocolo SAT brasileño, procesando miles de transacciones diarias para cadenas de restaurantes. Construida para resistir redes inestables, con reintentos idempotentes y trazas de auditoría.',
      'proj.3.desc': 'Capa unificada de mensajería que conecta WhatsApp Business API con los flujos de CRM internos. Pipelines de salida con throttling, fan-out de webhooks y garantías de entrega con backpressure en colas, logs y observabilidad desde el primer día.',
      'proj.4.desc': 'Servidor de sincronización self-healing para POS en entornos offline-first. Merge de estado resistente a conflictos, descubrimiento de peers por heartbeat y reconciliación automática al volver la conectividad — pensado para el mundo real.',

      'contact.label': '05 — Contacto',
      'contact.title1': '¿Tienes un proyecto en mente?',
      'contact.title2': 'Construyámoslo juntos.',
      'contact.body': 'Abierto a posiciones senior y staff — remote-first, equipos internacionales. La mejor forma de hablar conmigo es por correo.',
      'contact.copy': 'Copiar correo',
      'contact.copied': '¡Copiado!',
      'contact.location': 'Ubicación',
      'contact.location.value': 'Manaus — Brasil',
      'contact.languages': 'Idiomas',

      'footer.crafted': 'Hecho con HTML, Tailwind CSS y JS puro.',
      'footer.tagline': 'de la Amazonía al mundo',
    },
  };

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

  const LANG_STORAGE_KEY = 'dg-lang';
  const SUPPORTED = ['en', 'pt', 'es'];

  const resumeByLang = {
    en: 'Resume EN-US.pdf',
    es: 'Resume ES-ES.pdf',
    pt: 'Resume PT-BR.pdf',
  };

  const detectInitialLang = () => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : 'en';
  };

  // Map a country code (ISO 3166-1 alpha-2) to a supported UI language.
  // Used only as a soft override for visitors who haven't picked a language yet.
  const SPANISH_COUNTRIES = new Set([
    'ES', 'AR', 'MX', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO',
    'PY', 'UY', 'DO', 'GT', 'HN', 'NI', 'CR', 'PA', 'CU', 'SV', 'PR',
  ]);

  const countryToLang = (cc) => {
    if (!cc) return null;
    const code = cc.toUpperCase();
    if (code === 'BR') return 'pt';
    if (SPANISH_COUNTRIES.has(code)) return 'es';
    return 'en';
  };

  let currentLang = detectInitialLang();
  let currentPhrases = typewriterPhrases[currentLang];

  const applyLanguage = (lang, { persist = true } = {}) => {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    currentPhrases = typewriterPhrases[lang];
    if (persist) localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // Point the "Download resume" button at the localized PDF
    const resumeLink = document.getElementById('resume-download');
    if (resumeLink && resumeByLang[lang]) {
      resumeLink.setAttribute('href', resumeByLang[lang]);
    }

    // Reset the typewriter mid-cycle so the new phrase set kicks in cleanly
    resetTypewriter();

    // Visually mark the active flag
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('bg-brand-500/20', active);
      btn.classList.toggle('ring-1', active);
      btn.classList.toggle('ring-brand-400/50', active);
    });
  };

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
  });

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
  let twTimer = null;
  let twState = { pIndex: 0, cIndex: 0, deleting: false };

  const resetTypewriter = () => {
    if (twTimer) clearTimeout(twTimer);
    twState = { pIndex: 0, cIndex: 0, deleting: false };
    if (typewriterEl) typewriterEl.textContent = '';
    startTypewriter();
  };

  const startTypewriter = () => {
    if (!typewriterEl || !currentPhrases.length) return;
    const tick = () => {
      const current = currentPhrases[twState.pIndex];
      typewriterEl.textContent = current.slice(0, twState.cIndex);

      if (!twState.deleting && twState.cIndex === current.length) {
        twState.deleting = true;
        twTimer = setTimeout(tick, 1600);
        return;
      }
      if (twState.deleting && twState.cIndex === 0) {
        twState.deleting = false;
        twState.pIndex = (twState.pIndex + 1) % currentPhrases.length;
      }
      twState.cIndex += twState.deleting ? -1 : 1;
      twTimer = setTimeout(tick, twState.deleting ? 30 : 55);
    };
    tick();
  };

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

  // ---------- Chip styling --------------------------------------------------
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
    php:    'php 8.3 · symfony',
    node:   'nest 10 · node 20',
    react:  'react 18 · ts',
    java:   'quarkus 3 · java 21',
    sql:    'postgres 16',
    docker: 'docker · multi-stage',
    k8s:    'kubernetes 1.30',
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
      if (label) label.textContent = translations[currentLang]['contact.copied'];
      copyBtn.classList.add('border-brand-400', 'text-white');
      setTimeout(() => {
        if (label) label.textContent = translations[currentLang]['contact.copy'];
        copyBtn.classList.remove('border-brand-400', 'text-white');
      }, 1600);
    } catch {
      if (label) label.textContent = 'Ctrl+C';
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

  // ---------- Boot ----------------------------------------------------------
  applyLanguage(currentLang);

  // ---------- Soft IP-based language hint (non-blocking) --------------------
  // If the visitor hasn't picked a language yet, try a geolocation lookup to
  // switch into pt/es when the browser language didn't match. Fails silently
  // on network issues, ad blockers or API quota — the page already rendered.
  if (!localStorage.getItem(LANG_STORAGE_KEY)) {
    fetch('https://ipapi.co/json/', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const detected = countryToLang(data && data.country_code);
        if (detected && detected !== currentLang) {
          applyLanguage(detected, { persist: false });
        }
      })
      .catch(() => { /* noop */ });
  }
})();
