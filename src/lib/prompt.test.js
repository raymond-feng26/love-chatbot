import { describe, it, expect } from 'vitest';
import { lengthBrief, buildPrompt } from './prompt.js';

describe('lengthBrief', () => {
  it("'short' returns instruction containing '30字'", () => {
    expect(lengthBrief('short')).toContain('30字');
  });

  it("'long' returns instruction containing '80-140字'", () => {
    expect(lengthBrief('long')).toContain('80-140字');
  });

  it("'medium' (default) returns instruction containing '40-80字'", () => {
    expect(lengthBrief('medium')).toContain('40-80字');
  });

  it('unknown value returns default instruction containing 40-80字', () => {
    expect(lengthBrief(undefined)).toContain('40-80字');
  });
});

describe('buildPrompt', () => {
  it('includes msg when provided', () => {
    const result = buildPrompt({ msg: '你好吗', intent: '', length: 'medium' });
    expect(result).toContain('你好吗');
  });

  it('includes fallback text when msg is empty', () => {
    const result = buildPrompt({ msg: '', intent: '', length: 'medium' });
    expect(result).toContain('用户未填消息');
  });

  it("includes 【我想表达】 section when intent is provided", () => {
    const result = buildPrompt({ msg: '嗨', intent: '想约她出来', length: 'medium' });
    expect(result).toContain('【我想表达】');
    expect(result).toContain('想约她出来');
  });

  it('does not include 【我想表达】 when intent is empty', () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium' });
    expect(result).not.toContain('【我想表达】');
  });

  it("includes 【额外要求】 when refineHint is provided", () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium', refineHint: '更幽默' });
    expect(result).toContain('【额外要求】');
    expect(result).toContain('更幽默');
  });

  it('does not include 【额外要求】 when refineHint is absent', () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium' });
    expect(result).not.toContain('【额外要求】');
  });

  it('includes prior JSON block when prior is provided', () => {
    const prior = { flirt: 'a', normal: 'b', cool: 'c' };
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium', prior });
    expect(result).toContain('先前生成的版本');
    expect(result).toContain(JSON.stringify(prior, null, 2));
  });

  it('does not include persona in the prompt body', () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium', persona: '温柔体贴' });
    // persona should not appear in prompt body
    expect(result).not.toContain('温柔体贴');
  });

  it('output contains JSON format instruction', () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium' });
    expect(result).toContain('JSON');
  });

  it("output contains 'flirt', 'normal', 'cool' key names", () => {
    const result = buildPrompt({ msg: '嗨', intent: '', length: 'medium' });
    expect(result).toContain('flirt');
    expect(result).toContain('normal');
    expect(result).toContain('cool');
  });
});
