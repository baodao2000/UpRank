import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Helvetica';
    src: url("/assets/fonts/Helvetica.ttf");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica Light';
    src: url("/assets/fonts/Helvetica-Light.ttf");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica';
    src: url("/assets/fonts/helvetica-neue-medium.ttf");
    font-weight: 500;
  }
  @font-face {
    font-family: 'Helvetica';
    src: url("/assets/fonts/Helvetica-Bold.ttf");
    font-weight: 700;
  }
  @font-face {
    font-family: 'Helvetica Rounded';
    src: url("/assets/fonts/HelveticaRoundedLTStd-BdCn.otf");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica Rounded';
    src: url("/assets/fonts/HelveticaRoundedLTStd-Bd.otf");
    font-weight: 600;
  }
  @font-face {
    font-family: 'Helvetica Rounded';
    src: url("/assets/fonts/HelveticaRoundedLTStd-Black.otf");
    font-weight: 700;
  }
  @font-face {
    font-family: 'Helvetica Compressed';
    src: url("/assets/fonts/HelveticaCompressed.ttf");
    font-weight: 700;
  }
  body {
    background-color: #13171b;
    height: auto;
  }
`

export default GlobalStyle
