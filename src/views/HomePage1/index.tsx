import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import images from 'configs/images'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import PageSection from 'components/PageSection'
import Exchange from './components/Exchange'
import AOS from 'aos'
import 'aos/dist/aos.css'

const shine = keyframes`
  100% {
    left: 125%;
    opacity: 0;
    visibility: hidden;
  }
`

const Wrapper = styled.div`
  font-family: 'Inter';
  font-style: normal;
  background-color: #13171b;
`

const Container = styled.div`
  width: 100%;
  max-width: 1390px;
  margin: 0 auto;
  padding: 0 25px;

  .buttonSpace {
  }
  .block {
    margin-top: 200px;
    @media screen and (max-width: 1024px) {
      margin-top: 100px;
    }
    @media screen and (max-width: 820px) {
      margin-top: 100px;
    }
    @media screen and (max-width: 414px) {
      margin-top: 120px;
    }
  }
`
const Title = styled(Heading)`
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  @media screen and (max-width: 500px) {
    font-size: 40px;
    line-height: 40px;
    margin-bottom: 15px;
    margin-left: 5%;
    margin-right: 5%;
  }
`

const StyledButton = styled(Button)`
  background: #262626;
  color: #8145ff;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
`
const StyledButton2 = styled(Button)`
  background-color: #1e1e1e;
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  border-radius: 30px;
  color: #00f0e1;
  border: 2px solid #00f0e1;
  border-radius: 30px;
`
const TitleM = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  line-height: 39px;
  color: #ced8e1;
  @media screen and (max-width: 500px) {
    font-size: 16px;
    line-height: 28px;
  }
`

const Head = styled(Flex)`
  padding-top: 50px;
  position: relative;
  width: 100%;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 118px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const HeadPage = styled.div`
  align-items: center;
  height: 1300px;
  background: url(${images.bghead}) no-repeat center;
  background-size: cover;
  padding-top: 10%;

  @media screen and (max-width: 1024px) {
    height: 1500px;
  }
  @media screen and (max-width: 820px) {
    // height: 800px;
  }
  @media screen and (max-width: 740px) {
    // height: 1500px;
    // background-size: 150% auto;
  }
  @media screen and (max-width: 414px) {
    height: 900px;
    // padding-top: 20%;
  }
`
const ContentHead = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 653px;
  }

  h2 {
    font-weight: 700;
    font-size: 64px;
    line-height: 60px;
    letter-spacing: 0.001em;
    text-transform: uppercase;
    color: #7a42f1;
    margin-bottom: 20px;

    @media screen and (max-width: 1024px) {
      font-size: 54px;
      line-height: 50px;
    }
    @media screen and (max-width: 500px) {
      font-size: 30px;
      line-height: 26px;
    }
  }
  p {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #d9d1ff;
  }
`

const ImageHead = styled.img`
  width: 100%;
  max-width: 715px;
`

const LinkToDownload = styled.div`
  margin-top: 48px;
  text-align: center;
  span {
    color: #393939;
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
  }
`

const ListImgButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;

  a {
    border: 1px solid #a6a6a6;
    border-radius: 7px;
  }

  @media screen and (max-width: 500px) {
    gap: 0.5%;
    img {
      width: 90%;
    }
  }
`

