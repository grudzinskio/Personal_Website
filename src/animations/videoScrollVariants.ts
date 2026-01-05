/**
 * Video Scroll Animation Variants
 * 
 * Typed animation configurations for scroll-driven video effects.
 * These variants define the relationship between scroll progress and visual properties.
 */

/**
 * Opacity Transform Configuration
 * 
 * Maps scroll progress (0-1) to opacity values:
 * - 0.0-0.2: Fade in (0 → 1) as video enters viewport
 * - 0.2-0.8: Full visibility while scrolling through content
 * - 0.8-1.0: Fade out (1 → 0) as video exits viewport
 * 
 * Intent: Smooth, predictable transitions that feel data-driven
 */
export const opacityScrollMap = {
  input: [0, 0.2, 0.8, 1] as const,
  output: [0, 1, 1, 0] as const,
};

/**
 * Scale Transform Configuration
 * 
 * Maps scroll progress (0-1) to scale values:
 * - 0.0-0.5: Subtle zoom in (1.0 → 1.05)
 * - 0.5-1.0: Subtle zoom out (1.05 → 1.0)
 * 
 * Intent: Adds depth and dimensionality without being distracting
 * The scale change is minimal (5%) to maintain a calm, professional feel
 */
export const scaleScrollMap = {
  input: [0, 0.5, 1] as const,
  output: [1, 1.05, 1] as const,
};

/**
 * Alternative: More Aggressive Scale (Optional)
 * 
 * For a more pronounced effect if needed.
 * Use this variant if you want the video to feel more dynamic.
 */
export const scaleScrollMapAggressive = {
  input: [0, 0.5, 1] as const,
  output: [0.95, 1.1, 0.95] as const,
};

/**
 * Container Height Configuration
 * 
 * Defines how tall the scroll container should be.
 * Taller = slower video transition, more time to appreciate the video
 */
export const containerHeights = {
  short: '200vh',
  medium: '300vh',
  long: '400vh',
} as const;

/**
 * Scroll Offset Configuration
 * 
 * Defines when scroll tracking starts and ends relative to viewport
 * ["start end", "end start"] = track from when section enters bottom to when it exits top
 */
export const scrollOffsets = {
  fullTravel: ["start end", "end start"] as const,
  earlyStart: ["start bottom", "end top"] as const,
  lateStart: ["start center", "end top"] as const,
} as const;

/**
 * Type Definitions
 */
export type OpacityScrollMap = typeof opacityScrollMap;
export type ScaleScrollMap = typeof scaleScrollMap;
export type ContainerHeight = keyof typeof containerHeights;
export type ScrollOffset = keyof typeof scrollOffsets;

/**
 * Default Configuration
 * 
 * Recommended settings for a calm, intentional video experience
 */
export const defaultVideoScrollConfig = {
  opacity: opacityScrollMap,
  scale: scaleScrollMap,
  containerHeight: containerHeights.medium,
  scrollOffset: scrollOffsets.fullTravel,
  inViewThreshold: 0.3, // 30% of section must be visible to play video
} as const;
