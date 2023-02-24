import styled from 'styled-components'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  margin-top: 100px;
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 375px) {
    margin-top: 10px;
  }
`

const StyledHeading = styled(Text)`
  font-weight: 700;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.12em;
  margin-bottom: 50px;
  text-transform: capitalize;
  background: linear-gradient(91.97deg, #00f0e1 12.26%, #2951b7 122.85%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0px 4px 20px rgba(43, 143, 241, 0.2);

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`

const Container = styled.div`
  img {
    width: 100%;
  }
  @media screen and (max-width: 780px) {
    display: none;
  }
  width: 100%;
  display: block;
`

const Mobile = styled.div`
  @media screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;

    align-items: center;
    img {
      width: 80%;
    }
  }
  display: none;
`

const RoadMap = () => {
  return (
    <Wrapper>
      <StyledHeading fontSize={['20px', '36px', '64px']}>ROADMAP</StyledHeading>
      <Container>
        <img src={images.roadmap} />
      </Container>
      <Mobile>
        <img src={images.roadmobile} />
      </Mobile>
    </Wrapper>
  )
}

export default RoadMap
