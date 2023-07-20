import images from 'configs/images'
import styled from 'styled-components'
import Box from './components/box'
import Info from './components/info'
import Overview from './components/overview'
import TrendToken from './components/trendToken'

const Wrapper = styled.div`
  background: black;

  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 20px !important;
  * {
    font-family: Inter, sans-serif;
  }
  @media screen and (max-width: 575px) {
    background: black;
  }
`

function Tokenomic() {
  return (
    <Wrapper>
      <Overview />
      <TrendToken />
      <Box />
      <Info />
    </Wrapper>
  )
}

export default Tokenomic
