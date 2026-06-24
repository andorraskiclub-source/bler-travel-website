/* ═══════════════════════════════════════════════════════════════
   BLER TRAVEL BRAZIL — script.js
   Matches index.html (luxury redesign) + styles.css
═══════════════════════════════════════════════════════════════ */

/* ── Lead notifications (EmailJS + CallMeBot) ──────────────────
   Fill these in once you have the EmailJS and CallMeBot credentials.
   Until then, notifyLead() silently no-ops for whichever channel
   isn't configured yet. */
const EMAILJS_SERVICE_ID  = 'service_8ryy9ub';
const EMAILJS_TEMPLATE_ID = 'template_12ga7je';
const EMAILJS_PUBLIC_KEY  = '_fXyGzR33EDNUKFL_';

const CALLMEBOT_PHONE  = '393492772796';
const CALLMEBOT_APIKEY = '6486192';

if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'TODO_PUBLIC_KEY') {
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
}

function notifyLead(source, data) {
  if (window.emailjs && EMAILJS_SERVICE_ID !== 'TODO_SERVICE_ID') {
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      source:   source,
      name:     data.name || '',
      whatsapp: data.whatsapp || '',
      email:    data.email || '',
      subject:  data.subject || '',
      message:  data.message || ''
    }).catch(function (e) { console.error('EmailJS error:', e); });
  }

  if (CALLMEBOT_PHONE !== 'TODO_BLER_WHATSAPP_NUMBER') {
    const lines = [
      'Novo lead BLER (' + source + ')',
      'Nome: ' + (data.name || '-'),
      'WhatsApp: ' + (data.whatsapp || '-'),
      'Email: ' + (data.email || '-')
    ];
    if (data.subject) lines.push('Assunto: ' + data.subject);
    if (data.message) lines.push('Mensagem: ' + data.message);
    const url = 'https://api.callmebot.com/whatsapp.php?phone=' + CALLMEBOT_PHONE +
      '&text=' + encodeURIComponent(lines.join('\n')) + '&apikey=' + CALLMEBOT_APIKEY;
    fetch(url, { mode: 'no-cors' }).catch(function (e) { console.error('CallMeBot error:', e); });
  }
}

