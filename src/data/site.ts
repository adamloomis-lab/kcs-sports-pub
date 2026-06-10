// All site content for KC's Sports Bar. Single source of truth consumed by
// pages, components, and the SEO/JSON-LD layer.

export const company = {
  name: "KC's Sports Bar",
  shortName: "KC's",
  // The Google Business listing still carries the older "KC's Sports Pub"
  // name; keep it as an alternate so schema ties the two together.
  altName: "KC's Sports Pub",
  tagline: 'Good Food. Good Times. Good Company.',
  // One-liner used in hero / meta.
  shortBlurb:
    "Wadsworth's neighborhood sports bar on Main Street. Cold drinks, scratch-kitchen bar food, breakfast all day, pool, darts and karaoke, open every day from 10am until 2:30am.",
  phone: '(330) 336-5100',
  phoneHref: 'tel:+13303365100',
  address: {
    street: '346 Main St',
    city: 'Wadsworth',
    state: 'OH',
    zip: '44281',
  },
  addressOneLine: '346 Main St, Wadsworth, OH 44281',
  geo: { lat: 41.0186157, lng: -81.7299194 },
  // Google Places id, powers the live reviews function + maps deep links.
  placeId: 'ChIJNdgZ8APNMIgRdYyOmp0OTCU',
  mapsDir:
    "https://www.google.com/maps/dir/?api=1&destination=KC's+Sports+Pub+346+Main+St+Wadsworth+OH+44281",
  mapsEmbed:
    'https://www.google.com/maps?q=346+Main+St+Wadsworth+OH+44281&output=embed',
  mapsReviews: 'https://maps.google.com/?cid=2687539147699031157',
  social: {
    facebook: 'https://www.facebook.com/100057383845933',
    instagram: 'https://www.instagram.com/kcs_sports_pub/',
  },
} as const

// ---------------------------------------------------------------------------
// Hours. Same hours every day (confirmed against the live Google listing).
// dow matches Date.getDay() (0 = Sun).
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: '10:00 am – 2:30 am' },
  { day: 'Monday', short: 'Mon', dow: 1, time: '10:00 am – 2:30 am' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '10:00 am – 2:30 am' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '10:00 am – 2:30 am' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '10:00 am – 2:30 am' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '10:00 am – 2:30 am' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '10:00 am – 2:30 am' },
]

export const hoursCompact = [{ day: 'Every day', time: '10 am – 2:30 am' }]

// Schema.org openingHoursSpecification (closes after midnight).
export const openingHours = [
  {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '02:30',
  },
]

export const featurePillars = [
  {
    title: 'Every Game On',
    blurb:
      "TVs all around the bar so you never miss a snap, pitch or puck. Browns, Buckeyes, Cavs, Guardians, if it's on, it's on here.",
  },
  {
    title: 'Breakfast All Day',
    blurb:
      'The kitchen runs breakfast all day, every day. The sausage, egg and cheese croissant has its own fan club, and the prices feel like a throwback.',
  },
  {
    title: 'Pool, Darts & Karaoke',
    blurb:
      'Pool tables with a Wednesday-night tournament, dart boards, and karaoke every Thursday. This is the kind of bar where you walk in a stranger and leave a regular.',
  },
]

// ---------------------------------------------------------------------------
// MENU. Kitchen favorites confirmed from the owner's listings and what
// regulars actually order. The full menu board changes with specials, so no
// printed prices here, the page points people to call or stop in.
// ---------------------------------------------------------------------------
export type MenuItem = { name: string; desc?: string; tag?: string }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }

