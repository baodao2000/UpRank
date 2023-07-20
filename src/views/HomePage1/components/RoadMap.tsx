import styled from 'styled-components'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  margin-top: 96px;
  * {
    font-family: Inter, sans-serif;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
  @media only screen and (max-width: 375px) {
    margin-top: 10px;
  }

  & ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledHeading = styled(Text)`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px; /* 125% */
  letter-spacing: -0.96px;
  text-align: center;
  margin-bottom: 20px;
  color: rgba(226, 225, 229, 1);
  text-shadow: 0px 4px 20px rgba(43, 143, 241, 0.2);

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 42px;
  }
  @media (max-width: 575px) {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`

const Container = styled.div`
  img {
    width: 100%;
  }
  margin-top: 64px;
  @media screen and (max-width: 780px) {
    display: none;
  }
  width: 100%;
  display: block;
`
const Boder = styled.div`
  margin: 50px 0 0;
  width: 100%;
  overflow: auto;
`
const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 780px) {
    width: 1000px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
`

const RoadMap = () => {
  return (
    <Wrapper>
      <StyledHeading fontSize={['20px', '36px', '64px']}>Roadmap</StyledHeading>
      <Text
        maxWidth={544}
        fontSize="18px"
        fontWeight="400"
        style={{ color: 'rgba(173, 171, 178, 1)' }}
        lineHeight="28px"
        textAlign="center"
        paddingBottom={10}
      >
        Stacks is a production-ready library of stackable content blocks built in React Native.
      </Text>
      <Container>
        <img src={images.roadmapV3} />
      </Container>
      <Boder>
        <Mobile>
          <img src={images.roadmapV3} />
        </Mobile>
      </Boder>
      {/* <Mobile>
        <img src={images.roadmobile} />
      </Mobile> */}
    </Wrapper>
  )
}

export default RoadMap
