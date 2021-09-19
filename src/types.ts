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
 * Fetcher configuration
 */
export interface FetcherConfig {
  // user agent string to be used
  userAgent?: string;
  // referrer to be user
  referrer?: string;
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
