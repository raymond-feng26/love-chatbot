export default function RefineHistory({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      {/* history is append-only, so index is a stable key */}
      {history.map((item, i) => (
        <div
          key={i}
          style={{
            alignSelf: 'flex-end',
            background: '#f4e7fa',
            color: '#6f2da5',
            borderRadius: '18px 18px 4px 18px',
            padding: '8px 14px',
            fontSize: '13px',
            maxWidth: '80%',
            wordBreak: 'break-word',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
