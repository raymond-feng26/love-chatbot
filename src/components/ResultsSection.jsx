import ReplyCard from './ReplyCard';
import RefineHistory from './RefineHistory';
import RefineBar from './RefineBar';

export default function ResultsSection({
  replies,
  status,
  meta,
  refineHistory,
  onRefine,
  tones,
  onCopy,
}) {
  const isLoading = status === 'loading';
  const isError = status === 'error';
  const hasReplies = !!replies;

  return (
    <div style={{ marginTop: '26px', display: 'grid', gap: '14px' }}>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#8a7e9a',
          fontSize: '12px',
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Pulse indicator */}
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '9999px',
              background: '#a05bd6',
              boxShadow: '0 0 0 4px rgba(160,91,214,.15)',
              flexShrink: 0,
            }}
          />
          <span>三种语气 · 点右下角复制</span>
        </div>
        <div
          style={{ fontFamily: '"JetBrains Mono", ui-monospace, monospace' }}
        >
          {meta || '—'}
        </div>
      </div>

      {/* Cards grid */}
      <div className="cards-grid">
        {tones.map((tone, i) => (
          <ReplyCard
            key={tone.key}
            tone={tone}
            text={replies ? replies[tone.key] : undefined}
            loading={isLoading}
            error={isError}
            onCopy={onCopy}
            index={i}
          />
        ))}
      </div>

      {/* Refine history */}
      <RefineHistory history={refineHistory} />

      {/* Refine bar */}
      <RefineBar
        onRefine={onRefine}
        disabled={isLoading}
        hasReplies={hasReplies}
      />
    </div>
  );
}
