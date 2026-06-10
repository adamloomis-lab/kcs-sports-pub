import { Link } from 'wouter'
import { Phone, Mic2, Target, Tv, CalendarDays } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import { company, weeklyEvents, gameRoom, type WeeklyEvent } from '../data/site'

const accentClasses: Record<WeeklyEvent['accent'], string> = {
  crimson: 'border-crimson bg-crimson/10',
  gold: 'border-gold bg-gold/10',
  navy: 'border-navy-light bg-navy/40',
}
const accentText: Record<WeeklyEvent['accent'], string> = {
  crimson: 'text-crimson-light',
  gold: 'text-gold',
  navy: 'text-navy-light',
}

const gameRoomIcons = [Target, Mic2, Tv]

export default function Events() {
  return (
    <>
      {/* ------------------------------------------------ Header */}
      <section className="relative overflow-hidden border-b-2 border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-40 pb-16 text-center">
          <p className="kicker">Every week at KC's</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-display-lg">
            The Weekly <span className="gold-word">Lineup</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-chalk-dim">
            The standing calendar the regulars plan around. No tickets, no cover, just show up.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Weekly calendar */}
      <section className="container-x py-16 md:py-24">
        <div className="reveal-group grid gap-6 md:grid-cols-2">
          {weeklyEvents.map((e) => (
            <div
              key={e.day + e.title}
              className={`border-2 p-8 ${accentClasses[e.accent]} transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`font-cond text-label-lg font-bold uppercase tracking-[0.24em] ${accentText[e.accent]}`}
                >
                  {e.day}
                </span>
                {e.time && (
                  <span className="scoreboard px-3 py-1 text-sm text-gold">{e.time}</span>
                )}
              </div>
              <h2 className="mt-4 font-display text-headline-lg text-white md:text-[40px]">
                {e.title}
              </h2>
              <p className="mt-3 max-w-md text-body-md text-chalk-dim">{e.blurb}</p>
            </div>
          ))}
        </div>
        <p className="reveal mt-8 flex items-center justify-center gap-2 text-center text-sm text-chalk-faint">
          <CalendarDays size={15} className="text-gold" aria-hidden="true" />
          Game days bring their own specials. Follow us on{' '}
          <a
            href={company.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-2 hover:text-gold-dark"
          >
            Facebook
          </a>{' '}
          for what's on this week.
        </p>
      </section>

      {/* ------------------------------------------------ The Game Room */}
      <section className="border-y-2 border-line-soft bg-pitch-2 py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Game Room"
            title={
              <>
                Rack 'Em, Throw 'Em, <span className="gold-word">Watch 'Em</span>
              </>
            }
            intro="Pool in the back, darts on the wall, and a screen in every sightline."
          />
          <div className="reveal-group mt-12 grid gap-6 md:grid-cols-3">
            {gameRoom.map((g, i) => {
              const Icon = gameRoomIcons[i % gameRoomIcons.length]
              return (
                <div key={g.title} className="panel panel-hover rounded p-8">
                  <Icon size={32} className="text-gold" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-headline-md text-chalk">{g.title}</h3>
                  <p className="mt-3 text-body-md text-chalk-dim">{g.blurb}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Call CTA */}
      <section className="container-x py-20 text-center md:py-28">
        <h2 className="reveal font-display text-display-lg-mobile text-white md:text-[56px]">
          See You <span className="text-stroke-gold">Tonight?</span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-body-lg text-chalk-dim">
          Wondering what's on the screens or the specials board? One call answers everything.
        </p>
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={company.phoneHref} variant="crimson" className="px-10">
            <Phone size={16} /> Call {company.phone}
          </Button>
          <Button href="/contact" variant="outline">
            Hours &amp; Directions
          </Button>
        </div>
        <p className="reveal mt-6 text-sm uppercase tracking-[0.18em] text-chalk-faint">
          Or just <Link href="/contact" className="text-gold underline underline-offset-2">stop in</Link>, walk-ins always welcome
        </p>
      </section>
    </>
  )
}
