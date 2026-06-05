export const MAX_FAVORITES = 12

export const FAVORITE_CAP_MESSAGE =
  'Favorites full (12 max). Remove one to add another.'

/**
 * Toggle favorite with UI feedback. Unfavorite always runs; adding returns false at cap.
 */
export function favoriteCap(
  isFavorite: boolean,
  buildId: string,
  toggle: (id: string) => boolean,
): string | undefined {
  if (isFavorite) {
    toggle(buildId)
    return undefined
  }
  return toggle(buildId) ? undefined : FAVORITE_CAP_MESSAGE
}