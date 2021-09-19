const mimeTypes: Record<string, string> = {
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml',
};

/**
 * Get filename from a path string.
 *
 * @param {string} name path
 * @returns {string} filename without path
 */
export function getFilenameFromPath(name: string): string {
  return name.split('/').pop() as string;
}

/**
 * Get MIME type from a filename
 *
 * @param {string} name filename
 * @returns {string} MIME type of the filename if it's common, empty otherwise
 */
export function getMIMEType(name: string): string {
  const ext = name.split('.').pop() as string;
  return ext in mimeTypes ? mimeTypes[ext] : '';
}