export const menu: MenuGroup[] = [
  {
    title: 'Breakfast All Day',
    note: 'Yes, all day. The grill never switches off breakfast.',
    items: [
      {
        name: 'Sausage, Egg & Cheese Croissant',
        desc: 'The local legend. Griddled sausage, fried egg and melted cheese on a buttery croissant, a full-size breakfast that eats like home cooking.',
        tag: 'Fan Favorite',
      },
      {
        name: 'Classic Breakfast Plates',
        desc: 'Eggs your way with the usual suspects off the grill. Ask what the kitchen is running today.',
      },
    ],
  },
  {
    title: 'The Warmup',
    note: 'Starters built for sharing across the table.',
    items: [
      {
        name: 'The Sampler',
        desc: 'Chicken strips, fries, mozzarella sticks, onion rings and jalapeño poppers piled on one tray. The right call for a full table.',
        tag: 'Group Play',
      },
      { name: 'Fried Pickle Spears', desc: 'Breaded dill spears, fried crisp with a side of ranch.' },
      { name: 'Hush Puppies', desc: 'Golden-fried and full of flavor. A sleeper hit, regulars swear by them.' },
      { name: 'Mozzarella Sticks', desc: 'Fried to a crunch with marinara for dipping.' },
      { name: 'Basket of Fries', desc: 'Hot, crispy and made for the middle of the table.' },
    ],
  },
  {
    title: 'Main Event',
    note: 'Scratch-grill burgers and sandwiches at hometown prices.',
    items: [
      {
        name: 'The Grizzly Burger',
        desc: "The house signature, a grilled burger stacked with crispy salami. Who would've thought salami on a burger? One bite and you get it.",
        tag: 'House Signature',
      },
      { name: 'Pizza Burger', desc: 'A burger that thinks it is a pizza, sauce, melted cheese and that grill char.' },
      { name: 'Steak Philly', desc: 'Shaved steak with peppers, onions and melted cheese on a hoagie roll.' },
      { name: 'Wings', desc: 'Tossed in your pick, garlic parmesan and spicy dry rub lead the lineup.' },
    ],
  },
]

export const menuNote =
  'The menu board moves fast, daily specials, seasonal additions and some of the cheapest prices on the Southside. Call for today’s lineup.'

// ---------------------------------------------------------------------------
// Weekly specials & events, the standing calendar regulars plan around.
// ---------------------------------------------------------------------------
export type WeeklyEvent = {
  day: string
  title: string
  time?: string
  blurb: string
  accent: 'crimson' | 'gold' | 'navy'
}

export const weeklyEvents: WeeklyEvent[] = [
  {
    day: 'Tuesday',
    title: '$1 Beer Night',
    blurb: 'You read that right. Select beers are a buck, all night. Bring the whole crew.',
    accent: 'gold',
  },
  {
    day: 'Wednesday',
    title: 'Pool Tournament',
    time: '8:00 PM',
    blurb: 'Rack ‘em up. The weekly tournament draws the sharpest sticks in Wadsworth, winners stay on.',
    accent: 'navy',
  },
  {
    day: 'Thursday',
    title: 'Karaoke Night',
    time: '9:00 PM',
    blurb: 'Grab the mic and bring the house down. The most fun you can have on a Thursday in Wadsworth.',
    accent: 'crimson',
  },
  {
    day: 'Thursday',
    title: 'Ladies Night',
    time: '5:00 – 9:00 PM',
    blurb: 'Half-price drinks for the ladies before karaoke kicks off. The perfect warm-up act.',
    accent: 'crimson',
  },
]

// The Game Room, what's on the floor.
export const gameRoom = [
  {
    title: 'Pool Tables',
    blurb: 'Well-kept tables in the back, casual racks any night and a serious tournament every Wednesday at 8.',
  },
  {
    title: 'Darts',
    blurb: 'Boards ready for a casual round or a grudge match. Loser buys the next round.',
  },
  {
    title: 'TVs Everywhere',
    blurb: 'Screens around the whole bar with the game sound up when it matters. Catch every Browns, Buckeyes, Cavs and Guardians game.',
  },
]

// ---------------------------------------------------------------------------
// Reviews, real Google reviews (fallback + SEO). The live ReviewsCard
// refreshes these from the Places API at runtime.
// ---------------------------------------------------------------------------
export const ratingSummary = { value: '4.2', count: 213 }

export const reviews = [
  {
    name: 'Bryan Carpenter',
    rating: 5,
    quote:
      'Their sausage egg and cheese croissant, talk about grandma’s home cooked meal. Service is on point, they give you your money’s worth on everything. Come here and make family. I call it home base for a reason.',
  },
  {
    name: 'Thomas Kimmel',
    rating: 4,
    quote:
      'The hush puppies were something to ride home about, great flavor, and the grizzly burger was fantastic, who would’ve thunk salami on a burger. The biggest kicker is the prices, super cheap, which was wild for how good most of the food was.',
  },
  {
    name: 'Andrea Hall',
    rating: 4,
    quote:
      'Very pleasantly surprised with this bar. Super friendly people, great food, and really good prices. Thank you!',
  },
  {
    name: 'James Smiley',
    rating: 5,
    quote: 'Owner was awesome! Very good recently. I recommend it!',
  },
]
