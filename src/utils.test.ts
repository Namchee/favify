import { getFilenameFromPath, getMIMEType } from './utils';

describe('getFilenameFromPath', () => {
  it('should return the filename from path string', () => {
    const path = 'foo/bar/baz.png';
    const name = getFilenameFromPath(path);

    expect(name).toBe('baz.png');
  });

  it('should return the filename from filename string', () => {
    const path = 'baz.png';
    const name = getFilenameFromPath(path);

    expect(name).toBe('baz.png');
  })
});

describe('getMIMEType', () => {
  it('should return the MIME type correctly', () => {
    const name = 'bar.png';
    const mime = getMIMEType(name);

    expect(mime).toBe('image/png');
  });

  it('should return empty string', () => {
    const path = 'baz.webp';
    const name = getMIMEType(path);

    expect(name).toBe('');
  })
});
