import { Flex, Heading, Text, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import InputBalance from './component/InputBalance'

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 0 25px;
  height: auto;
  max-height: 100vh;
  margin-top: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 60px;
  }
`
const StyledHeading = styled(Heading)`
  color: #d2d6ef;
  font-size: 26px;
`

const StyledSubtitle = styled(Text)`
  color: #d2d6ef;
  font-size: 16px;
  margin: 8px 0 60px 0;
`
const StyledButton = styled(Button)`
  margin-bottom: 40px;
  background: linear-gradient(135deg, #495076 0%, #424869 100%);
  color: #d2d6ef;
  min-height: 40px;
`

export default function Import() {
  return (
    <Wrapper flexDirection="column" alignItems="center">
      <StyledHeading>IMPORT MYGAME</StyledHeading>
      <StyledSubtitle>Balance: 0.000000</StyledSubtitle>
      <StyledButton>Export</StyledButton>
      <InputBalance title="Import to game" textButton="Import" />
      <InputBalance title="Export to game" textButton="Export" />
    </Wrapper>
  )
}
