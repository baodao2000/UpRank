import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap/uikit'
import React from 'react'
import 'aos/dist/aos.css'

const Wrapper = styled.div`
  * {
    font-family: Inter, sans-serif;
  }
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .pc {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .slideshow {
    display: none;
    margin: 0 auto;
    overflow: hidden;
    max-width: 310px;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .slideshowSlider {
    white-space: nowrap;
    display: flex;
    gap: 9px;
    transition: ease 2000ms;
  }

  .slideshowDots {
    text-align: center;
  }

  .slideshowDot {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;

    cursor: pointer;
    margin: 15px 5px 0px;

    background-color: #c4c4c4;
  }
`

const Title = styled(Heading)`
  font-weight: 700;
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 42px;
  }
  @media (max-width: 575px) {
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }
`

const ListTransparency = styled.div`
  padding-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 20px;
`

const CardTransparency = styled.div`
  width: 340px;
  height: 500px;
  border-radius: 24px;
  border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
  background: var(--white-white-6, rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(5.5px);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    width: 166px;
    height: 200px;
    margin-bottom: 24px;
  }
  &:hover {
    border-radius: 24px;
    border: 1px solid var(--white-white-12, rgba(255, 255, 255, 0.12));
    background: var(--white-white-12, rgba(255, 255, 255, 0.12));
    box-shadow: 23px 16px 65px 0px rgba(23, 7, 44, 0.22), 17px 22px 98px 0px rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(15px);
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 450px;
    padding: 29px;
    display: inline-block;
    &:hover {
      background: var(--white-white-6, rgba(255, 255, 255, 0.06));
    }
  }
`

const WrapperImage = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    text-align: start;
  }
`

const StyledTitleCard = styled(Heading)`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
  }
`

const DescCard = styled.p`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  color: rgba(173, 171, 178, 1);
  @media (max-width: 768px) {
  }
`

const Img = styled.img`
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`
const data = [
  {
    image: './images/V3/feature01.png',
    title: 'User are in full control',
    description:
      'Users have authority over their money, allowing them to deal safely without the need for confirmation from a third party.',
    text1: 'Users have authority over their',
    text2: 'money, allowing them to deal',
    text3: 'safely without the need for',
    text4: 'confirmation from a third party.',
    text5: '',
    text6: '',
  },
  {
    image: './images/V3/feature02.png',
    title: 'DAO mechanism applied',
    description: 'Using the DAO mechanism to vote on the monthly profit',
    text1: 'Using the DAO mechanism to',
    text2: 'vote on the monthly profit',
    text3: ' ',
    text4: ' ',
    text5: ' ',
    text6: ' ',
  },
  {
    image: './images/V3/feature03.png',
    title: 'Audited by Certik',
    description:
      'TrendyDefi is audited by CertiK, Audits Platform for Industry-Leading Security. The Dev team is only permitted to adjust the interest rate depending on user vote results.',
    text1: 'TrendyDefi is audited by CertiK,',
    text2: 'Audits Platform for Industry-',
    text3: 'Leading Security. The Dev team',
    text4: 'is only permitted to adjust the',
    text5: 'interest rate depending on user',
    text6: 'vote results.',
  },
]

const Transparency = () => {
  const delay = 5000
  const [index, setIndex] = React.useState(0)
  const timeoutRef = React.useRef(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1)),
      delay,
    )

    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <Wrapper className="block">
      <Title>Transparency & Security</Title>
      <Text style={{ fontSize: '18px', fontWeight: '400', lineHeight: '28px', paddingBottom: '24px' }}>
        It only takes a few minutes
      </Text>
      <ListTransparency className="pc">
        {data.map((item, index) => (
          <CardTransparency data-aos="zoom-out-left" key={index}>
            <WrapperImage>
              <img src={item.image} alt="" />
            </WrapperImage>
            <StyledTitleCard>{item.title}</StyledTitleCard>
            <DescCard>{item.description}</DescCard>
          </CardTransparency>
        ))}
      </ListTransparency>
      <div className="slideshow" style={{ width: '100%', height: '500px' }}>
        <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
          {data.map((item, index) => (
            <CardTransparency className="slide" key={index}>
              <WrapperImage>
                <Img style={{ width: '40%', height: '40%' }} src={item.image} alt="" />
              </WrapperImage>
              <StyledTitleCard>{item.title}</StyledTitleCard>
              <DescCard>{item.text1}</DescCard>
              <DescCard>{item.text2}</DescCard>
              <DescCard>{item.text3}</DescCard>
              <DescCard>{item.text4}</DescCard>
            </CardTransparency>
          ))}
        </div>
        <div className="slideshowDots">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? ' active' : ''}`}
              onClick={() => {
                setIndex(idx)
              }}
            ></div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Transparency
