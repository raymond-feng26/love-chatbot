export default function Header() {
  return (
    <header className="flex items-center justify-between mb-[22px]">
      {/* Brand */}
      <div className="flex items-center gap-[10px] font-semibold tracking-[.2px]">
        {/* Brand dot with highlight */}
        <div
          className="relative w-[26px] h-[26px] rounded-[8px] bg-grad-primary shadow-2 flex-shrink-0"
        >
          {/* Highlight pseudo-element replacement */}
          <div
            className="absolute rounded-[4px] opacity-[.85]"
            style={{
              inset: '5px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 100%)',
            }}
          />
        </div>

        <div className="flex flex-col leading-tight">
          <div className="text-[16px] text-ink leading-snug">回复生成器</div>
          <div className="text-[12px] text-ink-3 font-normal">Love Chatbot</div>
        </div>
      </div>

      {/* Meta */}
      <span className="text-ink-3 text-[12px] font-mono">v0.3 · beta</span>
    </header>
  );
}
