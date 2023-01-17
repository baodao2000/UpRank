import styled, { keyframes } from 'styled-components'
import images from 'configs/images'
import { Flex, Text, Button, Heading } from '@pancakeswap/uikit'

const Crypto = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 14%;
  .cyptophone {
    animation: none;
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
  span {
    font-weight: 500;
    font-size: 32px;
    line-height: 39px;
    @media screen and (max-width: 1024px) {
      font-size: 24px;
      line-height: 15px;
    }
    @media screen and (max-width: 920px) {
      font-size: 22px;
      line-height: 20px;
    }
    @media screen and (max-width: 414px) {
      line-height: 20px;
      font-size: 20px;
    }
  }
  .title {
    @media screen and (max-width: 820px) {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
    flex-direction: row;

    .cyptophone {
      animation: shake 10s linear 10s infinite alternate-reverse;
    }
  }
`

const Title = styled(Heading)`
  font-size: 24px;
  line-height: 25px;
  letter-spacing: 0.001em;
  transform: rotate(0.87deg);
  text-align: center;
  font-weight: 700;
  font-family: 'Helvetica', sans-serif;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 40px;
    line-height: 46px;
    text-align: start;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 64px;
    line-height: 60px;
    letter-spacing: 0.001em;
    text-align: start;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledText = styled.p`
  color: #8145ff;
  display: inline;
  align-items: start;
  font-family: 'Helvetica', sans-serif;
`

const ButtonCustom = styled(Button)`
  width: auto;
  height: 36px;
  background: #816bf2;
  text-align: unset;
  color: #eaeaea;
  border: 0.5px solid rgba(88, 108, 158, 0.04);
  box-shadow: 0px 4px 50px rgba(205, 255, 252, 0.25), 0px 4px 100px rgba(212, 218, 220, 0.25), inset 0px 4px 4px #6d50ff,
    inset 0px 4px 2px rgba(211, 218, 255, 0.25), inset 0px 4px 20px rgba(252, 254, 255, 0.34);
  font-size: 13px;
  line-height: 20px;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 56px;
    font-size: 18px;
  }
`

const ImageLeft = styled(Flex)`
  max-width: 715px;
  width: 100%;

  img {
    position: relative;
    margin-top: 20px;
    ${({ theme }) => theme.mediaQueries.xl} {
      margin-top: 0;
    }
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
  }
`

const CustomSpan = styled(Text)`
  display: flex;
  align-items: center;
  margin-top: 24px;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  padding-left: 14%;

  img {
    width: 14px;
  }

  span {
    margin-left: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 24px;
      line-height: 29px;
      text-align: justify;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 0%;
  }
`

const CryptoHome = ({ handleClick }) => {
  return (
    <Crypto>
      <Content data-aos="fade-right">
        <Title color="mainColor" className="title colorchange">
          <StyledText>All-in-One</StyledText> for Your Crypto
        </Title>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Buy, send and swap tokens</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Earn Passive Income With Crypto</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Private & Secure</span>
        </CustomSpan>
        <CustomSpan color="mainColor" className="colorchange">
          <img src={images.star} alt="" />
          <span>Exchange Instantly</span>
        </CustomSpan>
      </Content>
      <ImageLeft data-aos="fade-left" flexDirection="column" alignItems="center">
        <img className="cyptophone" srcSet={images.phone} alt="" />
        <ButtonCustom onClick={handleClick} variant="primary">
          Calculate your earnings
        </ButtonCustom>
      </ImageLeft>
    </Crypto>
  )
}

export default CryptoHome
