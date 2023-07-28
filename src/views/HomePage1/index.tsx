import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import Exchange from './components/Exchange'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeadHome from './components/Head'
import Crypto from './components/CryptoHome'
import StepBlock from './components/StepBlock'
import Covered from './components/Covered'
import Transparency from './components/Transparency'
import Tranditional from './components/Tranditional'
import RoadMap from './components/RoadMap'
import Download from './components/Download'

const Wrapper = styled.div`
  width: 100%;
  font-style: normal;
  background-color: #13171b;
  margin-bottom: 48px;
  background-color: var(--black-black-60, rgba(0, 0, 0, 0.6));
`

const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  .buttonSpace {
  }
  .block {
    margin-top: 100px;
    @media screen and (max-width: 1024px) {
      margin-top: 100px;
    }
    @media screen and (max-width: 820px) {
      margin-top: 80px;
    }
    @media screen and (max-width: 575px) {
      margin-top: 60px;
    }
  }
`
const ContainerNew = styled.div`
  background: #141416;
  // max-width: 1320px;
  height:
  width: 100%;
  margin: 0 auto ;
  padding: 40px 20px 80px;
  position: relative;
`
const StyledBackground = styled.img`
  position: absolute;
  z-index: 0;
  display: none;
  top: 213px;
  left: -33px;

  ${({ theme }) => theme.mediaQueries.xl} {
    display: block;
  }
`

const HomePage: React.FC<React.PropsWithChildren> = () => {
  // useEffect(() => {
  //   AOS.init({
  //     disable: function () {
  //       var maxWidth = 1000
  //       return window.innerWidth < maxWidth
  //     },
  //   })
  // })

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
          <HeadHome />
          <Crypto />
          <Exchange data-aos="fade-up" />
        </Container>
        <ContainerNew>
          <StepBlock />
        </ContainerNew>
        <Container>
          <Covered />
          <Transparency />
          <Tranditional />
          <RoadMap />
          <Download />
        </Container>
      </Wrapper>
    </>
  )
}

export default HomePage
