import {DefaultTheme} from 'styled-components';

export default {
  color: {
    dark: '0, 0%, 0%',
    white: '0, 0%, 100%',
    green1: '146, 64%, 36%',
    yellow: '45, 86%, 62%',
    orange: '28, 87%, 62%',
    red: '0, 79%, 63%',
    blue1: '214, 84%, 56%',
    blue3: '195, 86%, 64%',
    green3: '145, 50%, 62%',
    gray1: '0, 0%, 20%',
    gray2: '0, 0%, 31%',
    gray3: '0, 0%, 51%',
    gray4: '0, 0%, 74%',
    gray5: '0, 0%, 88%',
  },
  font: {
    family: {
      normal: 'Poppins',
      secondary: 'Noto Sans',
    },
    size: {
      1: '0.0625rem', // 1px
      100: '0.5rem', // 8px
      200: '0.675rem', // 10px
      300: '0.75rem', // 12px
      400: '0.875rem', // 14px
      500: '1rem', // 16px
      600: '1.125rem', // 18px
    },
  },
  lineHeight: {
    0: '15px',
    1: '18px',
    2: '21px',
    3: '27px',
  },
  border: {
    radius: {
      1: '0.5rem',
      2: '0.75rem',
    },
  },
} as DefaultTheme;
