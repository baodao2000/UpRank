import styled, { keyframes } from 'styled-components'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import images from 'configs/images'
import 'aos/dist/aos.css'

const shine = keyframes`
  100% {
    left: 125%;
    opacity: 0;
    visibility: hidden;
  }
`

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 414px) {
    margin-top: 0;
  }
`
const StepList = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 2%;

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 80%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    gap: 6%;
  }
`

const Step = styled.div`
  width: 100%;
  min-height: auto;
  padding: 10px;
  position: relative;
  background: linear-gradient(146.96deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(153.15deg, #4c0bd3 8.57%, #8145ff 100%);
  border: 1px solid #000000;
  box-shadow: 6px 10px 25px rgba(0, 0, 0, 0.1), inset 0px 4px 16px rgba(238, 190, 255, 0.63);
  border-radius: 12.5px;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    content: '';
    width: 5px;
    height: 100%;
    background: -o-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(255, 255, 255, 0)),
      to(rgba(255, 255, 255, 0.3))
    );
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
    -webkit-transform: skewX(-25deg);
    -ms-transform: skewX(-25deg);
    transform: skewX(-25deg);
  }

  &:hover::before {
    display: block;
    animation: ${shine} 1.1s;
  }

  p {
    margin-top: 5%;
    font-style: normal;
    font-weight: 700;
    color: #252627;
    font-size: 14px;
    line-height: 120%;
    width: 100%;
    font-family: Helvetica, sans-serif;
  }
  img {
    width: 30px;
    height: auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    border-radius: 20px;
    img {
      width: 42px;
      height: auto;
    }
    p {
      font-size: 20px;
      line-height: 29px;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    min-height: 265px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px;

    img {
      width: 62px;
      height: auto;
    }
    p {
      font-size: 32px;
      line-height: 39px;
      width: 60%;
    }
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    min-height: 265px;
  }
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const StyledText = styled.p`
  color: #8145ff;
  display: inline;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: start;
  }
`

const StyledButton = styled(Button)`
  background: #262626;
  color: #8145ff;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  font-family: Helvetica, sans-serif;
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const TitleM = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #ced8e1;
  margin-top: 6px;

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 24px;
    line-height: 23px;
  }
`

const StepBlock = () => {
  return (
    <Wrapper className="block">
      <Title color="mainColor">
        <StyledText>Get started</StyledText> in 3 simple steps
      </Title>
      <TitleM>It only takes a few minutes</TitleM>
      <StepList>
        <Step data-aos="flip-left" data-aos-easing="linear" data-aos-duration="1000" className="download">
          <img src={images.arrowDown} alt="" />
          <p>Download TrendyDefi</p>
        </Step>
        <Step data-aos="flip-left" data-aos-easing="linear" data-aos-duration="2000" className="create">
          <img src={images.wallet} alt="" />
          <p>Create a new wallet</p>
        </Step>
        <Step data-aos="flip-left" data-aos-easing="linear" data-aos-duration="3000" className="get">
          <img src={images.crypto} alt="" />
          <p>Get some crypto</p>
        </Step>
      </StepList>

      <StyledButton variant="primary" style={{ width: '256px', height: '56px', marginTop: '20px' }}>
        Download here
      </StyledButton>
    </Wrapper>
  )
}

export default StepBlock
