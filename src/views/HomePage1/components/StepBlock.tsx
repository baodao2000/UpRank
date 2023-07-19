import styled, { keyframes } from 'styled-components'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import images from 'configs/images'
import 'aos/dist/aos.css'
import { useState } from 'react'

const Wrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 414px) {
    margin-top: 0;
  }
  width: 100%;
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
`

const StyledText = styled.p`
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-style: normal;
  font-weight: 500;
  line-height: 60px;
  letter-spacing: -0.96px;
`

const TitleM = styled(Text)`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
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
`
const TextLabel = styled(Text)`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  color: rgba(119, 126, 144, 1);
`
const Right = styled.div`
  .step2 {
    margin-left: 200px;
  }
  .step3 {
    margin-left: 200px;
  }
`
const Left = styled.div`
  width: 448px;
`
const StepBlock = () => {
  const [step, setStep] = useState(1)
  return (
    <Wrapper className="block">
      <Left>
        <Title>
          <StyledText>Get started in 3 simple steps </StyledText>
        </Title>
        <TitleM>It only takes a few minutes</TitleM>
        <div style={{ marginTop: '64px' }}>
          <Step onClick={() => setStep(1)}>
            {step === 1 ? <img src="./images/V3/active1.png" /> : <img src="./images/V3/disabled1.png" />}
            <GruopRight>
              <TextLabel>Step 1</TextLabel>
              <TextTitle>Create your wallet</TextTitle>
              <TextLabel>
                Create your Trust wallet or Metamask <span>Download now</span>
              </TextLabel>
            </GruopRight>
          </Step>
          <div
            style={{
              borderRadius: '5px',
              height: '1px',
              alignItems: 'stretch',
              margin: '32px 0',
              background: 'rgba(53, 57, 69, 1)',
            }}
          ></div>
          <Step onClick={() => setStep(2)}>
            {step === 2 ? <img src="./images/V3/active2.png" /> : <img src="./images/V3/disabled2.png" />}
            <GruopRight>
              <TextLabel>Step 2</TextLabel>
              <TextTitle>Connect with Trendy Defi Dapp</TextTitle>
            </GruopRight>
          </Step>
          <div
            style={{
              borderRadius: '5px',
              height: '1px',
              alignItems: 'stretch',
              margin: '32px 0',
              background: 'rgba(53, 57, 69, 1)',
            }}
          ></div>
          <Step onClick={() => setStep(3)}>
            {step === 3 ? <img src="./images/V3/disabled3.png" /> : <img src="./images/V3/disabled3.png" />}
            <GruopRight>
              <TextLabel>Step 3</TextLabel>
              <TextTitle>Discover Trendy Defi solution</TextTitle>
            </GruopRight>
          </Step>
        </div>
      </Left>
      <Right>
        {step === 1 && <img src="./images/V3/Wallet.svg" />}
        {step === 2 && <img className="step2" src="./images/V3/connet.svg" />}
        {step === 3 && <img className="step3" src="./images/V3/Step3.svg" />}
      </Right>
    </Wrapper>
  )
}

export default StepBlock
