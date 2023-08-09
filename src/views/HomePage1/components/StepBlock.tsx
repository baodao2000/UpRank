import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import images from 'configs/images'
import 'aos/dist/aos.css'
import { useState } from 'react'

const Wrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  margin-top: 100px;
  background: #141416;
  position: relative;
  max-width: 1320px;
  margin: auto;
  z-index: 1;
  width: 100%;
  .pc {
    @media (max-width: 796px) {
      display: none;
    }
  }
  .mb {
    display: none;
    @media (max-width: 796px) {
      display: block;
    }
  }
`
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 796px) {
    flex-direction: column-reverse;
  }
`

const Title = styled(Heading)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  @media (max-width: 796px) {
    align-items: center;
  }
`

const StyledText = styled.p`
  ax-width: 448px;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  @media (max-width: 1024px) {
    max-width: 100%;
    font-size: 42px;
    line-height: 42px;
  }
  @media (max-width: 796px) {
    max-width: 100%;
  }
  @media (max-width: 575px) {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`

const TitleM = styled(Text)`
  margin: 16px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  @media (max-width: 796px) {
  }
`
const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  img {
    width: 36px;
    height: 36px;
  }
  cursor: pointer;
`
const GruopRight = styled.div``
const TextTitle = styled(Text)`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  color: rgba(255, 255, 255, 1);
  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
  }
`
const TextLabel = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: rgba(119, 126, 144, 1);
  @media (max-width: 575px) {
    font-size: 14px;
    line-height: 20px;
  }
`
const Right = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 796px) {
    width: 500px;
  }
  @media screen and (max-width: 575px) {
    width: 400px;
  }
`
const Left = styled.div`
  margin-left: 30px;
  width: 50%;
  @media screen and (max-width: 796px) {
    margin-left: 0px;
    width: 100%;
  }
`
const StepBlock = () => {
  const [step, setStep] = useState(1)
  return (
    <Wrapper className="block">
      <Title className="mb">
        <StyledText>Get started in 3 simple steps </StyledText>
        <TitleM>It only takes a few minutes</TitleM>
      </Title>
      <Group>
        <Left>
          <Title className="pc">
            <StyledText>Get started in 3 simple steps </StyledText>
            <TitleM>It only takes a few minutes</TitleM>
          </Title>
          <div style={{ marginTop: '20px' }}>
            <Step onClick={() => setStep(1)}>
              {step === 1 ? <img src="./images/V3/active1.png" /> : <img src="./images/V3/disabled1.png" />}
              <GruopRight>
                <TextLabel>Step 1</TextLabel>
                <TextTitle>Create your wallet</TextTitle>
                <TextLabel>
                  Create your Trust wallet or Metamask{' '}
                  <a href="https://metamask.io/" style={{ color: '#8544F5' }}>
                    Download now
                  </a>
                </TextLabel>
              </GruopRight>
            </Step>
            <div
              style={{
                borderRadius: '5px',
                height: '1px',
                alignItems: 'stretch',
                margin: '30px 0',
                background: 'rgba(53, 57, 69, 1)',
              }}
            ></div>
            <Step onClick={() => setStep(2)}>
              {step === 2 ? <img src="./images/V3/active2.png" /> : <img src="./images/V3/disabled2.png" />}
              <GruopRight>
                <TextLabel>Step 2</TextLabel>
                <TextTitle>Connect with Trendy DeFi app</TextTitle>
              </GruopRight>
            </Step>
            <div
              style={{
                borderRadius: '5px',
                height: '1px',
                alignItems: 'stretch',
                margin: '30px 0',
                background: 'rgba(53, 57, 69, 1)',
              }}
            ></div>
            <Step onClick={() => setStep(3)}>
              {step === 3 ? <img src="./images/V3/active3.png" /> : <img src="./images/V3/disabled3.png" />}
              <GruopRight>
                <TextLabel>Step 3</TextLabel>
                <TextTitle>Discover Trendy DeFi solution</TextTitle>
              </GruopRight>
            </Step>
          </div>
        </Left>
        <Right>
          {step === 1 && <img data-aos="fade-left" width="70%" src={images.step1} />}
          {step === 2 && <img data-aos="fade-left" width="70%" className="step2" src={images.step2} />}
          {step === 3 && <img data-aos="fade-left" width="70%" className="step3" src={images.step3} />}
        </Right>
      </Group>
    </Wrapper>
  )
}

export default StepBlock