/* ── Translations ───────────────────────────────────────────── */
const T = {
  pt: {
    logo:        'BLER TRAVEL BRAZIL',
    n_home:      'Início',
    n_corp:      'Assistência Corporativa',
    n_lei:       'Viagens de Lazer',
    n_bo:        'Back Office Support',
    n_ct:        'Parcerias & Contato',

    /* Hero */
    h_since:     'Desde 2004',
    h_line1:     'A arte',
    h_line2:     'de viajar',
    h_line3:     'bem.',
    h_sub:       'Serviço personalizado para viagens corporativas e de lazer — com mais de 25 anos de experiência e parceiros nos EUA e na Europa.',
    h_cta1:      'Nossos serviços',
    h_cta2:      'Fale conosco',

    /* About */
    ab_over:     'Quem somos',
    ab_title:    'Experiência que\ntransforma viagens\nem memórias.',
    ab_badge:    'Fundada em',
    ab_p:        'Criada em 2004, a BLER TRAVEL BRAZIL oferece um serviço personalizado para viagens de lazer e viagens corporativas. Nossos profissionais têm mais de 25 anos de experiência no mercado do turismo e oferecemos soluções para todo tipo de necessidades dos nossos clientes. Contamos com ampla experiência internacional e junto com nossas agências parceiras nos EUA e na Europa oferecemos suporte 24 horas, todos os dias.',
    ab_s1:       'anos de experiência',
    ab_s2:       'suporte dedicado',
    ab_s3:       'idiomas',

    /* Corporate */
    corp_over:    'Assistência Corporativa',
    corp_title:   'Eficiência e elegância\nem cada viagem\ncorporativa.',
    corp_img_cap: 'Transporte aéreo executivo',
    corp_p1:      'Nossa experiência e profissionalismo ajudam as empresas dos mais diversos segmentos a realizarem viagens corporativas de forma eficiente e com menor custo. Nosso serviço é personalizado e nos adaptamos ao perfil e às necessidades de cada empresa através do desenvolvimento de um suporte 24 horas por dia, 7 dias por semana, que visa reduzir custos e oferecer soluções rápidas e efetivas.',
    corp_p2:      'No mundo corporativo, as coisas mudam o tempo todo, e nossa estrutura flexível nos permite resolver qualquer problema rapidamente, sem burocracia e com autonomia. Nosso objetivo é que nossos clientes possam concentrar em seu negócio e garantir que todas as suas necessidades de viagem sejam sempre atendidas.',
    we_offer:     'Nós oferecemos',
    cs_1:  'Sistemas de reservas e gerenciamento on-line',
    cs_2:  'Passagens aéreas',
    cs_3:  'Reservas de hotéis',
    cs_4:  'Seguro de saúde',
    cs_5:  'Atendimento emergencial 24 horas',
    cs_6:  'Organização de eventos corporativos',
    cs_7:  'Locação de carros',
    cs_8:  'Relatórios online',
    cs_9:  'Traslados executivos',
    cs_10: 'Organização de eventos de incentivo',
    cs_11: 'Locação de transporte aéreo privado',

    /* Leisure */
    lei_over:  'Viagens de Lazer',
    lei_title: 'A arte de viver\ncada destino\ncom plenitude.',
    lei_pull:  'Viajar é muito mais do que conhecer lugares.',
    lei_p1:    'É experimentar novos sabores, ouvir novos sons, vislumbrar paisagens majestosas, surpreender os nossos sentidos. É fazer novas amizades, aprender a história e fazer parte dela. É o aroma das plumérias em Waikiki, o sabor das cerejas na Provance e o ar puro dos Alpes. O sol na pele na primavera de New York, a neve fofa de Aspen, a areia branca de Turks and Caicos.',
    lei_p2:    'É conquistar uma nova etapa espiritual, mental. É a arte de viver!',
    lei_p3:    'Nós não trabalhamos somente vendendo viagens. Fazemos muito mais que isso. Na verdade ajudamos os nossos clientes a realizarem os seus sonhos. Oferecemos um atendimento diferenciado para que nossos clientes possam aproveitar ao máximo a viagem. Antes, durante, depois e sempre.',
    ls_1:  'Passagens aéreas',
    ls_2:  'Reservas de hotéis',
    ls_3:  'Seguro de saúde',
    ls_4:  'Serviço emergencial 24 horas',
    ls_5:  'Locação de carros',
    ls_6:  'Traslados privados',
    ls_7:  'Transporte privado em destinos internacionais',
    ls_8:  'Pacotes de viagem',
    ls_9:  'Organização de eventos privados',
    ls_10: 'Locação de barcos',
    ls_11: 'Pacotes de lua de mel',
    ls_12: 'Expert para viagens de esqui',
    ls_13: 'Passeios temáticos',
    ls_14: 'Cruzeiros',
    ls_15: 'Expert Disney',
    ls_16: 'Roteiros religiosos e de conhecimento espiritual',
    ls_17: 'Expert Israel',

    /* Back Office */
    bo_title:    'Suporte especializado\npara agências e\nempresas de turismo.',
    bo_p1:       'O "Back Office Agency Support" é um serviço customizado de suporte, consultoria e atendimento a agências de viagens, hotéis e empresas de turismo. Oferecemos nossos mais de 20 anos de experiência internacional na indústria de turismo para que nossos clientes e parceiros possam ter um ganho de produtividade, reduzindo seus custos operacionais e de mão-de-obra, obtendo mais lucros.',
    bo_p2:       'Nosso serviço funciona em tempo real à distância. Também podemos oferecer assistência e produção no local. Trabalhamos como um colaborador virtual, atendendo a diferentes demandas sob medida às diferentes necessidades de nossos clientes e parceiros.',
    bo_includes: 'Nossos serviços incluem',
    bo_1: 'Reservas aéreas',
    bo_2: 'Montagem e produção de pacotes turísticos',
    bo_3: 'Pesquisa e desenvolvimento de roteiros turísticos',
    bo_4: 'Reservas de hotel',
    bo_5: 'Assistência na organização de eventos corporativos e de lazer',
    bo_6: 'Assistência na organização de eventos de incentivo',
    bo_7: 'Serviço personalizado para clientes corporativos e VIP',
    bo_8: 'Treinamento',

    /* Contact */
    ct_over:  'Parcerias & Contato',
    ct_title: 'Conte com nossa\npresença global.',
    ct_p:     'Nossa empresa parceira nos Estados Unidos permite acesso exclusivo ao mercado internacional e suporte extra para nossos clientes. Podemos oferecer tarifas mais competitivas, bem como suporte logístico diferenciado. Nossa experiência e suporte internacional confere aos nossos clientes a certeza e a tranquilidade de que podem contar conosco a qualquer momento, mesmo quando imprevistos acontecem.',
    ct_wa:    'Fale pelo WhatsApp',

    /* Form */
    f_email:   'Email',
    f_subject: 'Assunto',
    f_msg:     'Mensagem',
    f_send:    'Enviar',
    f_ok:      'Email recebido! Muito obrigado!',

    /* Footer */
    ft_copy: '© 2026 BLER TRAVEL BRAZIL Ltda.',
  },

  en: {
    logo:        'BLER TRAVEL BRAZIL',
    n_home:      'Home',
    n_corp:      'Corporate Assistance',
    n_lei:       'Leisure Travel',
    n_bo:        'Back Office Support',
    n_ct:        'Partnerships & Contact',

    h_since:     'Since 2004',
    h_line1:     'The art',
    h_line2:     'of traveling',
    h_line3:     'well.',
    h_sub:       'Personalized service for corporate and leisure travel — with over 25 years of experience and partners in the USA and Europe.',
    h_cta1:      'Our services',
    h_cta2:      'Get in touch',

    ab_over:     'Who we are',
    ab_title:    'Experience that\ntransforms journeys\ninto memories.',
    ab_badge:    'Founded in',
    ab_p:        'Founded in 2004, BLER TRAVEL BRAZIL offers a personalized service for leisure and corporate travel. Our professionals have over 25 years of experience in the tourism industry and offer solutions for all types of client needs. We have broad international expertise and, together with our partner agencies in the USA and Europe, we provide 24-hour support, every day.',
    ab_s1:       'years of experience',
    ab_s2:       'dedicated support',
    ab_s3:       'languages',

    corp_over:    'Corporate Assistance',
    corp_title:   'Efficiency and elegance\nin every corporate\njourney.',
    corp_img_cap: 'Executive air transport',
    corp_p1:      'Our experience and professionalism help companies of all segments carry out corporate travel efficiently and at a lower cost. Our service is personalized and we adapt to the profile and needs of each company through the development of 24-hour support, 7 days a week, aimed at reducing costs and offering fast, effective solutions.',
    corp_p2:      'In the corporate world, things change all the time, and our flexible structure allows us to solve any problem quickly, without bureaucracy and with autonomy. Our goal is for our clients to focus on their business while ensuring that all their travel needs are always met.',
    we_offer:     'We offer',
    cs_1:  'Online reservation and management systems',
    cs_2:  'Air tickets',
    cs_3:  'Hotel reservations',
    cs_4:  'Health insurance',
    cs_5:  '24-hour emergency assistance',
    cs_6:  'Corporate event organization',
    cs_7:  'Car rental',
    cs_8:  'Online reports',
    cs_9:  'Executive transfers',
    cs_10: 'Incentive event organization',
    cs_11: 'Private air transport rental',

    lei_over:  'Leisure Travel',
    lei_title: 'The art of living\nevery destination\nfully.',
    lei_pull:  'Traveling is so much more than seeing places.',
    lei_p1:    'It is tasting new flavors, hearing new sounds, glimpsing majestic landscapes, surprising our senses. It is making new friends, learning history and becoming part of it. It is the scent of plumerias in Waikiki, the taste of cherries in Provence, and the crisp air of the Alps. Sun on your skin in the New York spring, the fluffy snow of Aspen, the white sand of Turks and Caicos.',
    lei_p2:    'It is reaching a new spiritual, mental stage. It is the art of living!',
    lei_p3:    'We don\'t just sell travel. We do much more than that. We help our clients fulfill their dreams. We offer a differentiated service so our clients can make the most of every journey — before, during, after, and always.',
    ls_1:  'Air tickets',
    ls_2:  'Hotel reservations',
    ls_3:  'Health insurance',
    ls_4:  '24-hour emergency service',
    ls_5:  'Car rental',
    ls_6:  'Private transfers',
    ls_7:  'Private transport at international destinations',
    ls_8:  'Travel packages',
    ls_9:  'Private event organization',
    ls_10: 'Boat rental',
    ls_11: 'Honeymoon packages',
    ls_12: 'Ski travel expert',
    ls_13: 'Themed tours',
    ls_14: 'Cruises',
    ls_15: 'Disney Expert',
    ls_16: 'Religious and spiritual knowledge itineraries',
    ls_17: 'Israel Expert',

    bo_title:    'Specialized support\nfor agencies and\ntourism companies.',
    bo_p1:       '"Back Office Agency Support" is a customized support, consulting, and service for travel agencies, hotels, and tourism companies. We offer our 20+ years of international experience in the tourism industry so our clients and partners can gain productivity, reducing operating and labor costs and obtaining more profit.',
    bo_p2:       'Our service operates in real time and remotely. We can also offer on-site assistance and production. We work as a virtual collaborator, meeting different demands tailored to the different needs of our clients and partners.',
    bo_includes: 'Our services include',
    bo_1: 'Air reservations',
    bo_2: 'Tourism package assembly and production',
    bo_3: 'Research and development of tourist itineraries',
    bo_4: 'Hotel reservations',
    bo_5: 'Assistance in organizing corporate and leisure events',
    bo_6: 'Assistance in organizing incentive events',
    bo_7: 'Personalized service for corporate and VIP clients',
    bo_8: 'Training',

    ct_over:  'Partnerships & Contact',
    ct_title: 'Count on our\nglobal presence.',
    ct_p:     'Our partner company in the United States allows exclusive access to the international market and extra support for our clients. We can offer more competitive fares and differentiated logistical support. Our international experience and support gives our clients the certainty and peace of mind that they can count on us at any time, even when the unexpected happens.',
    ct_wa:    'Chat on WhatsApp',

    f_email:   'Email',
    f_subject: 'Subject',
    f_msg:     'Message',
    f_send:    'Send',
    f_ok:      'Message received! Thank you very much!',

    ft_copy: '© 2026 BLER TRAVEL BRAZIL. All rights reserved.',
  },

  es: {
    logo:        'BLER TRAVEL BRAZIL',
    n_home:      'Inicio',
    n_corp:      'Asistencia Corporativa',
    n_lei:       'Viajes de Ocio',
    n_bo:        'Back Office Support',
    n_ct:        'Alianzas & Contacto',

    h_since:     'Desde 2004',
    h_line1:     'El arte',
    h_line2:     'de viajar',
    h_line3:     'bien.',
    h_sub:       'Servicio personalizado para viajes corporativos y de ocio — con más de 25 años de experiencia y socios en EE.UU. y Europa.',
    h_cta1:      'Nuestros servicios',
    h_cta2:      'Contáctenos',

    ab_over:     'Quiénes somos',
    ab_title:    'Experiencia que\ntransforma viajes\nen memorias.',
    ab_badge:    'Fundada en',
    ab_p:        'Fundada en 2004, BLER TRAVEL BRAZIL ofrece un servicio personalizado para viajes de ocio y corporativos. Nuestros profesionales tienen más de 25 años de experiencia en el sector turístico y ofrecemos soluciones para todo tipo de necesidades de nuestros clientes. Contamos con amplia experiencia internacional y junto con nuestras agencias socias en EE.UU. y Europa ofrecemos soporte 24 horas, todos los días.',
    ab_s1:       'años de experiencia',
    ab_s2:       'soporte dedicado',
    ab_s3:       'idiomas',

    corp_over:    'Asistencia Corporativa',
    corp_title:   'Eficiencia y elegancia\nen cada viaje\ncorporativo.',
    corp_img_cap: 'Transporte aéreo ejecutivo',
    corp_p1:      'Nuestra experiencia y profesionalismo ayudan a empresas de todos los segmentos a realizar viajes corporativos de manera eficiente y a menor costo. Nuestro servicio es personalizado y nos adaptamos al perfil y las necesidades de cada empresa mediante el desarrollo de un soporte de 24 horas al día, 7 días a la semana, orientado a reducir costos y ofrecer soluciones rápidas y efectivas.',
    corp_p2:      'En el mundo corporativo, las cosas cambian constantemente, y nuestra estructura flexible nos permite resolver cualquier problema rápidamente, sin burocracia y con autonomía. Nuestro objetivo es que nuestros clientes puedan concentrarse en su negocio y garantizar que todas sus necesidades de viaje estén siempre atendidas.',
    we_offer:     'Ofrecemos',
    cs_1:  'Sistemas de reservas y gestión en línea',
    cs_2:  'Pasajes aéreos',
    cs_3:  'Reservas de hoteles',
    cs_4:  'Seguro de salud',
    cs_5:  'Atención de emergencia 24 horas',
    cs_6:  'Organización de eventos corporativos',
    cs_7:  'Alquiler de autos',
    cs_8:  'Informes en línea',
    cs_9:  'Traslados ejecutivos',
    cs_10: 'Organización de eventos de incentivo',
    cs_11: 'Alquiler de transporte aéreo privado',

    lei_over:  'Viajes de Ocio',
    lei_title: 'El arte de vivir\ncada destino\nplenamente.',
    lei_pull:  'Viajar es mucho más que conocer lugares.',
    lei_p1:    'Es experimentar nuevos sabores, escuchar nuevos sonidos, vislumbrar paisajes majestuosos, sorprender nuestros sentidos. Es hacer nuevas amistades, aprender la historia y ser parte de ella. Es el aroma de las plumerias en Waikiki, el sabor de las cerezas en la Provenza y el aire puro de los Alpes. El sol en la piel en la primavera de Nueva York, la nieve suave de Aspen, la arena blanca de Turks and Caicos.',
    lei_p2:    'Es alcanzar una nueva etapa espiritual, mental. ¡Es el arte de vivir!',
    lei_p3:    'No solo vendemos viajes. Hacemos mucho más que eso. Ayudamos a nuestros clientes a hacer realidad sus sueños. Ofrecemos una atención diferenciada para que nuestros clientes puedan aprovechar al máximo el viaje. Antes, durante, después y siempre.',
    ls_1:  'Pasajes aéreos',
    ls_2:  'Reservas de hoteles',
    ls_3:  'Seguro de salud',
    ls_4:  'Servicio de emergencia 24 horas',
    ls_5:  'Alquiler de autos',
    ls_6:  'Traslados privados',
    ls_7:  'Transporte privado en destinos internacionales',
    ls_8:  'Paquetes de viaje',
    ls_9:  'Organización de eventos privados',
    ls_10: 'Alquiler de barcos',
    ls_11: 'Paquetes de luna de miel',
    ls_12: 'Experto en viajes de esquí',
    ls_13: 'Excursiones temáticas',
    ls_14: 'Cruceros',
    ls_15: 'Expert Disney',
    ls_16: 'Itinerarios religiosos y de conocimiento espiritual',
    ls_17: 'Expert Israel',

    bo_title:    'Soporte especializado\npara agencias y\nempresas de turismo.',
    bo_p1:       '"Back Office Agency Support" es un servicio personalizado de soporte, consultoría y atención a agencias de viajes, hoteles y empresas de turismo. Ofrecemos más de 20 años de experiencia internacional en la industria del turismo para que nuestros clientes y socios puedan ganar productividad, reduciendo sus costos operativos y de mano de obra, y obteniendo más beneficios.',
    bo_p2:       'Nuestro servicio funciona en tiempo real a distancia. También podemos ofrecer asistencia y producción en el lugar. Trabajamos como un colaborador virtual, atendiendo diferentes demandas a medida según las distintas necesidades de nuestros clientes y socios.',
    bo_includes: 'Nuestros servicios incluyen',
    bo_1: 'Reservas aéreas',
    bo_2: 'Armado y producción de paquetes turísticos',
    bo_3: 'Investigación y desarrollo de itinerarios turísticos',
    bo_4: 'Reservas de hotel',
    bo_5: 'Asistencia en la organización de eventos corporativos y de ocio',
    bo_6: 'Asistencia en la organización de eventos de incentivo',
    bo_7: 'Servicio personalizado para clientes corporativos y VIP',
    bo_8: 'Capacitación',

    ct_over:  'Alianzas & Contacto',
    ct_title: 'Cuente con nuestra\npresencia global.',
    ct_p:     'Nuestra empresa socia en los Estados Unidos permite acceso exclusivo al mercado internacional y soporte adicional para nuestros clientes. Podemos ofrecer tarifas más competitivas, así como soporte logístico diferenciado. Nuestra experiencia y soporte internacional brinda a nuestros clientes la certeza y tranquilidad de que pueden contar con nosotros en cualquier momento, incluso cuando ocurren imprevistos.',
    ct_wa:    'Chatear en WhatsApp',

    f_email:   'Correo electrónico',
    f_subject: 'Asunto',
    f_msg:     'Mensaje',
    f_send:    'Enviar',
    f_ok:      '¡Correo recibido! ¡Muchas gracias!',

    ft_copy: '© 2026 BLER TRAVEL BRAZIL. Todos los derechos reservados.',
  },

  it: {
    logo:        'BLER TRAVEL BRAZIL',
    n_home:      'Home',
    n_corp:      'Assistenza Aziendale',
    n_lei:       'Viaggi di Piacere',
    n_bo:        'Back Office Support',
    n_ct:        'Partnership & Contatti',

    h_since:     'Dal 2004',
    h_line1:     'L\'arte',
    h_line2:     'di viaggiare',
    h_line3:     'bene.',
    h_sub:       'Servizio personalizzato per viaggi aziendali e di piacere — con oltre 25 anni di esperienza e partner negli USA e in Europa.',
    h_cta1:      'I nostri servizi',
    h_cta2:      'Contattaci',

    ab_over:     'Chi siamo',
    ab_title:    'Esperienza che\ntrasforma i viaggi\nin ricordi.',
    ab_badge:    'Fondata nel',
    ab_p:        'Fondata nel 2004, BLER TRAVEL BRAZIL offre un servizio personalizzato per viaggi di piacere e aziendali. I nostri professionisti hanno oltre 25 anni di esperienza nel settore turistico e offriamo soluzioni per ogni tipo di esigenza dei nostri clienti. Disponiamo di una vasta esperienza internazionale e, insieme alle nostre agenzie partner negli USA e in Europa, offriamo assistenza 24 ore al giorno, tutti i giorni.',
    ab_s1:       'anni di esperienza',
    ab_s2:       'assistenza dedicata',
    ab_s3:       'lingue',

    corp_over:    'Assistenza Aziendale',
    corp_title:   'Efficienza ed eleganza\nin ogni viaggio\naziendale.',
    corp_img_cap: 'Trasporto aereo executive',
    corp_p1:      'La nostra esperienza e professionalità aiutano aziende di ogni settore a realizzare viaggi aziendali in modo efficiente e a costi più contenuti. Il nostro servizio è personalizzato e ci adattiamo al profilo e alle esigenze di ogni azienda attraverso un\'assistenza attiva 24 ore al giorno, 7 giorni alla settimana, pensata per ridurre i costi e offrire soluzioni rapide ed efficaci.',
    corp_p2:      'Nel mondo aziendale le cose cambiano continuamente, e la nostra struttura flessibile ci permette di risolvere qualsiasi problema rapidamente, senza burocrazia e con autonomia. Il nostro obiettivo è permettere ai nostri clienti di concentrarsi sul proprio business, garantendo che tutte le loro esigenze di viaggio siano sempre soddisfatte.',
    we_offer:     'Offriamo',
    cs_1:  'Sistemi di prenotazione e gestione online',
    cs_2:  'Biglietti aerei',
    cs_3:  'Prenotazioni hotel',
    cs_4:  'Assicurazione sanitaria',
    cs_5:  'Assistenza di emergenza 24 ore',
    cs_6:  'Organizzazione di eventi aziendali',
    cs_7:  'Noleggio auto',
    cs_8:  'Report online',
    cs_9:  'Transfer executive',
    cs_10: 'Organizzazione di eventi incentive',
    cs_11: 'Noleggio trasporto aereo privato',

    lei_over:  'Viaggi di Piacere',
    lei_title: 'L\'arte di vivere\nogni destinazione\nin pienezza.',
    lei_pull:  'Viaggiare è molto più che visitare luoghi.',
    lei_p1:    'È assaggiare nuovi sapori, ascoltare nuovi suoni, ammirare paesaggi maestosi, sorprendere i nostri sensi. È fare nuove amicizie, conoscere la storia e farne parte. È il profumo delle plumerie a Waikiki, il sapore delle cerase in Provenza e l\'aria pura delle Alpi. Il sole sulla pelle nella primavera di New York, la neve soffice di Aspen, la sabbia bianca di Turks and Caicos.',
    lei_p2:    'È raggiungere una nuova fase spirituale, mentale. È l\'arte di vivere!',
    lei_p3:    'Non ci limitiamo a vendere viaggi. Facciamo molto di più. Aiutiamo i nostri clienti a realizzare i loro sogni. Offriamo un\'assistenza differenziata affinché i nostri clienti possano vivere al massimo ogni viaggio. Prima, durante, dopo e sempre.',
    ls_1:  'Biglietti aerei',
    ls_2:  'Prenotazioni hotel',
    ls_3:  'Assicurazione sanitaria',
    ls_4:  'Servizio di emergenza 24 ore',
    ls_5:  'Noleggio auto',
    ls_6:  'Transfer privati',
    ls_7:  'Trasporto privato nelle destinazioni internazionali',
    ls_8:  'Pacchetti di viaggio',
    ls_9:  'Organizzazione di eventi privati',
    ls_10: 'Noleggio barche',
    ls_11: 'Pacchetti luna di miele',
    ls_12: 'Esperti in viaggi sulla neve',
    ls_13: 'Tour a tema',
    ls_14: 'Crociere',
    ls_15: 'Esperti Disney',
    ls_16: 'Itinerari religiosi e di conoscenza spirituale',
    ls_17: 'Esperti Israele',

    bo_title:    'Assistenza specializzata\nper agenzie e\naziende turistiche.',
    bo_p1:       'Il "Back Office Agency Support" è un servizio personalizzato di assistenza, consulenza e supporto per agenzie di viaggio, hotel e aziende turistiche. Offriamo i nostri oltre 20 anni di esperienza internazionale nel settore turistico affinché i nostri clienti e partner possano ottenere un guadagno di produttività, riducendo i costi operativi e di manodopera e ottenendo maggiori profitti.',
    bo_p2:       'Il nostro servizio funziona in tempo reale e a distanza. Possiamo offrire anche assistenza e produzione in loco. Lavoriamo come collaboratori virtuali, rispondendo a diverse esigenze su misura per i nostri clienti e partner.',
    bo_includes: 'I nostri servizi includono',
    bo_1: 'Prenotazioni aeree',
    bo_2: 'Realizzazione e produzione di pacchetti turistici',
    bo_3: 'Ricerca e sviluppo di itinerari turistici',
    bo_4: 'Prenotazioni hotel',
    bo_5: 'Assistenza nell\'organizzazione di eventi aziendali e di piacere',
    bo_6: 'Assistenza nell\'organizzazione di eventi incentive',
    bo_7: 'Servizio personalizzato per clienti aziendali e VIP',
    bo_8: 'Formazione',

    ct_over:  'Partnership & Contatti',
    ct_title: 'Conta sulla nostra\npresenza globale.',
    ct_p:     'La nostra azienda partner negli Stati Uniti consente un accesso esclusivo al mercato internazionale e un supporto extra per i nostri clienti. Possiamo offrire tariffe più competitive e un\'assistenza logistica differenziata. La nostra esperienza e il supporto internazionale garantiscono ai nostri clienti la certezza e la tranquillità di poter contare su di noi in qualsiasi momento, anche quando si verificano imprevisti.',
    ct_wa:    'Scrivici su WhatsApp',

    f_email:   'Email',
    f_subject: 'Oggetto',
    f_msg:     'Messaggio',
    f_send:    'Invia',
    f_ok:      'Messaggio ricevuto! Grazie mille!',

    ft_copy: '© 2026 BLER TRAVEL BRAZIL. Tutti i diritti riservati.',
  }
};

