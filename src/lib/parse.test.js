import { describe, it, expect } from 'vitest';
import { parseJSONLoose } from './parse.js';

describe('parseJSONLoose', () => {
  it('returns object for valid JSON', () => {
    const result = parseJSONLoose('{"flirt":"a","normal":"b","cool":"c"}');
    expect(result).toEqual({ flirt: 'a', normal: 'b', cool: 'c' });
  });

  it('strips markdown code fences and returns object', () => {
    const result = parseJSONLoose('```json\n{"flirt":"a","normal":"b","cool":"c"}\n```');
    expect(result).toEqual({ flirt: 'a', normal: 'b', cool: 'c' });
  });

  it('strips plain code fences and returns object', () => {
    const result = parseJSONLoose('```\n{"flirt":"a","normal":"b","cool":"c"}\n```');
    expect(result).toEqual({ flirt: 'a', normal: 'b', cool: 'c' });
  });

  it('extracts JSON block from surrounding prose', () => {
    const result = parseJSONLoose('Here is the result: {"flirt":"x","normal":"y","cool":"z"} done.');
    expect(result).toEqual({ flirt: 'x', normal: 'y', cool: 'z' });
  });

  it('returns null for null input', () => {
    expect(parseJSONLoose(null)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseJSONLoose('')).toBeNull();
  });

  it('returns null for invalid JSON', () => {
    expect(parseJSONLoose('{not valid json}')).toBeNull();
  });

  it('returns object with all three keys when present', () => {
    const result = parseJSONLoose('{"flirt":"撩","normal":"普通","cool":"冷静"}');
    expect(result).toHaveProperty('flirt');
    expect(result).toHaveProperty('normal');
    expect(result).toHaveProperty('cool');
  });
});
