import { Link } from 'wouter'

// KC's slab logo. The artwork lives on a white plate (navy/red lettering needs
// the light ground), so it sits in a small white chip on the dark chrome.
export default function Logo({
  className = 'h-12',
}: {
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="KC's Sports Bar, home" className={`inline-flex ${className}`}>
      <img
        src="/images/logo-full.png"
        alt="KC's Sports Bar"
        width={1254}
        height={1254}
        className="h-full w-auto rounded bg-white p-1"
      />
    </Link>
  )
}
