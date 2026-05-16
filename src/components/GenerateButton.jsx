export default function GenerateButton({ loading, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="bg-grad-primary shadow-generate inline-flex items-center justify-center gap-[8px] relative overflow-hidden group"
      style={{
        border: 0,
        color: '#ffffff',
        borderRadius: '14px',
        padding: '16px 20px',
        fontWeight: 600,
        fontSize: '15.5px',
        letterSpacing: '.5px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'transform .15s ease, box-shadow .15s, filter .15s',
        opacity: disabled && !loading ? 0.55 : 1,
        ...(disabled && !loading
          ? {
              background: 'linear-gradient(135deg, #d3b8ec, #f3aac5)',
              boxShadow: 'none',
            }
          : {}),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.filter = 'brightness(1.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.filter = 'none';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {loading ? (
        <>
          <span>正在想措辞</span>
          {/* Bouncing dots */}
          <span
            className="inline-block rounded-full bg-white animate-loading-dot"
            style={{ width: '5px', height: '5px', animationDelay: '0ms' }}
          />
          <span
            className="inline-block rounded-full bg-white animate-loading-dot"
            style={{ width: '5px', height: '5px', animationDelay: '150ms' }}
          />
          <span
            className="inline-block rounded-full bg-white animate-loading-dot"
            style={{ width: '5px', height: '5px', animationDelay: '300ms' }}
          />
        </>
      ) : (
        <>
          {/* Spark icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="inline-block transition-transform duration-300 group-hover:rotate-[20deg] group-hover:scale-110"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 2l1.8 5.6L19 9.4l-5.2 1.8L12 17l-1.8-5.8L5 9.4l5.2-1.8z" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
