import { Menu, X } from 'lucide-react'

export default function Navbar({ navItems, menuOpen, setMenuOpen, scrolled }) {
  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="main-nav container">
        <a href="#home" className="brand-mark" aria-label="A&M Graphic Designers home">
          <span className="brand-word">A&amp;M</span>
          <span className="brand-sub">Graphic Designers</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'shown' : ''}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.path} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Let&apos;s Talk
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  )
}
