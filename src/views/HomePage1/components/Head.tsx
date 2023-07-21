import { Button, Flex, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import images from 'configs/images'
import 'aos/dist/aos.css'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'

const Head = styled(Flex)`
  * {
    font-family: Inter, sans-serif;
  }
  margin: 0 auto;
  // max-width: 1320px;
  padding-top: 24px;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 90px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: 1324px) {
    gap: 0;
  }
  @media (max-width: 575px) {
    flex-direction: column-reverse;
    padding: 24px 0;
  }
`

const ContentHead = styled.div`
  margin-top: 50px;
  width: 53%;
  z-index: 1;
  @media (max-width: 575px) {
    width: 100%;
  }

p {
  max-width: 690px;
  @media (max-width: 575px) {
    max-width: 300px;
    margin-bottom: 16px;
  }
  
      .p1 {
        font-size: 60px;
        font-style: normal;
        font-weight: 400;
        line-height: 72px;
        letter-spacing: -1.2px;
        letter-spacing: 0.001em;
        color: rgba(133, 68, 245, 1);
        @media (max-width: 1024px) {
          font-size: 42px;
          line-height: 42px;
        }
        @media (max-width: 575px) {
          font-size: 24px;
          line-height: 32px;
        }
      }
      .p2 {
        font-size: 60px;
        font-weight: 700;
        line-height: 72px;
        letter-spacing: -1.2px;
        letter-spacing: 0.001em;
        background: var(--primary-primary-gradient-2, linear-gradient(180deg, #7B3FE4 0%, #A726C1 100%));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        @media (max-width: 1024px) {
          font-size: 42px;
          line-height: 42px;
        }
        @media (max-width: 575px) {
          font-size: 24px;
          line-height: 32px;
        }
      }
    }
}

`
const ContentHeadRight = styled.div`
  width: 47%;
  z-index: 1;
  h5 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.001em;
    text-transform: uppercase;
    color: #816bf2;
    text-align: center;
    margin: 20px;
    word-wrap: break-word;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`

const ImageHead = styled.img`
  max-width: 850px;
  max-height: 590px;
  @media screen and (max-width: 1400px) {
    width: 100%;
    height: 100%;
  }
`
const H5ShowMb = styled.h5`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.001em;
  text-align: left;
  margin: 20px 0;
  word-wrap: break-word;
  margin-bottom: 70px;
  span {
    color: rgba(173, 171, 178, 1);
  }
  @media (max-width: 575px) {
    font-size: 16px;
    line-height: 24px;
    margin: 16px 0 24px;
  }
`
const Staking = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    color: rgba(131, 131, 145, 1);
    font-size: 14px;
    font-style: italic;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 0px;
    span {
      color: #8544f5;
    }
  }
`
const ButtonStaking = styled(Button)`
  border-radius: var(--border-radius-lg, 8px);
  background: var(--primary-primary-1, #8544f5);
  box-shadow: 2px 2px 8px 16px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  width: 130px;
  height: 48px;
  padding: 16px;
  @media (max-width: 575px) {
    width: 100%;
    height: 40px;
    font-size: 14px;
    line-height: 20px;
  }
`

const HeadHome = () => {
  return (
    <Head>
      <ContentHead data-aos="fade-up-right">
        <p>
          <span className="p1">TrendyDefi is an open network for</span>
          <span className="p2"> storing </span>
          <span className="p1">and </span> <span className="p2">moving money</span>
        </p>
        <H5ShowMb>
          <span>Own your own data. Earn passive income with crypto.</span>
        </H5ShowMb>
        <Staking>
          <Link href="/pools">
            <ButtonStaking>Staking Now</ButtonStaking>
          </Link>
          <div>
            <p>*Start staking now to maximize your earnings!</p>
            <p>
              Stake Matic, you can earn an APR of<span style={{ fontWeight: 700 }}> 85.1%</span> up to
              <span style={{ fontWeight: 700 }}> 127.75%</span>{' '}
            </p>
          </div>
        </Staking>
      </ContentHead>
      <ContentHeadRight data-aos="fade-left">
        {isMobile ? (
          <ImageHead src={images.homeMobile} alt="" loading="eager" />
        ) : (
          <ImageHead src={images.headhome} alt="" loading="eager" />
        )}
      </ContentHeadRight>
    </Head>
  )
}

export default HeadHome
