import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import images from 'configs/images'
import { useTranslation } from '@pancakeswap/localization'
import Exchange from './components/Exchange'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeadHome from './components/Head'
import Crypto from './components/CryptoHome'
import StepBlock from './components/StepBlock'
import Insurance from './components/Insurance'
import Covered from './components/Covered'

const Wrapper = styled.div`
  font-style: normal;
  background-color: #13171b;
`

const Container = styled.div`
  width: 100%;
  max-width: 1389px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  .buttonSpace {
  }
  .block {
    margin-top: 120px;
    @media screen and (max-width: 1024px) {
      margin-top: 100px;
    }
    @media screen and (max-width: 820px) {
      margin-top: 80px;
    }
    @media screen and (max-width: 414px) {
      margin-top: 60px;
    }
  }
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
  const ref = useRef(null)
  const { t } = useTranslation()

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
          <StyledBackground src={images.bgTrendy} />
          <HeadHome />
          <Crypto handleClick={handleClick} />
          <div ref={ref}>
            <Exchange data-aos="fade-up" />
          </div>
          <StepBlock />
          <Insurance />
          <Covered />
        </Container>
      </Wrapper>
    </>
  )
}

export default HomePage
