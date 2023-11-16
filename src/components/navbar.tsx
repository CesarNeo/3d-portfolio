'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
  const pathname = usePathname()

  return (
    <header className="header">
      <Link
        href="/"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold shadow-md"
      >
        <span className="blue-gradient_text">CE</span>
      </Link>

      <nav className="flex gap-7 text-lg font-medium">
        <Link
          href="/about"
          data-active={pathname === '/about'}
          className="text-black data-[active=true]:text-blue-500"
        >
          About
        </Link>
        <Link
          href="/projects"
          data-active={pathname === '/projects'}
          className="text-black data-[active=true]:text-blue-500"
        >
          Projects
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
