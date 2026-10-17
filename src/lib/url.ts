/** Internal links must also work under a GitHub Pages repository subpath. */
export function sitePath(path = '/') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
