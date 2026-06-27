import {
  company,
  openingHours,
  reviews,
  ratingSummary,
  menu,
  type MenuGroup,
} from '../data/site'

// Production target domain (the bar's existing domain; staging serves from
// kcs-sports-pub.netlify.app until cutover). Canonicals, sitemap, OG and
// schema all point here.
export const SITE_URL = 'https://kcswadsworth.com'

const OG_IMAGE = '/images/og-image.jpg'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

function aggregateRating() {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingSummary.value,
    reviewCount: String(ratingSummary.count),
    bestRating: '5',
    worstRating: '1',
  }
}

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
  }))
}

export function barSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'Restaurant'],
    '@id': `${SITE_URL}/#bar`,
    name: company.name,
    alternateName: company.altName,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo-full.png'),
    telephone: company.phone,
    priceRange: '$',
    servesCuisine: ['American', 'Bar Food', 'Burgers', 'Wings', 'Breakfast'],
    description: company.shortBlurb,
    slogan: company.tagline,
    hasMenu: pageUrl('/menu'),
    acceptsReservations: 'False',
    menu: pageUrl('/menu'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Wadsworth, OH' },
      { '@type': 'AdministrativeArea', name: 'Medina County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: aggregateRating(),
    review: reviewNodes(),
    sameAs: [company.social.facebook, company.social.instagram],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#bar` },
  }
}

function menuSectionSchema(group: MenuGroup) {
  return {
    '@type': 'MenuSection',
    name: group.title,
    ...(group.note ? { description: group.note } : {}),
    hasMenuItem: group.items.map((it) => ({
      '@type': 'MenuItem',
      name: it.name,
      ...(it.desc ? { description: it.desc } : {}),
    })),
  }
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu/#menu`,
    name: "KC's Sports Bar Menu",
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    provider: { '@id': `${SITE_URL}/#bar` },
    hasMenuSection: menu.map(menuSectionSchema),
  }
}

const FAQS = [
  {
    q: "What are KC's Sports Bar's hours?",
    a: 'We are open every single day from 10:00 am until 2:30 am, including weekends and most holidays.',
  },
  {
    q: "Where is KC's Sports Bar located?",
    a: "Right on Main Street in Wadsworth at 346 Main St, Wadsworth, OH 44281, on the city's south end.",
  },
  {
    q: "Does KC's serve food late?",
    a: 'Yes. The kitchen serves scratch-made bar food and breakfast all day, every day. Call (330) 336-5100 for today’s specials.',
  },
  {
    q: 'What weekly events does KC’s run?',
    a: 'Tuesday is $1.50 beer night, Wednesday is the 8pm pool tournament, and Thursday brings ladies night from 5 to 9 followed by karaoke at 9.',
  },
  {
    q: 'Does KC’s have pool tables and darts?',
    a: 'Yes, pool tables, dart boards, and TVs around the whole bar for every game.',
  },
]

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export const faqs = FAQS

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: "KC's Sports Bar | Wadsworth, OH | Good Food. Good Times. Good Company.",
        description: `${company.shortBlurb} Call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [barSchema(), websiteSchema(), faqSchema()],
      }
    case '/menu':
      return {
        title: "Menu | KC's Sports Bar, Wadsworth OH | Burgers, Wings & Breakfast All Day",
        description:
          "See what KC's kitchen is cooking: the signature Grizzly Burger, wings, fried pickles, hush puppies and breakfast served all day at hometown prices. 346 Main St, Wadsworth.",
        canonical: pageUrl('/menu'),
        ogImage,
        jsonLd: [
          barSchema(),
          menuSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
        ],
      }
    case '/events':
      return {
        title: "Events & Specials | KC's Sports Bar, Wadsworth OH | Karaoke, Pool & $1.50 Beers",
        description:
          'The weekly lineup at KC’s: $1.50 beer Tuesdays, Wednesday pool tournament at 8, ladies night Thursday 5-9 and karaoke at 9. Pool tables, darts and every game on TV.',
        canonical: pageUrl('/events'),
        ogImage,
        jsonLd: [
          barSchema(),
          faqSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Events & Specials', path: '/events' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: "Contact & Hours | KC's Sports Bar, Wadsworth OH",
        description: `Find KC's Sports Bar at ${company.addressOneLine}. Open every day 10am to 2:30am. Map, directions and hours. Call ${company.phone}.`,
        canonical: pageUrl('/contact'),
        ogImage,
        jsonLd: [
          barSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#bar` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: "Privacy Policy | KC's Sports Bar",
        description:
          "How KC's Sports Bar collects, uses, and protects information submitted through this website.",
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: "Terms of Service | KC's Sports Bar",
        description: "The terms that govern your use of the KC's Sports Bar website.",
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: "Accessibility Statement | KC's Sports Bar",
        description:
          "Our commitment to making the KC's Sports Bar website accessible to everyone, and how to reach us about accessibility.",
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: "Page Not Found | KC's Sports Bar",
        description:
          "Sorry, we couldn't find that page. KC's Sports Bar is Wadsworth's neighborhood sports bar, open every day 10am to 2:30am.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [barSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/menu',
  '/events',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
