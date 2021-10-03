/**
 * Represents single usable favicon
 */
export interface Favicon {
  // favicon file name
  name: string;
  // absolute URL path to the favicon
  path: string;
  // MIME type
  type: string;
  // favicon size
  size?: number;
}

/**
 * Web manifest file definition
 */
export interface Manifest {
  icons: {
    src: string;
    type: string;
    sizes: string;
    purpose: string;
  }[];
}
