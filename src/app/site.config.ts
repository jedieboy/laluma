/**
 * Motion settings. These match the defaults from the design's "Tweaks" panel.
 */
export const SITE_CONFIG = {
  /** Multiplier for every parallax layer (0 = off, 2 = double). */
  parallaxStrength: 1,
  /** Whether the "Inside La Luma" image switcher advances on its own. */
  autoplay: true,
  /** Seconds between automatic slides (design range: 2–15). */
  autoplaySeconds: 5,
} as const;

export const PHONE = { href: 'tel:09984966388', label: '0998 496 6388' };
