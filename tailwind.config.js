/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    borderRadius: {
      none: '0px',
      sm: '10px',
      DEFAULT: '16px',
      lg: '22px',
      full: '9999px',
    },
    extend: {
      colors: {
        bg: '#fdfbfb',
        surface: '#ffffff',
        ink: '#1d1726',
        'ink-2': '#4a3f5b',
        'ink-3': '#8a7e9a',
        line: '#efe7e9',
        'line-2': '#f6eef0',
        // Pink scale
        'p-50': '#faf6f7',
        'p-100': '#f3eaec',
        'p-200': '#ecd9de',
        'p-300': '#d9b8c0',
        'p-500': '#c08792',
        'p-600': '#a86b78',
        'p-700': '#855260',
        // Rose scale
        'r-50': '#fbf3f4',
        'r-100': '#f5e1e4',
        'r-300': '#e5acb4',
        'r-500': '#c97a86',
        'r-600': '#b06270',
        // Muted blue scale
        'b-100': '#e7e6ef',
        'b-300': '#b6b3c6',
        'b-500': '#8a8aa3',
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        '1': '0 1px 2px rgba(80,50,60,.04), 0 2px 8px rgba(80,50,60,.05)',
        '2': '0 4px 14px rgba(140,90,100,.08), 0 1px 3px rgba(80,50,60,.04)',
        '3': '0 14px 40px -10px rgba(160,100,115,.20), 0 4px 12px rgba(140,90,100,.08)',
      },
      keyframes: {
        'loading-dot': {
          '0%, 80%, 100%': { transform: 'scale(.5)', opacity: '.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'card-rise': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'loading-dot': 'loading-dot 1.2s infinite ease-in-out',
        'card-rise': 'card-rise .45s ease both',
      },
    },
  },
  plugins: [],
};
