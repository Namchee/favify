import fetch from 'node-fetch';
import { load } from 'cheerio';

import { getFilenameFromPath, getMIMEType } from './utils.js';
import type { Favicon, Manifest } from './types.js';

/**
 * Fetch all functional favicons from a webpage.
 *
 * @param {string} url Webpage's URL
 * @param {Headers} headers request headers
 * @returns {Promise<Favicon[]>} List of favicons in input webpage
 */
export async function fetchFavicons(
  url: string,
  headers?: Headers,
): Promise<Favicon[]> {
  if (!url.match(/^https?:\/\//)) {
    url = `https://${url}`;
  }

  const head = new Headers(headers);
  head.set('Accept', 'text/html');

  const response = await fetch(url, {
    method: 'GET',
    headers: head,
  });

  const body = await response.text();
  const { origin } = new URL(url);

  return Promise.all([
    getFaviconsFromDocument(body, origin),
    getFaviconsFromManifest(body, origin, head),
  ]).then(res => res.flat());
}

/**
 * Get all favicons from a document string
 *
 * @param {string} body document body
 * @param {string} base source URL
 * @returns {Favicon[]} list of favicons
 */
function getFaviconsFromDocument(body: string, base: string): Favicon[] {
  const dom = load(body)
  const els = dom('link[rel*="icon"]');

  const favicons: Favicon[] = [];

  for (const icon of els) {
    const href = icon.attribs['href'];
    const sizes = icon.attribs['sizes'];

    favicons.push({
      name: getFilenameFromPath(href),
      path: new URL(href, base).toString(),
      type: icon.attribs['type'] || getMIMEType(href),
      size: sizes ? Number(sizes.match(/\d+/)) : undefined,
    });
  }

  return favicons;
}

/**
 * Get all favicons from a web manifest
 *
 * @param {string} body document body
 * @param {string} base source URL
 * @param {Headers} headers request header
 * @returns {Promise<Favicon[]>} list of favicons
 */
async function getFaviconsFromManifest(
  body: string,
  base: string,
  headers: Headers,
): Promise<Favicon[]> {
  const dom = load(body);
  const man = dom('link[rel=manifest]');

  if (!man) {
    return [];
  }

  const name = man.attr('href') as string;
  headers.set('Accept', 'application/manifest+json');
  const manifest = await fetch(new URL(name, base).toString(), {
    method: 'GET',
    headers,
  });
  const { icons } = (await manifest.json()) as Manifest;

  return icons.map(({ src, type, sizes }) => {
    return {
      name: getFilenameFromPath(src),
      path: new URL(src, base).toString(),
      type: type || getMIMEType(src),
      size: sizes ? Number(sizes.match(/\d+/)) : undefined,
    };
  });
}
