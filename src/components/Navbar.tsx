import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  // Solid dark bar with the red rule once scrolled (or menu open);
  // translucent gradient over the hero.
  const solid = scrolled || open

  const linkBase =
    'font-cond text-[15px] font-bold uppercase tracking-[0.14em] px-2 py-2 transition-colors'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b-2 border-crimson bg-pitch/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/75 to-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between lg:h-24">
        <Logo className="h-14 lg:h-[4.5rem]" />

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${
                  active
                    ? 'border-b-2 border-crimson text-chalk'
                    : 'text-chalk-dim hover:text-gold'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 ${linkBase} text-chalk hover:text-gold`}
          >
            <Phone size={16} className="text-gold" /> {company.phone}
          </a>
          <Link
            href="/contact"
            className="varsity-cta inline-flex items-center rounded bg-crimson px-7 py-3.5 font-cond text-[13px] font-bold uppercase tracking-[0.14em] text-on-crimson transition-colors hover:bg-crimson-dark"
          >
            Plan Your Party
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-chalk lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line-soft bg-pitch lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-chalk-dim hover:bg-pitch-3 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded border-2 border-gold px-5 py-4 font-cond text-base font-bold uppercase tracking-[0.12em] text-gold"
            >
              <Phone size={18} /> {company.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded bg-crimson px-5 py-4 font-cond text-base font-bold uppercase tracking-[0.12em] text-on-crimson"
            >
              Plan Your Party
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
