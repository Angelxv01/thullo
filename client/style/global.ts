import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margins */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  figure,
  picture {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-weight: 500;
  }

  body {
    font-weight: 500;
    letter-spacing: 0.035em;
    line-height: ${({theme}) => theme.lineHeight[1]};
    min-height: 100vh;
    font-family: ${({theme}) => theme.font.family.normal};
    font-size: ${({theme}) => theme.font.size[300]};
    background-color: hsl(${({theme}) => theme.color.white});
    color: hsl(${({theme}) => theme.color.dark});
  }

  ::placeholder { 
    color: hsl(${({theme}) => theme.color.GRAY4});
    opacity: 1;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  .material-icons {
    font-weight: inherit;
    font-style: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    display: inline;
    color: inherit
  }
`;