/* ── State ──────────────────────────────────────────────────── */
let lang = 'pt';

/* ── i18n apply ─────────────────────────────────────────────── */
function applyLang(code) {
  const t = T[code];
  if (!t) return;
  lang = code;
  document.documentElement.lang = code === 'pt' ? 'pt-BR' : code;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] === undefined) return;

    /* h2 / h1 with line-breaks use \n → <br> */
    if (el.tagName === 'H2' || el.tagName === 'H1') {
      el.innerHTML = t[key].replace(/\n/g, '<br>');
    } else {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === code);
  });
}

/* ── Navbar scroll ──────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger / drawer ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  drawer.classList.toggle('open', isOpen);
  drawer.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* ── Language switcher (global delegated) ───────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-lang]');
  if (!btn) return;
  applyLang(btn.dataset.lang);
});

/* ── Scroll reveal ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
  revealObserver.observe(el);
});

/* ── Active nav link on scroll ──────────────────────────────── */
const sections  = Array.from(document.querySelectorAll('section[id]'));
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Hero photos: subtle parallax on scroll ─────────────────── */
const heroPhotos = document.querySelector('.hero-photos');
if (heroPhotos) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.2) {
      heroPhotos.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    }
  }, { passive: true });
}

/* ── Cursor glow ────────────────────────────────────────────── */
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover: hover)').matches) {
  let raf;
  let mx = -999, my = -999;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!raf) {
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        raf = null;
      });
    }
  });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
}

/* ── Contact form ───────────────────────────────────────────── */
const form   = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email   = form.querySelector('#f_email').value.trim();
    const subject = form.querySelector('#f_subject').value.trim();
    const msg     = form.querySelector('#f_msg').value.trim();
    if (!email || !msg) return;

    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.querySelector('.btn-submit-text').textContent = '…';

    notifyLead('Formulário de Contato', { email: email, subject: subject, message: msg });

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.querySelector('.btn-submit-text').textContent = T[lang].f_send || 'Enviar';
      formOk.classList.remove('hidden');
      setTimeout(() => formOk.classList.add('hidden'), 7000);
    }, 1000);
  });
}

/* ── Init ───────────────────────────────────────────────────── */
applyLang('pt');
