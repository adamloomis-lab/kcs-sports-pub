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

  // White chrome so the navy/red logo pops; red rule + shadow once scrolled.
  const linkBase =
    'font-cond text-[16px] font-bold uppercase tracking-[0.12em] px-2 py-2 transition-colors'

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b-4 border-crimson bg-paper transition-shadow duration-300 ${
        scrolled || open ? 'shadow-[0_4px_24px_rgba(6,13,31,0.35)]' : ''
      }`}
    >
      <nav className="container-x flex h-24 items-center justify-between lg:h-32">
        <Logo className="h-20 lg:h-28" />

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${
                  active
                    ? 'border-b-4 border-crimson text-crimson'
                    : 'text-ink hover:text-crimson'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className="varsity-cta ml-2 inline-flex items-center gap-2 rounded bg-crimson px-7 py-3.5 font-cond text-[15px] font-bold uppercase tracking-[0.12em] text-on-crimson transition-colors hover:bg-crimson-dark"
          >
            <Phone size={17} /> {company.phone}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={34} /> : <Menu size={34} />}
        </button>
      </nav>

      {open && (
        <div className="border-t-2 border-ink/10 bg-paper lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-4 font-cond text-lg font-bold uppercase tracking-[0.14em] text-ink hover:text-crimson"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded bg-crimson px-5 py-4 font-cond text-base font-bold uppercase tracking-[0.12em] text-on-crimson"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
