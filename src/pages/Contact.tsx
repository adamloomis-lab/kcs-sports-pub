import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, MessageSquare, Facebook, Instagram, Check, Plus } from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'

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

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'party-inquiry', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
      setSent(true)
      form.reset()
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  const field =
    'w-full rounded border-2 border-line-soft bg-pitch-2 px-4 py-3.5 text-body-md text-chalk placeholder:text-chalk-faint focus:border-gold focus:outline-none'

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden border-b-2 border-line-soft bg-pitch-deep">
        <div className="container-x relative z-10 pt-40 pb-16 text-center">
          <p className="kicker">On Main Street, Wadsworth</p>
          <h1 className="mt-3 font-display text-display-lg-mobile text-chalk md:text-[56px]">
            Visit &amp; Contact
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-chalk-dim">
            Find us on the south end of Main Street. Call ahead, send a party inquiry, or just walk
            in, the door's open until 2:30am every night.
          </p>
        </div>
      </section>

      {/* ---------- DETAILS + FORM ---------- */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          {/* Details */}
          <div className="reveal">
            <p className="kicker">Our Location</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk">{company.address.street}</h2>
            <span className="gold-rule mt-5 block w-[72px]" />

            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold" />
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
                <Phone size={20} className="mt-0.5 shrink-0 text-gold" />
                <a href={company.phoneHref} className="text-chalk-dim hover:text-gold">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MessageSquare size={20} className="mt-0.5 shrink-0 text-gold" />
                <a href={company.smsHref} className="text-chalk-dim hover:text-gold">
                  Text us at {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Facebook size={20} className="mt-0.5 shrink-0 text-gold" />
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
                <Instagram size={20} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chalk-dim hover:text-gold"
                >
                  @kcs_sports_pub
                </a>
              </li>
            </ul>

            <div className="panel mt-10 rounded p-5">
              <h3 className="px-3 font-cond text-headline-sm font-bold uppercase text-gold">Hours</h3>
              <HoursList className="mt-3" />
              <p className="mt-3 px-3 pb-1 text-[13px] uppercase tracking-[0.14em] text-chalk-faint">
                Kitchen serves breakfast all day
              </p>
            </div>
          </div>

          {/* Party inquiry form */}
          <div className="reveal" ref={formCardRef}>
            <p className="kicker">Plan Your Party</p>
            <h2 className="mt-3 font-display text-headline-lg text-chalk">Book The Bar Vibes</h2>
            <span className="gold-rule mt-5 block w-[72px]" />
            <p className="mt-5 text-body-md text-chalk-dim">
              Birthdays, watch parties, league banquets, tell us the date and the headcount and
              we'll get back to you. For tonight, just call{' '}
              <a href={company.phoneHref} className="text-gold underline underline-offset-2">
                {company.phone}
              </a>
              .
            </p>

            {sent ? (
              <div className="panel mt-8 rounded border-gold/60 p-8 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-on-gold">
                  <Check size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-headline-md text-chalk">
                  Thanks{firstName ? `, ${firstName}` : ''}!
                </h3>
                <p className="mt-3 text-body-md text-chalk-dim">
                  Your inquiry is in. We'll get back to you shortly, or call us anytime at{' '}
                  <a href={company.phoneHref} className="text-gold underline underline-offset-2">
                    {company.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                name="party-inquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={onSubmit}
                className="mt-8 space-y-4"
              >
                <input type="hidden" name="form-name" value="party-inquiry" />
                <p className="hidden">
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input className={field} type="text" name="name" placeholder="Your name *" required />
                  </label>
                  <label className="block">
                    <span className="sr-only">Phone</span>
                    <input className={field} type="tel" name="phone" placeholder="Phone *" required />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Email</span>
                  <input className={field} type="email" name="email" placeholder="Email" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="sr-only">Date</span>
                    <input className={field} type="text" name="date" placeholder="Date you have in mind" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Party size</span>
                    <input className={field} type="text" name="party-size" placeholder="How many people?" />
                  </label>
                </div>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea
                    className={`${field} min-h-32`}
                    name="message"
                    placeholder="What are you planning? *"
                    required
                  />
                </label>
                {error && (
                  <p className="text-sm text-error">
                    Something went wrong sending your message. Please try again, or call us at{' '}
                    {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  className="varsity-cta w-full rounded bg-crimson px-8 py-4 font-cond text-[13px] font-bold uppercase tracking-[0.16em] text-on-crimson transition-colors hover:bg-crimson-dark"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-y-2 border-line-soft">
        <iframe
          title="Map to KC's Sports Bar, 346 Main St, Wadsworth OH"
          src={company.mapsEmbed}
          className="h-[420px] w-full grayscale-[35%] contrast-[1.05]"
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
