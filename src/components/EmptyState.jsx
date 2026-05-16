export default function EmptyState() {
  return (
    <div
      className="mt-[30px] rounded text-center"
      style={{
        border: '1.5px dashed #ece6f3',
        background: 'linear-gradient(180deg, #ffffff 0%, #fbf7ff 100%)',
        padding: '36px 20px',
      }}
    >
      {/* Icon container */}
      <div
        className="bg-grad-primary-soft inline-flex items-center justify-center rounded-[14px] text-p-600 mb-[10px]"
        style={{ width: '44px', height: '44px' }}
      >
        {/* Chat bubble SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </div>

      <h4 className="mt-[6px] mb-[4px] text-ink-2 font-medium m-0">
        等你把消息丢进来
      </h4>
      <p className="m-0 text-[13px] text-ink-3">
        生成结果会出现在这里 · 三张卡片，挑一张顺手的
      </p>
    </div>
  );
}
