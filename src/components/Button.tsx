import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'crimson' | 'gold' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 font-cond font-bold uppercase tracking-[0.16em] text-[13px] px-8 py-4 rounded transition-all'

const variants: Record<Variant, string> = {
  // Primary CTA, scoreboard red with the gold keyline
  crimson: 'bg-crimson text-on-crimson varsity-cta hover:bg-crimson-dark',
  // Solid gold (the "Book Your Table" treatment from the design)
  gold: 'bg-gold text-on-gold hover:bg-gold-dark',
  // Gold outline that fills on hover ("View Game Schedule")
  outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-on-gold',
  // Subtle light outline
  ghost: 'border border-chalk/35 text-chalk hover:border-chalk/70 hover:bg-chalk/8',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
}

export default function Button({ href, variant = 'crimson', children, className = '', external }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
