export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed z-50 text-white text-[13px] rounded-full pointer-events-none"
      style={{
        bottom: '24px',
        left: '50%',
        padding: '10px 16px',
        backgroundColor: '#1d1726',
        boxShadow: '0 8px 24px rgba(0,0,0,.18)',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity .25s ease, transform .25s ease',
      }}
    >
      {message}
    </div>
  );
}
