import { describe, it, expect } from 'vitest';
import { MAX_IMAGE_BYTES, fileToImageData } from './image.js';

describe('MAX_IMAGE_BYTES', () => {
  it('equals exactly 5 * 1024 * 1024 = 5242880', () => {
    expect(MAX_IMAGE_BYTES).toBe(5 * 1024 * 1024);
    expect(MAX_IMAGE_BYTES).toBe(5242880);
  });
});

describe('fileToImageData', () => {
  it('is a function', () => {
    expect(typeof fileToImageData).toBe('function');
  });

  it('returns a Promise', () => {
    // FileReader is not available in Node environment, so we just verify
    // that calling it returns a Promise object (it will reject without FileReader)
    const fakeFile = { type: 'image/png' };
    const result = fileToImageData(fakeFile);
    expect(result).toBeInstanceOf(Promise);
    // Suppress unhandled rejection from the missing FileReader in Node
    result.catch(() => {});
  });
});
