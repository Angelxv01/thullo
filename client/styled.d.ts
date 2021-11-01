import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: Record<string, string>;
    font: {family: Record<string, string>; size: Record<number, string>};
    letterSpacing: Record<string, string>;
    lineHeight: Record<number, string>;
    border: {radius: Record<number, string>};
  }
}
