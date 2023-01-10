import styled from 'styled-components'
import { Flex, Heading, IconButton, Text } from '@pancakeswap/uikit'
import { ReactElement, useCallback } from 'react'

interface Props {
  title: string | ReactElement
}

const CurrencyInputContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 100%;
`
const StyledHead = styled(Text)`
  color: #4a5178;
`

const HeaderImport: React.FC<React.PropsWithChildren<Props>> = ({ title }) => {
  return (
    <CurrencyInputContainer>
      <StyledHead fontSize="20px">{title}</StyledHead>
    </CurrencyInputContainer>
  )
}

export default HeaderImport
