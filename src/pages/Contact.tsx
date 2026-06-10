import { useState } from 'react'
import { MapPin, Phone, Facebook, Instagram, Plus, Clock } from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'
import Button from '../components/Button'

// Interactive FAQ accordion, each question expands in place.
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={f.q} className="panel overflow-hidden rounded">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-pitch-4 sm:p-6"
            >
              <span className="font-display text-headline-sm uppercase text-chalk">{f.q}</span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson text-on-crimson transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                <Plus size={20} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="border-t-2 border-line-soft px-5 py-5 text-body-md text-chalk-dim sm:px-6">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Contact() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden border-b-2 border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-44 pb-16 text-center">
          <p className="kicker">On Main Street, Wadsworth</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            Visit &amp; Contact
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-chalk-dim">
            Find us on the south end of Main Street. The best way to reach us is a phone call, or
            just walk in, the door's open until 2:30am every night.
          </p>
        </div>
      </section>

      {/* ---------- CALL CTA ---------- */}
      <section className="container-x py-16 md:py-20">
        <div className="reveal mx-auto max-w-3xl border-2 border-crimson bg-pitch-2 p-10 text-center md:p-14">
          <p className="kicker">One number does it all</p>
          <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[44px]">
            Give The Bar A Ring
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-md text-chalk-dim">
            Today's specials, what's on the kitchen board, who's playing on the big screens, the
            bar has the answer.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={company.phoneHref} variant="crimson" className="px-12 py-6 text-[16px]">
              <Phone size={20} /> {company.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- DETAILS + HOURS ---------- */}
      <section className="pb-16 md:pb-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          {/* Details */}
          <div className="reveal">
            <p className="kicker">Our Location</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk">{company.address.street}</h2>
            <span className="gold-rule mt-5 block w-[72px]" />

            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={22} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={company.mapsDir}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk-dim hover:text-gold"
                >
                  {company.addressOneLine}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={22} className="mt-0.5 shrink-0 text-gold" />
                <a href={company.phoneHref} className="text-chalk-dim hover:text-gold">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Facebook size={22} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk-dim hover:text-gold"
                >
                  K.C.'s Sports Pub on Facebook
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Instagram size={22} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk-dim hover:text-gold"
                >
                  @kcs_sports_pub
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Clock size={22} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-chalk-dim">
                  Takeout available, call ahead and it's ready when you are
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="reveal">
            <p className="kicker">Hours</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk">Open Late, Every Day</h2>
            <span className="gold-rule mt-5 block w-[72px]" />
            <div className="panel mt-8 rounded p-5">
              <HoursList />
              <p className="mt-3 px-3 pb-1 text-[14px] uppercase tracking-[0.14em] text-chalk-faint">
                Kitchen serves breakfast all day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-y-2 border-line-soft">
        <iframe
          title="Map to KC's Sports Bar, 346 Main St, Wadsworth OH"
          src={company.mapsEmbed}
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="reveal text-center">
            <p className="kicker">Good to know</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk md:text-[40px]">
              Questions, Answered
            </h2>
            <span className="gold-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="reveal mt-10">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  )
}
