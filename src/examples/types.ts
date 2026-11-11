import type { StageDiagram, StageId } from '../diagrams'

/** A logo image with its display size in px (from Figma). */
export type Logo = { src: string; width: number; height: number; alt: string }

/**
 * A hover area on a stage diagram that opens a popover.
 * Positions are in Figma diagram pixels (the shared diagrams are 848px wide).
 */
export type Hotspot = {
  id: string
  x: number
  y: number
  width: number
  height: number
  title: string
  body: string
  /** Popover width in px. */
  popoverWidth: number
  /** Which side of the hover area the popover opens on. Default: top. */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Default: start. */
  align?: 'start' | 'center' | 'end'
}

/** Everything about one demo use case. Each lives in `src/examples/<id>/index.ts`. */
export type Example = {
  /** URL slug: the detail page is `/examples/<id>`. Use the folder name. */
  id: string
  title: string
  description: string
  /** Card image shown on the Examples grid. */
  cardImage: string
  /** Set when the card image is letterboxed on a solid colour instead of filling the frame. */
  cardImageBackground?: string
  /** Partner logo(s) shown above the card title. */
  partnerLogos: Logo[]
  /**
   * Set to true once the use case has a detail page. Without it, the card and
   * the Examples menu entry are shown but don't link anywhere.
   */
  hasPage?: boolean
  /** Partner logo(s) shown at the top left of the detail page. */
  pageLogos?: Logo[]
  /** Hover popovers per stage on the detail page. */
  popovers?: Partial<Record<StageId, Hotspot[]>>
  /** Replace a shared diagram with a use-case-specific one. */
  diagrams?: Partial<Record<StageId, StageDiagram>>
}
