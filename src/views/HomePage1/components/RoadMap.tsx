import styled from 'styled-components'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  margin-top: 100px;
  * {
    font-family: Inter, sans-serif;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 375px) {
    margin-top: 10px;
  }
`

const StyledHeading = styled(Text)`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px; /* 125% */
  letter-spacing: -0.96px;
  text-align: center;
  margin-bottom: 50px;
  color: rgba(226, 225, 229, 1);
  text-shadow: 0px 4px 20px rgba(43, 143, 241, 0.2);

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`

const Container = styled.div`
  img {
    width: 100%;
  }
  margin-top: 80px;
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
      <StyledHeading fontSize={['20px', '36px', '64px']}>Roadmap</StyledHeading>
      <Text
        fontSize="18px"
        fontWeight="400"
        style={{ color: 'rgba(173, 171, 178, 1)' }}
        lineHeight="28px"
        textAlign="center"
      >
        Stacks is a production-ready library of stackable content blocks built in React Native.
      </Text>
      <Container>
        <img src={images.roadmapV3} />
      </Container>
      <Mobile>
        <img src={images.roadmobile} />
      </Mobile>
    </Wrapper>
  )
}

export default RoadMap
