import { useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Anchor, AppBar, HorizontalNav, Menu } from '@nvidia/foundations-react-core'
import nvidiaLogo from '../assets/nvidia-logo.svg'
import { exampleHref, examples } from '../examples'

/** Which top-level nav item matches the current route. */
function navValueFor(pathname: string) {
  if (pathname === '/' || pathname.startsWith('/examples')) return 'examples'
  if (pathname.startsWith('/introduction')) return 'introduction'
  if (pathname.startsWith('/cta')) return 'cta'
  return undefined
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const navValue = navValueFor(pathname)

  return (
    <div className="flex min-h-screen flex-col bg-background-default">
      <AppBar
        className="sticky top-0 z-10"
        slotStart={
          <>
            <img src={nvidiaLogo} alt="NVIDIA" width={24.7} height={16} />
            {/* Larger than Kaizen's default so it reads from a distance (design: 24px bold). */}
            <Anchor asChild kind="standalone" textKind="inherit" className="text-24 font-bold">
              <Link to="/">Post-Training Demo Library</Link>
            </Anchor>
          </>
        }
      >
        <div className="ml-auto">
          <PrimaryNav value={navValue} />
        </div>
      </AppBar>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}

/**
 * Examples / Introduction / CTA. Hovering "Examples" opens a menu of the six
 * examples; clicking "Examples" itself goes to the examples grid.
 */
function PrimaryNav({ value }: { value?: string }) {
  // Where to draw the menu: just below the "Examples" item, in viewport coordinates.
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const openMenu = (target: HTMLElement) => {
    window.clearTimeout(closeTimer.current)
    const rect = target.getBoundingClientRect()
    setMenuPos({ left: rect.left, top: rect.bottom })
  }
  // A short delay lets the pointer travel from the nav item into the menu.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMenuPos(null), 120)
  }

  const itemClass = 'text-20'

  return (
    <>
      <HorizontalNav
        value={value}
        items={[
          {
            value: 'examples',
            href: '/',
            children: 'Examples',
            className: itemClass,
            'aria-haspopup': 'menu',
            'aria-expanded': menuPos !== null,
            onPointerEnter: (e) => openMenu(e.currentTarget),
            onPointerLeave: scheduleClose,
            onFocus: (e) => openMenu(e.currentTarget),
          },
          { value: 'introduction', href: '/introduction', children: 'Introduction', className: itemClass },
          { value: 'cta', href: '/cta', children: 'CTA', className: itemClass },
        ]}
        renderLink={({ href, ...item }) => <Link to={href} {...item} />}
      />
      {/* Portaled so the App Bar doesn't clip it. */}
      {menuPos !== null &&
        createPortal(
          <ExamplesMenu
            position={menuPos}
            onPointerEnter={() => window.clearTimeout(closeTimer.current)}
            onPointerLeave={scheduleClose}
            onClose={() => setMenuPos(null)}
          />,
          document.body,
        )}
    </>
  )
}

function ExamplesMenu({
  position,
  onPointerEnter,
  onPointerLeave,
  onClose,
}: {
  position: { left: number; top: number }
  onPointerEnter: () => void
  onPointerLeave: () => void
  onClose: () => void
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div
      className="fixed z-50 w-[220px] rounded-md border border-base bg-surface-overlay shadow-lg"
      style={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onPointerLeave()
      }}
    >
      <Menu
        items={examples.map((example) => {
          const href = exampleHref(example)
          const current = href !== undefined && pathname.startsWith(href)
          return {
            id: example.id,
            children: example.title,
            // Examples without a page yet stay in the list but don't navigate.
            onSelect: () => {
              if (!href) return
              onClose()
              navigate(href)
            },
            attributes: {
              MenuItem: current
                ? { 'aria-current': 'page' as const, className: 'bg-white/10' }
                : {},
            },
          }
        })}
      />
    </div>
  )
}
