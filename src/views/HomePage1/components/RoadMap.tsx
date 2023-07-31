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
  margin-top: 64px;
  display: flex;
  gap: 16px;
  max-width: 1320px;
  justify-content: center;
  @media screen and (max-width: 575px) {
    margin-top: 32px;
    width: 1000px;
  }
  img {
    margin-top: 3%;
  }
`
const Boder = styled.div`
  margin: 50px 0 0;
  width: 100%;
  overflow: auto;
`
const Mobile = styled.div`
  display: none;
  @media screen and (max-width: 780px) {
    width: 700px;
    display: flex;
    align-items: center;
  }
`
const CircleOld = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 64px;
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
  gap: 64px;
  align-self: stretch;
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
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 64px;
  align-self: stretch;
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
  /* Display md/Bold */
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 44px; /* 122.222% */
  letter-spacing: -0.72px;
  position: absolute;
  @media screen and (max-width: 575px) {
    font-size: 24px;
  }
`
const Details = styled.div`
  display: flex;
  gap: 22px;
  margin-top: 64px;
  width: 1400px;
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
    width: 1000px;
  }
`
const Title = styled(Text)`
  color: var(--primary-primary-1, #8544f5);
  text-align: center;
  /* Display xs/Bold */
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`
const Label = styled(Text)`
  color: var(--greyscale-grey-scale-text-seconday, #adabb2);
  text-align: center;
  /* Text sm/regular */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`
const Stage = styled.div`
  max-width: 1600px;
  width: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  &.scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &.scroll::-webkit-scrollbar-track {
    background-color: white;
  }
  &.scroll::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: rgb(0, 240, 225);
  }
  @media screen and (max-width: 1400px) {
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
      <Stage>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleOld>
              <Number>1</Number>
            </CircleOld>
            <Title>Q1 2023</Title>
            {/* <Label>Launching Staking venture pool for SMATIC Token</Label> */}
          </div>
          <img className="image" width="80px" height="12px" src="images/V3/Active.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleOld>
              <Number>2</Number>
            </CircleOld>
            <Title>Q2 2023</Title>
            {/* <Label>Launching TrendyDefi App</Label> */}
          </div>
          <img width="80px" height="12px" src="images/V3/Active.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleActive>
              <Number>3</Number>
            </CircleActive>
            <Title className="active">Q3 2023</Title>
            {/* <Label className='activeLabel'>Launching NFT Ecosystem for Trendy Defi (You can use TREND Token to get the right to join TRENDY DEFI NFT Ecosystem)</Label> */}
          </div>
          <img width="80px" height="12px" src="/images/V3/isActive.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleNew>
              <Number>4</Number>
            </CircleNew>
            <Title className="isActive">Q4 2023</Title>
            {/* <Label>Launching of Token Price Prediction AI TOOL</Label> */}
          </div>
          <img width="80px" height="12px" src="/images/V3/isActive.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleNew>
              <Number>5</Number>
            </CircleNew>
            <Title className="isActive">Q2 2024</Title>
            {/* <Label>Listing TREND Token on CEX. (Top 10 Major Crypto Exchanges Ranked on Coinmarketcap)</Label> */}
          </div>
          <img width="80px" height="12px" src="/images/V3/isActive.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleNew>
              <Number>6</Number>
            </CircleNew>
            <Title className="isActive">Q3 2024</Title>
            {/* <Label>Community votes through Trendydefi's DAO system to select and Launch Pool Stake for the next two Tokens (Use Trend Token to buy NFT keys)</Label> */}
          </div>
          <img width="80px" height="12px" src="/images/V3/isActive.svg" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            <CircleNew>
              <Number>7</Number>
            </CircleNew>
            <Title className="isActive">Q4 2024</Title>
            {/* <Label>Update Dapp Trendydefi Ver3.0 and expend TrendyDEFI ecosystem</Label> */}
          </div>
        </Container>
        <Details>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title>Q1 2023</Title> */}
            <Label>Launching Staking venture pool for SMATIC Token</Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title>Q2 2023</Title> */}
            <Label>Launching TrendyDefi App</Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title className='active'>Q3 2023</Title> */}
            <Label className="activeLabel">
              Launching NFT Ecosystem for Trendy Defi (You can use TREND Token to get the right to join TRENDY DEFI NFT
              Ecosystem)
            </Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title className='isActive'>Q4 2023</Title> */}
            <Label>Launching of Token Price Prediction AI TOOL</Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title className='isActive'>Q2 2024</Title> */}
            <Label>Listing TREND Token on CEX. (Top 10 Major Crypto Exchanges Ranked on Coinmarketcap)</Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title className='isActive'>Q3 2024</Title> */}
            <Label>
              Community votes through Trendydefi&#39;s DAO system to select and Launch Pool Stake for the next two
              Tokens (Use Trend Token to buy NFT keys)
            </Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '177px' }}>
            {/* <Title className='isActive'>Q4 2024</Title> */}
            <Label>Update Dapp Trendydefi Ver3.0 and expend TrendyDEFI ecosystem</Label>
          </div>
        </Details>
      </Stage>
      {/* <Mobile>
        <img src={images.roadmobile} />
      </Mobile> */}
    </Wrapper>
  )
}

export default RoadMap
