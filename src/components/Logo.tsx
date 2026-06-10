import { Link } from 'wouter'

// KC's slab logo on the white header chrome (the artwork's own white plate
// blends right in, no chip needed).
export default function Logo({
  className = 'h-16',
}: {
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="KC's Sports Bar, home" className={`inline-flex ${className}`}>
      <img
        src="/images/logo-full.png"
        alt="KC's Sports Bar"
        width={600}
        height={600}
        className="h-full w-auto"
      />
    </Link>
  )
}
