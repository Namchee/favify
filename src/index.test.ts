import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { fetchFavicons } from './index';

const server = setupServer(
  rest.get('http://www.foo.com', (req, res, ctx) => {
    ctx.status(200);
    ctx.set('Content-Type', 'text/html');

    return res(ctx.text(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Test document</title>
      <link rel="icon" href="/favicon.ico" sizes="any">
      <link rel="icon" sizes="32x32" href="/icon.png" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml">
      <link rel="apple-touch-icon" href="/gambar-apel.png">
    </head>
    <body>
      Test page
    </body>
    </html>    
    `))
  }),
  rest.get('http://www.foo.com/manifest.webmanifest', (req, res, ctx) => {
    ctx.status(200);
    ctx.set('Content-Type', 'application/manifest+json');

    return res(ctx.json({
      "icons": [
        { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
        { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" }
      ]
    }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchFavicons()', () => {
  it('should return a set of favicons', async () => {
    const favicons = await fetchFavicons('http://www.foo.com/');

    expect(favicons.length).toBe(4);
    expect(favicons).toContain(
      { name: 'favicon.ico', path: 'http://foo.com/favicon.ico', type: 'image/x-icon', sizes: undefined },
    );
    expect(favicons).toContain(
      { name: 'icon.png', path: 'http://foo.com/icon.png', type: 'image/png', sizes: 32 },
    );
    expect(favicons).toContain(
      { name: 'icon.svg', path: 'http://foo.com/icon.svg', type: 'image/svg+xml', sizes: undefined },
    );
    expect(favicons).toContain(
      { name: 'gambar-apel.png', path: 'http://foo.com/gambar-apel.png', type: 'image/png', sizes: undefined },
    );
  });
});