const Crypto = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .cyptophone {
    animation: shake 10s linear 10s infinite alternate-reverse;
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
    width: 80%;
    @media screen and (max-width: 820px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 1180px) {
    .cyptophone {
      width: 50%;
    }
    margin-left: 9%;
    margin-right: 9%;
  }
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
  @media screen and (max-width: 414px) {
    .cyptophone {
      width: 70%;
    }
    margin-left: 7%;
    margin-right: 7%;
  }
`

const Insurance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: url(${images.bginsurance}) no-repeat 22%;
  background-attachment: fixed, scroll;
  height: 635px;
  .insurance {
    width: 30%;
  }
  img {
    animation: shake 10s linear 10s infinite alternate-reverse;
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
  @media screen and (max-width: 1180px) {
    .token {
      width: 30%;
    }
    .insurance {
      width: 50%;
    }
  }
  @media screen and (max-width: 820px) {
    .token {
      width: 40%;
    }
    .insurance {
      width: 40%;
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    height: auto;
    text-align: center;
    .insurance {
      width: 90%;
    }
    .token {
      width: 70%;
      margin-top: 10px;
    }
    background: none;
  }
`

const StyledText = styled.p`
  color: #8145ff;
  display: inline;
`

const StyledText2 = styled.p`
  color: #00f0e1;
  display: inline;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin-bottom: -1%;
    @media screen and (max-width: 920px) {
      margin-bottom: -2%;
    }
    @media screen and (max-width: 414px) {
      width: 5%;
      margin-bottom: -1%;
    }
  }
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
  }
`

const ImageLeft = styled(Flex)`
  max-width: 715px;
  width: 100%;

  img {
    position: relative;
  }
`

const CustomSpan = styled(Text)`
  display: flex;
  align-items: center;
  margin-top: 24px;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;

  img {
    margin-right: 16px;
  }

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
    margin-top: 18px;
  }
`
const StepBlock = styled.div`
  margin-top: -5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
  @media screen and (max-width: 414px) {
    margin-top: 0;
  }
`
const StepList = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3%;
  width: 80%;
  @media screen and (max-width: 1240px) {
    width: 85%;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    text-align: center;
    width: 80%;
  }
`

const Step = styled.div`
  width: 100%;
  padding: 2%;
  position: relative;
  border-radius: 8px;
  background: linear-gradient(146.96deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(153.15deg, #4c0bd3 8.57%, #8145ff 100%);
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
    line-height: 39px;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    color: #252627;
    width: 60%;
    @media screen and (max-width: 1024px) {
      font-size: 24px;
      width: 100%;
    }
    @media screen and (max-width: 414px) {
      margin-top: 1%;
    }
  }
  img {
    text-align: left;
  }
  @media screen and (max-width: 500px) {
    margin-top: 10px;
    padding: 2%;
    img {
      width: 18%;
    }
  }
`

const Covered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    text-align: center;
  }
`

const CoveredList = styled.div`
  display: flex;
  flex-wrap: wrap;
  // background: url(${images.bgcovered}) no-repeat;
  // background-attachment: fixed, scroll;
  // background-size: cover;
  padding-left: 20%;
  padding-bottom: 48px;
  @media screen and (max-width: 600px) {
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const CoveredItem = styled.div`
  margin-top: 64px;
  flex: 50%;
  @media screen and (max-width: 500px) {
    flex: 0%;
    text-align: center;
  }
`

const TagCustom = styled(Text)`
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  @media screen and (max-width: 500px) {
    font-size: 26px;
    line-height: 32px;
    margin-bottom: 15px;
    margin-top: 15px;
  }
`

const ContentCustom = styled(Text)`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  width: 50%;
  @media screen and (max-width: 600px) {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 15px;
    margin-top: 15px;
    width: 100%;
  }
`
const ButtonCustom = styled(Button)`
  width: auto;
  height: 56px;
  margin-top: 5%;
  background: #816bf2;
  text-align: unset;
  color: #eaeaea;
  border: 0.5px solid rgba(88, 108, 158, 0.04);
  box-shadow: 0px 4px 50px rgba(205, 255, 252, 0.25), 0px 4px 100px rgba(212, 218, 220, 0.25), inset 0px 4px 4px #6d50ff,
    inset 0px 4px 2px rgba(211, 218, 255, 0.25), inset 0px 4px 20px rgba(252, 254, 255, 0.34);

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const coverdList = [
  {
    img: images.key2,
    title: 'Non-Custodial',
    detail: 'We never have access to any of your data or funds. Ever.',
  },
  {
    img: images.bookOpen,
    title: 'Ledger Support',
    detail: 'For additional security you can connect your hardware wallet.',
  },
  {
    img: images.lock2,
    title: 'Privacy',
    detail: 'Phantom doesn’t track any personal identifiable information, your account addresses, or asset balances.',
  },
  {
    img: images.person,
    title: 'Biometric authentication',
    detail: 'Protect your assets on the go with the convenience you expect.',
  },
]

const HomePage: React.FC<React.PropsWithChildren> = () => {
  const ref = useRef(null)
  const { t } = useTranslation()

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    AOS.init({
      disable: 'phone',
      duration: 2000,
    })
    AOS.refresh()
  }, [])

  return (
    <>
      <style jsx global>{`
        #home-1 .page-bg {
          background: linear-gradient(0deg, #faf9fa 0%, rgba(255, 255, 255, 0.7) 41.67%, rgba(255, 255, 255, 0) 58.85%);
        }

        [data-theme='dark'] #home-1 .page-bg {
          background: linear-gradient(0deg, #08060b 3.12%, rgba(8, 6, 11, 0.7) 17.19%, rgba(8, 6, 11, 0) 58.85%);
        }
      `}</style>
      <Wrapper>
        <Container>
          <Head>
            <ContentHead data-aos="fade-up-right">
              <h2>Buy & Sell Cryptocurrency in minutes.</h2>
              <p>Join now on the largest cryptocurrency exchange in the world.</p>
              <LinkToDownload>
                <ListImgButton>
                  <a href="">
                    <img src={images.downloadIOS} alt="" />
                  </a>
                  <a href="">
                    <img src={images.downloadPlay} alt="" />
                  </a>
                  <a href="">
                    <img src={images.downloadAPK} alt="" />
                  </a>
                </ListImgButton>
              </LinkToDownload>
            </ContentHead>
            <ImageHead data-aos="fade-up-left" src={images.coinHead} alt="" />
          </Head>
          <Crypto>
            <Content data-aos="fade-right">
              <Title color="mainColor" className="title colorchange">
                <StyledText>All-in-One</StyledText> for Your Crypto
              </Title>
              <CustomSpan color="mainColor" className="colorchange">
                <img src={images.star} /> Buy, send and swap tokens
              </CustomSpan>
              <CustomSpan color="mainColor" className="colorchange">
                <img src={images.star} /> Earn Passive Income With Crypto
              </CustomSpan>
              <CustomSpan color="mainColor" className="colorchange">
                <img src={images.star} /> Private & Secure
              </CustomSpan>
              <CustomSpan color="mainColor" className="colorchange">
                <img src={images.star} /> Exchange Instantly
              </CustomSpan>
            </Content>
            <ImageLeft flexDirection="column" alignItems="center">
              <img className="cyptophone" srcSet={images.phone} alt="" />
              <ButtonCustom onClick={handleClick} variant="primary">
                Calculate your earnings
              </ButtonCustom>
            </ImageLeft>
          </Crypto>
          <div ref={ref}>
            <Exchange data-aos="fade-up" />
          </div>

          <StepBlock>
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
          </StepBlock>

          <Insurance className="block">
            <Content data-aos="fade-right" data-aos-duration="1500" className="insurance">
              <Title color="mainColor">
                <StyledText2>Mutuals</StyledText2> to replace <StyledText2>insurance</StyledText2>
              </Title>
              <TitleM color="mainColor">
                We build a safe and trusted platform for users. Property insurance products will increase safety for
                investors.
              </TitleM>
              <StyledButton2 variant="primary" style={{ width: '256px', height: '56px', marginTop: '20px' }}>
                Download here
              </StyledButton2>
            </Content>
            <img className="token" src={images.insurance1} alt="" />
          </Insurance>

          <Covered className="block">
            <Title color="mainColor">We’ve got you covered</Title>
            <TitleM color="mainColor">
              <StyledText>Only you</StyledText> can access your wallet.
            </TitleM>
            <TitleM color="mainColor">
              We <StyledText>don’t collect</StyledText> any personal data.
            </TitleM>
            <CoveredList>
              {coverdList.map((n, i) => {
                i += 600
                return (
                  <CoveredItem data-aos="zoom-in" data-aos-duration={i} data-aos-easing="linear" key={n.title}>
                    <img style={{ width: '140px', height: '140px', objectFit: 'contain' }} src={n.img} alt="" />
                    <TagCustom color="mainColor">{n.title}</TagCustom>
                    <ContentCustom color="mainColor">{n.detail}</ContentCustom>
                  </CoveredItem>
                )
              })}
            </CoveredList>
          </Covered>
        </Container>
      </Wrapper>
    </>
  )
}

export default HomePage
