export const theme = {
  colors: {
    // 主色调 - 温暖的棕金色系
    primary: {
      50: '#FFF9F5',
      100: '#FFF3EB',
      200: '#FFE4D1',
      300: '#FFD4B7',
      400: '#FFB588',
      500: '#FF9659',  // 主色
      600: '#E67A3D',
      700: '#CC5E21',
      800: '#B34205',
      900: '#8A3300',
    },
    
    // 中性色 - 温暖的米色系
    neutral: {
      50: '#FDFBF7',
      100: '#FAF6F0',
      200: '#F5EDE4',
      300: '#EBE0D4',
      400: '#D4C4B0',
      500: '#B8A48E',
      600: '#9C8570',
      700: '#7D6A56',
      800: '#5E503E',
      900: '#3D2E24',
    },
    
    // 强调色 - 金色
    accent: {
      50: '#FFFBF0',
      100: '#FFF6D9',
      200: '#FFEDB3',
      300: '#FFE38C',
      400: '#FFD966',
      500: '#FFCF40',  // 金色
      600: '#E6B800',
      700: '#CC9F00',
      800: '#B38600',
      900: '#8A6600',
    },
    
    // 语义色
    success: '#8FA67A',
    warning: '#D4A84B',
    error: '#C97066',
    info: '#7BA3C4',
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },
  
  borderRadius: {
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(61, 46, 36, 0.05)',
    md: '0 4px 6px -1px rgba(61, 46, 36, 0.1), 0 2px 4px -1px rgba(61, 46, 36, 0.06)',
    lg: '0 10px 15px -3px rgba(61, 46, 36, 0.1), 0 4px 6px -2px rgba(61, 46, 36, 0.05)',
    xl: '0 20px 25px -5px rgba(61, 46, 36, 0.1), 0 10px 10px -5px rgba(61, 46, 36, 0.04)',
    '2xl': '0 25px 50px -12px rgba(61, 46, 36, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(61, 46, 36, 0.06)',
  },
  
  typography: {
    fontFamily: {
      sans: "'Geist', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      mono: "'Geist Mono', 'SF Mono', monospace",
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

export type Theme = typeof theme;
