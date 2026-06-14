import { Phone } from 'lucide-react'
import Button from '../components/Button'
import { company, menu, menuNote } from '../data/site'

const sectionAccent = ['border-gold', 'border-crimson', 'border-navy-light']

export default function Menu() {
  return (
    <>
      {/* ------------------------------------------------ Header */}
      <section className="relative overflow-hidden border-b-2 border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-40 pb-16 text-center">
          <div
            className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none opacity-[0.06]"
            aria-hidden="true"
          >
            <span className="font-display text-[24vw] uppercase leading-none text-chalk md:text-[180px]">
              Champions
            </span>
          </div>
          <h1 className="relative z-10 font-display text-display-lg-mobile italic tracking-widest text-gold md:text-display-lg">
            The Playbook
          </h1>
          <p className="mt-4 font-cond text-label-lg font-bold uppercase tracking-[0.3em] text-chalk-faint">
            Fuel for the fanatic • Breakfast all day
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ Specials banner */}
      <section className="container-x mt-14">
        <div className="reveal relative overflow-hidden bg-crimson p-3 md:p-6">
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 border-4 border-crimson-dark p-8 md:flex-row">
            <div className="text-center md:text-left">
              <span className="badge-chip !bg-gold !text-on-gold not-italic">Weekly Specials</span>
              <h2 className="mt-4 font-display text-headline-lg uppercase text-white md:text-[40px]">
                $1.50 Beer Tuesdays
              </h2>
              <p className="mt-2 text-body-lg text-white/85">
                Plus ladies night Thursday 5–9 with half-price drinks. Ask the bar what else is on
                special tonight.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="min-w-[120px] border-2 border-gold bg-pitch/40 p-6 text-center backdrop-blur-md">
                <span className="block font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Tue Beers
                </span>
                <span className="block font-display text-headline-lg text-white">$1.50</span>
              </div>
              <div className="min-w-[120px] border-2 border-gold bg-pitch/40 p-6 text-center backdrop-blur-md">
                <span className="block font-cond text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Thu Ladies
                </span>
                <span className="block font-display text-headline-lg text-white">1/2 Off</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Menu groups */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {menu.map((group, gi) => (
            <div
              key={group.title}
              className={`reveal panel border-t-4 ${sectionAccent[gi % sectionAccent.length]} p-8`}
            >
              <h2 className="font-display text-headline-lg text-chalk">{group.title}</h2>
              {group.note && <p className="mt-2 text-sm text-chalk-faint">{group.note}</p>}
              <div className="mt-8 space-y-8">
                {group.items.map((it) => (
                  <div key={it.name} className="group">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-cond text-headline-sm font-bold uppercase text-navy-light transition-colors group-hover:text-gold">
                        {it.name}
                      </h3>
                      {it.tag && (
                        <span className="bg-crimson px-2 py-0.5 font-cond text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                          {it.tag}
                        </span>
                      )}
                    </div>
                    {it.desc && (
                      <p className="mt-2 border-l-2 border-line pl-4 text-sm text-chalk-dim">
                        {it.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-14 max-w-2xl border-2 border-gold/50 bg-pitch-2 p-8 text-center">
          <h2 className="font-display text-headline-md text-gold">Today's Board</h2>
          <p className="mt-3 text-body-md text-chalk-dim">{menuNote}</p>
          <div className="mt-6 flex justify-center">
            <Button href={company.phoneHref} variant="crimson">
              <Phone size={16} /> {company.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
