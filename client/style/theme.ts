import {DefaultTheme} from 'styled-components';

export default {
  color: {
    DARK: '0 0% 0%',
    WHITE: '0 0% 100%',
    WHITE1: '228, 56%, 98%',
    GREEN1: '146 64% 36%',
    YELLOW: '45 86% 62%',
    ORANGE: '28 87% 62%',
    RED: '0 79% 63%',
    BLUE1: '214 84% 56%',
    BLUE3: '195 86% 64%',
    GREEN3: '145 50% 62%',
    GRAY1: '0 0% 20%',
    GRAY2: '0 0% 31%',
    GRAY3: '0 0% 51%',
    GRAY4: '0 0% 74%',
    GRAY5: '0 0% 88%',
  },
  font: {
    family: {
      normal: 'Poppins',
      secondary: 'Noto Sans',
    },
    size: {
      1: '0.0625rem', // 1px
      100: '0.5rem', // 8px
      200: '0.625rem', // 10px
      300: '0.75rem', // 12px
      400: '0.875rem', // 14px
      500: '1rem', // 16px
      600: '1.125rem', // 18px
    },
  },
  lineHeight: {
    0: '16px',
    1: '18px',
    2: '22px',
    3: '27px',
  },
  border: {
    radius: {
      1: '0.5rem',
      2: '0.75rem',
      3: '1.5rem',
    },
  },
  z: {
    BASE: 0,
    POPUP: 1,
    CARD: 2,
    CARD_POPUP: 3,
  },
} as DefaultTheme;
