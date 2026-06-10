import { Link } from 'wouter'
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react'
import Button from '../components/Button'
import Reviews from '../components/Reviews'
import { company, featurePillars, weeklyEvents } from '../data/site'

// Scrolling ticker items (duplicated in-render for the infinite loop).
const tickerItems = [
  { label: 'Open', value: 'EVERY DAY 10AM – 2:30AM' },
  { label: 'Tuesday', value: '$1 BEER NIGHT' },
  { label: 'Wednesday', value: 'POOL TOURNAMENT 8PM' },
  { label: 'Thursday', value: 'KARAOKE 9PM' },
  { label: 'Kitchen', value: 'BREAKFAST ALL DAY' },
]

function TickerRow() {
  return (
    <>
      {tickerItems.map((t) => (
        <div key={t.label + t.value} className="flex shrink-0 items-center gap-4">
          <span className="font-cond text-label-lg font-bold uppercase tracking-[0.2em] text-white/80">
            {t.label}
          </span>
          <span className="bg-pitch-deep px-3 py-1 font-cond font-bold tracking-[0.1em] text-gold">
            {t.value}
          </span>
        </div>
      ))}
    </>
  )
}

export default function Home() {
  const tonight = weeklyEvents[2] // Karaoke Thursday, the marquee weekly event

  return (
    <>
      {/* ------------------------------------------------ Hero */}
      <section className="hero-clip relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-pour.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        </div>

        <div className="container-x relative z-10 max-w-5xl pt-32 pb-24">
          <span className="badge-chip rise rise-1">Live Game Day Atmosphere</span>
          <h1 className="rise rise-2 mt-6 font-display text-[13vw] uppercase leading-[0.92] text-white sm:text-[64px] lg:text-display-xl">
            The Best Seats
            <br />
            <span className="gold-word">In Wadsworth</span>
          </h1>
          <p className="rise rise-3 mt-8 max-w-xl text-body-lg text-chalk-dim">
            Great food hot off the grill, pool, darts and karaoke, and every game on the screens.
            The best place in Wadsworth to hang out and feel right at home.
          </p>
          <div className="rise rise-4 mt-10 flex flex-wrap gap-4">
            <Button href={company.phoneHref} variant="crimson">
              <Phone size={16} /> {company.phone}
            </Button>
            <Button href="/events" variant="outline">
              See What's On This Week
            </Button>
          </div>
          <p className="rise rise-5 mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-chalk-faint">
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-gold" /> Open every day 10am – 2:30am
            </span>
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-chalk"
            >
              <MapPin size={15} className="text-gold" /> {company.addressOneLine}
            </a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Scoreboard ticker */}
      <div
        className="overflow-hidden border-y-4 border-pitch-deep bg-crimson py-3.5"
        aria-label="This week at KC's"
      >
        <div className="ticker flex w-max items-center gap-12 pr-12">
          <TickerRow />
          <TickerRow />
        </div>
      </div>

      {/* ------------------------------------------------ Menu + tonight bento */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-12">
          <div className="reveal group relative min-h-[420px] overflow-hidden rounded border-2 border-line-soft md:col-span-8">
            <video
              className="absolute inset-0 h-full w-full object-cover object-[center_80%] transition-transform duration-700 group-hover:scale-105"
              src="/videos/burger-grill.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/55 to-transparent"
              aria-hidden="true"
            />
            <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
              <h2 className="font-display text-headline-lg text-white md:text-[44px]">
                Legendary <span className="text-crimson-light">Eats</span>
              </h2>
              <p className="mt-4 max-w-md text-body-md text-chalk-dim">
                The kitchen doesn't play games. Try the signature Grizzly Burger, the wings, or a
                breakfast croissant at any hour, all at prices that feel like a throwback.
              </p>
              <Link
                href="/menu"
                className="mt-6 inline-flex items-center gap-2 font-cond text-label-lg font-bold uppercase tracking-[0.2em] text-gold hover:underline"
              >
                Full Menu <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="reveal flex flex-col md:col-span-4">
            <div className="flex h-full flex-col justify-between border-2 border-crimson-light/40 bg-crimson p-8">
              <div>
                <span className="font-cond text-label-lg font-bold uppercase tracking-[0.2em] text-white/70">
                  {tonight.day} Night
                </span>
                <h3 className="mt-2 font-display text-headline-lg uppercase leading-none text-white md:text-[40px]">
                  Karaoke
                  <br />
                  Night
                </h3>
                <div className="scoreboard mt-6 p-4 text-sm text-white">
                  <div className="mb-2 flex justify-between gap-4 border-b border-white/20 pb-2">
                    <span>Starts</span>
                    <span className="whitespace-nowrap">9:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Cover</span>
                    <span>Free</span>
                  </div>
                </div>
              </div>
              <Link
                href="/events"
                className="mt-8 w-full bg-white py-4 text-center font-cond text-label-lg font-bold uppercase tracking-[0.2em] text-crimson transition-colors hover:bg-gold hover:text-on-gold"
              >
                The Weekly Lineup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Pillars */}
      <section className="border-y-2 border-line-soft bg-pitch-2 py-20 md:py-24">
        <div className="container-x">
          <div className="reveal mx-auto max-w-2xl text-center">
            <p className="kicker">The Social Hub</p>
            <h2 className="mt-4 font-display text-headline-lg text-chalk md:text-[44px]">
              Not Just For <span className="gold-word">The Big Game</span>
            </h2>
            <span className="gold-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="reveal-group mt-12 grid gap-6 md:grid-cols-3">
            {featurePillars.map((p) => (
              <div key={p.title} className="panel panel-hover rounded p-8">
                <h3 className="font-display text-headline-md text-gold">{p.title}</h3>
                <p className="mt-4 text-body-md text-chalk-dim">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Reviews */}
      <Reviews />

      {/* ------------------------------------------------ CTA */}
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="container-x relative z-10">
          <h2 className="reveal font-display text-display-lg-mobile uppercase text-white md:text-display-lg">
            Ready For
            <br />
            <span className="text-stroke-gold">Kickoff?</span>
          </h2>
          <div className="reveal mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">
            <Button href={company.phoneHref} variant="crimson" className="px-12 py-6">
              <Phone size={16} /> Call {company.phone}
            </Button>
            <p className="text-body-lg uppercase tracking-[0.2em] text-chalk-dim">
              Walk-ins always welcome
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
