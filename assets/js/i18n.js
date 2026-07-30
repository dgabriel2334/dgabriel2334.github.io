import { getGeo } from './geo.js';

export const translations = {
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
    'hero.p1': 'I design and ship distributed systems, APIs and event-driven platforms with <span class="font-medium text-white">PHP, Symfony and Node.js</span> — grounded in <span class="font-medium text-white">DDD, Hexagonal Architecture</span> and the SOLID principles. 9+ years shipping production software with international teams.',
    'hero.p2': 'Currently engineering event-driven platforms that move <span class="font-semibold text-white">millions of daily transactions</span> with predictable latency, clean domain boundaries and zero-downtime deploys.',
    'hero.cta': 'Start a conversation',
    'hero.download': 'Download resume',
    'hero.stats.exp': 'Experience',
    'hero.stats.yrs': 'yrs',
    'hero.stats.current': 'Current',
    'hero.stats.based': 'Based in',

    'about.label': '01 — About',
    'about.title': 'A backend engineer who cares about clarity.',
    'about.p1': 'I\'m Dário, a Senior Backend Engineer from the Amazon, currently building <span class="font-semibold text-white">Node.js/TypeScript/NestJS</span> microservices at <a href="https://globalhitss.com/br/" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">HITSS Brasil</a> in Brasília — my second stint with the company. Previously, I contributed to a Stripe payments integration (SDK, webhooks, wallets) at <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(via <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> in Barcelona. Over the past <strong class="text-white">9+ years</strong> I\'ve worked alongside cross-functional teams across <strong class="text-white">PHP, Node.js, Java and Go</strong>, modernized legacy monoliths and shipped event-driven, government-scale systems for companies in Brazil, Spain and Latin America.',
    'about.p2': 'My focus is building software that survives real traffic and real teams — clean boundaries, explicit domain models, message-driven integration and observability baked in. Whether shipping payments at fintech scale or government-grade public services, I believe simple code wins, tests are a design tool, and the best systems are boring by intent.',
    'about.skill.1': 'Designing systems with <strong class="text-white">DDD &amp; Hexagonal Architecture</strong>',
    'about.skill.2': 'Async pipelines with <strong class="text-white">RabbitMQ &amp; Kafka</strong>',
    'about.skill.3': 'PostgreSQL modeling, query & transaction design',
    'about.skill.4': 'CI/CD with Jenkins + Docker on AWS & GCP',
    'about.skill.5': 'Working with & mentoring within cross-functional teams',
    'about.skill.6': 'Fluent in PT (native) · EN (C1) · ES (C1)',

    'stack.label': '02 — Stack',
    'stack.title': 'Tools I reach for every day.',
    'stack.subtitle': 'A pragmatic toolkit built around backend engineering, distributed systems and delivery.',
    'stack.backend': 'Backend',
    'stack.architecture': 'Architecture',
    'stack.data': 'Messaging & Data',
    'stack.cloud': 'Cloud & DevOps',
    'stack.frontend': 'Frontend',
    'stack.exploring': 'Recent focus',

    'exp.label': '03 — Experience',
    'exp.title': '9+ years shipping production software.',
    'exp.current': 'Current',
    'exp.present': 'Present',
    'exp.role.senior': 'Senior Backend Engineer',
    'exp.role.mid': 'Mid-Level Backend Engineer',
    'exp.1.location': 'Brasília, Brazil · Remote',
    'exp.2.location': 'Barcelona, Spain · Remote',
    'exp.3.location': 'Rio de Janeiro, Brazil',
    'exp.4.location': 'São Paulo, Brazil',
    'exp.5.location': 'Manaus, Brazil',
    'exp.1.desc': 'Building Node.js/TypeScript/NestJS microservices — my second engagement with HITSS after the government-platforms project in Rio de Janeiro, this time focused on distributed service design and API delivery from Brasília.',
    'exp.2.desc': 'Contributed to APIs for payments, subscriptions, e-signatures and AI-driven document workflows on PHP 8 + Symfony + Doctrine + GraphQL/REST + PostgreSQL + RabbitMQ, including a Stripe integration (SDK, webhooks, wallets). Architecture grounded in DDD, Hexagonal and SOLID — explicit aggregates, idempotent transactions and clean bounded contexts that scale with new markets.',
    'exp.3.desc': 'Multi-stack senior on Brazilian government platforms across multiple ministries (Agriculture, Fisheries). Delivered services in PHP/Symfony, Node.js/NestJS/TypeScript and Java/Spring Boot/Quarkus/JPA, with Next.js + React frontends. Engineered a complex federal payment system integration estimated at 4 months and delivered in significantly reduced timeframe. Operated PostgreSQL, Oracle, Redis (caching) and Elasticsearch (log analysis) on AWS and GCP, with RabbitMQ + Kafka messaging and Jenkins + Docker CI/CD.',
    'exp.4.desc': 'Backend on a high-traffic e-commerce platform — millions of monthly sessions. Shipped checkout, order and inventory features across Symfony, Laravel and Node.js, with Vue.js frontends, and used Go for performance-critical microservices. Built financial systems for supplier payments, settlements and dividend processing, integrated with Adyen, PIX and Salesforce. Optimized production via Redis caching strategies and Elasticsearch log analysis across production and staging environments.',
    'exp.5.desc': 'Worked with the team on modernizing legacy PHP systems. Built internal tools in Node.js, Vue.js and React, and shipped features like SAT fiscal invoice issuance, a WhatsApp messaging API and a distributed P2P server for offline-capable POS. Contributed to CI/CD pipelines and scalability & performance initiatives.',

    'proj.label': '04 — Projects',
    'proj.title': 'Selected work.',
    'proj.subtitle': 'Representative initiatives — distilled from real-world delivery across my career.',
    'proj.1.desc': 'Complex federal payment system integration estimated at 4 months and delivered in a significantly reduced timeframe. Required precise transactional integrity, idempotent processing and full audit trails to meet public-sector compliance under high concurrency.',
    'proj.2.desc': 'Side-project SaaS platform built end-to-end with NestJS + TypeORM on PostgreSQL, Redis caching and MinIO storage on the backend, React frontend, deployed to AWS EKS / RDS / ECR with GitLab CI pipelines and infrastructure as code.',
    'proj.3.desc': 'Real-time fiscal invoice issuance integrated with the Brazilian SAT protocol, handling thousands of daily transactions for restaurant chains. Built for reliability under flaky network conditions with idempotent retries and audit trails.',
    'proj.4.desc': 'Multi-tenant marketplace platform for the Brazilian Ministry of Agriculture. NestJS backend services, Next.js storefront and Redis caching for fast catalog browsing — designed to onboard suppliers and surface public procurement at national scale.',
    'proj.5.desc': 'Unified messaging layer bridging WhatsApp Business API and internal CRM workflows. Throttled outbound pipelines, webhook fan-out and delivery guarantees with queue-based backpressure, logging and observability built in from day one.',
    'proj.6.desc': 'Self-healing synchronization server for POS terminals in offline-capable environments. Conflict-resilient state merging, heartbeat-based peer discovery and automatic reconciliation when connectivity returns — built for the real world.',

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
    'hero.p1': 'Projeto e entrego sistemas distribuídos, APIs e plataformas orientadas a eventos com <span class="font-medium text-white">PHP, Symfony e Node.js</span> — fundamentado em <span class="font-medium text-white">DDD, Arquitetura Hexagonal</span> e nos princípios SOLID. 9+ anos entregando software em produção com times internacionais.',
    'hero.p2': 'Atualmente engenheirando plataformas orientadas a eventos que movimentam <span class="font-semibold text-white">milhões de transações diárias</span> com latência previsível, fronteiras de domínio limpas e deploys sem downtime.',
    'hero.cta': 'Vamos conversar',
    'hero.download': 'Baixar currículo',
    'hero.stats.exp': 'Experiência',
    'hero.stats.yrs': 'anos',
    'hero.stats.current': 'Atual',
    'hero.stats.based': 'Localização',

    'about.label': '01 — Sobre',
    'about.title': 'Um engenheiro backend que preza por clareza.',
    'about.p1': 'Sou Dário, Engenheiro Backend Sênior da Amazônia, atualmente construindo microsserviços em <span class="font-semibold text-white">Node.js/TypeScript/NestJS</span> na <a href="https://globalhitss.com/br/" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">HITSS Brasil</a> em Brasília — minha segunda passagem pela empresa. Anteriormente, contribuí com uma integração de pagamentos Stripe (SDK, webhooks, wallets) na <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(via <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> em Barcelona. Nos últimos <strong class="text-white">9+ anos</strong> atuei em times multidisciplinares com <strong class="text-white">PHP, Node.js, Java e Go</strong>, modernizei monólitos legados e entreguei plataformas orientadas a eventos em escala governamental para empresas no Brasil, Espanha e América Latina.',
    'about.p2': 'Meu foco é construir software que sobrevive ao tráfego real e aos times reais — fronteiras claras, modelos de domínio explícitos, integração orientada a mensagens e observabilidade desde o dia zero. Seja entregando pagamentos em escala fintech ou serviços públicos de governo, código simples vence, testes são ferramenta de design e os melhores sistemas são entediantes por design.',
    'about.skill.1': 'Desenho de sistemas com <strong class="text-white">DDD &amp; Arquitetura Hexagonal</strong>',
    'about.skill.2': 'Pipelines assíncronos com <strong class="text-white">RabbitMQ &amp; Kafka</strong>',
    'about.skill.3': 'Modelagem PostgreSQL, queries e transações',
    'about.skill.4': 'CI/CD com Jenkins + Docker na AWS & GCP',
    'about.skill.5': 'Atuação e mentoria em times multidisciplinares',
    'about.skill.6': 'Fluente em PT (nativo) · EN (C1) · ES (C1)',

    'stack.label': '02 — Stack',
    'stack.title': 'Ferramentas que uso todos os dias.',
    'stack.subtitle': 'Um toolkit pragmático para backend, sistemas distribuídos e entrega contínua.',
    'stack.backend': 'Backend',
    'stack.architecture': 'Arquitetura',
    'stack.data': 'Mensageria & Dados',
    'stack.cloud': 'Cloud & DevOps',
    'stack.frontend': 'Frontend',
    'stack.exploring': 'Foco recente',

    'exp.label': '03 — Experiência',
    'exp.title': '9+ anos entregando software em produção.',
    'exp.current': 'Atual',
    'exp.present': 'Presente',
    'exp.role.senior': 'Engenheiro Backend Sênior',
    'exp.role.mid': 'Engenheiro Backend Pleno',
    'exp.1.location': 'Brasília, Brasil · Remoto',
    'exp.2.location': 'Barcelona, Espanha · Remoto',
    'exp.3.location': 'Rio de Janeiro, Brasil',
    'exp.4.location': 'São Paulo, Brasil',
    'exp.5.location': 'Manaus, Brasil',
    'exp.1.desc': 'Construindo microsserviços em Node.js/TypeScript/NestJS — minha segunda passagem pela HITSS após o projeto de plataformas de governo no Rio de Janeiro, agora focado em desenho de serviços distribuídos e entrega de APIs a partir de Brasília.',
    'exp.2.desc': 'Contribuí com APIs para pagamentos, assinaturas, assinatura eletrônica e fluxos de documentos com automação por IA, em PHP 8 + Symfony + Doctrine + GraphQL/REST + PostgreSQL + RabbitMQ, incluindo uma integração Stripe (SDK, webhooks, wallets). Arquitetura guiada por DDD, Hexagonal e SOLID — agregados explícitos, transações idempotentes e contextos delimitados que escalam com novos mercados.',
    'exp.3.desc': 'Sênior multi-stack em plataformas do governo brasileiro em diversos ministérios (Agricultura, Pesca). Entreguei serviços em PHP/Symfony, Node.js/NestJS/TypeScript e Java/Spring Boot/Quarkus/JPA, com frontends em Next.js + React. Conduzi uma integração complexa com sistema federal de pagamentos estimada em 4 meses, entregue em prazo significativamente reduzido. Operei PostgreSQL, Oracle, Redis (cache) e Elasticsearch (análise de logs) na AWS e GCP, com mensageria em RabbitMQ + Kafka e CI/CD em Jenkins + Docker.',
    'exp.4.desc': 'Backend numa plataforma de e-commerce de alto tráfego — milhões de sessões mensais. Entreguei features de checkout, pedidos e estoque em Symfony, Laravel e Node.js, com frontends em Vue.js, e usei Go para microsserviços críticos em performance. Construí sistemas financeiros para pagamentos a fornecedores, liquidações e processamento de dividendos, integrados com Adyen, PIX e Salesforce. Otimizei produção com estratégias de cache Redis e análise de logs em Elasticsearch nos ambientes de produção e homologação.',
    'exp.5.desc': 'Atuei com o time na modernização de sistemas PHP legados. Construí ferramentas internas em Node.js, Vue.js e React, e entreguei features como emissão de notas fiscais SAT, API de mensageria WhatsApp e um servidor P2P distribuído para PDVs offline-first. Contribuí com os pipelines CI/CD e iniciativas de escalabilidade e performance.',

    'proj.label': '04 — Projetos',
    'proj.title': 'Trabalhos selecionados.',
    'proj.subtitle': 'Iniciativas representativas — extraídas da entrega real ao longo da minha carreira.',
    'proj.1.desc': 'Integração complexa com sistema federal de pagamentos estimada em 4 meses, entregue em prazo significativamente reduzido. Exigiu integridade transacional precisa, processamento idempotente e trilhas completas de auditoria para atender compliance do setor público sob alta concorrência.',
    'proj.2.desc': 'Plataforma SaaS em side project construída ponta-a-ponta com NestJS + TypeORM em PostgreSQL, cache Redis e storage MinIO no backend, frontend React, deploy em AWS EKS / RDS / ECR com pipelines GitLab CI e infra como código.',
    'proj.3.desc': 'Emissão de notas fiscais em tempo real integrada ao protocolo SAT brasileiro, processando milhares de transações diárias para redes de restaurantes. Construída para resiliência em redes instáveis, com retries idempotentes e trilhas de auditoria.',
    'proj.4.desc': 'Plataforma marketplace multi-tenant para o Ministério da Agricultura. Serviços backend em NestJS, storefront em Next.js e cache Redis para navegação rápida do catálogo — desenhada para onboarding de fornecedores e exposição de compras públicas em escala nacional.',
    'proj.5.desc': 'Camada unificada de mensageria conectando WhatsApp Business API aos fluxos de CRM internos. Pipelines de envio com throttling, fan-out de webhooks e garantias de entrega via backpressure em filas, logs e observabilidade desde o início.',
    'proj.6.desc': 'Servidor de sincronização self-healing para PDVs em ambientes offline-first. Merge de estado resiliente a conflitos, descoberta de peers por heartbeat e reconciliação automática ao retornar a conectividade — pensado para o mundo real.',

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
    'hero.p1': 'Diseño y entrego sistemas distribuidos, APIs y plataformas orientadas a eventos con <span class="font-medium text-white">PHP, Symfony y Node.js</span> — apoyado en <span class="font-medium text-white">DDD, Arquitectura Hexagonal</span> y los principios SOLID. 9+ años entregando software en producción con equipos internacionales.',
    'hero.p2': 'Actualmente desarrollando plataformas orientadas a eventos que mueven <span class="font-semibold text-white">millones de transacciones diarias</span> con latencia predecible, fronteras de dominio limpias y despliegues sin caídas.',
    'hero.cta': 'Hablemos',
    'hero.download': 'Descargar CV',
    'hero.stats.exp': 'Experiencia',
    'hero.stats.yrs': 'años',
    'hero.stats.current': 'Actual',
    'hero.stats.based': 'Ubicación',

    'about.label': '01 — Sobre mí',
    'about.title': 'Un ingeniero backend que cuida la claridad.',
    'about.p1': 'Soy Dário, Ingeniero Backend Senior de la Amazonía, actualmente construyendo microservicios en <span class="font-semibold text-white">Node.js/TypeScript/NestJS</span> en <a href="https://globalhitss.com/br/" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">HITSS Brasil</a> en Brasília — mi segundo paso por la empresa. Anteriormente, contribuí a una integración de pagos Stripe (SDK, webhooks, wallets) en <a href="https://leadtech.com" target="_blank" rel="noopener" class="font-semibold text-white underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Leadtech</a> <span class="text-ink-300">(vía <a href="https://www.ciklum.com" target="_blank" rel="noopener" class="underline decoration-brand-400/40 underline-offset-2 transition hover:decoration-brand-400">Ciklum</a>)</span> en Barcelona. En los últimos <strong class="text-white">9+ años</strong> he trabajado junto a equipos multidisciplinarios con <strong class="text-white">PHP, Node.js, Java y Go</strong>, modernizado monolitos legados y entregado plataformas orientadas a eventos a escala gubernamental para empresas en Brasil, España y Latinoamérica.',
    'about.p2': 'Mi enfoque es construir software que sobreviva al tráfico real y a los equipos reales — fronteras claras, modelos de dominio explícitos, integración por mensajes y observabilidad desde el inicio. Ya sea entregando pagos a escala fintech o servicios públicos de gobierno, el código simple gana, las pruebas son herramienta de diseño y los mejores sistemas son aburridos por diseño.',
    'about.skill.1': 'Diseño de sistemas con <strong class="text-white">DDD y Arquitectura Hexagonal</strong>',
    'about.skill.2': 'Pipelines asíncronos con <strong class="text-white">RabbitMQ y Kafka</strong>',
    'about.skill.3': 'Modelado PostgreSQL, consultas y transacciones',
    'about.skill.4': 'CI/CD con Jenkins + Docker en AWS y GCP',
    'about.skill.5': 'Colaboración y mentoring en equipos multidisciplinarios',
    'about.skill.6': 'Fluidez en PT (nativo) · EN (C1) · ES (C1)',

    'stack.label': '02 — Stack',
    'stack.title': 'Herramientas que uso cada día.',
    'stack.subtitle': 'Un toolkit pragmático pensado para backend, sistemas distribuidos y entrega continua.',
    'stack.backend': 'Backend',
    'stack.architecture': 'Arquitectura',
    'stack.data': 'Mensajería y Datos',
    'stack.cloud': 'Cloud y DevOps',
    'stack.frontend': 'Frontend',
    'stack.exploring': 'Foco reciente',

    'exp.label': '03 — Experiencia',
    'exp.title': '9+ años entregando software en producción.',
    'exp.current': 'Actual',
    'exp.present': 'Presente',
    'exp.role.senior': 'Ingeniero Backend Senior',
    'exp.role.mid': 'Ingeniero Backend Semi Senior',
    'exp.1.location': 'Brasília, Brasil · Remoto',
    'exp.2.location': 'Barcelona, España · Remoto',
    'exp.3.location': 'Río de Janeiro, Brasil',
    'exp.4.location': 'São Paulo, Brasil',
    'exp.5.location': 'Manaus, Brasil',
    'exp.1.desc': 'Construyendo microservicios en Node.js/TypeScript/NestJS — mi segundo paso por HITSS tras el proyecto de plataformas de gobierno en Río de Janeiro, ahora enfocado en diseño de servicios distribuidos y entrega de APIs desde Brasília.',
    'exp.2.desc': 'Contribuí a APIs para pagos, suscripciones, firma electrónica y flujos de documentos con automatización por IA, en PHP 8 + Symfony + Doctrine + GraphQL/REST + PostgreSQL + RabbitMQ, incluyendo una integración Stripe (SDK, webhooks, wallets). Arquitectura guiada por DDD, Hexagonal y SOLID — agregados explícitos, transacciones idempotentes y contextos delimitados que escalan con nuevos mercados.',
    'exp.3.desc': 'Senior multi-stack en plataformas del gobierno brasileño en varios ministerios (Agricultura, Pesca). Entregué servicios en PHP/Symfony, Node.js/NestJS/TypeScript y Java/Spring Boot/Quarkus/JPA, con frontends en Next.js + React. Lideré una integración compleja con sistema federal de pagos estimada en 4 meses, entregada en plazo significativamente reducido. Operé PostgreSQL, Oracle, Redis (caché) y Elasticsearch (análisis de logs) en AWS y GCP, con mensajería en RabbitMQ + Kafka y CI/CD en Jenkins + Docker.',
    'exp.4.desc': 'Backend en una plataforma de e-commerce de alto tráfico — millones de sesiones mensuales. Entregué funcionalidades de checkout, pedidos e inventario en Symfony, Laravel y Node.js, con frontends en Vue.js, y usé Go para microservicios críticos en rendimiento. Construí sistemas financieros para pagos a proveedores, liquidaciones y procesamiento de dividendos, integrados con Adyen, PIX y Salesforce. Optimicé producción con estrategias de caché Redis y análisis de logs en Elasticsearch en entornos de producción y staging.',
    'exp.5.desc': 'Participé con el equipo en la modernización de sistemas PHP legados. Construí herramientas internas en Node.js, Vue.js y React, y entregué funcionalidades como emisión de facturas fiscales SAT, una API de mensajería de WhatsApp y un servidor P2P distribuido para POS offline-first. Contribuí con los pipelines CI/CD e iniciativas de escalabilidad y rendimiento.',

    'proj.label': '04 — Proyectos',
    'proj.title': 'Trabajos seleccionados.',
    'proj.subtitle': 'Iniciativas representativas — destiladas de la entrega real a lo largo de mi carrera.',
    'proj.1.desc': 'Integración compleja con sistema federal de pagos estimada en 4 meses, entregada en plazo significativamente reducido. Requirió integridad transaccional precisa, procesamiento idempotente y trazas completas de auditoría para cumplir con compliance del sector público bajo alta concurrencia.',
    'proj.2.desc': 'Plataforma SaaS de side-project construida de extremo a extremo con NestJS + TypeORM en PostgreSQL, caché Redis y storage MinIO en el backend, frontend React, desplegada en AWS EKS / RDS / ECR con pipelines GitLab CI e infraestructura como código.',
    'proj.3.desc': 'Emisión de facturas fiscales en tiempo real integrada al protocolo SAT brasileño, procesando miles de transacciones diarias para cadenas de restaurantes. Construida para resistir redes inestables, con reintentos idempotentes y trazas de auditoría.',
    'proj.4.desc': 'Plataforma marketplace multi-tenant para el Ministerio de Agricultura. Servicios backend en NestJS, storefront en Next.js y caché Redis para navegación rápida del catálogo — diseñada para onboarding de proveedores y exposición de compras públicas a escala nacional.',
    'proj.5.desc': 'Capa unificada de mensajería que conecta WhatsApp Business API con los flujos de CRM internos. Pipelines de salida con throttling, fan-out de webhooks y garantías de entrega con backpressure en colas, logs y observabilidad desde el primer día.',
    'proj.6.desc': 'Servidor de sincronización self-healing para POS en entornos offline-first. Merge de estado resistente a conflictos, descubrimiento de peers por heartbeat y reconciliación automática al volver la conectividad — pensado para el mundo real.',

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

const LANG_STORAGE_KEY = 'dg-lang';
export const SUPPORTED = ['en', 'pt', 'es'];

const resumeByLang = {
  en: 'dario-gabriel-resume-en.pdf',
  es: 'dario-gabriel-resume-es.pdf',
  pt: 'dario-gabriel-resume-pt.pdf',
};

const detectInitialLang = () => {
  const stored = localStorage.getItem(LANG_STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return { lang: stored, browserMatched: true };
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (SUPPORTED.includes(nav)) return { lang: nav, browserMatched: true };
  return { lang: 'en', browserMatched: false };
};

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

const { lang: initialLang, browserMatched } = detectInitialLang();
let currentLang = initialLang;

export const getCurrentLang = () => currentLang;

export const applyLanguage = (lang, { persist = true } = {}) => {
  if (!SUPPORTED.includes(lang)) return;
  currentLang = lang;
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

  const resumeLink = document.getElementById('resume-download');
  if (resumeLink && resumeByLang[lang]) {
    resumeLink.setAttribute('href', resumeByLang[lang]);
  }

  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('bg-brand-500/20', active);
    btn.classList.toggle('ring-1', active);
    btn.classList.toggle('ring-brand-400/50', active);
  });

  document.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang } }));
};

document.querySelectorAll('[data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
});

applyLanguage(currentLang);

// Soft IP-based hint, only when the browser's own language setting didn't
// match a supported locale and the visitor hasn't picked one explicitly —
// the device/browser setting always wins over geolocation.
if (!browserMatched && !localStorage.getItem(LANG_STORAGE_KEY)) {
  getGeo().then((geo) => {
    const detected = countryToLang(geo && geo.code);
    if (detected && detected !== currentLang) {
      applyLanguage(detected, { persist: false });
    }
  });
}
