export function lengthBrief(value) {
  if (value === 'short') return '一到两句话，简短自然，不超过30字';
  if (value === 'long') return '三段左右，有起承转合，但不啰嗦，整体80-140字';
  return '三到五句，节奏舒服，整体40-80字';
}

export function buildPrompt(input) {
  const { msg, intent, length, language = 'zh', refineHint, prior } = input;
  // NOTE: persona is handled as a Gemini systemInstruction, NOT included in the prompt body
  let p = `你是一个擅长聊天回复的助手。请根据下面信息，给出三种不同语气的回复，让用户在感情场景里有得选。\n\n`;
  p += `【对方刚说的】\n${msg || '（用户未填消息，请基于"我想表达"自由发挥一条开场或回应）'}\n\n`;
  if (intent) p += `【我想表达】${intent}\n`;
  p += `【回复长度】${lengthBrief(length)}\n`;
  p += `【回复语言】${language === 'en' ? 'English only — write all three replies in English, no Chinese characters' : '中文'}\n`;
  p += `\n请生成三种语气：\n`;
  p += `1) flirt（💫 撩一点）：有点小心思、轻度暧昧、自信但不油腻\n`;
  p += `2) normal（😊 正常）：真诚自然、像朋友聊天、不刻意\n`;
  p += `3) cool（🧊 稳一点）：克制冷静、留有余地、不急不腻\n`;
  if (refineHint) p += `\n【额外要求】${refineHint}\n`;
  if (prior) p += `\n【先前生成的版本，请改进而不是完全推翻】\n${JSON.stringify(prior, null, 2)}\n`;
  p += `\n严格以 JSON 输出，不要任何多余文字或 markdown 包裹，结构：\n`;
  p += `{"flirt":"...","normal":"...","cool":"..."}\n`;
  p += `每条都是直接可发送的中文消息，不要加引号、不要加"回复："之类前缀。`;
  return p;
}
