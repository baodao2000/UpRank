import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background: linear-gradient(249.6deg, #105EEC 4.22%, #061428 89.63%);
    height: auto;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
