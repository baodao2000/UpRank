import styled from 'styled-components'
import { Heading, Card, Text } from '@pancakeswap/uikit'
import images from 'configs/images'

const Wrapper = styled.div`
  width: 100%;
  margin-top: 96px;
  * {
    font-family: Inter, sans-serif;
  }
  .scroll {
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-top: 0;
  }
`

const StyleRoadMap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledHeading = styled(Text)`
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 60px;
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

const Title = styled(Text)`
  color: var(--primary-primary-1, #8544f5);
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`

const Container = styled.div`
  margin-top: 64px;
  display: flex;
  gap: 14px;
  padding-left: 40px;
  img {
    margin-top: 3%;
  }
  @media screen and (max-width: 575px) {
    gap: 22px;
  }
`
const CircleOld = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 4px;
  border-radius: 50px;
  background: var(--primary-primary-1, #8544f5);
  position: relative;
  @media screen and (max-width: 575px) {
    width: 60px;
    height: 60px;
  }
`
const CircleActive = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 8px solid var(--primary-primary-3, #362b56);
  background: var(--primary-high-light, #b210ff);
  position: relative;
  @media screen and (max-width: 575px) {
    width: 60px;
    height: 60px;
  }
`
const CircleNew = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid var(--primary-primary-3, #362b56);
  background: var(--primary-primary-3, #362b56);
  position: relative;
  @media screen and (max-width: 575px) {
    width: 60px;
    height: 60px;
  }
`
const Number = styled.div`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px;
  position: absolute;
  // @media screen and (max-width: 575px) {
  //   font-size: 24px;
  // }
`
const Details = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 64px;
  margin-bottom: 10px;
  justify-content: space-between;
  .active {
    background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7b3fe4 0%, #a726c1 100%));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .isActive {
    color: #362b56;
  }
  .activeLabel {
    color: #fff;
  }
  @media screen and (max-width: 575px) {
    margin-top: 32px;
  }
`
const Label = styled(Text)`
  width: 174px;
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`
const Stage = styled.div`
  width: 1320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StyledCircle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 175px;
  align-items: center;
  justify-content: center;
`

const StyledImg = styled.img`
  width: 79px;
  height: 12px;
`
const details = [
  {
    detail: 'Launch Staking venture pool for MATIC Token.',
    class: '',
  },
  {
    detail: 'Launch TrendyDefi App.',
    class: '',
  },
  {
    detail: 'Release of Trendy NFT Collection, powered by TREND Token.',
    class: 'activeLabel',
  },
  {
    detail: 'Launch AI-powered Prediction Tool for Token price forecasts.',
    class: '',
  },
  {
    detail: 'To list TREND Token on the top 10 major CEXs on CoinMarketCap.',
    class: '',
  },
  {
    detail: 'DAO Voting proposal to launch a new Pool Stake for the next two Tokens.',
    class: '',
  },
  {
    detail: 'Update Trendy DeFi Dapp to version 3.0 for major expansions.',
    class: '',
  },
]

const RoadMap = () => {
  return (
    <Wrapper>
      <StyleRoadMap>
        <StyledHeading fontSize={['20px', '36px', '64px']}>Roadmap</StyledHeading>
        <Text
          maxWidth={555}
          fontSize="18px"
          fontWeight="400"
          style={{ color: 'rgba(173, 171, 178, 1)' }}
          lineHeight="28px"
          textAlign="center"
          paddingBottom={10}
        >
          From Vision to Show, Trendy DeFi&#39;s Glow: Our Roadmap&apos; Let&#39;s Grow!
        </Text>
      </StyleRoadMap>
      <div className="scroll" style={{ overflow: 'auto' }}>
        <Stage>
          <Container>
            <StyledCircle>
              <CircleOld>
                <Number>1</Number>
              </CircleOld>
              <Title>Q1 2023</Title>
            </StyledCircle>
            <StyledImg className="image" src="images/V3/Active.svg" />
            <StyledCircle>
              <CircleOld>
                <Number>2</Number>
              </CircleOld>
              <Title>Q2 2023</Title>
            </StyledCircle>
            <StyledImg src="images/V3/Active.svg" />
            <StyledCircle>
              <CircleActive>
                <Number>3</Number>
              </CircleActive>
              <Title className="active">Q3 2023</Title>
            </StyledCircle>
            <StyledImg src="/images/V3/isActive.svg" />
            <StyledCircle>
              <CircleNew>
                <Number>4</Number>
              </CircleNew>
              <Title className="isActive">Q4 2023</Title>
            </StyledCircle>
            <StyledImg src="/images/V3/isActive.svg" />
            <StyledCircle>
              <CircleNew>
                <Number>5</Number>
              </CircleNew>
              <Title className="isActive">Q2 2024</Title>
            </StyledCircle>
            <StyledImg src="/images/V3/isActive.svg" />
            <StyledCircle>
              <CircleNew>
                <Number>6</Number>
              </CircleNew>
              <Title className="isActive">Q3 2024</Title>
            </StyledCircle>
            <StyledImg src="/images/V3/isActive.svg" />
            <StyledCircle>
              <CircleNew>
                <Number>7</Number>
              </CircleNew>
              <Title className="isActive">Q4 2024</Title>
            </StyledCircle>
          </Container>
          <Details>
            {details.map((i) => (
              <Label className={i.class}>{i.detail}</Label>
            ))}
          </Details>
        </Stage>
      </div>
    </Wrapper>
  )
}

export default RoadMap
