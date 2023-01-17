import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Helvetica', sans-serif;;
    src: url("/assets/fonts/Helvetica.ttf");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica Light', sans-serif;;
    src: url("/assets/fonts/Helvetica-Light.ttf");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Helvetica', sans-serif;;
    src: url("/assets/fonts/helvetica-neue-medium.ttf");
    font-weight: 500;
  }
  @font-face {
    font-family: 'Helvetica', sans-serif;;
    src: url("/assets/fonts/Helvetica-Bold.ttf");
    font-weight: 700;
  }
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700&family=Roboto:wght@400;500;700&display=swap');
  * {
    font-family: 'Roboto', sans-serif;
  }
  body {
    background-color: #13171b;
    height: auto;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
