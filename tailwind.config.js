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
        bg: '#fdfcff',
        surface: '#ffffff',
        ink: '#1d1726',
        'ink-2': '#4a3f5b',
        'ink-3': '#8a7e9a',
        line: '#ece6f3',
        'line-2': '#f6f1fb',
        // Purple scale
        'p-50': '#fbf5fd',
        'p-100': '#f4e7fa',
        'p-200': '#e9d2f4',
        'p-300': '#d6abe9',
        'p-500': '#a05bd6',
        'p-600': '#8a3fc4',
        'p-700': '#6f2da5',
        // Rose scale
        'r-50': '#fff3f7',
        'r-100': '#ffe1ec',
        'r-300': '#ffa3c3',
        'r-500': '#f55c93',
        'r-600': '#e0407a',
        // Blue scale
        'b-100': '#e4ecff',
        'b-300': '#a8b9ee',
        'b-500': '#6f7fcc',
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
        '1': '0 1px 2px rgba(74,40,120,.04), 0 2px 8px rgba(74,40,120,.05)',
        '2': '0 4px 14px rgba(120,60,180,.08), 0 1px 3px rgba(74,40,120,.04)',
        '3': '0 14px 40px -10px rgba(140,60,200,.22), 0 4px 12px rgba(120,60,180,.08)',
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
