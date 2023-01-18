import styled from 'styled-components'
import images from 'configs/images'
import { Heading, Text, Button } from '@pancakeswap/uikit'
import 'aos/dist/aos.css'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  background-attachment: fixed, scroll;
  height: auto;

  .show-pc {
    display: none;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 50%;
      display: block;
    }
  }

  .show-mb {
    ${({ theme }) => theme.mediaQueries.md} {
      width: 50%;
      display: none;
    }
  }

  .token {
    width: 100%;
    position: relative;

    ${({ theme }) => theme.mediaQueries.md} {
      width: 50%;
    }

    .galxy {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .wallet {
    z-index: 3;
    position: relative;
    animation: shake 10s linear 10s infinite alternate-reverse;
    width: 100%;
    @keyframes shake {
      0%,
      100% {
        transform: translateY(0);
      }
      10%,
      30%,
      50%,
      70%,
      90% {
        transform: translateY(-10px);
      }
      20%,
      40%,
      60%,
      80% {
        transform: translateY(10px);
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const StyledText2 = styled.p`
  color: #00f0e1;
  display: inline;
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 48px;
    line-height: 60px;
  }
`

const TitleM = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #ced8e1;
  margin-top: 6px;
  padding-left: 8%;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 24px;
    line-height: 23px;
  }
`

const StyledButton2 = styled(Button)`
  background-color: #1e1e1e;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  border-radius: 30px;
  color: #00f0e1;
  border: 2px solid #00f0e1;
  border-radius: 30px;
  font-family: Helvetica, sans-serif;
  max-width: 200px;
  max-height: 37px;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: unset;
    max-height: unset;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 541px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 50%;
    align-items: start;
  }
`

const Insurance = () => {
  return (
    <Wrapper className="block">
      <Content data-aos="fade-right" data-aos-duration="1500" className="insurance">
        <Title color="mainColor">
          <StyledText2>Mutuals</StyledText2> to replace <StyledText2>insurance</StyledText2>
        </Title>
        <img className="token show-mb" src={images.insurance1} alt="" />
        <TitleM color="mainColor">
          We build a safe and trusted platform for users. Property insurance products will increase safety for
          investors.
        </TitleM>
        <StyledButton2 variant="primary" style={{ width: '256px', height: '56px', marginTop: '20px' }}>
          Download here
        </StyledButton2>
      </Content>
      <div className="token show-pc">
        <img src={images.insurance1} alt="" className="wallet" />
        {/* <img src={images.galaxy} alt="" className="galxy" /> */}
      </div>
    </Wrapper>
  )
}

export default Insurance
